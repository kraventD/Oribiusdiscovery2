import { GameItem } from '../types/game';
import {
  UserHardwareSetup,
  GameCompatibility,
  ComponentCheck,
  ComponentStatus,
} from '../types/setup';
import {
  findHardwareByNameOrAlias,
  fallbackEstimateHardware,
  HardwareItem,
} from '../data/hardwareDatabase';

/**
 * Resolves user component to official hardware database or intelligent fallback estimate
 */
export function resolveUserHardware(
  query: string,
  type: 'gpu' | 'cpu',
  savedId?: string,
  savedScore?: number
): {
  name: string;
  score: number;
  tier: 'Bajo' | 'Medio' | 'Alto' | 'Ultra';
  item: HardwareItem | null;
  vramGb?: number;
  cores?: number;
} {
  // If exact ID is provided
  if (savedId) {
    const item = findHardwareByNameOrAlias(savedId, type);
    if (item) {
      return {
        name: item.name,
        score: savedScore && savedScore > 0 ? savedScore : item.score,
        tier: item.tier,
        item,
        vramGb: item.vramGb,
        cores: item.cores,
      };
    }
  }

  // Lookup by query text
  if (query && query.trim().length > 0) {
    const item = findHardwareByNameOrAlias(query, type);
    if (item) {
      return {
        name: item.name,
        score: savedScore && savedScore > 0 ? savedScore : item.score,
        tier: item.tier,
        item,
        vramGb: item.vramGb,
        cores: item.cores,
      };
    }

    // Fallback heuristic estimation
    const fallback = fallbackEstimateHardware(query, type);
    return {
      name: query,
      score: fallback.score,
      tier: fallback.tier,
      item: null,
      vramGb: fallback.vramGb,
    };
  }

  // Empty default
  return {
    name: type === 'gpu' ? 'Gráfica básica' : 'Procesador básico',
    score: 2000,
    tier: 'Bajo',
    item: null,
  };
}

/**
 * Extracts RAM amount in gigabytes from strings like "16 GB RAM", "8 GB", "4GB"
 */
export function extractRamGb(ramStr: string): number {
  const match = ramStr.match(/(\d+)\s*(?:gb|gigas|gigabytes)/i);
  if (match) {
    return parseInt(match[1], 10);
  }
  return 8; // fallback reasonable default
}

/**
 * Evaluates game compatibility using normalized hardware requirements and equivalence mapping.
 */
export function evaluateGameCompatibility(
  game: GameItem,
  userSetup: UserHardwareSetup | null
): GameCompatibility {
  // 1. If user hasn't configured a setup yet, return unconfigured benchmark baseline
  if (!userSetup || (!userSetup.gpu && !userSetup.cpu)) {
    return {
      overall: 'playable',
      score: 50,
      label: 'Sin Configurar',
      badgeColor: 'gold-classic',
      summary: 'Configura tu procesador, tarjeta gráfica y RAM en "Mi Setup" para obtener un diagnóstico en vivo.',
      resolutionEstimate: 'Configura tus componentes para estimar rendimiento',
      cpu: {
        status: 'warning',
        userValue: 'No configurado',
        requiredValue: game.requirements.minimum.cpu,
        details: 'Configura tu procesador en Mi Setup',
      },
      gpu: {
        status: 'warning',
        userValue: 'No configurada',
        requiredValue: game.requirements.minimum.gpu,
        details: 'Configura tu tarjeta gráfica en Mi Setup',
      },
      ram: {
        status: 'warning',
        userValue: 'No configurada',
        requiredValue: game.requirements.minimum.ram,
        details: 'Configura tu memoria RAM',
      },
      storage: {
        status: 'pass',
        userValue: 'SSD / HDD',
        requiredValue: game.requirements.minimum.storage,
        details: `Requiere ${game.fileSize}`,
      },
      gpuRatio: 1,
      cpuRatio: 1,
    };
  }

  // 2. Resolve user components
  const userGpu = resolveUserHardware(
    userSetup.gpu,
    'gpu',
    userSetup.gpuId,
    userSetup.gpuScore
  );
  const userCpu = resolveUserHardware(
    userSetup.cpu,
    'cpu',
    userSetup.cpuId,
    userSetup.cpuScore
  );
  const userRamGb = userSetup.ramGb || 8;
  const userStorageType = userSetup.storageType || 'SSD';

  // 3. Normalized requirements with fallback
  const normReq = game.normalizedRequirements || {
    minCpu: { name: game.requirements.minimum.cpu, score: 3000, cores: 4 },
    recCpu: { name: game.requirements.recommended.cpu, score: 6500, cores: 6 },
    minGpu: { name: game.requirements.minimum.gpu, score: 2500, vramGb: 2 },
    recGpu: { name: game.requirements.recommended.gpu, score: 5500, vramGb: 6 },
    minRamGb: extractRamGb(game.requirements.minimum.ram),
    recRamGb: extractRamGb(game.requirements.recommended.ram),
    storageGb: game.sizeGb || 30,
    storageType: game.requirements.recommended.storage.toLowerCase().includes('ssd') ? 'SSD' : 'HDD',
  };

  // 4. GPU Analysis
  const gpuMinRatio = userGpu.score / normReq.minGpu.score;
  const gpuRecRatio = userGpu.score / normReq.recGpu.score;
  const gpuPercentageRec = Math.round(gpuRecRatio * 100);

  let gpuStatus: ComponentStatus = 'fail';
  let gpuDetails = '';

  if (gpuRecRatio >= 0.95) {
    gpuStatus = 'pass';
    const excess = Math.max(0, gpuPercentageRec - 100);
    gpuDetails = excess > 10
      ? `Supera los requisitos recomendados en un +${excess}% (${userGpu.score.toLocaleString()} pts vs ${normReq.recGpu.score.toLocaleString()} pts de referencia).`
      : `Cumple de forma óptima los requisitos recomendados (${userGpu.score.toLocaleString()} pts).`;
  } else if (gpuMinRatio >= 0.90) {
    gpuStatus = 'warning';
    gpuDetails = `Alcanza los requisitos mínimos (${Math.round(gpuMinRatio * 100)}% de potencia mínima), pero está al ${gpuPercentageRec}% de la gráfica recomendada.`;
  } else {
    gpuStatus = 'fail';
    const deficit = Math.round((1 - gpuMinRatio) * 100);
    gpuDetails = `Potencia insuficiente (-${deficit}% por debajo del mínimo de referencia ${normReq.minGpu.name}).`;
  }

  // 5. CPU Analysis
  const cpuMinRatio = userCpu.score / normReq.minCpu.score;
  const cpuRecRatio = userCpu.score / normReq.recCpu.score;
  const cpuPercentageRec = Math.round(cpuRecRatio * 100);

  let cpuStatus: ComponentStatus = 'fail';
  let cpuDetails = '';

  if (cpuRecRatio >= 0.95) {
    cpuStatus = 'pass';
    const excess = Math.max(0, cpuPercentageRec - 100);
    cpuDetails = excess > 10
      ? `Excelente rendimiento (+${excess}% sobre el procesador recomendado).`
      : `Cumple los requisitos recomendados con solvencia.`;
  } else if (cpuMinRatio >= 0.90) {
    cpuStatus = 'warning';
    cpuDetails = `Suficiente para jugar en mínimos (${Math.round(cpuMinRatio * 100)}% del mínimo requerido).`;
  } else {
    cpuStatus = 'fail';
    cpuDetails = `Procesador por debajo de los requisitos mínimos recomendados (${normReq.minCpu.name}).`;
  }

  // 6. RAM Analysis
  let ramStatus: ComponentStatus = 'fail';
  let ramDetails = '';

  if (userRamGb >= normReq.recRamGb) {
    ramStatus = 'pass';
    ramDetails = `${userRamGb} GB RAM instalados (recomendado: ${normReq.recRamGb} GB). Memoria sobrante.`;
  } else if (userRamGb >= normReq.minRamGb) {
    ramStatus = 'warning';
    ramDetails = `${userRamGb} GB instalados. Cumple el mínimo (${normReq.minRamGb} GB), pero se recomiendan ${normReq.recRamGb} GB para mayor fluidez.`;
  } else {
    ramStatus = 'fail';
    ramDetails = `Memoria insuficiente: tienes ${userRamGb} GB y el juego requiere un mínimo de ${normReq.minRamGb} GB.`;
  }

  // 7. Storage Analysis
  let storageStatus: ComponentStatus = 'pass';
  let storageDetails = '';
  const needsSsd = normReq.storageType === 'SSD';

  if (userSetup.storageFreeGb && userSetup.storageFreeGb < normReq.storageGb) {
    storageStatus = 'fail';
    storageDetails = `Espacio libre insuficiente: tienes ${userSetup.storageFreeGb} GB y necesitas ${normReq.storageGb} GB.`;
  } else if (needsSsd && userStorageType !== 'SSD') {
    storageStatus = 'warning';
    storageDetails = `El juego recomienda SSD (${normReq.storageGb} GB). En HDD convencional podrías experimentar tiempos de carga lentos.`;
  } else {
    storageStatus = 'pass';
    storageDetails = `${userStorageType} configurado. Cumple con los ${normReq.storageGb} GB requeridos.`;
  }

  // 8. Overall Compatibility Calculation
  let overall: 'optimal' | 'playable' | 'unsupported' = 'playable';
  let label = 'Jugable';
  let badgeColor: 'gold-bright' | 'gold-classic' | 'gold-bronze' | 'gold-muted' = 'gold-classic';
  let resolutionEstimate = '';
  let summary = '';

  const hasFatalDeficit = gpuStatus === 'fail' || ramStatus === 'fail' || cpuStatus === 'fail';
  const isFullyOptimal = gpuStatus === 'pass' && cpuStatus === 'pass' && ramStatus === 'pass';

  // Overall Score (0 to 100)
  const weightedScore = Math.min(
    100,
    Math.round(
      Math.min(1.5, gpuRecRatio) * 50 +
      Math.min(1.5, cpuRecRatio) * 30 +
      (userRamGb >= normReq.recRamGb ? 20 : (userRamGb >= normReq.minRamGb ? 12 : 4))
    )
  );

  if (hasFatalDeficit) {
    overall = 'unsupported';
    label = 'No recomendado';
    badgeColor = 'gold-muted';
    resolutionEstimate = 'Tirones severos o imposibilidad de ejecutar';

    const bottlenecks: string[] = [];
    if (gpuStatus === 'fail') bottlenecks.push('Tarjeta Gráfica');
    if (cpuStatus === 'fail') bottlenecks.push('Procesador');
    if (ramStatus === 'fail') bottlenecks.push('Memoria RAM');
    if (storageStatus === 'fail') bottlenecks.push('Espacio en Disco');

    summary = `Tu equipo está por debajo de los requisitos mínimos oficiales en: ${bottlenecks.join(', ')}.`;
  } else if (isFullyOptimal) {
    overall = 'optimal';
    label = 'Corre Óptimo';
    badgeColor = 'gold-bright';

    if (gpuPercentageRec >= 140) {
      resolutionEstimate = '1440p / 4K · 60+ FPS (Ultra)';
      summary = `¡Tu equipo vuela en este título! Supera los requisitos recomendados con +${gpuPercentageRec - 100}% de potencia gráfica.`;
    } else {
      resolutionEstimate = '1080p · 60 FPS (Calidad Alta / Ultra)';
      summary = 'Tu configuración cumple y supera todos los requisitos recomendados. Experiencia fluida garantizada.';
    }
  } else {
    overall = 'playable';
    label = 'Jugable (Ajustado)';
    badgeColor = 'gold-classic';
    resolutionEstimate = '1080p · 30-45 FPS (Calidad Media / Baja)';

    const warnings: string[] = [];
    if (gpuStatus === 'warning') warnings.push('gráfica en nivel mínimo');
    if (cpuStatus === 'warning') warnings.push('procesador ajustado');
    if (ramStatus === 'warning') warnings.push('RAM básica');
    if (storageStatus === 'warning') warnings.push('disco HDD');

    summary = `Puedes jugar sin problemas, pero con ajustes moderados debido a: ${warnings.join(', ')}.`;
  }

  return {
    overall,
    score: Math.max(10, Math.min(100, weightedScore)),
    label,
    badgeColor,
    summary,
    resolutionEstimate,
    cpu: {
      status: cpuStatus,
      userValue: userCpu.name,
      requiredValue: normReq.recCpu.name,
      referenceModel: normReq.recCpu.name,
      percentage: cpuPercentageRec,
      details: cpuDetails,
    },
    gpu: {
      status: gpuStatus,
      userValue: userGpu.name,
      requiredValue: normReq.recGpu.name,
      referenceModel: normReq.recGpu.name,
      percentage: gpuPercentageRec,
      details: gpuDetails,
    },
    ram: {
      status: ramStatus,
      userValue: `${userRamGb} GB RAM`,
      requiredValue: `${normReq.recRamGb} GB (Mín: ${normReq.minRamGb} GB)`,
      details: ramDetails,
    },
    storage: {
      status: storageStatus,
      userValue: `${userStorageType}${userSetup.storageFreeGb ? ` (${userSetup.storageFreeGb} GB libres)` : ''}`,
      requiredValue: `${normReq.storageGb} GB ${normReq.storageType}`,
      details: storageDetails,
    },
    gpuRatio: gpuRecRatio,
    cpuRatio: cpuRecRatio,
  };
}

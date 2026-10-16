# Oribius Discovery - Catálogo y Verificador de Compatibilidad de Hardware para PC

Plataforma web moderna, rápida y editorial para exploración de videojuegos, verificación de compatibilidad de hardware (*My Setup*), fichas técnicas completas y enlaces de descarga directa.

## 🚀 Características Principales

- **Mi Setup (Buscador de Hardware Real)**:
  - Base de datos comercial de procesadores (Intel Core, Pentium, Celeron, AMD Ryzen, FX, Phenom, Athlon) y tarjetas gráficas (NVIDIA RTX/GTX/GT, AMD Radeon RX/R9/HD, Intel Arc/Iris/UHD) desde el año 2000 en adelante (modelos comerciales desde 2 GB de VRAM hasta la actualidad).
  - Buscador inteligente con sugerencias de modelos reales y alias sin atajos superfluos.
  - Almacenamiento seguro en LocalStorage del setup del usuario (CPU, GPU, RAM, Tipo de Almacenamiento).
- **Mapeo de Equivalencias y Compatibilidad Inteligente**:
  - Resuelve requisitos ambiguos ("DirectX 11", "Procesador de 2 núcleos", "Gráfica de 4GB") mapeándolos a benchmarks reales de rendimiento relativo.
  - Badges de veredicto con escala tonal dorada (*Óptimo*, *Cumple Mínimos*, *Requisitos Ajustados*, *Insuficiente*).
  - Filtro dinámico en el catálogo: *"Solo compatibles con mi PC"*.
- **Comparador Visual Tu PC vs Requisitos**:
  - Comparativa detallada por componente (CPU, Tarjeta Gráfica, Memoria RAM y Almacenamiento) dentro del modal de cada juego.
  - Barras de potencia relativa y estimación de resolución sugerida (1080p Ultra, 1080p Medio, 720p).
- **Diseño Editorial & Cinematográfico**:
  - Interfaz oscura con paleta unificada en tonalidades de oro (`#C5A059`, `#E0C38C`, `#9E7B3B`, `#8C6F38`) sobria y elegante.
- **Optimización Mobile First**:
  - Barra de navegación inferior fija para móviles y vista de escritorio adaptativa.

## 🛠️ Stack Tecnológico

- **Frontend**: React 19 + TypeScript
- **Estilos**: Tailwind CSS v4 con tipografía Cormorant Garamond, Cinzel y Plus Jakarta Sans
- **Iconografía**: Lucide React
- **Herramienta de Construcción**: Vite
- **Entorno**: Node.js

## 📦 Instalación y Desarrollo Local

1. **Clonar el repositorio**:
   ```bash
   git clone https://github.com/kraventD/Oribiusdiscovery2.git
   cd Oribiusdiscovery2
   ```

2. **Instalar dependencias**:
   ```bash
   npm install
   ```

3. **Iniciar el servidor de desarrollo**:
   ```bash
   npm run dev
   ```
   Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

4. **Compilar para producción**:
   ```bash
   npm run build
   ```

5. **Verificar tipos**:
   ```bash
   npm run lint
   ```

## 📂 Estructura del Proyecto

```
├── src/
│   ├── components/
│   │   ├── common/         # Componentes reutilizables
│   │   ├── explore/        # Vistas de categorías, buscador y filtros
│   │   ├── games/          # Hero, GameCard, GameDetailModal, FeaturedSection
│   │   ├── layout/         # Header, Footer, Navbar
│   │   ├── setup/          # MySetupModal, SetupComparator, SetupBadge, HardwareAutocomplete
│   │   └── ui/             # Indicadores de nivel de hardware
│   ├── data/               # Catálogo de juegos, base de datos de CPU/GPU y mapeo de requisitos
│   ├── hooks/              # useUserSetup y hooks reactivos
│   ├── types/              # Definiciones TypeScript de hardware, setup y juegos
│   ├── utils/              # Algoritmo de compatibilidad de hardware y benchmarks
│   ├── App.tsx             # Componente raíz y navegación
│   └── main.tsx            # Punto de entrada
├── public/                 # Recursos estáticos
└── package.json
```

## 📄 Licencia

Distribuido bajo la Licencia MIT.

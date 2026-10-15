# Oribius Vault - Catálogo y Centro de Descargas de Videojuegos

Plataforma web moderna, rápida y editorial para exploración, fichas técnicas completas y enlaces de descarga directa de videojuegos para PC.

## 🚀 Características Principales

- **Diseño Editorial & Cinematográfico**: Interfaz oscura con acentos cálidos y estética de lujo (oro antiguo/bronce), libre de marcos genéricos.
- **Hero Section Panorámico**: Banner inmersivo con búsqueda en tiempo real, accesos rápidos y presentación destacada de títulos estelares.
- **Game Detail Modal Unificado**:
  - Hero visual con la imagen principal del juego.
  - Vista integrada sin pestañas que agrupa sinopsis, ficha técnica completa, tabla de requisitos mínimos/recomendados y enlaces de descarga con hashes de verificación.
  - Diseño ampliado para evitar textos cortados y garantizar máxima legibilidad.
  - Modo a pantalla completa para smartphones y tablets.
- **Nivel de Exigencia de Hardware**: Clasificación visual en tarjetas y modales (**Bajo Recurso**, **Gama Media**, **Alta Exigencia**).
- **Optimización Mobile First**:
  - Barra de navegación inferior fija estilo Instagram / Facebook para acceso con una sola mano.
  - Menú lateral reservado automáticamente para pantallas de escritorio.
- **Filtros Dinámicos**: Exploración por categorías (RPG, Acción, Aventura, Indie, etc.), búsqueda instantánea y gestión de favoritos locales.

## 🛠️ Stack Tecnológico

- **Frontend**: React 19 + TypeScript
- **Estilos**: Tailwind CSS v4 con tipografía Cormorant Garamond y Plus Jakarta Sans
- **Iconografía**: Lucide React
- **Herramienta de Construcción**: Vite
- **Entorno**: Node.js

## 📦 Instalación y Desarrollo Local

1. **Clonar el repositorio**:
   ```bash
   git clone https://github.com/TU_USUARIO/TU_REPOSITORIO.git
   cd TU_REPOSITORIO
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
│   │   ├── common/         # Componentes reutilizables (Badge, etc.)
│   │   ├── explore/        # Vistas de categorías y filtros
│   │   ├── games/          # Hero, GameCard, GameDetailModal
│   │   └── layout/         # Sidebar (desktop), BottomNav (mobile), Header, Footer
│   ├── data/               # Catálogo de juegos y metadatos
│   ├── types/              # Definiciones TypeScript de juegos y requisitos
│   ├── App.tsx             # Componente raíz y navegación
│   └── main.tsx            # Punto de entrada
├── public/                 # Recursos públicos
└── package.json
```

## 📄 Licencia

Distribuido bajo la Licencia MIT.

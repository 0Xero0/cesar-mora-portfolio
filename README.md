# César Mora Portfolio

Portfolio web en Angular generado a partir de `Cesar_Mora_CV.yaml`.

## Requisitos

- Node.js 20+
- npm

## Desarrollo

```bash
npm install
npm run sync-cv
npm start
```

## Build

```bash
npm run build
```

El script `prebuild` sincroniza automáticamente el YAML del CV a `src/assets/data/cv.json`.

## Variables

- `CV_YAML_PATH`: ruta opcional al archivo YAML (por defecto `C:\Users\cesar\Documents\Cesar_Mora_CV.yaml`)

## Deploy en Vercel

```bash
vercel link
vercel
vercel --prod
```

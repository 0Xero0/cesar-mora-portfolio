import { copyFileSync, existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { load } from 'js-yaml';

const __dirname = dirname(fileURLToPath(import.meta.url));
const projectRoot = resolve(__dirname, '..');

const yamlPath =
  process.env.CV_YAML_PATH ??
  'C:\\Users\\cesar\\Documents\\Cesar_Mora_CV.yaml';

const pdfSources = [
  join(projectRoot, 'src', 'assets', 'cv', 'Cesar_Mora_CV.pdf'),
  join(projectRoot, '..', '..', 'Documents', 'Cesar_Mora_CV.pdf'),
  'C:\\Users\\cesar\\Documents\\Cesar_Mora_CV.pdf',
  'C:\\Users\\cesar\\Documents\\Cesar_Mora_CV_nuevo.pdf',
];

const jsonOutDir = join(projectRoot, 'src', 'assets', 'data');
const pdfOutDir = join(projectRoot, 'src', 'assets', 'cv');
const jsonOutPath = join(jsonOutDir, 'cv.json');
const pdfOutPath = join(pdfOutDir, 'Cesar_Mora_CV.pdf');

function normalizeCv(cv) {
  const normalized = structuredClone(cv);

  if (normalized.sections?.experience) {
    normalized.sections.experience = normalized.sections.experience.map((item) => ({
      ...item,
      end_date: item.end_date ?? null,
    }));
  }

  normalized.display_name ??= 'César Mora';

  return normalized;
}

if (!existsSync(yamlPath)) {
  if (existsSync(jsonOutPath)) {
    console.warn(
      `CV YAML not found at: ${yamlPath}. Using committed ${jsonOutPath}.`,
    );
    process.exit(0);
  }

  console.error(`CV YAML not found at: ${yamlPath}`);
  console.error(
    'Run sync-cv locally after updating the YAML, or set CV_YAML_PATH.',
  );
  process.exit(1);
}

const raw = readFileSync(yamlPath, 'utf8');
const parsed = load(raw);

if (!parsed?.cv) {
  console.error('Invalid YAML: missing root "cv" key.');
  process.exit(1);
}

mkdirSync(jsonOutDir, { recursive: true });
mkdirSync(pdfOutDir, { recursive: true });

const cvData = normalizeCv(parsed.cv);
writeFileSync(jsonOutPath, JSON.stringify(cvData, null, 2), 'utf8');
console.log(`Wrote ${jsonOutPath}`);

const pdfSource = pdfSources.find((path) => existsSync(path));
if (pdfSource) {
  copyFileSync(pdfSource, pdfOutPath);
  console.log(`Copied PDF from ${pdfSource}`);
} else {
  console.warn('PDF not found; skipping copy.');
}

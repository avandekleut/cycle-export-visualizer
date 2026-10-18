// Writes the built-in sample data as a Clue-style export folder, so it can be dropped
// onto the app like a real one. The generator lives in index.html (between the
// sample:start / sample:end markers) so the app and this folder never drift apart.
//
//   node scripts/make-sample-export.mjs [end-date]     (default 2026-10-15)
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const html = readFileSync(join(root, 'index.html'), 'utf8');
const src = html.slice(html.indexOf('/* sample:start'), html.indexOf('/* sample:end */'));
if (!src) throw new Error('sample generator markers not found in index.html');

const fromDay = n => new Date(n * 864e5);
const toDay = iso => Date.parse(iso + 'T00:00:00Z') / 864e5;
const sampleExport = new Function('fromDay', `${src}; return sampleExport;`)(fromDay);

const end = process.argv[2] || '2026-10-15';
const out = join(root, 'sample-data', 'ClueDataDownload-SAMPLE');
mkdirSync(out, { recursive: true });

const measurements = sampleExport(toDay(end));
writeFileSync(join(out, 'measurements.json'), JSON.stringify(measurements));
writeFileSync(join(out, 'profile.json'), JSON.stringify({
  profileData: {
    BBT_predictions_enabled: false, cycle_length: 29, fertile_phase_enabled: false, ovulation_enabled: true,
    period_length: 4, pms_length: 3, predictions_enabled: true, unprotected_days_enabled: false, lifePhase: 'menstruating',
  },
  createdAt: '2024-03-01', updatedAt: '2024-03-01',
}));
console.log(`${measurements.length} records, ${measurements.map(m => m.date).sort()[0] ?? '-'} … ${end} → ${out}`);

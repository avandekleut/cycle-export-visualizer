# Sample export (made-up data)

`ClueDataDownload-SAMPLE/` is a fake Clue export: about 2½ years of invented cycles, ending 2026-10-15. Drop the folder onto the app to try it, or to take screenshots without using real data.

It follows a real export's format (the same record shapes, options and severity fields), but every value is generated. It's the same data as the app's **Try with sample data** button, which shifts the dates so the last cycle is always the current one.

It's deliberately varied so every feature has something to show: one unlogged period (a 59-day "likely untracked" cycle), a cold with medication, appointments, notes, tags, sleep and weight entries.

Regenerate after changing the generator in `index.html`:

```
node scripts/make-sample-export.mjs            # ends 2026-10-15
node scripts/make-sample-export.mjs 2027-01-31 # or pick an end date
```

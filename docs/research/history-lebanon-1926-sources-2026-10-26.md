# Lebanon 1926: Wiki-only first ban upgraded with thesis and journal sources

Research checked on 26 October 2026. Read `DATA-MAINTENANCE.md`, the entry
with the profile and timeline, the Shad 2012 AUB thesis (downloaded and
read), the JIED peer-reviewed article (read), and the Wikipedia extracts
carrying the 1925 order's French text before editing. The entry text was
converted to per-sentence citations and two read sources replaced a bare
Wiki citation. No scores, profiles or other timelines changed.

## What changed

- `lebanon-hashish-ban-1926`: description now dates the ban to the High
  Commissioner's order of October 1925 effective January 1926, notes its
  nominal character with the UN-reported 1928 figures (60 tons, 90 percent
  for Egypt), and drops the redundant Timeline-of-cannabis-law citation.
  Sources added: Christopher Shad's 2012 AUB master's thesis (read) and
  the LSE Journal of Illicit Economies and Development article (read,
  peer-reviewed).

## Sources actually read

- Christopher Shad, AUB master's thesis (2012), PDF via scholarworks:
  "nominal Lebanese ban on hashish production in 1926"; 1928 Bekaa
  production skyrocketing to 60 tons, 90 percent to Egypt (citing El Hadka
  1965); French Sûreté 1939 producer list; elite complicity.
- JIED article 10.31389/jied.207 (LSE, peer-reviewed): first hashish
  production ban enacted 1926 by the French Mandate authorities; nominal
  for lack of territorial presence (citing Shad 2012); El Hadka 1965 and
  Felbab-Brown 2021 context.
- Wikipedia "Cannabis in Lebanon" extract: French text of the 8 October
  1925 order banning Bekaa cultivation from 1 January 1926 (citing Clarke
  1998, not independently read — recorded as a lead, not a verified
  primary).

## Syria deliberately unchanged

The JIED article's "Lebanon and Syria" phrasing was checked against the
instrument: the recovered order covers Greater Lebanon (Bekaa) only, and
the thesis is Lebanon-specific. No Syria-specific 1926 instrument was
found. Syria's 1943 cultivation ban stays as is (still Wiki-only);
moving it to 1926 would need a Syria-side order that has not surfaced.

## Validation and tree note

- Chain `lb`: 1926 100→14, 1946 14→11, 0 flagged steps.
- `npm run history:test`: 40 pass, 0 fail; `npm run answers:test` and the
  production build to be re-run before commit.
- Commit stages only the Lebanon hunk plus this note, via patch filtering.
  Foreign work in the shared tree is excluded and preserved.

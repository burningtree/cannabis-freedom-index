// Checks the penalty tables and context sections of every profile against the rules in
// docs/DATA-MAINTENANCE.md ("Penalty steps", "Writing context sections well") for mistakes the
// schema cannot catch. Prints each problem with its file; exits with 1 when it finds errors.
//
//   node scripts/profile-audit.cjs              every profile
//   node scripts/profile-audit.cjs ke de        some
//   node scripts/profile-audit.cjs --warnings   also the softer warnings (style, length)
const fs = require("fs"), y = require("js-yaml");

const args = process.argv.slice(2);
const warnings = args.includes("--warnings");
const only = args.filter((a) => !a.startsWith("--"));
const fileOf = (id) => (fs.existsSync(`countries/${id}.yaml`) ? `countries/${id}.yaml` : `countries/${id}/index.yaml`);
const ids = (only.length ? only : fs.readdirSync("countries").map((f) => f.replace(/\.yaml$/, ""))).filter((id) => fs.existsSync(fileOf(id)));

const GRAMS = { g: 1, kg: 1000, oz: 28.3495, lb: 453.592 };
const amount = (t) => { const m = /^(\d+(?:\.\d+)?)\s*(g|kg|oz|lb|plants?)$/.exec(String(t ?? "").trim()); return m ? { v: m[2].startsWith("plant") ? +m[1] : +m[1] * GRAMS[m[2]], unit: m[2].startsWith("plant") ? "plants" : "g" } : null; };
const DAYS = { day: 1, week: 7, month: 30, year: 365 };
const days = (t) => { const m = /^(\d+(?:\.\d+)?)\s*(day|week|month|year)s?$/.exec(String(t ?? "").trim()); return m ? +m[1] * DAYS[m[2]] : null; };
const RANK = { legal: 0, tolerated: 1, civil: 2, criminal: 3 };
// words from docs/WRITING.md, "Words to avoid"
const AVOID = /\b(constitutes?|subsequently|thereby|in respect of|the instrument|the provision|operative (order|part)|establishes)\b/i;
const SCIENCE = /research|stud(y|ies)|scien|universit|institut|trial|laborator|paper|journal|discover/i;

const errors = [], warns = [];
const err = (id, where, msg) => errors.push(`${fileOf(id)} ${where}: ${msg}`);
const warn = (id, where, msg) => warns.push(`${fileOf(id)} ${where}: ${msg}`);
const sentences = (t) => String(t).replace(/\[@[^\]]*\]/g, "").replace(/\[([^\]]+)\]\([^)]+\)/g, "$1").split(/(?<=[.!?])\s+(?=[A-Z0-9"'‘“(])/).filter((s) => s.trim().length > 2);

for (const id of ids) {
  const p = y.load(fs.readFileSync(fileOf(id), "utf8"));
  const unit = id.includes("/");

  // ── penalty tables ──
  for (const [seg, block] of Object.entries(p.segments ?? {})) {
    const rows = block?.penalties;
    if (!rows) continue;
    const where = `segments.${seg}.penalties`;
    if (!["possession", "cultivation", "sharing", "consumption"].includes(seg)) err(id, where, `penalty tables belong on possession, cultivation, sharing (supply and trafficking) or consumption (where using is itself an offence), not ${seg}`);
    let prevUpto = null, prevRank = -1, units = new Set();
    rows.forEach((r, i) => {
      const at = `${where}[${i}]`;
      const up = amount(r.upto), ov = amount(r.over);
      [up, ov].filter(Boolean).forEach((a) => units.add(a.unit));
      const first = !r.repeat || r.repeat === 1;
      // amount ladder: each step starts where the last one ended
      if (first && !r.label && (up || ov)) {
        if (ov && up && ov.v >= up.v) err(id, at, `over (${r.over}) is not below upto (${r.upto})`);
        if (prevUpto !== null && ov && Math.abs(ov.v - prevUpto) > 0.5) warn(id, at, `starts at ${r.over} but the step before ends at ${prevUpto} ${[...units][0] ?? ""}: a gap or an overlap`);
        if (prevUpto !== null && !ov && up) err(id, at, `a step with only upto after another step: give it over: (the previous upto)`);
        prevUpto = up ? up.v : null;
      }
      // treatment should not get milder as amounts grow
      if (first && !r.label && RANK[r.treatment] !== undefined) {
        if (RANK[r.treatment] < prevRank) warn(id, at, `${r.treatment} after a harsher step; check the order`);
        prevRank = Math.max(prevRank, RANK[r.treatment]);
      }
      if ((r.treatment === "legal" || r.treatment === "tolerated") && (r.prison || r.prison_min || r.fine || r.fine_min || r.caning || r.death)) err(id, at, `${r.treatment} with a punishment; a punishment means civil or criminal`);
      if (r.treatment === "criminal" && !r.prison && !r.prison_min && !r.fine && !r.fine_min && !r.death && !r.note) warn(id, at, "criminal step with no punishment and no note saying why");
      if ((r.treatment === "criminal" || r.treatment === "civil") && !r.term) warn(id, at, "no term: give the law's own word for the offence");
      if (r.prison_min && r.prison && days(r.prison_min) > days(r.prison)) err(id, at, `prison_min ${r.prison_min} is longer than prison ${r.prison}`);
      if (r.caning && r.caning[0] > r.caning[1]) err(id, at, "caning range is reversed");
      // facts that have a field of their own but were left in the note
      const note = String(r.note ?? "");
      // a minimum prison term or a minimum fine written in the note instead of its field
      if (/\b(at least|minimum of|not less than)\s+(\w+\s+){0,2}(day|week|month|year)s?\b/i.test(note) && !r.prison_min) err(id, at, `the note gives a minimum prison term ("${note.slice(0, 60)}"); use prison_min`);
      const CUR = "(shillings|dollars|euros|pounds|francs|rupees|rupiah|pesos|naira|cedis|dinars|dirhams|riyals|ringgit|baht|yen|won|yuan|[A-Z]{3}|[$€£¥₹]|[A-Z]{1,2}\\$)";
      if (new RegExp(`\\b(at least|minimum of|not less than)\\s+(a fine of\\s+)?(${CUR}\\s?[\\d][\\d,.]*|[\\d][\\d,.]*(\\s?(million|thousand))?\\s*${CUR})`, "i").test(note) && !r.fine_min) err(id, at, `the note gives a minimum fine ("${note.slice(0, 60)}"); use fine_min`);
      if (/\bstrokes?\b|\bcan(e|ing)\b|\blash(es)?\b/i.test(note) && !/\b(no|without|not)\b[^.;]{0,20}\b(can(e|ing)|lash|strokes?)/i.test(note) && !r.caning && !r.death) err(id, at, "the note mentions caning or lashes; use caning: [fewest, most]");
      if (r.prison && r.prison_min && /\b\w+ (months?|years?) (to|and|–|-) \w+ (months?|years?)\b/i.test(note)) warn(id, at, "the note repeats the prison range the table already shows; keep notes for exceptions and conditions");
      if (/\bdeath (penalty|sentence)\b|\bexecution\b/i.test(note) && !r.death) warn(id, at, "the note mentions the death penalty; if this step carries it, set death: true");
      if (note.length > 160) warn(id, at, `long note (${note.length} characters): put the explanation in the segment text`);
    });
    if (units.size > 1) err(id, where, "mixes grams and plants in one ladder; possession counts weight, cultivation plants");
    if (block.text && !/\[@/.test(block.text)) warn(id, `segments.${seg}`, "has a penalty table but its text has no inline citations; the figures need their source");
  }

  // ── context sections ──
  const ctx = p.context ?? {};
  if (!unit) {
    if (ctx.products && ctx.recreational && ctx.hemp) warn(id, "context.products", "recreational and hemp exist: fold products into them and delete it");
    for (const [key, b] of Object.entries(ctx)) {
      const items = Array.isArray(b) ? b.map((x, i) => [`context.${key}[${i}]`, x]) : [[`context.${key}`, b]];
      for (const [where, it] of items) {
        const text = it?.text ?? "";
        if (!text) continue;
        const ss = sentences(text);
        // a one-liner: an error in the newer sections, old debt (a warning) in the original four
        const thin = /^none\.?$/i.test(text.trim()) || (ss.length === 1 && ss[0].trim().length < 40);
        if (thin) (["products", "production", "medical", "consequences"].includes(key) ? warn : err)(id, where, `a one-line text ("${text.trim().slice(0, 50)}"); say what the situation is and cite it, or leave the section out`);
        if (["recreational", "medical", "hemp", "production", "culture", "research", "genetics"].includes(key) && ss.length > 10) warn(id, where, `${ss.length} sentences; three to seven read best`);
        if (/\[@/.test(text)) {
          // with inline marks, every sentence should carry one (or share the next sentence's)
          const raw = text.split(/(?<=[.!?](?:\[@[^\]]*\])?)\s+(?=[A-Z0-9"'‘“(\[])/);
          const bare = raw.filter((s, i) => !/\[@/.test(s) && !(raw[i + 1] && /\[@/.test(raw[i + 1]) && s.length < 120)).length;
          if (bare > 1) warn(id, where, `${bare} sentences without a citation mark`);
        }
        if (AVOID.test(text)) warn(id, where, `uses a word WRITING.md asks to avoid ("${text.match(AVOID)[0]}")`);
        if (/gov\.uk\/foreign-travel-advice/.test(JSON.stringify(it.sources?.map((k) => p.sources?.[k])))) warn(id, where, "rests on GOV.UK travel advice, meant only for the UK and closed countries");
      }
    }
    if (ctx.research?.text && !SCIENCE.test(ctx.research.text)) err(id, "context.research", "does not mention any science (studies, universities, trials, discoveries, research permits): it is about scientific research, not policy");
    if (Array.isArray(ctx.spotlights)) {
      if (ctx.spotlights.length > 3) err(id, "context.spotlights", `${ctx.spotlights.length} spotlights; at most three`);
      ctx.spotlights.forEach((s, i) => { if (s.title.split(/\s+/).length > 8) warn(id, `context.spotlights[${i}]`, `long title ("${s.title}"): a few plain words`); });
    }
    if (ctx.culture?.text && !/\]\(\/(culture|history)\//.test(ctx.culture.text)) warn(id, "context.culture", "links no Culture or History page");
    if (ctx.production?.status === "none" && /licen[cs]|permit|authori[sz]ed (grow|produc|cultiv)/i.test(ctx.production.text ?? "") && !/no (licen|permit)|not (licen|permit)|none/i.test(ctx.production.text ?? ""))
      warn(id, "context.production", "status none, but the text mentions licences or permits; check whether it is medical");
    const prod = (ctx.production?.text ?? "").trim();
    if (ctx.production?.status && !["none", "hemp"].includes(ctx.production.status) && /^none\b|^no (legal|licensed|lawful) (cannabis )?(production|cultivation)/i.test(prod))
      err(id, "context.production", `status ${ctx.production.status}, but the text says there is no legal production`);
    if (ctx.production?.status === "medical" && /hemp/i.test(prod) && !/medic|pharma|patient|export|research/i.test(prod))
      warn(id, "context.production", "status medical, but the text describes only hemp: is it hemp (Hemp only)?");
    if (ctx.hemp?.status === "none" && /\b0[.,]\d+\s?%|\b1\s?%\s?THC|hemp (may|can) be grown|licensed hemp/i.test(ctx.hemp.text ?? "")) warn(id, "context.hemp", "status none, but the text gives a hemp THC limit or licensed hemp; check");
  }
}

for (const e of errors) console.log("✗ " + e);
if (warnings) for (const w of warns) console.log("· " + w);
console.log(`\n${ids.length} profiles: ${errors.length} errors, ${warns.length} warnings${warnings ? "" : " (show them with --warnings)"}`);
process.exit(errors.length ? 1 : 0);

// "Did you know?" facts for the home page.
// The first group is computed from the scores, so it stays true when the data changes.
// The second group is curated from the country write-ups; keep each one in step with
// the matching file in /countries.
import { SEGMENTS, countries, regions, segAvg, worldAvg } from "./countries.js";

const seg = (id) => SEGMENTS.findIndex((s) => s.id === id);
const P = seg("possession"), C = seg("cultivation"), S = seg("sharing"), A = seg("access");
const list = (names) => names.length > 1 ? `${names.slice(0, -1).join(", ")} and ${names.at(-1)}` : names[0];
const byId = (id) => countries.find((c) => c.id === id);

function computed() {
  const top = countries[0];
  const zero = countries.filter((c) => c.score === 0);
  const growers = countries.filter((c) => c.s[C] >= 4);
  const noShop = countries.filter((c) => c.s[P] >= 5 && c.s[A] <= 1);
  const lowest = segAvg.indexOf(Math.min(...segAvg));
  const medOnly = countries.filter((c) => c.rec === "illegal" && c.med !== "no");
  const regionAvg = regions
    .map((r) => {
      const cs = countries.filter((c) => c.region === r);
      return { r, avg: cs.reduce((a, c) => a + c.raw, 0) / cs.length };
    })
    .sort((a, b) => b.avg - a.avg);

  return [
    { text: `The best score in the world is only ${top.score} out of 100. ${top.name} leads the index, but its caps on how much you may carry and grow keep it barely past the halfway mark.`, id: top.id },
    { text: `${zero.length} countries score exactly zero: ${list(zero.map((c) => c.name))}. In each, even a small amount means prison or corporal punishment.` },
    { text: `Growing a few plants at home is legal in just ${growers.length} of ${countries.length} countries.` },
    { text: `Legal to have, nowhere to buy: ${noShop.length} countries let adults possess cannabis but offer no real legal way to obtain it — among them ${list(noShop.slice(0, 4).map((c) => c.name))}.`, id: noShop[0]?.id },
    { text: `${SEGMENTS[lowest].name} is the rarest freedom. The world average is ${segAvg[lowest].toFixed(1)} out of 10, lower than for any other segment.` },
    { text: `${medOnly.length} countries allow some medical use of cannabis while keeping recreational use fully illegal.` },
    { text: `${regionAvg[0].r} is the freest region, averaging ${Math.round(regionAvg[0].avg)}. ${regionAvg.at(-1).r} is the strictest at ${Math.round(regionAvg.at(-1).avg)}. The world average is ${worldAvg.toFixed(1)}.` },
  ];
}

const curated = [
  { id: "DE", text: "In Germany you may grow three plants and carry 25 g — but giving any of it to a friend, even for free, is still a crime. That is why it scores 1 out of 10 for sharing." },
  { id: "SG", text: "Singapore prosecutes its citizens and permanent residents for using cannabis abroad, even in countries where it is legal, and can test them when they return." },
  { id: "UY", text: "Uruguay was the first country to legalise, in 2013. Buyers register with the state and are verified by fingerprint at the pharmacy; tourists are not allowed to buy." },
  { id: "KM", text: "Cannabis was fully legal in the Comoros from 1975 to 1978 under President Ali Soilih. It has been banned ever since." },
  { id: "JP", text: "Until December 2024, Japan punished possessing cannabis but not using it. The law now makes use itself a crime, with up to seven years in prison." },
  { id: "KP", text: "North Korea is often called a cannabis paradise online. Its penal code actually lists cannabis alongside cocaine and heroin; the myth probably comes from legal hemp and a rough local tobacco." },
  { id: "CO", text: "Colombia lets adults grow up to 20 plants with no licence or registration — one of the most generous home-grow allowances anywhere — yet has no legal shops." },
  { id: "CH", text: "Switzerland has an unusual sharing rule: handing up to 10 g to another adult for free, to consume together, is not punishable." },
  { id: "PW", text: "In Palau, giving away less than an ounce is punished like simple possession, with a fine, rather than as trafficking." },
  { id: "FJ", text: "Fiji's Court of Appeal has told judges not to jail people for up to 100 g of cannabis: fines, community service or a warning instead." },
  { id: "NR", text: "Nauru, population about 12,000, has the harshest rule in the Pacific islands: a mandatory minimum of 12 months in prison for possessing any illicit drug." },
  { id: "IN", text: "In India the flowers and resin are banned, but bhang, made from cannabis leaves, is legal and sold in government-licensed shops in several states." },
  { id: "TH", text: "Thailand went from thousands of open dispensaries to prescription-only in three years. Since June 2025 cannabis flower officially requires a prescription." },
  { id: "MT", text: "Malta was the first EU country to legalise, in 2021 — but there are no shops, only non-profit associations capped at 500 members each." },
];

export function getFacts() {
  const facts = [...computed(), ...curated].filter((f) => !f.id || byId(f.id));
  return facts.map((f) => ({ ...f, country: f.id ? byId(f.id) : null }));
}

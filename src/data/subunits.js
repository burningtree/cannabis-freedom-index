/* Cannabis Freedom Index — scores below national level
 *
 * For federations where the rules differ sharply between states, provinces or territories.
 * Each unit is scored on the same six segments and levels as countries (see SEGMENTS in data.js):
 * [possession, cultivation, enforcement, sharing, consumption, access]
 *
 * The home-page ranking and map still use the single national estimate in data.js.
 * Units have a short note rather than a full segment-by-segment write-up.
 * Scores are editorial estimates, not legal advice.
 */

const u = (id, name, s, rec, med, note) => ({ id, name, s, rec, med, note });

export const SUBUNITS = {
  US: {
    label: "State",
    plural: "states",
    intro: "Federal law still prohibits non-medical cannabis everywhere in the United States; these scores describe state law. Counties and cities can add their own rules, and state law does not apply on federal land.",
    sources: [
      ["NORML — State-by-state laws", "https://norml.org/laws/"],
      ["National Conference of State Legislatures — State cannabis laws", "https://www.ncsl.org/health/state-medical-cannabis-laws"],
    ],
    units: [
      u("al", "Alabama", [1, 0, 1, 0, 1, 0], "illegal", "limited", "Possession for personal use is a misdemeanour with up to a year in jail; a second offence is a felony. A medical law passed in 2021 but products have been held up by licensing disputes."),
      u("ak", "Alaska", [5, 4, 6, 5, 4, 6], "legal", "yes", "Adults 21+ may hold 1 oz and grow six plants (three mature). Licensed shops since 2016, and some may offer on-site consumption."),
      u("az", "Arizona", [5, 4, 6, 5, 3, 6], "legal", "yes", "1 oz (5 g of concentrate) and six plants per adult, twelve per household. Licensed shops since 2021."),
      u("ar", "Arkansas", [1, 1, 2, 1, 1, 3], "illegal", "yes", "Under 4 oz is a misdemeanour with up to a year in jail. Medical cannabis is sold in dispensaries to card holders."),
      u("ca", "California", [5, 4, 6, 5, 4, 6], "legal", "yes", "28.5 g of flower (8 g of concentrate) and six plants per household. Shops, delivery and licensed consumption lounges; many cities still ban sales."),
      u("co", "Colorado", [5, 4, 6, 5, 4, 6], "legal", "yes", "2 oz and six plants (three flowering). The first state with licensed shops, in 2014; hospitality venues are licensed in some cities."),
      u("ct", "Connecticut", [6, 4, 6, 5, 3, 6], "legal", "yes", "1.5 oz on you and 5 oz locked at home; six plants (three mature), twelve per household. Licensed shops since 2023."),
      u("de", "Delaware", [5, 1, 6, 5, 3, 6], "legal", "yes", "1 oz is legal and shops opened in 2025, but growing at home remains a crime."),
      u("dc", "District of Columbia", [5, 4, 6, 5, 3, 4], "legal", "yes", "2 oz, six plants (three mature) and gifts of up to 1 oz are legal. Congress blocks licensed adult-use sales, so access runs through self-certified medical dispensaries."),
      u("fl", "Florida", [1, 1, 2, 1, 1, 3], "illegal", "yes", "20 g or less is a misdemeanour with up to a year in jail. A large medical programme operates; a 2024 legalisation measure won 56% but needed 60%."),
      u("ga", "Georgia", [1, 1, 2, 1, 1, 1], "illegal", "limited", "1 oz or less is a misdemeanour with up to a year in jail, though Atlanta and several cities have cut it to a small fine. Only low-THC oil is allowed medically."),
      u("hi", "Hawaii", [2, 1, 3, 1, 1, 3], "decrim", "yes", "Up to 3 g is a $130 violation; more is a misdemeanour. Medical cannabis is dispensed to card holders, who may also grow."),
      u("id", "Idaho", [1, 0, 1, 0, 1, 0], "illegal", "no", "No medical programme and no decriminalisation: under 3 oz is a misdemeanour with up to a year in jail and a mandatory minimum fine."),
      u("il", "Illinois", [5, 2, 6, 5, 3, 6], "legal", "yes", "Residents may hold 30 g. Only medical patients may grow (five plants); for others a few plants is a $200 civil fine. Licensed shops since 2020."),
      u("in", "Indiana", [1, 0, 2, 0, 1, 0], "illegal", "no", "Possession is a misdemeanour with up to 180 days in jail. No medical programme."),
      u("ia", "Iowa", [1, 0, 2, 0, 1, 1], "illegal", "limited", "A first offence carries up to six months in jail. A narrow medical programme caps THC per patient."),
      u("ks", "Kansas", [1, 0, 1, 0, 1, 0], "illegal", "no", "No medical programme. A first possession offence is a misdemeanour with up to six months in jail; later offences can be felonies."),
      u("ky", "Kentucky", [1, 1, 2, 1, 1, 2], "illegal", "yes", "Up to 8 oz is a misdemeanour capped at 45 days in jail. A medical programme began in 2025; smoking flower is not allowed under it."),
      u("la", "Louisiana", [3, 1, 4, 1, 2, 3], "decrim", "yes", "Up to 14 g is a $100 fine with no jail. Medical cannabis, including flower, is sold through licensed pharmacies."),
      u("me", "Maine", [5, 4, 6, 5, 3, 6], "legal", "yes", "2.5 oz and three mature plants per adult. Licensed shops since 2020, alongside a long-standing medical caregiver market."),
      u("md", "Maryland", [5, 3, 6, 5, 3, 6], "legal", "yes", "1.5 oz and two plants per household. Licensed shops since July 2023."),
      u("ma", "Massachusetts", [6, 4, 6, 5, 3, 6], "legal", "yes", "1 oz in public and 10 oz at home; six plants per adult, twelve per household. Licensed shops since 2018."),
      u("mi", "Michigan", [6, 5, 6, 5, 4, 6], "legal", "yes", "2.5 oz on you, 10 oz at home and twelve plants per household — the most generous home-grow limit in the country. Shops and licensed lounges."),
      u("mn", "Minnesota", [6, 4, 6, 5, 3, 6], "legal", "yes", "2 oz in public and 2 lb at home; eight plants (four mature). Legal since 2023, with licensed shops opening from 2025."),
      u("ms", "Mississippi", [3, 1, 4, 1, 2, 3], "decrim", "yes", "A first offence with up to 30 g is a $100–250 fine with no jail. Medical dispensaries serve card holders."),
      u("mo", "Missouri", [6, 3, 6, 5, 3, 6], "legal", "yes", "3 oz is legal. Growing six flowering plants requires a state registration card. Licensed shops since 2023."),
      u("mt", "Montana", [5, 3, 6, 5, 3, 6], "legal", "yes", "1 oz and two mature plants per adult, four per household. Shops operate only in counties that voted for legalisation."),
      u("ne", "Nebraska", [3, 1, 4, 1, 2, 1], "decrim", "limited", "A first offence with up to 1 oz is a $300 infraction. Voters approved medical cannabis in 2024; the programme is still being set up."),
      u("nv", "Nevada", [5, 2, 6, 5, 4, 6], "legal", "yes", "2.5 oz is legal. Home growing is allowed only if you live more than 25 miles from a shop. Licensed consumption lounges operate in Las Vegas."),
      u("nh", "New Hampshire", [3, 1, 4, 1, 2, 3], "decrim", "yes", "Up to ¾ oz is a $100 violation. The only New England state without legal sales; a therapeutic programme serves patients."),
      u("nj", "New Jersey", [6, 1, 6, 5, 3, 6], "legal", "yes", "Up to 6 oz is legal and shops have operated since 2022, but growing even one plant at home remains a serious crime."),
      u("nm", "New Mexico", [6, 4, 6, 5, 4, 6], "legal", "yes", "2 oz in public and no limit at home; six mature plants per adult, twelve per household. Shops and licensed consumption areas."),
      u("ny", "New York", [6, 4, 6, 5, 6, 6], "legal", "yes", "3 oz on you and 5 lb at home; six plants per adult. Uniquely, smoking cannabis is allowed almost anywhere tobacco smoking is."),
      u("nc", "North Carolina", [2, 1, 3, 1, 1, 0], "decrim", "no", "Up to ½ oz is a misdemeanour punished by a fine of up to $200 with no jail. No medical programme; the only legal shop is on Cherokee tribal land."),
      u("nd", "North Dakota", [2, 1, 3, 1, 1, 3], "decrim", "yes", "Up to ½ oz is an infraction with a fine. Medical cannabis is available; voters rejected legalisation in 2018, 2022 and 2024."),
      u("oh", "Ohio", [5, 4, 6, 5, 3, 6], "legal", "yes", "2.5 oz and six plants per adult, twelve per household. Licensed shops since August 2024; lawmakers have since tightened rules on public use."),
      u("ok", "Oklahoma", [1, 1, 2, 1, 1, 3], "illegal", "yes", "Without a card, possession is a misdemeanour. But the medical programme has no list of qualifying conditions and is among the easiest to join; patients may grow six mature plants."),
      u("or", "Oregon", [6, 4, 6, 5, 3, 6], "legal", "yes", "2 oz in public and 8 oz at home; four plants per household. Licensed shops since 2015."),
      u("pa", "Pennsylvania", [1, 1, 2, 1, 1, 3], "illegal", "yes", "30 g or less is a misdemeanour with up to 30 days in jail, cut to a small fine in Philadelphia, Pittsburgh and other cities. A large medical programme operates."),
      u("ri", "Rhode Island", [6, 4, 6, 5, 3, 6], "legal", "yes", "1 oz in public and 10 oz at home; three mature plants. Licensed shops since December 2022."),
      u("sc", "South Carolina", [1, 0, 2, 0, 1, 0], "illegal", "no", "1 oz or less is a misdemeanour with up to 30 days in jail. No medical programme."),
      u("sd", "South Dakota", [1, 1, 2, 1, 0, 3], "illegal", "yes", "Up to 2 oz is a misdemeanour with up to a year in jail, and ingesting cannabis is itself an offence. Medical cannabis is available to card holders."),
      u("tn", "Tennessee", [1, 0, 1, 0, 1, 0], "illegal", "no", "½ oz or less is a misdemeanour with up to a year in jail. Only low-THC oil is permitted for a few conditions."),
      u("tx", "Texas", [1, 0, 2, 0, 1, 1], "illegal", "limited", "2 oz or less is a misdemeanour with up to 180 days in jail; several cities no longer enforce it. A restricted low-THC medical programme was widened in 2025."),
      u("ut", "Utah", [1, 1, 2, 1, 1, 3], "illegal", "yes", "Under 1 oz is a misdemeanour with up to six months in jail. Medical cannabis is sold through licensed pharmacies; smoking it is not allowed."),
      u("vt", "Vermont", [5, 4, 6, 5, 3, 6], "legal", "yes", "1 oz and two mature plus four immature plants per household. The first state to legalise through its legislature; shops since 2022."),
      u("va", "Virginia", [5, 4, 6, 5, 3, 3], "legal", "yes", "1 oz and four plants per household have been legal since 2021, but adult-use shops were repeatedly vetoed. Medical dispensaries are the only legal place to buy."),
      u("wa", "Washington", [5, 1, 6, 4, 3, 6], "legal", "yes", "1 oz is legal and shops have operated since 2014, but only medical patients may grow; for everyone else it is a felony."),
      u("wv", "West Virginia", [1, 1, 2, 1, 1, 3], "illegal", "yes", "Possession carries 90 days to six months in jail, with conditional discharge for a first offence. Medical dispensaries serve card holders; no flower smoking."),
      u("wi", "Wisconsin", [1, 0, 2, 0, 1, 0], "illegal", "no", "A first offence is a misdemeanour with up to six months in jail; a second is a felony. No medical programme, though Madison and Milwaukee impose only small fines."),
      u("wy", "Wyoming", [1, 0, 1, 0, 0, 0], "illegal", "no", "Up to 3 oz is a misdemeanour with up to a year in jail, and being under the influence is a separate offence. No medical programme."),
    ],
  },

  CA: {
    label: "Province or territory",
    plural: "provinces and territories",
    intro: "The federal Cannabis Act applies everywhere in Canada. Provinces and territories set the minimum age, where you may consume, how shops work, and whether you may grow at home.",
    sources: [
      ["Department of Justice Canada — Cannabis legalization and regulation", "https://www.justice.gc.ca/eng/cj-jp/cannabis/"],
      ["Health Canada — Cannabis laws and regulations", "https://www.canada.ca/en/health-canada/services/drugs-medication/cannabis/laws-regulations.html"],
    ],
    units: [
      u("ab", "Alberta", [6, 4, 6, 5, 6, 6], "legal", "yes", "Minimum age 18, the lowest in Canada. Private shops; consumption allowed where tobacco is, subject to city by-laws."),
      u("bc", "British Columbia", [6, 4, 6, 5, 6, 6], "legal", "yes", "Age 19. Public and private shops; smoking generally allowed where tobacco is, except around children."),
      u("mb", "Manitoba", [6, 4, 6, 5, 3, 6], "legal", "yes", "Age 19. Private shops. Home growing was banned until May 2025; public consumption is prohibited."),
      u("nb", "New Brunswick", [6, 4, 6, 5, 3, 6], "legal", "yes", "Age 19. Government-run Cannabis NB plus some private shops; consumption only in private."),
      u("nl", "Newfoundland and Labrador", [6, 4, 6, 5, 3, 6], "legal", "yes", "Age 19. Private licensed shops; consumption only in private residences."),
      u("ns", "Nova Scotia", [6, 4, 6, 5, 5, 6], "legal", "yes", "Age 19. Sold through the provincial liquor corporation; smoking follows tobacco rules."),
      u("nt", "Northwest Territories", [6, 4, 6, 5, 4, 6], "legal", "yes", "Age 19. Government-run sales; communities may restrict or ban cannabis locally."),
      u("nu", "Nunavut", [6, 4, 6, 5, 3, 6], "legal", "yes", "Age 19. Sales mostly online through the territorial agency, with few physical shops."),
      u("on", "Ontario", [6, 4, 6, 5, 6, 6], "legal", "yes", "Age 19. The largest private retail market in the country; smoking allowed almost anywhere tobacco is."),
      u("pe", "Prince Edward Island", [6, 4, 6, 5, 3, 6], "legal", "yes", "Age 19. Government-run shops only; consumption limited to private residences."),
      u("qc", "Quebec", [5, 1, 6, 5, 3, 5], "legal", "yes", "The strictest province: age 21, no home growing, a 150 g cap at home, no public consumption, and sales only through the state-run SQDC with a narrower product range."),
      u("sk", "Saskatchewan", [6, 4, 6, 5, 3, 6], "legal", "yes", "Age 19. Private shops; consumption in public places is prohibited."),
      u("yt", "Yukon", [6, 4, 6, 5, 3, 6], "legal", "yes", "Age 19. Private shops supplied by the territorial corporation; consumption in private only."),
    ],
  },

  AU: {
    label: "State or territory",
    plural: "states and territories",
    intro: "Each Australian state and territory has its own drug law. Medical cannabis is regulated federally and is available on prescription everywhere, mostly through telehealth clinics.",
    sources: [
      ["Wikipedia — Cannabis in Australia", "https://en.wikipedia.org/wiki/Cannabis_in_Australia"],
      ["The Conversation — ACT cannabis laws come into effect", "https://theconversation.com/act-cannabis-laws-come-into-effect-on-friday-but-they-may-not-be-what-you-hoped-for-130050"],
    ],
    units: [
      u("act", "Australian Capital Territory", [5, 3, 6, 1, 3, 3], "legal", "yes", "Since 2020 adults may hold 50 g of dried cannabis and grow two plants each, four per household. Selling, gifting and even buying seeds remain illegal."),
      u("nsw", "New South Wales", [2, 1, 3, 1, 1, 3], "illegal", "yes", "Police may issue a caution for up to 15 g, at most twice; otherwise possession is an offence with up to two years."),
      u("nt", "Northern Territory", [3, 2, 4, 1, 2, 3], "decrim", "yes", "Up to 50 g, or two plants at home, is dealt with by an infringement notice and a fine rather than a charge."),
      u("qld", "Queensland", [2, 1, 4, 1, 1, 3], "illegal", "yes", "Police must offer a warning or a diversion programme for small amounts before charging, under a scheme expanded in 2024."),
      u("sa", "South Australia", [3, 2, 4, 1, 2, 3], "decrim", "yes", "The first Australian state to decriminalise, in 1987: small amounts and one non-hydroponic plant are an expiation notice with a fine."),
      u("tas", "Tasmania", [2, 1, 3, 1, 1, 3], "illegal", "yes", "Police may caution for up to 50 g, up to three times in ten years; otherwise it is a criminal offence."),
      u("vic", "Victoria", [2, 1, 3, 1, 1, 3], "illegal", "yes", "A cannabis cautioning programme covers up to 50 g for people who admit the offence; otherwise possession is prosecuted."),
      u("wa", "Western Australia", [2, 1, 3, 1, 1, 3], "illegal", "yes", "Up to 10 g leads to a one-off intervention session instead of a charge; beyond that it is a criminal offence."),
    ],
  },
};

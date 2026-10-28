# Expansion batch, 28 October 2026 — Asia 6

Chosen from `country-gaps.cjs --rank 25 --region Asia`. The batch is North Korea, Abkhazia,
Türkiye, Singapore and Mongolia: the five highest-ranked Asian profiles not already covered by
the earlier Asia batches. None was marked busy.

| Country | Done | Left | Commit |
|---|---|---|---|
| North Korea | status corrected from death to illegal; 2003 law sourced; missing sections and tables; 7 history entries | no cannabis-specific penalty, prosecution or execution found | this commit |
| Abkhazia | in progress | | |
| Türkiye | citations, products folded, 2005 supply step, 2016 access step, 9 history entries | no domestic medical product verified | this commit |
| Singapore | in progress | | |
| Mongolia | in progress | | |

North Korea validation: `profile-audit kp` zero errors and warnings. The profile now changes `recreational` from `death` to `illegal`, because the capital tiers cover large-scale narcotics manufacture and trafficking but no cannabis quantity, prosecution or execution is documented. It corrects the listing to the 2003 Narcotics Control Law, adds possession, cultivation, trafficking, planting, driving, black-market and arrest sections and penalty tables, and replaces the 1925 estimate with an estimate between 1948 and 2003. Seven entries cover 1980–2024; the 1930s–1970s and 1990s remain empty because no cannabis-specific event was verified.

Türkiye validation: `profile-audit tr` zero errors and warnings. Every segment and context text now carries inline citations; the products block is folded into medical and hemp. The profile adds the 2005 Penal Code supply step (sharing 1→0) and the 2016 overseas-medicine listing (access 0→1), so the index stays at 11. It corrects the medical route (import-only; no domestic stock verified), the 0.3% product line, the drug-driving trigger (consumption, not zero), seed/clone trade status, deportation consequences and the 2024/2025 enforcement figures. Nine entries cover 1926–2026.

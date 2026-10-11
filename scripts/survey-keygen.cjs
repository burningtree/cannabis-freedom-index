// Makes the project's Nostr key pair for the survey:  node scripts/survey-keygen.cjs
// The public key goes into survey/<year>.yaml. The secret key is printed once, here, and nowhere
// else: store it offline. Whoever holds it can read every answer.
const { generateSecretKey, getPublicKey } = require("nostr-tools/pure");
const sk = generateSecretKey();
console.log(`public key (for survey/<year>.yaml, nostr.pubkey):\n  ${getPublicKey(sk)}\n\nsecret key (SURVEY_SECRET_KEY for survey-collect.cjs; keep it offline):\n  ${Buffer.from(sk).toString("hex")}`);

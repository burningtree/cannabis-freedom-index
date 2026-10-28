// A broken reference between the data files (an article without its history entry, a link to an
// entry that is not there). A build stops on it, and `npm test` names it first
// (scripts/history-links.test.cjs). The dev server only warns and leaves the reference out, so
// that one agent's half-saved work does not take the site down for everyone else working here.
const warned = new Set();
export function broken(message) {
  if (!import.meta.env.DEV) throw new Error(message);
  if (!warned.has(message)) { warned.add(message); console.warn(`[data] ${message} (left out in dev; a build stops here)`); }
}

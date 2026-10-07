// Site-wide switches, read from the environment at build time.

// Flower prices are still incomplete (see prices.yaml), so they are hidden from the interface
// unless PUBLIC_SHOW_PRICES=true is set: the map's price colouring, the rankings column, the
// country price panel, the compare rows and the download card. Set it in a local .env file (see
// .env.example); the production deploy does not set it, so prices stay hidden there.
export const SHOW_PRICES = import.meta.env.PUBLIC_SHOW_PRICES === "true";

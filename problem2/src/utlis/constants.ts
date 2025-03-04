export type Token = {
  currency: string;
  date: string;
  price: number;
  imageUrl?: string;
};
// Base URL for token icons from Switcheo GitHub repository
const BASE_TOKEN_ICON_URL = 'https://raw.githubusercontent.com/Switcheo/token-icons/main/tokens/';

// Helper function to generate token image URL
const getTokenImageUrl = (currency: string): string => {
  return `${BASE_TOKEN_ICON_URL}${currency}.svg`;
};

export const TOKENS: Token[] = [
  {
    currency: "BLUR",
    date: "2023-08-29T07:10:40.000Z",
    price: 0.20811525423728813,
    imageUrl: getTokenImageUrl("BLUR"),
  },
  { 
    currency: "bNEO", 
    date: "2023-08-29T07:10:50.000Z", 
    price: 7.1282679,
    imageUrl: getTokenImageUrl("bNEO"),
  },
  { 
    currency: "BUSD", 
    date: "2023-08-29T07:10:40.000Z", 
    price: 0.999183113,
    imageUrl: getTokenImageUrl("BUSD"),
  },
  {
    currency: "BUSD",
    date: "2023-08-29T07:10:40.000Z",
    price: 0.9998782611186441,
    imageUrl: getTokenImageUrl("BUSD"),
  },
  { 
    currency: "USD", 
    date: "2023-08-29T07:10:30.000Z", 
    price: 1,
    imageUrl: getTokenImageUrl("USD"),
  },
  {
    currency: "ETH",
    date: "2023-08-29T07:10:52.000Z",
    price: 1645.9337373737374,
    imageUrl: getTokenImageUrl("ETH"),
  },
  {
    currency: "GMX",
    date: "2023-08-29T07:10:40.000Z",
    price: 36.345114372881355,
    imageUrl: getTokenImageUrl("GMX"),
  },
  {
    currency: "STEVMOS",
    date: "2023-08-29T07:10:40.000Z",
    price: 0.07276706779661017,
    imageUrl: getTokenImageUrl("STEVMOS"),
  },
  {
    currency: "LUNA",
    date: "2023-08-29T07:10:40.000Z",
    price: 0.40955638983050846,
    imageUrl: getTokenImageUrl("LUNA"),
  },
  {
    currency: "RATOM",
    date: "2023-08-29T07:10:40.000Z",
    price: 10.250918915254237,
    imageUrl: getTokenImageUrl("RATOM"),
  },
  {
    currency: "STRD",
    date: "2023-08-29T07:10:40.000Z",
    price: 0.7386553389830508,
    imageUrl: getTokenImageUrl("STRD"),
  },
  {
    currency: "EVMOS",
    date: "2023-08-29T07:10:40.000Z",
    price: 0.06246181355932203,
    imageUrl: getTokenImageUrl("EVMOS"),
  },
  {
    currency: "IBCX",
    date: "2023-08-29T07:10:40.000Z",
    price: 41.26811355932203,
    imageUrl: getTokenImageUrl("IBCX"),
  },
  {
    currency: "IRIS",
    date: "2023-08-29T07:10:40.000Z",
    price: 0.0177095593220339,
    imageUrl: getTokenImageUrl("IRIS"),
  },
  {
    currency: "ampLUNA",
    date: "2023-08-29T07:10:40.000Z",
    price: 0.49548589830508477,
    imageUrl: getTokenImageUrl("ampLUNA"),
  },
  { 
    currency: "KUJI", 
    date: "2023-08-29T07:10:45.000Z", 
    price: 0.675,
    imageUrl: getTokenImageUrl("KUJI"),
  },
  { 
    currency: "STOSMO", 
    date: "2023-08-29T07:10:45.000Z", 
    price: 0.431318,
    imageUrl: getTokenImageUrl("STOSMO"),
  },
  { 
    currency: "USDC", 
    date: "2023-08-29T07:10:40.000Z", 
    price: 0.989832,
    imageUrl: getTokenImageUrl("USDC"),
  },
  { 
    currency: "axlUSDC", 
    date: "2023-08-29T07:10:40.000Z", 
    price: 0.989832,
    imageUrl: getTokenImageUrl("axlUSDC"),
  },
  {
    currency: "ATOM",
    date: "2023-08-29T07:10:50.000Z",
    price: 7.186657333333334,
    imageUrl: getTokenImageUrl("ATOM"),
  },
  {
    currency: "STATOM",
    date: "2023-08-29T07:10:45.000Z",
    price: 8.512162050847458,
    imageUrl: getTokenImageUrl("STATOM"),
  },
  {
    currency: "OSMO",
    date: "2023-08-29T07:10:50.000Z",
    price: 0.3772974333333333,
    imageUrl: getTokenImageUrl("OSMO"),
  },
  { 
    currency: "rSWTH", 
    date: "2023-08-29T07:10:40.000Z", 
    price: 0.00408771,
    imageUrl: getTokenImageUrl("rSWTH"),
  },
  {
    currency: "STLUNA",
    date: "2023-08-29T07:10:40.000Z",
    price: 0.44232210169491526,
    imageUrl: getTokenImageUrl("STLUNA"),
  },
  {
    currency: "LSI",
    date: "2023-08-29T07:10:50.000Z",
    price: 67.69661525423729,
    imageUrl: getTokenImageUrl("LSI"),
  },
  {
    currency: "OKB",
    date: "2023-08-29T07:10:40.000Z",
    price: 42.97562059322034,
    imageUrl: getTokenImageUrl("OKB"),
  },
  {
    currency: "OKT",
    date: "2023-08-29T07:10:40.000Z",
    price: 13.561577966101694,
    imageUrl: getTokenImageUrl("OKT"),
  },
  {
    currency: "SWTH",
    date: "2023-08-29T07:10:45.000Z",
    price: 0.004039850455012084,
    imageUrl: getTokenImageUrl("SWTH"),
  },
  { 
    currency: "USC", 
    date: "2023-08-29T07:10:40.000Z", 
    price: 0.994,
    imageUrl: getTokenImageUrl("USC"),
  },
  { 
    currency: "USDC", 
    date: "2023-08-29T07:10:30.000Z", 
    price: 1,
    imageUrl: getTokenImageUrl("USDC"),
  },
  { 
    currency: "USDC", 
    date: "2023-08-29T07:10:30.000Z", 
    price: 1,
    imageUrl: getTokenImageUrl("USDC"),
  },
  {
    currency: "USDC",
    date: "2023-08-29T07:10:40.000Z",
    price: 0.9998782611186441,
    imageUrl: getTokenImageUrl("USDC"),
  },
  {
    currency: "WBTC",
    date: "2023-08-29T07:10:52.000Z",
    price: 26002.82202020202,
    imageUrl: getTokenImageUrl("WBTC"),
  },
  {
    currency: "wstETH",
    date: "2023-08-29T07:10:40.000Z",
    price: 1872.2579742372882,
    imageUrl: getTokenImageUrl("wstETH"),
  },
  {
    currency: "YieldUSD",
    date: "2023-08-29T07:10:40.000Z",
    price: 1.0290847966101695,
    imageUrl: getTokenImageUrl("YieldUSD"),
  },
  {
    currency: "ZIL",
    date: "2023-08-29T07:10:50.000Z",
    price: 0.01651813559322034,
    imageUrl: getTokenImageUrl("ZIL"),
  },
];

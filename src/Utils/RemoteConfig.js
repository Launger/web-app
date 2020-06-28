import firebase from "firebase/app";
import "firebase/remote-config";

const remoteConfig = firebase.remoteConfig();
remoteConfig.settings = {
  minimumFetchIntervalMillis: 3600000,
};

const restIDs = [
  "d27154EFDbCa05654074E41a8d542b53", // Classic
  "3D3513ab7E817905b335e80860fB91f2", // r/funny
  "Ee0Dff7436cD4009676a908cEfD6cd5C", // Trending
  "2870eC15aF3227b9eF2eC593Ddc6D885", // Random Memes
  "1d9fE1cfbEE45b15edba3fBd5b528F7B", // Random
  "156A10374Ee14720c416DB5D9c38D91e", // TikTok Trending
  "Aa1B87eb3d0Ccd6c77A4D82b93958e39", // Today's Funniest
  "123F49562D1e7dC10b3B255F0969D29d", // Gaming
  "Cbc849c7E7f700316F0fE317F1AbCe21", // r/Memes
  "39C1FFF780a0a1097D8548aBCb4Ddb02", // TikTok Discover
  "9005d84E32Ffb03b188EaDe0B772B132", // Give Feedback
  "a0Ec11DE3517514ff7eb7126518783BD", // r/dankmemes
  "5e41d18741293dF1228Dfcf47cB5D81c", // TikTok Random
  "BFfb93102323A036Fc337Bf729403bA2", // Top Stories
  "F8929a4a2d38df15B25f68272cA0945D", // r/AdviceAnimals
  "73bC525b1A46B05B6203457F995d728E", // Hotlist
  "4e503848bCbb08237C852eE6eaE53B1C", // r/ComedyCemetery
  "E51c2C6cCfC8276Ec9dFb9fA664c8E92", // Hot New Trailers
  "2e974F8BDBfa97dDcF12E7525b174C99", // r/PewdiepieSubmissions
  "05a8abdb4300A426E3BfF7e1667c3EA7", // Top Stories
  "225fdea134E228C90Ee112b4A1CFEda6", // r/terriblefacebookmemes
  "957ac555dAC74B637B07b792A081C769", // Charitable
  "7167D1eb5A5e7a94bf48246A27ea7fe8", // Learn New Things
  "4048Ef5e661E3B5248c1658E08540A0d", // Talk Shows
  "6eE0F88ef7bDc873991E47EeD84Af01a", // Liked & Shared
  "b5492f1C4aCFCBeE0856275d291736ec", // New tech
  // "1d330b7D106021FAEA32f81469faCB83", // Today's top
  // "0FA0568607feDe5de32D83e297F28f49", // Look Good, Feel Good
  // "30a55BA55827E87706dfD5941D6B034F", // Popular
  // "Dd47Da79cc41A0474A0cFc8F5394a05E", // Live Now
  // "082b1Fe4b793f5b254322414CBf5D8e9", // Today's Hits
  // "8Ef428e74790C7fa1b9A7CfC4B7Fb180", // Pop Hotlist
  // "A8E7336595c0b2790003dc49ac7Dd2ed", // Top US
  // "178e5AB605baEc9c20821fB0F838146e", // Top Global
  // "D87ff4D809D8F30BE320B550179dCc80", // Top Videos
  // "6492F5db6Fcd0d0e003C37E5e067f4b1", // Trending 20
  // "F394B4518af54D3289Ae063Db2b97F59", // Just Released
  // "833FD9411883E3a4861C758640EeB386", // Released
  // "9DeF093A0FD78581170Ef50ad1504cFb", // Highlights
  // "a07eC28ADF53601C643A9fee22581218", // Live now
  // "Ee45526bf6C9d56fF4b55bbF4CDB16D2", // Live News // FIXME: Remove or fix
  // "625E64210ec0e28131fE993299cE2954", // Custom YouTube Link
];

const baseConfig = {
  welcomeText: "Work smarter,\nnot harder!",
  welcomeSubText: "Be more productive than ever whilst still procrastinating",
  restIDs: JSON.stringify(restIDs),
};

remoteConfig.defaultConfig = {
  ...baseConfig,
};

export default remoteConfig;
export { baseConfig };

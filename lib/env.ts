export function getDatabaseConfig() {
  const provider = process.env.DATABASE_PROVIDER || "mongodb";
  if (provider === "mongodb") {
    return {
      provider,
      uri: process.env.MONGODB_URI || "mongodb://localhost:27017",
      dbName: process.env.MONGODB_DB || "nextgenecommerce",
    };
  }
  throw new Error(`Unsupported database provider: ${provider}`);
}

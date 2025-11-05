import {Collection, Db, MongoClient, ObjectId} from "mongodb";


const MONGODB_URL = process.env.MONGODB_URL || "mongodb://localhost:27017";
const MONGODB_DB = process.env.MONGODB_DB || "nextgenecommerce";

if(!MONGODB_URL) {
  throw new Error (
   "Please define the MONGODB_URI environment variable inside .env"
  );
}
if (!MONGODB_DB) {
  throw new Error(
     "Please define the MONGODB_URI environment variable inside .env"
  );
}
let cachedClient: MongoClient | null = null;
let cachedDb : Db | null = null;

export async function connectToDatabase():
Promise<{
  client: MongoClient; db:Db
}> {
  if(cachedClient && cachedDb) {
    return {client: cachedClient, db:cachedDb}
  }
  try {
    const client = new MongoClient(MONGODB_URL, {
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 5000,
      maxPoolSize: 10,
    });
    await client.connect();
    const db = client.db(MONGODB_DB);

    cachedClient = client;
    cachedDb = db;
    console.log("✅ Connected to MongoDB successfully");
    return { client, db };
  } catch (error) {
    console.error("❌ Failed to connect to MongoDB", error);
    throw error;
  }
}

export async function getCollection<T>(name: string): Promise<Collection<T>> {
  const { db } = await connectToDatabase();
  return db.collection<T>(name);
}
export function closeConnection(): void {
  if (cachedClient) {
    cachedClient.close();
    cachedClient = null;
    cachedDb = null;
    console.log("🔒 MongoDB connection closed");
  }
}

export class MongoDBService {
  public db: Db;
  constructor(db: Db) {
    this.db = db;
  }

  //CRUD

  async create<T>(collectionName: string, data: Partial<T>): Promise<T> {
    try {
      const collection = this.db.collection<T>(collectionName);
      const result = await collection.insertOne(data as any);
      return { ...data, _id: result.insertedId } as T;
    } catch (error) {
      console.error("Error creating document:", error);
      throw error;
    }
  }

  async findById<T>(collectionName: string, id: string): Promise<T | null> {
    try {
      const collection = this.db.collection<T>(collectionName);
      return await collection.findOne({ _id: new ObjectId(id) } as any);
    } catch (error) {
      console.error("Error finding document by ID:", error);
      throw error;
    }
  }

  async findMany<T>(
    collectionName: string,
    filter: any = {},
    options: { limit?: number; skip?: number; sort?: any } = {}
  ): Promise<T[]> {
    try {
      const collection = this.db.collection<T>(collectionName);
      let query = collection.find(filter);

      if (options.sort) {
        query = query.sort(options.sort);
      }
      if (options.skip) {
        query = query.skip(options.skip);
      }
      if (options.limit) {
        query = query.limit(options.limit);
      }

      return await query.toArray();
    } catch (error) {
      console.error(`Error finding documents in ${collectionName}:`, error);
      return [];
    }
  }


}

export async function getMongoDBService(): Promise<MongoDBService> {
  const { db } = await connectToDatabase();
  return new MongoDBService(db);
}

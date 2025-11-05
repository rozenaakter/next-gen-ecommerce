import { COLLECTIONS } from "@/types/mongodb";
import { getMongoDBService, MongoDBService } from "./mongodb";
import { getDatabaseConfig } from "./env";

interface DatabaseAdapter {
  // user-related methods
  //   createUser(data: any): Promise<any>;
  //   getUserById(id: string): Promise<any>;
  //   getUserByEmail(email: string): Promise<any>;
  //   updateUser(id: string, data: any): Promise<any>;
  //   deleteUser(id: string): Promise<void>;

  // order-related methods
  createOrder(data: any): Promise<any>;
  getOrderById(id: string): Promise<any>;
  //   getOrdersByUserId(userId: string): Promise<any[]>;
  //   updateOrder(id: string, data: any): Promise<any>;
  //   deleteOrder(id: string): Promise<void>;
}
class MongoDBAdapter implements DatabaseAdapter {
   private service: MongoDBService | null = null;
  private async getService() {
    if (!this.service) {
      this.service = await getMongoDBService();
    }
    return this.service;
  }
  private convetDoc(doc: any) {
    return {
      ...doc,
      id: doc._id.toString(),
    };
  }

  // create orders related methods
  async createOrder(data: any): Promise<any> {
    const service = await this.getService();
    const created = await service.create(COLLECTIONS.ORDERS, {
      ...data,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    return this.convetDoc(created);
  }
  async getOrderById(id: string): Promise<any> {
    const service = await this.getService();
    const order = await service.findById(COLLECTIONS.ORDERS, id);
    return order ? this.convetDoc(order) : null;
  }

}

export function createDatabaseAdapter(): DatabaseAdapter {
  const config = getDatabaseConfig();
  if (config.provider === "mongodb") {
    return new MongoDBAdapter();
  }
  throw new Error(`Unsupported database provider: ${config.provider}`);
}
export const dbAdapter = createDatabaseAdapter();
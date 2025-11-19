import { COLLECTIONS } from "@/types/mongodb";
import { getDatabaseConfig } from "./env";
import { getMongoDBService, MongoDBService } from "./mongodb";

interface DatabaseAdapter {
  createUser(data: any): Promise<any>;
  getUserById(id: string): Promise<any>;
  getUserByEmail(email: string): Promise<any>;
  updateUser(id: string, data: any): Promise<any>;
  deleteUser(id: string): Promise<void>;

  createOrder(data: any): Promise<any>;
  getOrderById(id: string): Promise<any>;

  // products
  createProduct(data: any): Promise<any>;
  getProductById(id: string): Promise<any>;
  getProductBySlug(slug: string): Promise<any>;
  getProducts(filter?: any, options?: any): Promise<any[]>;
  updateProduct(id: string, data: any): Promise<any>;
  deleteProduct(id: string): Promise<boolean>;
  checkProductHasOrders(productId: string): Promise<boolean>;
}

class MongoDBAdapter implements DatabaseAdapter {
  private service: MongoDBService | null = null;

  private async getService() {
    if (!this.service) {
      this.service = await getMongoDBService();
    }
    return this.service;
  }

  private convertDoc(doc: any) {
    if (!doc) return null; // 💥 prevents reading _id on undefined
    return {
      ...doc,
      id: doc._id ? doc._id.toString() : undefined,
    };
  }

  // ---------- User methods ----------
  async createUser(data: any) {
    const service = await this.getService();
    const result = await service.create(COLLECTIONS.USERS, {
      ...data,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    return this.convertDoc(result);
  }

  async getUserById(id: string) {
    const service = await this.getService();
    const user = await service.findById(COLLECTIONS.USERS, id);
    return this.convertDoc(user);
  }

  async getUserByEmail(email: string) {
    const service = await this.getService();
    const users = await service.findMany(COLLECTIONS.USERS, { email });
    if (!users || users.length === 0) {
      return null; // 💥 ensure we return null if no match
    }
    return this.convertDoc(users[0]);
  }

  async updateUser(id: string, data: any) {
    const service = await this.getService();
    const result = await service.updateOne(COLLECTIONS.USERS, id, {
      ...data,
      updatedAt: new Date(),
    });
    return this.convertDoc(result);
  }

  async deleteUser(id: string): Promise<void> {
    const service = await this.getService();
    await service.deleteOne(COLLECTIONS.USERS, id);
  }

  // ---------- Order methods ----------
  async createOrder(data: any): Promise<any> {
    const service = await this.getService();
    const created = await service.create(COLLECTIONS.ORDERS, {
      ...data,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    return this.convertDoc(created);
  }

  async getOrderById(id: string): Promise<any> {
    const service = await this.getService();
    const order = await service.findById(COLLECTIONS.ORDERS, id);
    return order ? this.convertDoc(order) : null;
  }
  // products
  async createProduct(data: any) {
    const service = await this.getService();
    const result = await service.create(COLLECTIONS.PRODUCTS, {
      ...data,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    return this.convertDoc(result);
  }
  async getProductById(id: string) {
    const service = await this.getService();
    const product = await service.findById(COLLECTIONS.PRODUCTS, id);
    return this.convertDoc(product);
  }
  async getProductBySlug(slug: string) {
    const service = await this.getService();
    const products = await service.findMany(COLLECTIONS.PRODUCTS, { slug });
    return this.convertDoc(products[0]);
  }
  async getProducts(filter: any = {}, options: any = {}) {
    const service = await this.getService();
    const products = await service.findMany(
      COLLECTIONS.PRODUCTS,
      filter,
      options
    );
    return products.map((doc) => this.convertDoc(doc));
  }
  async updateProduct(id: string, data: any) {
    const service = await this.getService();
    const result = await service.updateOne(COLLECTIONS.PRODUCTS, id, {
      ...data,
      updatedAt: new Date(),
    });
    return this.convertDoc(result);
  }
  async deleteProduct(id: string): Promise<boolean> {
    const service = await this.getService();
    return await service.deleteOne(COLLECTIONS.PRODUCTS, id);
  }
  // ✅ NEW: Check if product has orders
  async checkProductHasOrders(productId: string): Promise<boolean> {
    const service = await this.getService();

    // Check if there are any order items with this product
    const orderItems = await service.findMany(COLLECTIONS.ORDER_ITEMS, {
      productId,
    });

    return orderItems.length > 0;
  }
  //category
  async createCategory(data: any) {
    const service = await this.getService();
    const result = await service.create(COLLECTIONS.CATEGORIES, {
      ...data,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    return this.convertDoc(result);
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

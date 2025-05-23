import { Storage } from './storage';

interface KVNamespace {
  get(key: string): Promise<any>;
  put(key: string, value: any): Promise<void>;
}

export class CloudflareKVStorage implements Storage {
  private namespace: KVNamespace;

  constructor(namespace: KVNamespace) {
    this.namespace = namespace;
    console.log('Storage System: Using Cloudflare KV storage mode.');
  }

  async getData(key: string): Promise<any> {
    try {
      const value = await this.namespace.get(key);
      return value ? JSON.parse(value) : null;
    } catch (error: any) {
      console.error(`Error fetching data from Cloudflare KV for key: ${key}`, error.message);
      throw error;
    }
  }

  async saveData(key: string, data: any): Promise<void> {
    try {
      await this.namespace.put(key, JSON.stringify(data));
    } catch (error: any) {
      console.error(`Error saving data to Cloudflare KV for key: ${key}`, error.message);
      throw error;
    }
  }
}
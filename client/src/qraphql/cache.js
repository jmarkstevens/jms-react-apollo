import { InMemoryCache } from "apollo-cache-inmemory";

let instance = null;
export default class Cache{
  constructor() {
    if (!instance) instance = this;
    this.cache = new InMemoryCache();
    return instance;
  }
}

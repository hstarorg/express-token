const tokenMap = new Map();

class MemoryStore {
  constructor(options) {
    this._options = options;
  }

  _getExpires() {
    return Date.now() + this._options.ttl;
  }

  set(key, value) {
    let expires = this._getExpires();
    let data = { expires, value };
    tokenMap.set(key, data);
    return Promise.resolve(key);
  }

  get(key) {
    let data = tokenMap.get(key);
    if (!data || data.expires < Date.now()) {
      return Promise.resolve(null);
    }
    this.set(key, data.value);
    return Promise.resolve(data.value);
  }

  remove(key) {
    tokenMap.delete(key);
    return Promise.resolve();
  }

  clear() {
    tokenMap.clear();
    return Promise.resolve();
  }

  length() {
    return tokenMap.size;
  }
}

module.exports = MemoryStore;

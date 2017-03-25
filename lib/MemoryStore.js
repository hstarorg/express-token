const tokenMap = new Map();

class MemoryStore {
  constructor(options) {
    this._options = options;
  }

  set(key, value) {
    tokenMap.set(key, value);
    return Promise.resolve();
  }

  get(key) {
    let data = tokenMap.get(key);
    return Promise.resolve(data);
  }

  remove(key) {
    tokenMap.delete(key);
    return Promise.resolve();
  }

  clear() {
    tokenMap.clear();
    return Promise.resolve();
  }
}

module.exports = MemoryStore;

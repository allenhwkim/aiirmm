export class Storage {
  // static storage: any = (window as any).sessionStorage;
  static storage: any = (window as any).localStorage;

  static getItem(key: string) {
    if (key.match(/^([a-z0-9]+)\[[\-0-9]+\]$/i)) { // array format e.g., formFlows[9]
      const [_, groupKey, index] = key.match(/^([a-z0-9]+)\[([\-0-9]+)\]$/i)
      const storageData = Storage.storage.getItem(groupKey);
      const storageObj = JSON.parse(storageData);
      return storageObj?.[index];
    } else if (key.match(/^([a-z0-9]+)\.([a-z0-9]+)/i)) { // key format formFlows.foo
      const [groupKey, itemKey] = key.split('.');
      const storageData = Storage.storage.getItem(groupKey);
      const storageObj = JSON.parse(storageData);
      return storageObj?.[itemKey];
    } else {
      const storageData = Storage.storage.getItem(key);
      const storageObj = JSON.parse(storageData);
      return storageObj;
    }
  }

  static setItem(key:string, data: any) {
    if (key.match(/^([a-z0-9]+)\[[\-0-9]+\]$/i)) { // array format e.g., formFlows[9]
      const [_, groupKey, index] = key.match(/^([a-z0-9]+)\[([\-0-9]+)\]$/i)
      const storageData = Storage.storage.getItem(groupKey);
      const storageObj = JSON.parse(storageData) || [];
      storageObj[index] = data;
      return Storage.storage.setItem(groupKey, JSON.stringify(storageObj));
    } else if (key.match(/^([a-z0-9]+)\.([a-z0-9]+)/i)) { // key format formFlows.foo
      const [groupKey, itemKey] = key.split('.');
      const storageData = Storage.storage.getItem(groupKey);
      const storageObj = storageData ? JSON.parse(storageData) : {};
      storageObj[itemKey] = data;
      return Storage.storage.setItem(groupKey, JSON.stringify(storageObj));
    } else {
      return Storage.storage.setItem(key, JSON.stringify(data));
    }
  }

  static removeItem(key: string) {
    if (key.match(/^([a-z0-9]+)\[[\-0-9]+\]$/i)) { // array format e.g., formFlows[9]
      const [_, groupKey, index] = key.match(/^([a-z0-9]+)\[([\-0-9]+)\]$/i)
      const storageData = Storage.storage.getItem(groupKey);
      const storageObj = JSON.parse(storageData) || [];
      storageObj.splice(index, 1);
      return Storage.storage.setItem(groupKey, JSON.stringify(storageObj));
    } else if (key.match(/^([a-z0-9]+)\.([a-z0-9]+)/i)) { // key format formFlows.foo
      const [groupKey, itemKey] = key.split('.');
      const storageData = Storage.storage.getItem(groupKey);
      const storageObj = JSON.parse(storageData);
      delete storageObj[itemKey];
      return Storage.storage.setItem(groupKey, JSON.stringify(storageObj));
    } else {
      return Storage.storage.removeItem(key);
    }
  }
}
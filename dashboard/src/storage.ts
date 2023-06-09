export class Storage {
  // static storage: any = (window as any).sessionStorage;
  static storage: any = (window as any).localStorage;

  static getItem(key: string) {
    const [groupKey, itemKey] = key.split('.');
    if (groupKey && itemKey) {
      const storageData = Storage.storage.getItem(groupKey);
      const storageObj = JSON.parse(storageData);
      return storageObj[itemKey];
    } else {
      const storageData = Storage.storage.getItem(key);
      const storageObj = JSON.parse(storageData);
      return storageObj;
    }
  }

  static setItem(key:string, data: any) {
    const [groupKey, itemKey] = key.split('.');
    if (groupKey && itemKey) {
      const storageData = Storage.storage.getItem(groupKey);
      const storageObj = storageData ? JSON.parse(storageData) : {};
      storageObj[itemKey] = data;
      const newStorageData = JSON.stringify(storageObj);
      return Storage.storage.setItem(groupKey, newStorageData);
    } else {
      return Storage.storage.setItem(groupKey, JSON.stringify(data));
    }
  }

  static removeItem(key) {
    const [groupKey, itemKey] = key.split('.');
    if (groupKey && itemKey) {
      const storageData = Storage.storage.getItem(groupKey);
      const storageObj = JSON.parse(storageData);
      delete storageObj[itemKey];
      const newStorageData = JSON.stringify(storageObj);
      return Storage.storage.setItem(groupKey, newStorageData);
    } else {
      return Storage.storage.removeItem(key);
    }
  }
}
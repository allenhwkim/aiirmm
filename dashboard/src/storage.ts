export class Storage {
  static storage: any = 'localStorage';
  static itemKey: string = 'formflow';

  static getAll() {
    const storageData = Storage.storage.getItem(Storage.itemKey);
    return JSON.parse(storageData);
  }

  static getItem(key: string) {
    const storageData = Storage.storage.getItem(Storage.itemKey);
    const storageObj = JSON.parse(storageData);

    return storageObj[key];
  }

  static setItem(key:string, data: any) {
    const storageData = Storage.storage.getItem(Storage.itemKey);
    const storageObj = JSON.parse(storageData);
    storageObj[key] = data;
    const newStorageData = JSON.stringify(storageObj);

    return Storage.storage.setItem(Storage.itemKey, newStorageData);
  }

}
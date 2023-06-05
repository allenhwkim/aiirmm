export class Storage {
  storage: any;
  defaultValue: any;
  constructor(storage: any, defaultVal: any) {
    this.storage = storage;
    this.defaultValue = defaultVal;
  }

  getItem(key: string) {
    return this.storage.getItem(key);
  }

  setItem(key:string, data: any) {
    return this.storage.setItem(key, data)
  }

  new =  () => this.defaultValue;
  open =  (key: string) => this.getItem(key);
  save = (key: string, value: any) => this.storage.setItem(key, value);
  saveAs = (key: string, value: any) => this.storage.setItem(key, value);
}
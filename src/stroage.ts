/**
 * window.sessionStorage alternative by proving
 *   set and get object as values instead of string
 *
 * Storage.getItem('foo', 'bar');
 * Storage.getItem('foo');
 * Storage.removeItem('foo', 'bar');
 * Storage.removeItem('foo');
 * Storage.setItem('foo', 'bar', {});
 * Storage.setItem('foo, {});
 */
export class Storage {

  static getItem(key: string, subKey?: string) {
    const storageData: any = sessionStorage.getItem(key);
    const storageObj = JSON.parse(storageData);
    return subKey ? storageObj?.[subKey] : storageObj;
  }

  static removeItem(key: string, subKey?: string) {
    const storageData: any = sessionStorage.getItem(key);
    const storageObj = JSON.parse(storageData) || [];
    if (subKey) {
      storageObj.splice(subKey, 1);
      return sessionStorage.setItem(key, JSON.stringify(storageObj));
    } else {
      return sessionStorage.removeItem(key);
    }
  }

  static setItem(...args) {
    if (args.length === 2) {
      const [key, value] = args;
      return sessionStorage.setItem(key, JSON.stringify(value));
    } if (args.length === 3) {
      const [key, subKey, value] = args;
      const storageData: any = sessionStorage.getItem(key);
      const storageObj = JSON.parse(storageData) || [];
      storageObj[subKey] = value;
      return sessionStorage.setItem(key, JSON.stringify(storageObj));
    }
  }

}

export default Storage;
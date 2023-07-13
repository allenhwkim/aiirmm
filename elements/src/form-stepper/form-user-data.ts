import { IUserData} from './types';

export class FormUserData {

  static getUserData() {
    const userDataJson = window.sessionStorage.getItem('form-user-data');
    return userDataJson ? JSON.parse(userDataJson) : null;
  }

  static setUserData(key: string, data?: { [key: string] : any }) : void { // update session storage dat 
    const formUserData: IUserData =  FormUserData.getUserData() || {};
    formUserData[key] = data;
    window.sessionStorage.setItem('form-user-data', JSON.stringify(formUserData));
    document.body.dispatchEvent(new CustomEvent('form-user-data', {bubbles: true, detail: formUserData}));
  } 

  static delete() {
    window.sessionStorage.removeItem('form-user-data');
  }
}

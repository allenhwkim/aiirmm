import { IForms, ISubmitData, IUserData } from "./types";

export const defaultSubmitData: ISubmitData = {
  method: 'POST',
  url: 'https://reqbin.com/echo/post/json',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json'
  },
  payload: function(formUserData: IUserData): any {
    return { id: 78912 };
  },
  onSuccess: function(resp: Response) {
    alert('form submission success');
  },
  onError: function(error: Response) {
    alert('form submission error');
  }
};

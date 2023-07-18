export interface IUserData {
  [key: string]: any; 
}

export interface ISubmit {
  type?: string;
  method: 'GET' | 'POST';
  url: string;
  headers?: {
    [key: string]: string;
  },
  payload: (userData: any) => any;
  onSuccess?: (resp: Response) => void;
  onError?: (resp: Response) => void;
  html?: string | (() => string);
  label?: string;
  title?: string;
  description?: string;
}

export interface IForm {
  type?: 'form' | 'submit' | 'review';
  url?: string;
  label?: string;
  title?: string;
  description?: string;
  html?: string | (() => string);
  skippable?: boolean;
  getErrors?: (formElData: any) => string[] | null;
}

export interface IForms {
  [key: string]: IForm | ISubmit;
}

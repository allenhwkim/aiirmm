export interface IUserData {
  [formName: string]: any; 
}

export interface IFormsSubmit {
  method: 'GET' | 'POST';
  url: string;
  headers?: {
    [key: string]: string;
  },
  payload: (userData: any) => any;
  onSuccess?: (resp: Response) => void;
  onError?: (resp: Response) => void;
  source?: string | (() => string);
  label?: string;
  title?: string;
  description?: string;
}

export interface IForm {
  type?: string;
  url?: string;
  label?: string;
  title?: string;
  description?: string;
  source?: string | (() => string);
  skippable?: boolean;
  getErrors?: (formElData: any) => string[] | null;
}

export interface IForms {
  [formName: string]: IForm | IFromSubmit;
}

export interface IUserData {
  [formName: string]: any; 
}

export interface IFormsSubmit {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE';
  url: string;
  headers: {
    [key: string]: string;
  },
  getData: (userData: any) => any;
  onSuccess: (resp: Response) => void;
  onError: (resp: Response) => void;
}

export interface IForm {
  type?: string;
  url?: string;
  label?: string;
  title?: string;
  description?: string;
  source?: string | (() => string);
  skippable?: boolean;
  getErrors?: (userData: IUserData) => string[];
}

export interface IForms {
  [formName: string]: IForm;
  submit?: IFormsSubmit;
}

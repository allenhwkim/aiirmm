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

export interface IForms {
  steps: string[];
  [formName: string]: {
    url?: string;
    label?: string;
    title?: string;
    description?: string;
    source?: string;
    skippable?: boolean;
    getErrors?: (userData: IUserData) => string[];
  } | any;
  submit?: IFormsSubmit;
}

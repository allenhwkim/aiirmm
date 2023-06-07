import { Storage } from './storage';

const DEFAULT_VALUE =  {
  reactflow: {
    nodes:[
      {id: 'start', type: 'start', deletable: false, position: { x: 100, y: 0 }},
      {id: '1', type: 'custom', data: {label: 'Hello'}, position: { x: 100, y: 100 }},
      {id: 'end', type: 'end', deletable: false, position: { x: 100, y: 200 }},
    ],
    edges: [
      {id: 'start-1', source: 'start', target: '1', type: 'custom'},
      {id: '1-end', source: '1', target: 'end', type: 'custom'},
    ]
  }
}

export class FormflowFile {
  storage: any;
  chartEl: any;
  saved = true;

  _data: any;
  get data() { return this._data; }
  set data(val) { 
    this._data = val; 
    this.chartEl?.setData(val);
    Storage.setItem('currentFormflow.data', val);
  }

  _name: any;
  get name() { return this._name; }
  set name(val) { 
    this._name = val; 
    Storage.setItem('currentFormflow.name', val);
  }

  constructor(chartEl) {
    this.chartEl = chartEl;
    if (Storage.getItem('currentFormflow')) {
      this.name = Storage.getItem('currentFormflow.name');
      this.data = Storage.getItem('currentFormflow.data');
    } else {
      this.name = 'Untitled';
      this.data = DEFAULT_VALUE;
    }
  }

  save() {
    if (this.name) {
      this.data = this.chartEl.getData();;
      console.log('this.data', this.data);
      Storage.setItem(`formflows.${this.name}`, this.data);
    }
  }

  saveAs(key: string) {
    this.name = key;
    this.data = this.chartEl.getData();
    Storage.setItem(`formflows.${this.name}`, this.data);
  }
}
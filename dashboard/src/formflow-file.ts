import { Storage } from './storage';

const DEFAULT_VALUE =  {
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

export class FormflowFile {
  storage: any;
  chartEl: any;

  _modified = false; // set to true when modified a form
  get modified() { return this._modified; }
  set modified(val) { 
    this._modified = val; 
    Storage.setItem('currentFormflow.modified', val);
  }

  _chart: any;
  get chart() { return this._chart; }
  set chart(val) { 
    this._chart = val; 
    this.chartEl?.setData(val);
    Storage.setItem('currentFormflow.chart', val);
  }

  _name: string;
  get name() { return this._name || 'Untitled'; }
  set name(val) { 
    this._name = val; 
    Storage.setItem('currentFormflow.name', val);
  }

  constructor(chartEl, formflowFile?) {
    this.chartEl = chartEl;
    if (formflowFile) {
      this.name = formflowFile.name;
      this.chart = formflowFile.chart;
    } else if (Storage.getItem('currentFormflow')) {
      this.name = Storage.getItem('currentFormflow.name');
      this.chart = Storage.getItem('currentFormflow.chart');
    } else {
      this.chart = DEFAULT_VALUE;
    }
  }

  save() {
    const allFormflows = Storage.getItem('formflows') || []; // returns array
    const index = allFormflows.findIndex( (el:any) => el.name === this.name);
    this.chart = this.chartEl.getData();
    const formflow = {name: this.name, chart: this.chart};
    if (index === -1) {
      Storage.setItem(`formflows[${allFormflows.length}]`, formflow);
    } else {
      Storage.setItem(`formflows[${index}]`, formflow);
    }
    this.modified = false;
  }

  saveAs(key: string) {
    this.name = key;
    this.save();
  }
}
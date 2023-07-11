import type { FormDiagram } from '@formflow/elements/src';
import { Storage } from './storage';

export class CurrentFile {
  static DEFAULT_NAME = 'Untitled';
  static DEFAULT_CHART =  {
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

  storage: any;
  chartEl: FormDiagram

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
    Storage.setItem('currentFormflow.chart', this.chart);
  }

  _name: string;
  get name() { return this._name; }
  set name(val) { 
    this._name = val; 
    Storage.setItem('currentFormflow.name', val);
  }

  _properties: any;
  get properties() { return this._properties; }
  set properties(val) { 
    this._properties = val; 
    Storage.setItem('currentFormflow.properties', val);
  }

  _activeNode: any;
  get activeNode() { return this._activeNode; }
  set activeNode(val) { 
    this._activeNode = val; 
    Storage.setItem('currentFormflow.activeNode', val);
  }

  constructor(form?, chartEl?) {
    if (form) {
      this.name = form.name;
      this.chart = form.chart;
    } else if (Storage.getItem('currentFormflow')) {
      this.name = Storage.getItem('currentFormflow.name');
      this.chart = Storage.getItem('currentFormflow.chart');
    } else {
      this.name = CurrentFile.DEFAULT_NAME; 
      this.chart = CurrentFile.DEFAULT_CHART;
    }
    this.setChartEl(chartEl);
  }

  setChartEl(el: FormDiagram) {
    this.chartEl = el;
    if (this.chartEl) {
      this.chartEl?.setData(this.chart);
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
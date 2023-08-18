import type { FormDiagram } from '@formflow/elements/src';
import { AppStorage } from '@formflow/elements/src';
import type { Node, Edge } from 'reactflow';

const DEFAULT_CHART =  {
  nodes:[
    {id: 'start', type: 'start', deletable: false, position: { x: 100, y: 0 }},
    {id: 'form1', type: 'custom', data: {label: 'form1'}, position: { x: 100, y: 87 }},
    {id: 'review', type: 'custom', data: {label: 'review'}, position: { x: 100, y: 187 }},
    {id: 'submit', type: 'custom', data: {label: 'submit', type: 'submit'}, position: { x: 100, y: 287 }},
    {id: 'end', type: 'end', deletable: false, position: { x: 100, y: 400 }},
  ] as Node[],
  edges: [
    {id: 'start-form1', source: 'start', target: 'form1', type: 'custom'},
    {id: 'form1-review', source: 'form1', target: 'review', type: 'custom', data: {hello: 'world'}},
    {id: 'review-submit', source: 'review', target: 'submit', type: 'custom'},
    {id: 'submit-end', source: 'submit', target: 'end', type: 'custom'},
  ] as Edge[]
};

export class CurrentFile {
  static DEFAULT_NAME = 'Untitled';
  static DEFAULT_CHART =  DEFAULT_CHART;

  storage: any;
  chartEl: FormDiagram

  _modified = false; // set to true when modified a form
  get modified() { return this._modified; }
  set modified(val) { 
    this._modified = val; 
    AppStorage.setItem('currentFormflow.modified', val);
  }

  _chart: any;
  get chart() { return this._chart; }
  set chart(val) { 
    this._chart = val; 
    AppStorage.setItem('currentFormflow.chart', this.chart);
  }

  _nodes: any;
  get nodes() { return this._chart.nodes; }
  set nodes(val) { 
    this._chart.nodes = val; 
    AppStorage.setItem('currentFormflow.chart', this.chart);
  }

  _edges: any;
  get edges() { return this._chart.edges; }
  set edges(val) { 
    this._chart.edges = val; 
    AppStorage.setItem('currentFormflow.chart', this.chart);
  }

  _name: string;
  get name() { return this._name; }
  set name(val) { 
    this._name = val; 
    AppStorage.setItem('currentFormflow.name', val);
  }

  _properties: any;
  get properties() { return this._properties; }
  set properties(val) { 
    this._properties = val; 
    AppStorage.setItem('currentFormflow.properties', val);
  }

  _activeNode: any;
  get activeNode() { return this._activeNode; }
  set activeNode(val) { 
    this._activeNode = val; 
    AppStorage.setItem('currentFormflow.activeNode', val);
  }

  constructor(form?, chartEl?) {
    if (form) {
      this.name = form.name;
      this.chart = form.chart;
    } else if (AppStorage.getItem('currentFormflow')) {
      this.name = AppStorage.getItem('currentFormflow.name');
      this.chart = AppStorage.getItem('currentFormflow.chart');
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
    const allFormflows = AppStorage.getItem('formflows') || []; // returns array
    const index = allFormflows.findIndex( (el:any) => el.name === this.name);
    this.chart = this.chartEl.getData();
    const formflow = {name: this.name, chart: this.chart};
    if (index === -1) {
      AppStorage.setItem(`formflows[${allFormflows.length}]`, formflow);
    } else {
      AppStorage.setItem(`formflows[${index}]`, formflow);
    }
    this.modified = false;
  }

  saveAs(key: string) {
    this.name = key;
    this.save();
  }
}
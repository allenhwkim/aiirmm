import type { FormDiagram } from '@formflow/elements/src';
import { AppStorage, DEFAULT_CHART } from '@formflow/elements/src';

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
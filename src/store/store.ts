import { writable } from 'svelte/store';

import type { Formflow as XFormflow } from 'elements-x';
import { StepperStorage } from 'elements-x';
import DEFAULT_CHART from './DEFAULT_CHART';

export class FormFlow {
  chartEl: XFormflow

  _chart: any;
  get chart() { return this._chart; }
  set chart(val) { 
    this._chart = val; 
  }

  _name: string;
  get name() { return this._name; }
  set name(val) { 
    this._name = val; 
    this.setStorage('formflow.name', val);
  }

  _modified = false; // set to true when modified a form
  get modified() { return this._modified; }
  set modified(val) { 
    this._modified = val; 
    this.setStorage('formflow.modified', val);
  }

  _selected: any;
  get selected() { return this._selected; }
  set selected(val) { 
    this._selected = val; 
    this.setStorage('formflow.selected', val);
  }

  constructor(form?, chartEl?) {
    StepperStorage.storage = (window as any).sessionStorage;
    if (form) {
      this.name = form.name;
      this.chart = form.chart;
    } else if (this.getStorage('formflow')) {
      this.name = this.getStorage('formflow.name');
      this.chart = this.getStorage('formflow.chart');
    } else {
      this.name = 'Untitled'; 
      this.chart = DEFAULT_CHART;
    }
    this.setChartEl(chartEl);
  }

  setChartEl(el: XFormflow) {
    this.chartEl = el;
    if (this.chartEl) {
      this.chartEl?.setData(this.chart);
    }
  }

  save() {
    const allFormflows = this.getStorage('formflows') || []; // returns array
    const index = allFormflows.findIndex( (el:any) => el.name === this.name);
    this.chart = this.chartEl.getData();
    const formflow = {name: this.name, chart: this.chart};
    if (index === -1) {
      this.setStorage(`formflows[${allFormflows.length}]`, formflow);
    } else {
      this.setStorage(`formflows[${index}]`, formflow);
    }
    this.modified = false;
  }

  saveAs(key: string) {
    this.name = key;
    this.save();
  }

  removeStorage(key) {
    return StepperStorage.removeItem()
  }

  setStorage(key, data) {
    return StepperStorage.setItem(key, data);
  }

  getStorage(key) {
    return StepperStorage.getItem(key);
  }
}

export const store = writable(new FormFlow());

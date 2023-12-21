import { writable } from 'svelte/store';

import type { Formflow as XFormflow } from 'elements-x';
import { StepperStorage } from 'elements-x';
import DEFAULT_CHART from './DEFAULT_CHART';

export class FormFlow {
  storage: any;
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
    StepperStorage.setItem('formflow.name', val);
  }

  _modified = false; // set to true when modified a form
  get modified() { return this._modified; }
  set modified(val) { 
    this._modified = val; 
    StepperStorage.setItem('formflow.modified', val);
  }

  _selected: any;
  get selected() { return this._selected; }
  set selected(val) { 
    this._selected = val; 
    StepperStorage.setItem('formflow.selected', val);
  }

  constructor(form?, chartEl?) {
    if (form) {
      this.name = form.name;
      this.chart = form.chart;
    } else if (StepperStorage.getItem('formflow')) {
      this.name = StepperStorage.getItem('formflow.name');
      this.chart = StepperStorage.getItem('formflow.chart');
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
    const allFormflows = StepperStorage.getItem('formflows') || []; // returns array
    const index = allFormflows.findIndex( (el:any) => el.name === this.name);
    this.chart = this.chartEl.getData();
    const formflow = {name: this.name, chart: this.chart};
    if (index === -1) {
      StepperStorage.setItem(`formflows[${allFormflows.length}]`, formflow);
    } else {
      StepperStorage.setItem(`formflows[${index}]`, formflow);
    }
    this.modified = false;
  }

  saveAs(key: string) {
    this.name = key;
    this.save();
  }
}

export const store = writable(new FormFlow());

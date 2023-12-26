import { writable } from 'svelte/store';

import type { Formflow as XFormflow } from 'elements-x';
import { StepperStorage } from 'elements-x';
import type { Node, Edge } from 'reactflow';

StepperStorage.storage = (window as any).sessionStorage;

const storageName = StepperStorage.getItem('formflow.name');
export const name = writable(storageName || 'Untitled');
name.subscribe(value => {
  StepperStorage.setItem('formflow.name', value);
});

const storageChart = StepperStorage.getItem('formflow.chart');
export const chart = writable(storageChart);
chart.subscribe(value => {
  StepperStorage.setItem('formflow.chart', value);
});

export const selected = writable(null);
selected.subscribe((val) => {
  console.log({selected: val});
  StepperStorage.setItem('formflow.selected', val);
});

export const modified = writable(false);
modified.subscribe(value => {
  StepperStorage.setItem('formflow.modified', value);
});

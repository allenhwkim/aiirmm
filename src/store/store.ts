import { writable, type Writable } from 'svelte/store';

import {StepperStorage, type Formflow as XFormflow } from 'elements-x';
import type {Node, Edge} from 'reactflow';

StepperStorage.storage = (window as any).sessionStorage;

const storageName = StepperStorage.getItem('formflow.name');
export const name = writable(storageName || 'Untitled');
name.subscribe(value => {
  StepperStorage.setItem('formflow.name', value);
});

const storageChart = StepperStorage.getItem('formflow.chart');
export const chart: Writable<XFormflow> = writable(storageChart);
chart.subscribe(value => {
  StepperStorage.setItem('formflow.chart', value);
});

export const selected : Writable<Node | Edge>= writable(null);
selected.subscribe((val) => {
  StepperStorage.setItem('formflow.selected', val);
});

export const isModified: Writable<Boolean> = writable(false);
isModified.subscribe(value => {
  StepperStorage.setItem('formflow.isModified', value);
});

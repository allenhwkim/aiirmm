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
  name: string | undefined;
  data: any;
  storage: any;
  chartEl: any;

  constructor(chartEl) {
    this.data = DEFAULT_VALUE;
    this.chartEl = chartEl;
  }

  open(name: string, data: any) {
    this.name = undefined;
    this.data = data;
  }

  save() {
    if (this.name) {
      this.data = this.chartEl.getData();;
      Storage.setItem(this.name, this.data);
    }
  }

  saveAs(key: string) {
    this.name = key;
    this.data = this.chartEl.getData();
    Storage.setItem(this.name, this.data);
  }
}
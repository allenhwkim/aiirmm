import { type Node, type Edge } from '@xyflow/react';
const style = { backgroundColor: '#EEE', color: '#333' };

const nodes: Node[]= [
  {id: 'country',  type: 'input', deletable: false, style, data: {label: 'Country'}, position: { x: 300, y: 100 }},
  {id: 'postalcode', data: {label: 'Postal Code'}, position: { x: 100, y: 200 }},
  {id: 'zipcode',  data: {label: 'Zip Code'}, position: { x: 300, y: 200 }},
  {id: 'error',  data: {label: 'Error'}, position: { x: 500, y: 200 }},
  {id: 'review', data: {label: 'Review'}, position: { x: 300, y: 300 }},
  {id: 'submit',  data: {label: 'SUBMIT'}, position: { x: 300, y: 350 }},
  {id: 'thankyou', type: 'output', deletable: false, style, data: {label: 'THANKYOU'}, deletable: false, position: { x: 300, y: 400 }},
] as Node[];

const edges: Edge[] = [
  {id: 'country-postalcode', source: 'country', target: 'postalcode', label: 'Candda?'},
  {id: 'country-zipcode', source: 'country', target: 'zipcode', label: 'USA?'},
  {id: 'country-error', source: 'country', target: 'error', label: 'Other'},
  {id: 'postalcode-review', source: 'postalcode', target: 'review' },
  {id: 'zipcode-review', source: 'zipcode', target: 'review' },
  {id: 'review-submit', source: 'review', target: 'submit'},
  {id: 'submit-thankyou', source: 'submit', target: 'thankyou'},
];

export default {nodes, edges};
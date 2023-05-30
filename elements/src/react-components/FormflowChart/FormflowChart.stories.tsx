import * as React from 'react';
import { action } from '@storybook/addon-actions';

import { FormflowChart } from './FormflowChart';

export default { 
  title: 'React Components/FormflowChart',
  component: FormflowChart,
  argTypes : {
    nodes: { control: 'object' },
    edges: { control: 'object' },
  }
};

const Template:any = (args: any) => {
  return <>
    <FormflowChart
        nodes={args.nodes}
        edges={args.edges}
        onNodeClick={action('node-click')}
        onEdgeClick={action('edge-click')}
        onInit={action('init')}
      />
  </>;
};

export const Primary: any = Template.bind({});
Primary.args = {
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
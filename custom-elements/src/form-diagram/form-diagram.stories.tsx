import * as React from 'react';
import { useRef, useState } from 'react';
import FormDiagram from "./form-diagram";

(!customElements.get('form-diagram')) && customElements.define('form-diagram', FormDiagram);

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'form-diagram': React.DetailedHTMLProps<React.HTMLAttributes<HTMLElement>, HTMLElement>;
    }
  }
}

export default {
  title: 'Components/form-diagram',
  component: FormDiagram,
  parameters: {
    // docs: { page: CustomDocumentation },
  },
  argTypes: {
    data: { control: 'object' },
  }
};

const Template:any = (args: any) => {
  const [data, setData] = useState(args.data);

  const chartEl = useRef(null);
  const getData = (event: any) => console.log((chartEl.current as any).getData());
  const getImage = async (event: any) => console.log( await (chartEl.current as any).getImage());
  const getInstance = (event: any) => console.log((chartEl.current as any).getInstance());

  React.useEffect( () => {
    setData(args.data);
    (chartEl.current as any).setData(args.data)
  }, [args.data])

  return <>
    <form-diagram ref={chartEl}></form-diagram>
    <button onClick={getData}>Get Data</button>
    <button onClick={getImage}>Get Image</button>
    <button onClick={getInstance}>Get Instance</button>
  </>
};

export const Primary = Template.bind({});
Primary.args = {
  data: {
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
};
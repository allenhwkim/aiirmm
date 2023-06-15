import * as React from 'react';

import { Pagination } from '../index';
customElements.define('x-pagination', Pagination);

export default {
  title: 'Components/x-pagination',
};

const Template = (args?: any) => {
  const container: any = React.useRef();
  const message: any = React.useRef();
  React.useEffect(() => {
    container.current.addEventListener('select', (e:any) => {
      message.current.innerText = `selected "${JSON.stringify(e.detail)}`;
    });
  }, []);

  return <div ref={container}>
    <pre ref={message}></pre>
    <x-pagination></x-pagination>
    <p></p>
    <x-pagination 
      total="500" 
      page="8" 
      num-per-page="20" 
      num-pages="7">
    </x-pagination>
  </div>
};

export const Primary = Template.bind({});
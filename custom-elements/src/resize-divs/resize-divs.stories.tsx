import * as React from 'react';
import { ResizeDivs } from './resize-divs';
import './resize-divs.stories.css';

// import CustomDocumentation from './form-editor.mdx';
(!customElements.get('resize-divs')) && customElements.define('resize-divs', ResizeDivs);

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'resize-divs': any;
    }
  }
}

export default {
  title: 'Components/resize-divs',
  component: ResizeDivs,
  parameters: {
    // docs: { page: CustomDocumentation },
  },
  // argTypes: {
  //   data: { control: 'object' },
  // }
};

const Template = (args?: any) => {

  return <>
    <h2 className="header">Drag Resizer</h2>
    <h3>Resize the height of the following sections</h3>
    
    <resize-divs height>
      <div>Section 1</div>
      <div>Section 2</div>
      <div>Section 3</div>
    </resize-divs>

    <h3>Resize the width of the following sections</h3>
    <resize-divs width>
      <div>Section 1</div>
      <div>Section 2</div>
      <div>Section 3</div>
    </resize-divs>

  </>
}; 

export const Primary = Template.bind({});

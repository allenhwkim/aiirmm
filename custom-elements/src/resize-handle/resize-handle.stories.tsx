import * as React from 'react';
import { ResizeHandle } from "./resize-handle"; // Shares the same FormController
import './resize-handle.stories.css';

// import CustomDocumentation from './form-editor.mdx';
(!customElements.get('resize-handle')) && customElements.define('resize-handle', ResizeHandle);

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'resize-handle': any;
    }
  }
}

export default {
  title: 'Components/resize-handle',
  component: ResizeHandle,
  parameters: {
    // docs: { page: CustomDocumentation },
  },
  // argTypes: {
  //   data: { control: 'object' },
  // }
};

const Template = (args?: any) => {

  return <>
    <div className="demo-container">
      <div className="left-side">
        <div>
          Left/Top
        </div>

        <div>
          Left/Bottom
          <resize-handle top right></resize-handle>
          <resize-handle bottom right></resize-handle>
        </div>
      </div>

      <div className="right-side">
        <div style={{height: '100%'}} className="preview-container" id="preview-container">
          Right
          <resize-handle bottom left></resize-handle>
        </div>
      </div>
    </div>
    <br/>
    <br/>
    <div className="border-dashed">
      <div className="border-solid flex-center" style={{position: 'relative', height: '100px'}}>
        Single
        <resize-handle bottom right single></resize-handle>
      </div>
    </div>
  </>
}; 

export const Primary = Template.bind({});

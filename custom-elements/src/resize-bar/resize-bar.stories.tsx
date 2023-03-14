import * as React from 'react';
import { ResizeBar } from "./resize-bar"; // Shares the same FormController
import './resize-bar.stories.css';

// import CustomDocumentation from './form-editor.mdx';
(!customElements.get('resize-bar')) && customElements.define('resize-bar', ResizeBar);

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'resize-bar': any;
    }
  }
}

export default {
  title: 'Components/resize-bar',
  component: ResizeBar,
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
    <div className="box">
      <div className="row">
        <div>col 1</div>
        <resize-bar width></resize-bar>
        <div>col 2</div>
      </div>
      <resize-bar height> </resize-bar>
      <div className="row">
        <div>col 1</div>
        <resize-bar width></resize-bar>
        <div>col 2</div>
      </div>
    </div>

    Another one.
    <div className="row">
      <div>
        <div className="box">row 1</div>
        <resize-bar height></resize-bar>
        <div className="box">row 2</div>
      </div>
      <resize-bar width></resize-bar>
      <div>
        <div className="box">row 1</div>
        <resize-bar height></resize-bar>
        <div className="box">row 2</div>
      </div>
    </div>
  </>
}; 

export const Primary = Template.bind({});

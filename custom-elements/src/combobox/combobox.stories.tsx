import * as React from 'react';
import { Combobox } from "./combobox"; // Shares the same FormController
import { useRef, useEffect } from 'react';

// import CustomDocumentation from './form-editor.mdx';
(!customElements.get('x-combobox')) && customElements.define('x-combobox', Combobox);

declare global {
  namespace JSX {
    interface IntrinsicElements {
      'x-combobox': any;
    }
  }
}

export default {
  title: 'Components/combobox',
  component: Combobox,
  parameters: {
    // docs: { page: CustomDocumentation },
  },
  // argTypes: {
  //   data: { control: 'object' },
  // }
};

const Template = (args?: any) => {
  function srcFunc(search: string) {
    return fetch('https://dummyjson.com/products/search?q='+search)
      .then(res => res.json())
      .then(res => res.products || [])
  }

  return <>
    <x-combobox>
      <input placeholder="Choose one value" autoComplete="off" defaultValue="Hello World" />
      <ul>
        <li data-value="">Choose One</li>
        <li data-value="1">Hello</li>
        <li>Hello World</li>
        <li>Foo</li>
        <li className="disabled">Disabled</li>
        <li>Foo Bar</li>
      </ul>
    </x-combobox>
    <p>
      This is combobox with keyboard navigation and selection enabled.
    </p>

    <x-combobox>
      <input placeholder="Readonly dropdown" readOnly />
    </x-combobox>

    <x-combobox>
      <input placeholder="Disabled dropdown" disabled />
    </x-combobox>
    <x-combobox>
      <input placeholder="Long list dropdown" autoComplete="off" defaultValue="13" />
      <ul>
        <li data-value="">Choose One</li>
        <li>1</li> <li>2</li> <li>3</li> <li>4</li> <li>5</li> <li>6</li> <li>7</li> <li>8</li> <li>9</li> <li>10</li>
        <li>11</li> <li>12</li> <li>13</li> <li>14</li> <li>15</li> <li>16</li> <li>17</li> <li>18</li> <li>19</li> <li>20</li>
      </ul>
    </x-combobox>

    <h3>Functionality Checklist</h3>
    <h3> Asynchronous src</h3>
    <x-combobox src={srcFunc}>
      <input placeholder="Search a product" style={{width: 800}}/>
      <ul>
        <li data-value="[[id]]-[[title]]">[[brand]] - [[description]]</li>
      </ul>
    </x-combobox>
    
    <ul>
      <li> When attribute 'data-value' is given, it shows the value</li>
      <li> When 'disabled' class is given to a list, it's not focusable </li>
      <li> When attribute 'placeholder' is given, it shows the given placeholder </li>
      <li> When element is focused, dropdown is visible </li>
      <li> When element is NOT focused, dropdown is not visible </li>
      <li> When focused and keyboard downarrow pressed, highlight next dropdown option </li>
      <li> When focused and keyboard uparrow pressed, highlight prev dropdown option </li>
      <li> When focused and ESC Key pressed, dropdown is not visible </li>
      <li> When focused and keyboard Enter pressed, dropdown not visible, and it selects the highlighted value </li>
      <li> When focused and any character key is pressed, highlight an element that contains that character </li>
      <li> When focused and element is clicked, it selects the clicked item </li>
      <li> When focused and dissbled element is clicked, it does not select the clicked item </li>
      <li> When 'data-value' attribute changes, it reflects the value </li>
      <li> When disabled class changes, it reflects the value </li>
      <li> When focused again, the previously selected value must be highlighted </li>
      <li> When dropdown list is too big to show in 200px dropdown height, when arrow up/down key is pressed, it shows the highlighted list in dropdown by auto scrolling into it.  </li>
      {/* <li> When positioned at the bottom, show the dropdown on the top of input </li> */}
    </ul>

  </>
}; 

export const Primary = Template.bind({});

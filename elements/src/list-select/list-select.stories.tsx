import * as React from 'react';

import { ListSelect } from '../index';
!customElements.get('list-select') && customElements.define('list-select', ListSelect);

export default {
  title: 'Components/list-select',
};

const PrimaryStyle = (args?: any) => {
  const listSelect: any = React.useRef();
  const message: any = React.useRef();
  React.useEffect(() => {
    listSelect.current.addEventListener('select', (e:any) => {
      message.current.innerText = `"${e.detail.innerText.split('\n')[0]}" is selected`;
    });
  }, []);

  return <div>
    <p ref={message}></p>
    <list-select selected="file-a" ref={listSelect}>
      <ul>
        <li> File
          <ul>
            <li id="new">New</li>
            <li>Open
              <ul>
                <li> Recent Files 
                  <ul>
                    <li id="file-a">File A</li>
                    <li>File B</li>
                    <li>File C</li>
                  </ul>
                </li>
              </ul>
            </li>
          </ul>
        </li>
        <li> Edit
          <ul>
            <li>Undo</li>
            <li id="redo">Redo</li>
            <li className="disabled">Cut</li>
            <li className="disabled">Copy</li>
            <li className="disabled">Paste</li>
          </ul>
        </li>
        <li> Format
          <ul>
            <li>Font</li>
            <li>Text</li>
          </ul>
        </li>
        <li> View
          <ul>
            <li>100%</li>
            <li>Zoom In</li>
            <li>Zoom Out</li>
          </ul>
        </li>
        <li id="help">Help</li>
      </ul>
    </list-select>
  </div>
};

const MenuStyle = (args?: any) => {
  const listSelect: any = React.useRef();
  const message: any = React.useRef();
  React.useEffect(() => {
    listSelect.current.addEventListener('select', (e:any) => {
      message.current.innerText = `"${e.detail.innerText.split('\n')[0]}" is selected`;
    });
  }, []);

  return <div style={{minHeight: 200}}>
    <p ref={message}></p>
    <list-select selected="file-a" ref={listSelect}>
      <ul className="menu">
        <li> File
          <ul>
            <li id="new">New</li>
            <li>Open
              <ul>
                <li> Recent Files 
                  <ul>
                    <li id="file-a">File A</li>
                    <li>File B</li>
                    <li>File C</li>
                  </ul>
                </li>
              </ul>
            </li>
          </ul>
        </li>
        <li> Edit
          <ul>
            <li>Undo</li>
            <li id="redo">Redo</li>
            <li className="disabled">Cut</li>
            <li className="disabled">Copy</li>
            <li className="disabled">Paste</li>
          </ul>
        </li>
        <li> Format
          <ul>
            <li>Font</li>
            <li>Text</li>
          </ul>
        </li>
        <li> View
          <ul>
            <li>100%</li>
            <li>Zoom In</li>
            <li>Zoom Out</li>
          </ul>
        </li>
        <li id="help">Help</li>
      </ul>
    </list-select>
  </div>
};
export const Primary = PrimaryStyle.bind({});
export const Menu = MenuStyle.bind({});
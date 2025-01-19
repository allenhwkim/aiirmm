import React from 'react';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'elements-x';
import './style.css';
import App from './App/App.tsx';

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      [name: string]: React.DetailedHTMLProps<any, HTMLElement>;
    }
  }
}

const component = React.createElement(App, null);
const root = ReactDOM.createRoot(document.querySelector('#root') as any);
root.render(component);
import React from 'react';
import ReactDOM from 'react-dom/client';
import 'elements-x';
import './style.css';
import App from './App.tsx';

const component = React.createElement(App, null);
const root = ReactDOM.createRoot(document.querySelector('#root') as any);
root.render(component);
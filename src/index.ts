import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/style.scss';
import App from './App.tsx';

const component = React.createElement(App, null);
const root = ReactDOM.createRoot(document.querySelector('#root') as any);
root.render(component);
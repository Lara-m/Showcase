import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import './index.css';
import {FormExample,ListExample,Example} from './App';


ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();

ReactDOM.render(<FormExample />, document.getElementById('test'));
ReactDOM.render(<ListExample/>, document.getElementById('list'));
//ReactDOM.render(<Example />, document.getElementById('test2'));
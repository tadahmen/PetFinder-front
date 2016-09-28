import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import jQuery from 'jquery'; // Will it be available in all components that are directly or indirectly imported in this index.js file? Or should it be imported in each of them separately?

ReactDOM.render(<App />, document.getElementById('root'));

import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import jQuery from 'jquery'; // Will it be available in all components that are directly or indirectly imported in this index.js file? Or should it be imported in each of them separately?

localStorage.petList = '{ "pets" : [' +
    '{ "id" : "1", "name": "Koala Jaap", "owner" : "Harry"},' +
    '{ "id" : "2", "name": "Kip Jacqueline", "owner" : "Wilhelmina"},' +
    '{ "id" : "3", "name" : "konijn Pluis", "owner" : "Mariëlle"},' +
    '{ "id" : "4", "name" : "kat Barrabas", "owner": "Lisa"}' +
']}';

ReactDOM.render(<App />, document.getElementById('root'));

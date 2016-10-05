import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import jQuery from 'jquery'; // Will it be available in all components that are directly or indirectly imported in this index.js file? Or should it be imported in each of them separately?

localStorage.petList = '{ "pets" : [' +
    '{ "id" : "1", "name": "Koala Jaap", "species" : "Koala", "owner" : "Harry", "lastSeen" : { "long" : "52.3435125", "lat" : "4.8820532"} },' +
    '{ "id" : "2", "name": "Kip Jacqueline", "species" : "Kip", "owner" : "Wilhelmina", "lastSeen" : { "long" :"52.3435125", "lat" : "4.8820532"} },' +
    '{ "id" : "3", "name" : "konijn Pluis", "species" : "konijn", "owner" : "Mariëlle", "lastSeen" : { "long" :"52.3435125", "lat" : "4.8820532"} },' +
    '{ "id" : "4", "name" : "kat Barrabas", "species" : "kat", "owner": "Lisa", "lastSeen" : { "long" : "52.3435125", "lat" : "4.8820532"} }' +
']}';

ReactDOM.render(<App />, document.getElementById('root'));

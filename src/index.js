import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import jQuery from 'jquery'; // Will it be available in all components that are directly or indirectly imported in this index.js file? Or should it be imported in each of them separately?


// localStorage.petList = '{ "pets" : [' +
//     '{ "id" : "1", "name": "Koala Jaap", "species" : "Koala", "owner" : "Harry", "lastSeen" : { "long" : "52.3435125", "lat" : "4.8820532"}, "status" : "missing" },' +
//     '{ "id" : "2", "name": "Kip Jacqueline", "species" : "Kip", "owner" : "Wilhelmina", "lastSeen" : { "long" :"52.321178", "lat" : "4.837386"}, "status" : "missing" },' +
//     '{ "id" : "3", "name" : "konijn Pluis", "species" : "konijn", "owner" : "Mariëlle", "lastSeen" : { "long" :"52.339947", "lat" : "4.880144"}, "status" : "missing" },' +
//     '{ "id" : "4", "name" : "kat Barrabas", "species" : "kat", "owner": "Lisa", "lastSeen" : { "long" : "52.347849", "lat" : "4.905719"}, "status" : "found" }' +
// ']}';

ReactDOM.render(<App />, document.getElementById('root'));

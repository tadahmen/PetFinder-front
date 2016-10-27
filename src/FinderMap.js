import React from 'react';
import Script from 'react-load-script';
import ReactDOM from 'react-dom';

var googleMapsClient = require('@google/maps').createClient({
  key: 'AIzaSyC7YAekZlk5wu9wbtpstsINHf5gyQUiEIA'
});

class FinderMap extends React.Component {

    radiusToZoom (radius){
        let zoom = Math.round(14-Math.log(radius)/Math.LN2);
        console.log("zoom is: " + zoom);
        return zoom;
    }

    showMap() {
        // return(
        //     function makeClosure() {
                window.allPets = this.props.allPets;
                window.zoom = this.radiusToZoom(this.props.radius);

                function initFinderMap() {
                    let map = new google.maps.Map(document.getElementById('map'), {
                        center: {lat: 52.3435125, lng: 4.8820532},
                        zoom: window.zoom
                    });

                    console.log("HET WERKT!! allPets is: " + window.allPets);
                    let labels = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
                    let pets = window.allPets;

                    let markers = [];
                    // // Add some markers to the map.
                    // // Note: The code uses the JavaScript Array.prototype.map() method to
                    // // create an array of markers based on a given "locations" array.
                    // // The map() method here has nothing to do with the Google Maps API.
                    pets.map(function(pet,i) {
                        markers[i] = new google.maps.Marker({
                          position: pet.lastSeen,
                          label: pet.name,
                          map: map
                        });
                    });
                  }
                  return initFinderMap;
            // }

//WHY IS THIS NOT ALLOWED? :
            // let callBack = makeClosure();
//& WHY DOES IT SAY: callBack is not a function?
        // )
    }


    render() {
        return (
            <div id='findermap'>
                <div id="map"></div>
                {document.getElementById('findermap-script').innerHTML = this.showMap()}
                <Script url="https://maps.googleapis.com/maps/api/js?key=AIzaSyC7YAekZlk5wu9wbtpstsINHf5gyQUiEIA&callback=initFinderMap"/>
            </div>
        )
    }
}

export default FinderMap;

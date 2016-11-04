import React from 'react';
import Script from 'react-load-script';
import ReactDOM from 'react-dom';
import scriptLoader from 'react-async-script-loader'


class ShowMap extends React.Component {

    //sets zoom (for google map) in line with chosen search radius
    radiusToZoom (radius){
        let zoom = Math.round(14-Math.log(radius)/Math.LN2);
        console.log("zoom is: " + zoom);
        return zoom;
    }

    //puts the googlemaps callback function as script in document
    showMap() {
        window.allPets = this.props.allPets;
        window.zoom = this.radiusToZoom(this.props.radius);

        // the google maps callback function
        function initFinderMap() {
            let map = new google.maps.Map(document.getElementById('map'), {
                center: {lat: 52.3435125, lng: 4.8820532},
                zoom: window.zoom
            });
            // let infoWindow = new google.maps.InfoWindow({map: map});
            let pets = window.allPets;
            let petMarkers = [];
            let userIcon = "https://upload.wikimedia.org/wikipedia/commons/thumb/6/61/Blue_0080ff_pog.svg/17px-Blue_0080ff_pog.svg.png";
            let userMarker = new google.maps.Marker({
                map: map,
                icon: userIcon
            });

            pets.map(function(pet,i) {
                petMarkers[i] = new google.maps.Marker({
                    map: map,
                    position: pet.lastSeen,
                    label: pet.name,
                    icon: "https://upload.wikimedia.org/wikipedia/commons/c/c8/Map_marker_icon_%E2%80%93_Nicolas_Mollet_%E2%80%93_Pets_%E2%80%93_Nature_%E2%80%93_white.png"
                });
            });

            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(function(position) {
                    let pos = {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude
                    };
                    userMarker.setPosition(pos);
                    map.setCenter(pos);
                    window.userPosition = pos;
                }, function() {
                    handleLocationError(true, infoWindow, map.getCenter());
                });
            } else {
              // Browser doesn't support Geolocation
                handleLocationError(false, infoWindow, map.getCenter());
            }

            function handleLocationError(browserHasGeolocation, infoWindow, pos) {
                infoWindow.setPosition(pos);
                infoWindow.setContent(
                    browserHasGeolocation ?
                    'Error: The Geolocation service failed.' :
                    'Error: Your browser doesn\'t support geolocation.'
                );
            }
        }

        return initFinderMap;
    }

    render() {
        return (
            <div id='show-map'>
                <div id="map"></div>
                {document.getElementById('findermap-script').innerHTML = this.showMap()}
                <Script url="https://maps.googleapis.com/maps/api/js?key=AIzaSyC7YAekZlk5wu9wbtpstsINHf5gyQUiEIA&callback=initFinderMap"/>
            </div>
        )
    }
}

export default ShowMap;

import React from 'react';
import PetInRadius from './petinradius';
import jQuery from 'jquery';
import ShowMap from './showmap';

class PetFinder extends React.Component {
    constructor() {
        super()

        this.state = {
            userPosition : {lat: 52.343468, lng: 4.879921},
            radius: 0.2,
            petsInRadius : []
        }
    }

    componentDidMount() {
        this.findPets(this.state.radius);
    }

    componentWillReceiveProps(nextProps) {
        this.findPets(this.state.radius);
    }

    setUserPosition(userPosition) {
        setState({ userPosition: userPosition })
    }

    // makes array containing all pets within a certain radius and puts it in the component state:
    findPets(radius) {
        // console.log("start: PetFinder.js->findPets()");
        let component = this;
        let allPets = this.props.allPets;
        let userPosition = this.state.userPosition;

        this.setState({ petsInRadius : allPets.filter(withinDistance) })

        //checks if pet is within radius and returns true or false:
        function withinDistance(pet) {
            //if pet has no location, skip it:
            if (pet.lastSeen == undefined) {
                return false;
            }

            return component.getDistanceInKm(userPosition.lat, userPosition.lng , pet.lastSeen.lat, pet.lastSeen.lng) < radius;
            //can later on use google api function instead of getDistanceInKm()
        }
    }

    //returns distance between two points on earth:
    getDistanceInKm(lat1,lon1,lat2,lon2) {
        function deg2rad(deg) {
            return deg * (Math.PI/180)
        }
        var R = 6371; // Radius of the earth in km
        var dLat = deg2rad(lat2-lat1);  // deg2rad below
        var dLon = deg2rad(lon2-lon1);
        var a =
            Math.sin(dLat/2) * Math.sin(dLat/2) +
            Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
            Math.sin(dLon/2) * Math.sin(dLon/2)
            ;
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
        var d = R * c; // Distance in km
        return d;
    }

    // shows all pets in state 'petsInRadius'
    showPetsInRadius() {
        // console.log("start showPetsInRadius<-PatFinder.js")
        let component = this;
        return this.state.petsInRadius.map(function(pet) {
            // console.log("pet sent as prop: " + pet);
            return <PetInRadius
                key={pet.id}
                pet={pet}
                onChange = {component.props.onChange.bind(this)}
            />
        })
    }

    //sets radius to value of slider
    changeRadius() {
        let radius = this.refs.radius.value;
        this.setState({radius: radius});
        this.findPets(radius)
    }

    showRadius() {
        console.log("start showRadius<-PetFinder.js")
        let radius = this.state.radius;
        let info = "";
        if (radius < 1) {
            return radius*1000 + " m"
        } else {
            return radius + " km";
        }
    }

    render() {
        return (
            <div id="pet-finder" onClick={this.props.onClick}>
                <h2 className="tile-title"> Find Pets </h2>

                { /*just for testing purposes:*/}
                <p> your position: </p>
                <p> latitude: </p>
                <input ref = "userPositionLat" defaultValue = {this.state.userPosition.lat}/>
                <p> longitude: </p>
                <input ref = "userPositionLng" defaultValue = {this.state.userPosition.lng}/>

                <p> radius: </p>
                <div id = 'radius-slider'>
                    <input
                        ref='radius'
                        type = 'range'
                        defaultValue = "0.1" max="10" step="0.1"
                        onChange = {this.changeRadius.bind(this)}
                    />
                    <p> {this.showRadius()} </p>
                </div>
                <button onClick={this.findPets.bind(this)}> find pets </button>

                <div id = 'pets-in-radius'>
                    <ShowMap
                        allPets = {this.props.allPets}
                        radius = {this.state.radius}
                    />
                    <div id = 'pet-list'>
                        <p> pets nearby: </p>
                        <ul> {this.showPetsInRadius()} </ul>
                    </div>


                </div>
            </div>
        );
    }
}

export default PetFinder;

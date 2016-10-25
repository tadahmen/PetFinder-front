import React from 'react';
import PetInRadius from './petinradius';
import jQuery from 'jquery';


class PetFinder extends React.Component {
    constructor() {
        super()

        this.state = {
            userPosition : [52.3435125, 4.8820532],
            radius: 0.2,
            petsInRadius : ["haas Joos"]
        }
        let petsInRadius = this.state.petsInRadius;
    }

    componentDidMount() {
        this.findPets();
    }

    findPets() {
        console.log("start: PetFinder.js->findPets()")
        console.log("radius is: " + this.state.radius);

        let component = this;

        function withinDistance(pet) {
            console.log("in withinDistance()<-PetFinder.js");

            if (pet.lastSeen == undefined) {
                return false;
            }
            // console.log("distance is: " + component.getDistanceInKm(...component.state.userPosition, pet.lastSeen.long, pet.lastSeen.lat));
            // console.log(component.getDistanceInKm(...component.state.userPosition, pet.lastSeen.long, pet.lastSeen.lat) < component.state.radius);
            return component.getDistanceInKm(...component.state.userPosition, pet.lastSeen.long, pet.lastSeen.lat) < component.state.radius;
            //can later on use google api function instead of getDistanceInKm()
        }

        let allPets = this.props.allPets;
        this.setState({ petsInRadius : allPets.filter(withinDistance) })
    }

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

    changeRadius() {
        this.setState({radius: this.refs.radius.value});
        this.findPets();
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
                <input ref="userPosition" defaultValue="52.3435125, 4.8820532"/>

                <p> radius: </p>
                <input
                    ref='radius'
                    type = 'range'
                    defaultValue = "0.1" max="10" step="0.1"
                    onChange = {this.changeRadius.bind(this)}
                />
                <p> {this.showRadius()} </p>
                <button onClick={this.findPets.bind(this)}> find pets </button>

                <p> pets nearby: </p>
                <ul> {this.showPetsInRadius()} </ul>

                <div id="map"></div>

            </div>
        );
    }
}

export default PetFinder;

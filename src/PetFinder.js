import React from 'react';

class PetFinder extends React.Component {
    constructor() {
        super()

        this.state = {
            radius: 1,
            petsInRadius : ["haas Joos"],
            userPosition : [52.3435125, 4.8820532]
        }
        let petsInRadius = this.state.petsInRadius;
    }

    findPets() {
        let component = this;
        function withinDistance(pet) {
            console.log("in withinDistance()<-PetFinder.js");
            console.log("distance is: " + component.getDistanceInKm(...component.state.userPosition, 52.3435125, 4.8820532));
            console.log("radius is: " + component.state.radius);
            console.log(component.getDistanceInKm(...component.state.userPosition, 52.3435125, 4.8820532) < component.state.radius);
            return component.getDistanceInKm(...component.state.userPosition, 52.3435125, 4.8820532) < component.state.radius;
        }
        console.log("start: PetFinder.js->findPets()")
        // console.log(this.getDistanceInKm(52.3435125, 4.8820532, 52.00000, 4.00000));
        // console.log("withinDistance: " + withinDistance(...this.state.userPosition, 52.00000, 4.00000));
        let allPets = this.props.allPets;

        allPets.filter(
            withinDistance
        ); //can later on use google api function instead
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

    showPetsInRadius(event) {
        console.log("start showPetsInRadius<-PatFinder.js")
        return this.state.petsInRadius.map(function(pet) {
            return (
                <li key={pet.id}> {pet.name} </li>
            )
        })
    }

    render() {
        return (
            <div id="pet-finder" onClick={this.props.onClick}>
                <h2 className="tile-title"> Find Pets </h2>

                { /*just for testing purposes:*/}
                <p> your position: </p>
                <input ref="userPosition" defaultValue="52.3435125, 4.8820532"/>
                <button onClick={this.findPets.bind(this)}> find pets </button>

                <p> pets nearby: </p>
                <ul> {this.showPetsInRadius()} </ul>
            </div>
        );
    }
}

export default PetFinder;

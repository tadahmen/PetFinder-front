import React from 'react';

class PetFinder extends React.Component {
    constructor() {
        super()

        this.state = {
            petsInRadius : ["haasJoos"]
        }
        let petsInRadius = this.state.petsInRadius;
    }

    findPets() {
        console.log("start: PetFinder.js->findPets()")
        let allPets = this.props.allPets;
        this.setState({ petsInRadius : allPets.map(function(pet) {
                return pet;
            })
        })
    }

    showPetsInRadius(event) {
        console.log("start showPetsInRadius<-PatFinder.js")
        return this.state.petsInRadius.map(function(pet) {
            return (
                <div>
                {console.log("pet from patsinradius: " + pet)}
                <li> {pet.name} </li>
                </div>
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

                <p> pets nearby: {this.showPetsInRadius()} </p>
            </div>
        );
    }
}

export default PetFinder;

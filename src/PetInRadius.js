import React from 'react';

class PetInRadius extends React.Component {
    constructor() {
        super()

        this.state = {
        }
    }

    showOptions(ev) {
        console.log("start showOptions()<-PetFinder.js");
        this.setState({showOptions: true});
    }

    hideOptions() {
        console.log("start showOptions()<-PetFinder.js");
        this.setState({showOptions: false});
    }

    addToTargetList(ev) {
        console.log("start addToTargetList()<-PetFinder.js");
        console.log("event: " + ev);
//add pet to 'my-list' of pets I want to search for
    }

    saveNewStatus(ev) {
        console.log("start saveNewState()<-PetInRadius.js");
        // ev.preventDefault();
        let editedPet = this.props.pet;
        editedPet.status = "reported-found";
        this.props.onChange.bind(this, editedPet);
    }

    render() {
        return (
            <div id="pet-in-finder">
            <li
                style = {this.props.pet.status == "found" ? {color: 'green'} : (this.props.pet.status == "reported-found" ? {color: 'orange'} : {color : 'white'})}
                onMouseEnter={this.showOptions.bind(this)}
                onMouseLeave={this.hideOptions.bind(this)}
            >
                {this.props.pet.name}
                {this.state.showOptions
                    ? (this.props.pet.status != "found"
                        ?   <span>
                                <button onClick={this.addToTargetList.bind(this)}> add </button>
                                <button onClick={this.saveNewStatus.bind(this)}> found </button>
                            </span>
                        :   <button disabled> has been found </button>
                    ) : ''
                }
            </li>
            </div>
        );
    }
}

export default PetInRadius

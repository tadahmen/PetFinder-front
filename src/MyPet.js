import React from 'react';

class MyPet extends React.Component {
    constructor() {
        super()

        this.state = {
            // style : {color: 'white'}
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

    saveNewStatus(status, ev) {
        console.log("start saveNewState()<-PetInRadius.js");
        let editedPet = this.props.pet;
        editedPet.status = status;
        status == "found" ? this.setState({style: {color: 'green'}}) : 0;
        this.props.onChange(editedPet, ev);
    }

    style() {
        let petStatus = this.props.pet.status;
        let style = {};

        switch(this.props.pet.status) {
            case "found":
                style = {color: 'green'}
                break;
            case "reported-found":
                style = {color: 'orange'}
                break;
            default:
                style = {color : 'white'}
        }
        return style;
    }


    render() {
        return (
                <tr id="pet-in-finder"
                    key={this.props.pet.id}
                    style = {this.style()}
                    onMouseEnter={this.showOptions.bind(this)}
                    onMouseLeave={this.hideOptions.bind(this)}>

                    <td> {this.props.pet.name} </td>
                    <td> {this.props.pet.species} </td>
                    <td>
                        {this.state.showOptions ?
                            (this.props.pet.status != "found" ?
                                <span>
                                    <button onClick={this.saveNewStatus.bind(this, "remove")}> remove </button>
                                    <button onClick={this.saveNewStatus.bind(this, "found")}> found </button>
                                </span>
                                :   <button disabled> has been found </button>
                            )
                            : ''
                        }
                    </td>
                </tr>
        );
    }
}

export default MyPet

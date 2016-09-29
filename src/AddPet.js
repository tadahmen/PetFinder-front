import React from 'react';
import jQuery from 'jquery';
var $ = require ('jquery');

class AddPet extends React.Component {
    constructor() {
        super()

        this.state = {
            newPet: '...',
        }
    }

    addPet(event) {
        this.setState({newPet: event.target.value});
    }

    saveStateInDB() {
        //ajax post this.state.newPet to something like: currentState (in case of accidental crash)
    }

    saveNewPetInDB(event) {
        event.preventDefault();
        console.log("clicked (from AddPet->saveNewPetInDB)");
        //ajax post this.state.newPet
    }

    render() {
        return (
            <div>
                    <form>
                        <input
                            id='pet'
                            type='text'
                            placeholder="name of pet"
                            onChange={this.addPet.bind(this)}
                            onBlur={this.saveStateInDB()}
                            autoFocus>
                        </input>
                        <button onClick={this.saveNewPetInDB}> Submit </button>
                    </form>

                    <p> adding new pet: <span id='show-new-pet'> {this.state.newPet}</span> </p>
            </div>
        );
    }
}

export default AddPet;

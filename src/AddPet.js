import React from 'react';
import jQuery from 'jquery';
var $ = require ('jquery');

class AddPet extends React.Component {


    addPet() {
        this.setState({newPet: $('pet').val});
      // do ajax post request for pet
        return <p> "adding new pet: " {this.state.newPet} </p>;
    }

    render() {
        return (
            <div>
                    <form>
                        <input id='pet' type='text' placeholder="name of pet" autofocus></input>
                    </form>
                    {this.addPet()}
            </div>
        );
    }
}

export default AddPet;

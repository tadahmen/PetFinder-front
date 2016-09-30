import React from 'react';
import Pets from './pets';
import AddPet from './addpet';


class PetOwner extends React.Component {

    render() {
        return (
            <div id="pet-owner" onClick={this.props.onClick}>
                <Pets/>
                <AddPet/>
            </div>
        );
    }
}

export default PetOwner;

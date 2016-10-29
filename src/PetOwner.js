import React from 'react';
import Pets from './pets';
import AddPet from './addpet';


class PetOwner extends React.Component {

    // componentWillMount(){
    // // this.setState({saveNewPet : this.props.saveNewPet.bind(this)});
    // }

    render() {
        return (
            <div id="pet-owner" onClick={this.props.onClick}>
                <h2 className ='tile-title'> My Pet </h2>
                <Pets
                    myPets = {this.props.myPets}
                    onChange = {this.props.onChange.bind(this)}/>
                <AddPet saveNewPet = {this.props.saveNewPet.bind(this)}/>
            </div>
        );
    }
}

export default PetOwner;

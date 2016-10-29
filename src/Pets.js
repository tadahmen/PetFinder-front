import React from 'react';
import MyPet from './mypet';

class Pets extends React.Component {
    constructor() {
        super()

        this.state = {
        }
    }

    listPets() {
        console.log("this.props.allPets: " + this.props.allPets + " ( from Pets.js->listPets() )");
        console.log("this.props.allPets is Array?: " + Array.isArray(this.props.allPets));
        let component = this;
        return (this.props.myPets.map(function (pet) {
            console.log("name of pet: " + pet.name + " (from Pets.js->listPets)");
            return <MyPet
                key = {pet.id}
                pet = {pet}
                onChange = {component.props.onChange.bind(component)}
            />
        }))
    }

    render() {
      return (
          <div>
              <p> missing pets:</p>
              <table id= "pet-list">
                <thead>
                    <tr>
                        <th>pet name</th>
                        <th>species</th>
                    </tr>
                </thead>
                <tbody>
                    {this.listPets()}
                </tbody>
              </table>
          </div>
      );
    }
}

export default Pets;

import React from 'react';

class Pets extends React.Component {
    constructor() {
    super()

    this.state = {
        }
    }


    listPets() {
        console.log("this.props.allPets: " + this.props.allPets + " ( from Pets.js->listPets() )");
        console.log("this.props.allPets is Array?: " + Array.isArray(this.props.allPets));
        return (this.props.allPets.map(function (pet) {
            console.log("name of pet: " + pet.name + " (from Pets.js->listPets)");
            return (
                <tr key={pet.id}>
                    <td> {pet.name} </td>
                    <td> {pet.species} </td>
                </tr>
            )
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

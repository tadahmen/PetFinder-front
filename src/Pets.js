import React from 'react';

class Pets extends React.Component {
    constructor() {
    super()

    this.state = {
          count: 2,
          pets: [{id: 1, name: "Koala Jaap"}, {id: 2, name: "Kip Jacqueline"}],
        }
    }

  listPets() {
      let petArray = this.state.pets;

      return petArray.map(function (pet) {
          console.log(pet + " (from App.js->listPets)");
          return <li key={pet.id}> {pet.name} </li>;
      });
  }

  render() {
      return (
          <div>
                  <p> missing pets:</p>
                  <ul id= "pet-list">
                      {this.listPets()}
                  </ul>
          </div>
      );
  }
}

export default Pets;

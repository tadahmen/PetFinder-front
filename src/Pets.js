import React from 'react';

class Pets extends React.Component {
    constructor() {
    super()

    this.state = {
          count: 2,
          pets: ["Koala Jaap", "Kip Jacqueline"],
        }
  }

  listPets() {
      let petArray = this.state.pets;

      return petArray.map(function (pet) {
          console.log(pet + " (from App.js->listPets)");
          return <li> {pet} </li>;
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

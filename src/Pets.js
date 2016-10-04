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
      return this.props.allPets.map(function (pet) {
          console.log("name of pet: " + pet.name + " (from Pets.js->listPets)");
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

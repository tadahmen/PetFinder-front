import React from 'react';
import './stylesheets/app.scss';

class App extends React.Component {
    constructor() {
    super()

    this.state = {
          header: "PetFinder",
          count: 2,
          pets: ["Koala Jaap", "Kip Jacqueline"],
        }
  }

  listPets() {
      let pet=0;
      return <li> {this.state.pets[pet]} </li>;
  }

  addPet() {
      newPet=$('pet').val
    // do ajax post request for pet
  }

    render() {
        return (
            <div>
                <h1>{this.state.pets[0]}</h1>
                <form>
                    <p> missing pets:</p>
                    <ul>
                        {this.listPets()}
                    </ul>
                    <input id='pet' type='text' placeholder="name of pet" autofocus></input>
                </form>
            </div>
        );
    }
}

export default App;

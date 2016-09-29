import React from 'react';
import './stylesheets/app.scss';
import Pets from './pets';

class App extends React.Component {

  addPet() {
      newPet=$('pet').val
    // do ajax post request for pet
  }

    render() {
        return (
            <div>
                <h1>PetFinder</h1>
                <Pets/>
                <form>
                    <input id='pet' type='text' placeholder="name of pet" autofocus></input>
                </form>
            </div>
        );
    }
}

export default App;

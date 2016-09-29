import React from 'react';
import './stylesheets/app.scss';
import Header from './header';
import Pets from './pets';
import AddPet from './addpet';
import PetOwner from './petowner'

class App extends React.Component {

    render() {
        return (
            <div>
                <Header/>
                <PetOwner/>
            </div>
        );
    }
}

export default App;

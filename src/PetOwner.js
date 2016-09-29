import React from 'react';
import Pets from './pets';
import AddPet from './addpet';
import PetOwner from './petowner'


class App extends React.Component {

    render() {
        return (
            <div>
                <Pets/>
                <AddPet/>
            </div>
        );
    }
}

export default App;

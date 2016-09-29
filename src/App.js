import React from 'react';
import './stylesheets/app.scss';
import Header from './header';
import Pets from './pets';
import AddPet from './addpet';

class App extends React.Component {

    render() {
        return (
            <div>
                <Header/>
                <Pets/>
                <AddPet/>
            </div>
        );
    }
}

export default App;

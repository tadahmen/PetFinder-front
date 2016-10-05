
import React from 'react';
import './stylesheets/app.scss';
import Header from './header';
import PetOwner from './petowner';
import PetFinder from './petfinder';

// import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

class App extends React.Component {
    constructor() {
        super()

        this.state = {
            divPosition: {left: '0px'},
            activeScreen: '',
            // allPets : ''
        }

    }

    componentWillMount() {
        let allPets = JSON.parse(localStorage.petList).pets;    //For the moment, I'm using localStorage as db. I specified the initial data.
        this.setState({allPets: allPets});
        this.saveNewPet = this.saveNewPet.bind(this);
    }

    moveRight() {
        // console.log("from App->moveRight()");
        this.setState({
            divPosition: {transition: 'transform 1s ease-in-out', transform: 'translate(45%, 0)'},
            activeScreen: 'owner',
        });
    }

    moveLeft() {
        this.setState({
            divPosition: {transition: 'transform 1s ease-in-out', transform: 'translate(-45%, 0)'},
            activeScreen: 'finder',
        });
    }

    initialPosition() {
        this.setState({
            divPosition: {transition: 'transform 1s ease-in-out', transform: 'translate(0, 0)'},
            activeScreen: 'none',
        })
    }

    saveNewPet(newPet, ev) {
        // ev.preventDefault();
        // ev.stopPropagation();
        // ev.nativeEvent.stopImmediatePropagation();

        //these lines are just for checking the values:
        // console.log("clicked submit in AddPet.js (from AddPet->saveNewPet)");
        // this.setState({"event in saveNewPet": ev});
        // console.log("arg passed by submit in AddPet.js: " + arg + " (from App.js->saveNewPet)");
        // console.log("first arrg: " + arg[0] + ", second arg: " + arg[1]);

        //save inputted pet in state:
        let id=this.state.allPets.length+1;
        let newPetList = this.state.allPets.concat({"id" : id, "name" : newPet.name, "species": newPet.species});
        this.setState({allPets: newPetList});

        //clear input:
        localStorage.inputState = JSON.stringify({"lastInput" : " "});
        //ajax post this.state.newPet
    }

    render() {
        return (
            <div id='app'>
            <Header onClick={this.initialPosition.bind(this)}/>
            <div
                id="flex-container"
                className={this.state.activeScreen}
                style={this.state.divPosition}>

                <PetOwner
                    allPets = {this.state.allPets}
                    onClick={this.moveRight.bind(this)}
                    // saveStateInDB={this.saveStateInDB.bind(this)}
                    saveNewPet={this.saveNewPet.bind(this)}/>
                <PetFinder
                    allPets = {this.state.allPets}
                    onClick={this.moveLeft.bind(this)}/>
            </div>
            </div>
        );
    }
}

export default App;


import React from 'react';
import './stylesheets/app.scss';
import Header from './header';
import StartPage from './startpage';
import PetOwner from './petowner';
import PetFinder from './petfinder';
import jQuery from 'jquery';

// import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

class App extends React.Component {
    constructor() {
        super()

        this.state = {
            divPosition: {left: '0px'},
            activeScreen: '',
            loggedIn : (sessionStorage.loggedIn != undefined ? sessionStorage.loggedIn=="true" : false),
            startPage: "login"
        }
    }

    componentWillMount() {
            //For the moment, I'm using localStorage as db. I specified the initial data.
        this.saveNewPet = this.saveNewPet.bind(this);
        this.loadPets(); //voor testen rails sessionstorage
    }

    loadPets() {
        let component = this;
        jQuery.ajax({
            url: 'http://localhost:5000/api/pets',
            type: 'GET',
            data: {session_id: sessionStorage.sessionId},
            contentType: 'application/json; charset=utf-8',
            dataType: 'json',
            xhrFields: {
                withCredentials: true
           },
           success: function (response) {
                component.setState({allPets: response.pets});
                console.log(response)
            },
            error: function () {
                alert("error");
            }
        })
        // console.log("sessionStorage: " + sessionStorage.sessionStorageId);
        // jQuery.getJSON('http://localhost:5000/api/pets', (function(data) {
        //     this.setState({allPets: data.pets});
        //     console.log(data);
        // }).bind(this))
    }

    toggleLogin() {
        console.log("start toggleLogin<-App.js");

        this.loadPets();
        this.setState({startPage: "lo gin"});

        sessionStorage.loggedIn = !this.state.loggedIn;
        this.setState({loggedIn : !this.state.loggedIn});
    }

    setStartPage(type) {
        this.setState({startPage: type});
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

    saveNewPet(newPet, ev) {    //saves a new pet in the db.
        // ev.preventDefault();
        // ev.stopPropagation();
        // ev.nativeEvent.stopImmediatePropagation();

        //save inputted pet in state:
        let id=this.state.allPets.length+1;
        let newPetList = this.state.allPets.concat({"id" : id, "name" : newPet.name, "species": newPet.species});
        this.setState({allPets: newPetList});

        //clear input:
        localStorage.inputState = JSON.stringify({"lastInput" : " "});

        //ajax post newPet
        jQuery.ajax({
            type: "POST",
            url: "http://localhost:5000/api/pets.json",
            data: JSON.stringify({
                pet: newPet
            }),
            contentType: "application/json",
            dataType: "json"
        }).done(function(data) {
            console.log( "saved pet: " + data );
        }).fail(function(error) {
            console.log("pet wasn't saved: " + error);
        });
    }

    saveEditedPet(editedPet, ev) {     //saves changed state of existing pet in db
        // ev.preventDefault();
        // ev.stopPropagation();
        // ev.nativeEvent.stopImmediatePropagation();

        let changedPetList = this.state.allPets.map(function(pet) {
            pet.id == editedPet.id ? editedPet : pet;
        });
        localStorage.petList = JSON.stringify({ "pets" : changedPetList });
    }

    render() {
        return (
            <div id='app'>
                <Header onClick={this.initialPosition.bind(this)}
                    loggedIn = {this.state.loggedIn}
                    onChange = {this.toggleLogin.bind(this)}
                    setStartPage = {this.setStartPage.bind(this)}/>

                    {this.state.loggedIn == true
                        ?   <div
                                id="flex-container"
                                className={this.state.activeScreen}
                                style={this.state.divPosition}>
                                <PetOwner
                                    allPets = {this.state.allPets}
                                    onClick={this.moveRight.bind(this)}
                                    // saveStateInDB={this.saveStateInDB.bind(this)}
                                    saveNewPet={this.saveNewPet.bind(this)}
                                    onChange = {this.saveEditedPet.bind(this)}/>
                                <PetFinder
                                    allPets = {this.state.allPets}
                                    onClick= {this.moveLeft.bind(this)}
                                    onChange = {this.saveEditedPet.bind(this)}/>
                            </div>
                        :   <StartPage
                                onChange = {this.toggleLogin.bind(this)}
                                pageType = {this.state.startPage}/>
                    }

            </div>
        );
    }
}

export default App;

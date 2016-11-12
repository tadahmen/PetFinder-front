
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
            allPets: sessionStorage.allPets != undefined ? JSON.parse(sessionStorage.allPets)  : [],
            myPets: sessionStorage.myPets != undefined ? JSON.parse(sessionStorage.myPets)  : [],
            divPosition: {left: '0px'},
            activeScreen: '',
            loggedIn : (sessionStorage.loggedIn != undefined ? sessionStorage.loggedIn=="true" : false),
            startPage: "login"
        }
    }

    componentWillMount() {
        this.saveNewPet = this.saveNewPet.bind(this);
    }

    //for loading only the pets owned by the current user
    loadMyPets() {
        let component = this;
        jQuery.ajax({
            url: 'http://localhost:5000/api/pets/mypets',
            type: 'GET',
            data: {session_id: sessionStorage.sessionId},
            contentType: 'application/json; charset=utf-8',
            dataType: 'json',
            xhrFields: {
                withCredentials: true
           },
           success: function (response) {
                component.setState({myPets: response.pets});
                sessionStorage.myPets = JSON.stringify(response.pets);
                // console.log(response)
            },
            error: function () {
                alert("error");
            }
        })
    }

    loadAllPets() {
        console.log("sessionStorage: " + sessionStorage.sessionStorageId);
        jQuery.getJSON('http://localhost:5000/api/pets', (function(data) {
            this.setState({allPets: data.pets});
            sessionStorage.allPets = JSON.stringify(data.pets);
            // console.log(data);
        }).bind(this))
    }

    //sets login to true or false
    toggleLogin() {
        console.log("start toggleLogin<-App.js");
        this.loadAllPets();
        this.loadMyPets();
        this.setState({startPage: "login"});

        sessionStorage.loggedIn = !this.state.loggedIn;
        this.setState({loggedIn : !this.state.loggedIn});
    }

    //for setting the start page to 'login' or 'sign up'
    setStartPage(type) {
        this.setState({startPage: type});
    }

    //for sliding the UI tiles right
    moveRight() {
        // console.log("from App->moveRight()");
        this.setState({
            divPosition: {transition: 'transform 1s ease-in-out', transform: 'translate(45%, 0)'},
            activeScreen: 'owner',
        });
    }

    //for sliding the UI tiles left
    moveLeft() {
        this.setState({
            divPosition: {transition: 'transform 1s ease-in-out', transform: 'translate(-45%, 0)'},
            activeScreen: 'finder',
        });
    }

    //for sliding the UI tiles to initial position (center)
    initialPosition() {
        this.setState({
            divPosition: {transition: 'transform 1s ease-in-out', transform: 'translate(0, 0)'},
            activeScreen: 'none',
        })
    }

    //saves a new pet in the db.
    saveNewPet(newPet, ev) {
        // ev.preventDefault();
        // ev.stopPropagation();
        // ev.nativeEvent.stopImmediatePropagation();

        //save inputted pet in state:
        let id=this.state.allPets.length+1;
        let newPetList = this.state.allPets.concat({"id" : id, "name" : newPet.name, "species": newPet.species});
        let newMyPetList = this.state.myPets.concat({"name" : newPet.name, "species": newPet.species});

        //put new petlists in state (to show new pet immediately in view)
        this.setState({
            allPets: newPetList,
            myPets: newMyPetList
        });

        //save changes in session storage (to 'remember' the new pet when page refreshes)
        sessionStorage.allPets = JSON.stringify(newPetList);
        sessionStorage.myPets = JSON.stringify(newMyPetList);


        //clear memory of last input:
        localStorage.inputState = JSON.stringify({"lastInput" : " "});

        //save new pet in db:
        jQuery.ajax({
            type: "POST",
            url: "http://localhost:5000/api/pets",
            data: JSON.stringify({
                pet: newPet
            }),
            contentType: "application/json",
            dataType: "json",
            xhrFields: {
                withCredentials: true
           },
        }).done(function(data) {
            console.log( "saved pet: " + data );
        }).fail(function(error) {
            console.log("pet wasn't saved: " + error);
        });
    }

    //updates the db, and updates the state of both owner and finder
    saveEditedPet(editedPet) {
        let changedPetList = this.state.allPets.map(function(pet) {
            return pet.id == editedPet.id ? editedPet : pet;
        });
        let changedMyPetList = this.state.myPets.map(function(pet) {
            return pet.id == editedPet.id ? editedPet : pet;
        });

        this.setState({
            allPets: changedPetList,
            myPets: changedMyPetList
        });

        //save changes in session storage (to 'remember' the new pet when page refreshes)
        sessionStorage.allPets = JSON.stringify(changedPetList);
        sessionStorage.myPets = JSON.stringify(changedMyPetList);

        jQuery.ajax({
            type: "PUT",
            url: "http://localhost:5000/api/pets/" + editedPet.id,
            data: JSON.stringify({
                pet: editedPet
            }),
            contentType: "application/json",
            dataType: "json",
        //     xhrFields: {
        //         withCredentials: true
        //    },
        }).done(function(data) {
            console.log( "change to pet was saved: " + data );
        }).fail(function(error) {
            console.log("change to pet wasn't saved: " + error);
        });

        // localStorage.allPets = JSON.stringify({
        //     "allPets" : changedAllPetsList,
        //     "myPets" : changedMyPetsList
        // }); //use db instead
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
                                    myPets = {this.state.myPets}
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

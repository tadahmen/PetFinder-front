import React from 'react';
import jQuery from 'jquery';
var $ = require ('jquery');

class AddPet extends React.Component {
    constructor() {
        super()

        this.state = {
            newPet: '...',
        }
    }

    componentDidMount() {
        //show last unsaved input:
        let savedState = localStorage.inputState != undefined ? JSON.parse(localStorage.inputState).lastInput : '';
        this.refs.name.value = savedState.name != undefined ? savedState.name : '';
        this.refs.species.value = savedState.species != undefined ? savedState.species : '';
        // this.setState({newPet: savedState})
        // console.log("LocalStorage.InputState: " + JSON.parse(localStorage.inputState).lastInput.name);
        // let savedState = localStorage.inputState != undefined ? JSON.parse(localStorage.inputState).lastInput.name : '';
        // this.refs.name.value = savedState;
        // this.setState({newPet: savedState})

        // this.setState({saveNewPet : this.props.saveNewPet.bind(this)});
    }

    componentWillReceiveProps(nextProps) {
        //refresh last unsaved input:
        let savedState = localStorage.inputState != undefined ? JSON.parse(localStorage.inputState).lastInput : '';
        this.refs.name.value = savedState.name != undefined ? savedState.name : '';
        this.refs.species.value = savedState.species != undefined ? savedState.species : '';
        // this.setState({newPet: savedState});
    }

    addPet(event) {
        // this.setState({newPet: {
        // "name" : this.refs.name.value,
        // "species" : this.refs.species.value
        // }});
        this.setState({
            newPet: {
                name: this.refs.name.value,
                species: this.refs.species.value
            },
            editing: event.target.name})
    }

    saveStateInDB(ev) {
        console.log("CLICKED outside pet inputfield in addPet.js (from App->saveStateInDB)");
        // console.log("event target: " + ev.targ/et.value);
        let that = this;
        localStorage.inputState =
            JSON.stringify({"lastInput" : {
                "name" : this.refs.name.value,
                "species" : this.refs.species.value
            }});
        this.setState({editing: "click on a field to edit it"})
        //ajax post this.state.newPet to something like: currentState (in case of accidental crash);
    }

    savePet(ev) {
        console.log("start savePet<-AddPet.js");
        ev.preventDefault();
        this.props.saveNewPet(this.state.newPet);
        this.setState({
            newPet: {
                name: "",
                species: ""
            }})
    }

    // clearInput(ev) {
    //     ev.preventDefault();
    //     ev.nativeEvent.stopImmediatePropagation();
    //     console.log("clearing input");
    //     ReactDOM.findDOMNode(this.refs.name).value = " ";
    //     this.setState({newPet: " "});
    //     localStorage.inputState = JSON.stringify({"lastInput" : " "});
    // }

    render() {
        return (
            <div>
                <form>
                    <input
                        name='pet name'
                        className='pet'
                        ref='name'
                        type='text'
                        key='1'
                        placeholder="name of pet"
                        onFocus={this.addPet.bind(this)}
                        onChange={this.addPet.bind(this)}
                        onBlur={this.saveStateInDB.bind(this)}
                        autoFocus>
                    </input>
                    <input
                        name = 'pet species'
                        className='pet'
                        ref='species'
                        type='text'
                        key='2'
                        placeholder="species"
                        onFocus={this.addPet.bind(this)}
                        onChange={this.addPet.bind(this)}
                        onBlur={this.saveStateInDB.bind(this)}
                        autoFocus>
                    </input>
                    <button
                        onClick={this.savePet.bind(this)}
                        > Submit </button>
                </form>
                <p> now editing: <span id='show-edited-field'> {this.state.editing}</span> </p>
            </div>
        );
    }
}

export default AddPet;

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
        this.refs.petName.value = savedState.petName != undefined ? savedState.petName : '';
        this.refs.species.value = savedState.species != undefined ? savedState.species : '';
        // this.setState({newPet: savedState})
        // console.log("LocalStorage.InputState: " + JSON.parse(localStorage.inputState).lastInput.petName);
        // let savedState = localStorage.inputState != undefined ? JSON.parse(localStorage.inputState).lastInput.petName : '';
        // this.refs.petName.value = savedState;
        // this.setState({newPet: savedState})

        // this.setState({saveNewPet : this.props.saveNewPet.bind(this)});
    }

    componentWillReceiveProps(nextProps) {
        //refresh last unsaved input:
        let savedState = localStorage.inputState != undefined ? JSON.parse(localStorage.inputState).lastInput : '';
        this.refs.petName.value = savedState.petName != undefined ? savedState.petName : '';
        this.refs.species.value = savedState.species != undefined ? savedState.species : '';
        // this.setState({newPet: savedState});
    }

    addPet(event) {
        // this.setState({newPet: {
        // "petName" : this.refs.petName.value,
        // "species" : this.refs.species.value
        // }});
        this.setState({
            newPet: event.target.value,
            editing: event.target.name})
    }

    saveStateInDB(ev) {
        console.log("CLICKED outside pet inputfield in addPet.js (from App->saveStateInDB)");
        console.log("event target: " + ev.target.value);
        let that = this;
        localStorage.inputState =
            JSON.stringify({"lastInput" : {
                "petName" : this.refs.petName.value,
                "species" : this.refs.species.value
            }});
        this.setState({editing: "click on a field to edit it"})
        //ajax post this.state.newPet to something like: currentState (in case of accidental crash);
    }

    // clearInput(ev) {
    //     ev.preventDefault();
    //     ev.nativeEvent.stopImmediatePropagation();
    //     console.log("clearing input");
    //     ReactDOM.findDOMNode(this.refs.petName).value = " ";
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
                        ref='petName'
                        type='text'
                        key='1'
                        placeholder="name of pet"
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
                        onChange={this.addPet.bind(this)}
                        onBlur={this.saveStateInDB.bind(this)}
                        autoFocus>
                    </input>
                    <button
                        onClick={this.props.saveNewPet.bind(this, this.state.newPet)}
                        > Submit </button>
                </form>
                <p> now editing: <span id='show-edited-field'> {this.state.editing}</span> </p>
            </div>
        );
    }
}

export default AddPet;

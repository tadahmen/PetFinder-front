import React from 'react';

class petInFinder extends React.Component {
    constructor() {
        super()

        this.state = {
        }
    }

    showOptions(ev) {
        console.log("start showOptions()<-PetFinder.js");
        this.setState({showOptions: true});
    }

    hideOptions() {
        console.log("start showOptions()<-PetFinder.js");
        this.setState({showOptions: false});
    }

    addToTargetList(ev) {
        console.log("start addToTargetList()<-PetFinder.js");
        console.log("event: " + ev);
        // console.log("keys: " + this.accessKeys);
    }

    render() {
        return (
            <div id="pet-in-finder">
            <li onMouseEnter={this.showOptions.bind(this)} onMouseLeave={this.hideOptions.bind(this)}>
                {this.props.pet.name}
                {this.state.showOptions
                    ?
                        <span>
                            <button onClick={this.addToTargetList.bind(this)}> add </button>
                            <button> found </button>
                        </span>
                    : null
                }
            </li>
            </div>
        );
    }
}

export default petInFinder

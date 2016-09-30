import React from 'react';

class PetFinder extends React.Component {

    render() {
        return (
            <div id="pet-finder" onClick={this.props.onClick}>
                <p> find pets </p>
            </div>
        );
    }
}

export default PetFinder;

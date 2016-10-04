import React from 'react';

class PetFinder extends React.Component {

    render() {
        return (
            <div id="pet-finder" onClick={this.props.onClick}>
                <h2 className="tile-title"> Find Pets </h2>
                <button>test Click</button>
            </div>
        );
    }
}

export default PetFinder;

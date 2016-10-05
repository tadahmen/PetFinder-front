import React from 'react';

class Header extends React.Component {

    render() {
        return (
            <div id="header" onClick={this.props.onClick}>
                <h1 id="page-title"> PetFinder </h1>
            </div>
        );
    }
}

export default Header;

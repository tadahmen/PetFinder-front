import React from 'react';
import LoginStatus from './loginstatus';

class Header extends React.Component {

    render() {
        return (
            <div id="header" onClick={this.props.onClick}>
                <logo/>
                <h1 id="page-title"> PetFinder </h1>
                <LoginStatus
                loggedIn = {this.props.loggedIn}
                onChange = {this.props.onChange.bind(this)}/>
            </div>
        );
    }
}

export default Header;

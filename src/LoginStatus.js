import React from 'react';

class LoginStatus extends React.Component {

    constructor() {
        super()

        this.state = {
            loggedIn : false //sessionStorage.loggedin,
            // allPets : ''
        }
    }

    toggleLogin() {
        this.setState({loggedIn : !this.state.loggedIn})
    }

    render() {
        return(
            <ul id="login-status">
                {this.props.loggedIn ? <li onClick = {this.props.onChange.bind(this)}> logout </li>
                    : <span>
                        <li onClick = {this.props.onChange.bind(this)}>login</li>
                        <li onClick = {this.props.onChange}>sign in </li>
                    </span>
                }
            </ul>
        )
    }
}

export default LoginStatus;

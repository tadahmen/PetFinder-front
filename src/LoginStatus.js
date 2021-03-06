import React from 'react';

class LoginStatus extends React.Component {

    showLogin(ev) {
        this.props.setStartPage(ev.target.outerText);
    }

    render() {
        return(
            <ul id="login-status">
                {this.props.loggedIn ? <li onClick = {this.props.onChange.bind(this)}> logout </li>
                    : <span>
                        <li onClick = {this.showLogin.bind(this)}>login</li>
                        <li onClick = {this.showLogin.bind(this)}>sign up </li>
                    </span>
                }
            </ul>
        )
    }
}

export default LoginStatus;

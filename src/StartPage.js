import React from 'react';
import jQuery from 'jquery';

class StartPage extends React.Component {

    // componentWillMount(){
    // // this.setState({saveNewPet : this.props.saveNewPet.bind(this)});
    // }

    checkLogin(ev) {
        ev.preventDefault();
        let username = this.refs.username.value;
        let password = this.refs.password.value;
        //ajax request to validate login
        ((username != '') && (password != '') /* check combination in db*/) ? this.props.onChange() : 0;
    }

    checkSignUp(ev) {
        ev.preventDefault();
        let username = this.refs.username.value;
        let password = this.refs.password.value;
        let password_check = this.refs.password_check.value;
        let e_mail = this.refs.e_mail.value;
        if ((username != '') && (password != '' && password == password_check) && (e_mail != '')) {
//check if name or password are in db. If not, then save in db and:
            this.props.onChange()
        }
    }

    render() {
        return (
            <div id="start-page">
                <h1 className="tile-title"> {this.props.pageType} </h1>
                <div className="tile-content">
                {this.props.pageType == "login" ?
                    <form name="login">
                        <p> <label htmlFor="username"> username: &nbsp; </label></p>
                        <input ref="username" id="username" placeholder = "your name" autoFocus/>
                        <p> <label htmlFor = "password"> password: &nbsp; </label> </p>
                        <input ref="password" id = "password" placeholder = "your password"/>
                        <button onClick = {this.checkLogin.bind(this)}> submit </button>
                    </form>
                :
                    <form name="sign-up">
                        <p> username: &nbsp; </p>
                        <input ref="username" placeholder = "your name" autoFocus/>
                        <p> password: &nbsp; </p>
                        <input ref="password" placeholder = "your password"/>
                        <p> password again: &nbsp; </p>
                        <input ref="password_check" placeholder = "your password"/>
                        <p> e-mail address: &nbsp; </p>
                        <input ref="e_mail" placeholder="valid e-mail address"/>
                        <button onClick = {this.checkSignUp.bind(this)}> submit </button>
                    </form>
                }
                </div>
            </div>
        );
    }
}

export default StartPage;

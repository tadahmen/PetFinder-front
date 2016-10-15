import React from 'react';

class StartPage extends React.Component {

    // componentWillMount(){
    // // this.setState({saveNewPet : this.props.saveNewPet.bind(this)});
    // }

    checkLogin(ev) {
        ev.preventDefault();
        this.refs.name.value != undefined ? this.props.onChange() : 0;
    }

    render() {
        return (
            <div id="start-page">
                <h1 className="tile-title"> {this.props.pageType} </h1>
                <div className="tile-content">
                {this.props.pageType == "login" ?
                    <form name="login">
                        <p> username: &nbsp; </p>
                        <input ref="name" placeholder = "your name"/>
                        <p> password: &nbsp; </p>
                        <input ref="password" placeholder = "your password"/>
                        <button onClick = {this.checkLogin.bind(this)}> submit </button>
                    </form>
                :
                    <form name="sign-up">
                        <p> username: &nbsp; </p>
                        <input ref="name" placeholder = "your name"/>
                        <p> password: &nbsp; </p>
                        <input ref="password" placeholder = "your password"/>
                        <p> type password again (to check): &nbsp; </p>
                        <input ref="password-check" placeholder = "your password"/>
                        <p> e-mail address: &nbsp; </p>
                        <input ref="e-mail" placeholder="valid e-mail address"/>
                        <button onClick = {this.checkLogin.bind(this)}> submit </button>
                    </form>
                }
                </div>
            </div>
        );
    }
}

export default StartPage;

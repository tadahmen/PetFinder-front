import React from 'react';

class StartPage extends React.Component {

    // componentWillMount(){
    // // this.setState({saveNewPet : this.props.saveNewPet.bind(this)});
    // }

    checkLogin() {
        this.refs.name.value != undefined ? this.props.onChange() : 0;
    }

    render() {
        return (
            <div id="start-page">
                <h1 className="tile-title"> Login </h1>
                <div className="tile-content">
                    <p> login </p>
                    <input ref="name" placeholder = "your name"/>
                    <button onClick = {this.checkLogin.bind(this)}> submit </button>
                </div>
            </div>
        );
    }
}

export default StartPage;

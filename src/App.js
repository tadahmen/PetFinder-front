import React from 'react';
import './stylesheets/app.scss';
import Header from './header';
import PetOwner from './petowner';
import PetFinder from './petfinder';

// import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

class App extends React.Component {
    constructor() {
    super()

    this.state = {
          divPosition: {left: '0px'},
          activeScreen: '',
        }
    }

    moveRight() {
        console.log("from App->moveRight()");
        this.setState({
            divPosition: {left:'45%', transition: 'left 1s'},
            activeScreen: 'owner',
        });
    }

    moveLeft() {
        this.setState({
            divPosition: {right:'45%'},
            activeScreen: 'finder',
        });
    }

    render() {
        return (
            <div>
                <Header/>
                <div id="flex-container" className={this.state.activeScreen} style={this.state.divPosition}>
                    <PetOwner onClick={this.moveRight.bind(this)}/>
                    <PetFinder onClick={this.moveLeft.bind(this)}/>
                </div>
            </div>
        );
    }
}

export default App;

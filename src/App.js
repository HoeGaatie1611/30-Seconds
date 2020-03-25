import React from "react";
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Redirect
} from "react-router-dom";

import './CSS/header.css';

import Home from "./Views/home";
import Cards from "./Views/Cards";
import Board from "./Views/board";
import OtherTeam from "./Views/OtherTeam";
import Confirm from "./Views/confirm";
import Redirecting from "./Views/redirecting";

// export default function App() {
class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            friendly: 0,
            enemy: 0,
            firstTeam: null,
            secondTeam: null,
            turn: null
        }
    }

    changeGlobalState = async (change, value) => {
        this.setState({[`${change}`]: value});
    };

    resetGame = async () => {
        if (window.confirm("Weet je zeker dat je alles wilt resetten?"))
            window.location.href = "/"; //todo dit kan beter
    };

    render() {
        return (
            <Router>
                {(window.location.pathname !== "/" && this.state.turn === null) ? <Redirect to='/'/> : null}
                <div className={"GlobalHeader"}>
                    <button className={"button4 headerButton"} onClick={this.resetGame}>Reset game</button>
                    {this.state.reset ? <Redirect to="/"/> : null}
                </div>
                <div>
                    <Switch>
                        <Route exact path="/">
                            <Home state={this.state} changeGlobalState={this.changeGlobalState}/>
                        </Route>
                        <Route path="/cards">
                            <Cards state={this.state} changeGlobalState={this.changeGlobalState}/>
                        </Route>
                        <Route path="/board">
                            <Board state={this.state} changeGlobalState={this.changeGlobalState}/>
                        </Route>
                        <Route path="/noturn">
                            <OtherTeam state={this.state} changeGlobalState={this.changeGlobalState}/>
                        </Route>
                        <Route path="/confirm">
                            <Confirm state={this.state} changeGlobalState={this.changeGlobalState}/>
                        </Route>
                        <Route path="/redirect">
                            <Redirecting state={this.state} changeGlobalState={this.changeGlobalState}/>
                        </Route>
                    </Switch>
                </div>
            </Router>
        );
    }
}

export default App;

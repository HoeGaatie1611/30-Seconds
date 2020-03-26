import React from 'react';
import '../CSS/App.css';
import {withRouter} from 'react-router-dom';

class Home extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            firstTeam: "",
            secondTeam: ""
        }
    };

    async componentDidMount() {
        if (this.props.state.friendly === undefined) {
            await this.props.changeGlobalState("friendly", 0);
            await this.props.changeGlobalState("enemy", 0);
        }
    };

    handleChange = (event) => {
        this.setState({
            [`${event.target.id}`]: event.target.value
        });
    };

    startGame = async () => {
        if (!this.state.firstTeam.includes("-") && this.state.firstTeam !== "")
            if (!this.state.secondTeam.includes("-") && this.state.secondTeam !== "") {
                await this.props.changeGlobalState("firstTeam", this.state.firstTeam);
                await this.props.changeGlobalState("secondTeam", this.state.secondTeam);
                this.props.history.push("/confirm");
            } else
                alert("Vul een team naam in voor het TWEEDE team (Deze mag geen streep bevatten");
        else
            alert("Vul een team naam in voor het EERSTE team (Deze mag geen streep bevatten");
    };

    cardsOnly = async () => {
        this.props.changeGlobalState("cardsOnly", true);
        this.props.history.push("/cards");
    }

    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <h1>Welkom bij online 30 Seconds!</h1>
                    <h2>Om te beginnen, vul de teamnamen hieronder in:</h2>
                    <label>
                        Team 1:
                        <input type="text" id={"firstTeam"} value={this.state.value} onChange={this.handleChange}/>
                    </label>
                    <label>
                        Team 2:
                        <input type="text" id={"secondTeam"} value={this.state.value} onChange={this.handleChange}/>
                    </label>
                    <h1></h1>
                    {/*<Link to="/cards">*/}
                    <button className={"button3 button"} onClick={this.startGame}>Ga verder!</button>

                    <h1/>
                    <button className={"button2 button"} onClick={this.cardsOnly}>Klik hier als je alleen met kaarten wilt spelen</button>
                    {/*</Link>*/}

                </header>
            </div>
        );
    }
}

export default withRouter(Home);

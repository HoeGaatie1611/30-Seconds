import React from 'react';
import '../CSS/App.css';
import {withRouter} from 'react-router-dom';
import Checkbox from '@material-ui/core/Checkbox';

class Confirm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            firstTeam: "",
            secondTeam: "",
            weStart: false,
            iRead: false,
            firstLine: "Nee! De tegenstander begint als eerste",
            secondLine: "Nee! Mijn teamgenoot gaat eerst lezen",
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

    handleCheckbox = (e) => {
        const name = e.target.id;
        const checked = e.target.checked;
        this.setState((prevState) => ({
            [name]: !prevState[name]
        }));

        if (name === "weStart" && !checked)
            this.setState({
                firstLine: "Nee! De tegenstander begint als eerste",
            });
        else if (name === "weStart" && checked)
            this.setState({
                firstLine: "Ja! Wij beginnen als eerste",
            });
        if (name === "iRead" && !checked)
            this.setState({
                secondLine: "Nee! Mijn teamgenoot gaat eerst lezen",
            });
        else if (name === "iRead" && checked)
            this.setState({
                secondLine: "Ja! Ik begin met oplezen",
            });
    };

    startGame = async () => {
        if(this.state.iRead && this.state.weStart)
            this.props.changeGlobalState("turn", 1);
        else if(!this.state.iRead && this.state.weStart)
            this.props.changeGlobalState("turn", 3);
        if(this.state.iRead && !this.state.weStart)
            this.props.changeGlobalState("turn", 2);
        else if(!this.state.iRead && !this.state.weStart)
            this.props.changeGlobalState("turn", 4);

        this.props.history.push('/redirect');
    };

    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <h1>We gaan bijna beginnen....</h1>
                    <h2>Vul hieronder in of je met een dobbelsteen wilt spelen en wie begint.</h2>
                    <label>
                        Beginnen jullie als eerste?
                    </label>
                    <label>
                        <Checkbox
                            checked={this.state.weStart}
                            id={"weStart"}
                            onChange={this.handleCheckbox}
                            color="primary"
                            inputProps={{'aria-label': 'secondary checkbox'}}
                        />
                        {this.state.firstLine}
                    </label>
                    <br/>
                    <label>
                        Begin jij met oplezen of de ander?
                    </label>
                    <label>
                        <Checkbox
                            checked={this.state.iRead}
                            id={"iRead"}
                            onChange={this.handleCheckbox}
                            color="primary"
                            inputProps={{'aria-label': 'secondary checkbox'}}
                        />
                        {this.state.secondLine}
                    </label>
                    <h1 />
                    <button className={"button3 button"} onClick={this.startGame}>Begin met spelen</button>
                </header>
            </div>
        );
    }
}

export default withRouter(Confirm);

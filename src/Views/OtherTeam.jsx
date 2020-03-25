import React from 'react';
import '../CSS/App.css';
import {Link, withRouter} from 'react-router-dom';

class OtherTeam extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            message: "Vul hieronder in hoeveel de tegenstander goed heeft",
            aantal: 0
        }
    }

    componentWillMount() {
        if(this.props.state.turn === 3)
            this.setState({
                message: "Jouw teamgenoot is nu aan de beurt. Succes!"
            });
        else
            this.setState({
                message: "Momenteel is de tegenstander aan de beurt, ze verneuken het vast! ;-)"
            });
    }

    handleChange= (event) => {
        this.setState({
            aantal: event.target.value
        })
    };

    handleClick = () => {
        if(this.state.aantal < 6) {
            let turnNumber = this.props.state.turn;
            if (this.props.state.turn !== 4)
                this.props.changeGlobalState("turn", turnNumber + 1);
            else
                this.props.changeGlobalState("turn", 1);

            if (this.props.state.turn === 3)
                this.props.changeGlobalState("friendly", parseInt(this.props.state.friendly) + parseInt(this.state.aantal));
            else
                this.props.changeGlobalState("enemy", parseInt(this.props.state.enemy) + parseInt(this.state.aantal));

            this.props.history.push('/board');
        } else
            alert("Doe verdomme ff normaal")
    }

    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <h2>{this.state.message}</h2>
                    <Link to="/board"><button className={"button3 button"}>Bekijk het bord</button></Link>

                    <h3>Vul hieronder het aantal goede antwoorden in</h3>
                    <label>
                    <input type="number" name="name" value={this.state.aantal} onChange={this.handleChange} />
                    </label>

                    <button className={"button3 button"} onClick={this.handleClick} >Volgende beurt</button>

                </header>
            </div>
        );
    }
}

export default withRouter(OtherTeam);

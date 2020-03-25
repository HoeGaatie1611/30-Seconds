import React from 'react';
import '../CSS/Board.css';
import {Link} from "react-router-dom";

class Board extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tiles: null,
        }
    }

    async componentDidMount() {
        await this.renderBoard();
    }

    renderBoard = async () => {
        const enemy = this.props.state.enemy;
        const friendly = this.props.state.friendly;


        let tiles = [];
        for (let i = 0; i < 30; i++) {
            if (i === parseInt(friendly) && i === parseInt(enemy))
                tiles.push({"id": i, "text": `${this.props.state.firstTeam} - ${this.props.state.secondTeam}`});
            else if (i === parseInt(enemy))
                tiles.push({"id": i, "text": `${this.props.state.secondTeam}`});
            else if (i === parseInt(friendly))
                tiles.push({"id": i, "text": `${this.props.state.firstTeam}`});
            else
                tiles.push({"id": i, "text": ""});
        }

        let theTiles = tiles.map((d) => <div className='tile' id={d.id}><h5>{d.text}</h5></div>);

        this.setState({
            tiles: (
                <div className="board">
                    {theTiles}
                </div>
            )
        })
    };

    render() { //todo er moet nog een winmechanisme komen (dus ook een winnaars pagina :D
        return (
            <div className="App">
                <header className="App-header">
                    <h1>De huidige stand is als volgt: </h1>
                    {this.state.tiles}
                    <Link to="/redirect"><button className={"button3 button"}>Ga door</button></Link>
                    <h1></h1>
                </header>
            </div>
        );
    }
}

export default Board;

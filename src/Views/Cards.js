import React from 'react';
import {Link, withRouter} from 'react-router-dom';
import '../CSS/Card.css';

const axios = require('axios');

class Cards extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            drawn: false,
            showCard: false,
            finished: false,
            counter: 0,
            cardColors: {
                1: "#00ffe5",
                2: "#00ffe5",
                3: "#00ffe5",
                4: "#00ffe5",
                5: "#00ffe5"
            },
            words: ["","","","",""]
        }
    };

    componentWillMount = async () => {
        await axios.get("https://webhooks.mongodb-stitch.com/api/client/v2.0/app/tracker-pxmwp/service/HTTP/incoming_webhook/get_card")
            .then(response => {
                const data = response.data;
                this.setState({
                    words: data
                })
            })
    }

    trekKaart = async () => {
        this.setState(prevState => ({
            drawn: !prevState.drawn,
            showCard: true
        }));

        setTimeout(() => {
            this.setState(({
                finished: true
            }));
        }, 1000);
    };

    continue = async () => {
        this.props.changeGlobalState("turn", this.props.state.turn + 1);
        const currentScore = this.props.state.friendly;
        this.props.changeGlobalState("friendly", currentScore + this.state.counter);
    };

    cardsOnly = async () => {
        this.props.history.push('/redirect')
    }

    handleClick = async (event) => {
        const key = event.currentTarget.getAttribute("id");
        if (this.state.cardColors[`${key}`] === "#00ffe5")
            this.setState(prevState => ({
                cardColors: {
                    ...prevState.cardColors,
                    [`${key}`]: '#ffe423'
                },
                counter: prevState.counter++
            }));
        else
            this.setState(prevState => ({
                cardColors: {
                    ...prevState.cardColors,
                    [`${key}`]: '#00ffe5'
                },
                counter: prevState.counter--
            }));
    };

    toTitleCase = (str) => {
        return str.replace(
            /\w\S*/g,
            function(txt) {
                return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
            }
        );
    };

    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <h1>We gaan beginnen, je kaartje staat hieronder</h1>

                    {this.state.drawn ?
                        <div className={"card"}>
                            <div className={"wordBox"} style={{background: this.state.cardColors["1"]}} id={1}
                                 onClick={this.handleClick}>
                                {this.toTitleCase(this.state.words[0])}
                            </div>
                            <div className={"wordBox"} style={{background: this.state.cardColors["2"]}} id={2}
                                 onClick={this.handleClick}>
                                {this.toTitleCase(this.state.words[1])}
                            </div>
                            <div className={"wordBox"} style={{background: this.state.cardColors["3"]}} id={3}
                                 onClick={this.handleClick}>
                                {this.toTitleCase(this.state.words[2])}
                            </div>
                            <div className={"wordBox"} style={{background: this.state.cardColors["4"]}} id={4}
                                 onClick={this.handleClick}>
                                {this.toTitleCase(this.state.words[3])}
                            </div>
                            <div className={"wordBox"} style={{background: this.state.cardColors["5"]}} id={5}
                                 onClick={this.handleClick}>
                                {this.toTitleCase(this.state.words[4])}
                            </div>
                        </div> : null
                    }

                    {!this.state.drawn ?
                        <button className={"button3 button"} onClick={this.trekKaart}>Trek een kaart</button> : null
                    }

                    {this.state.finished && !this.props.state.cardsOnly ?
                        <div><h2>Je had er {this.state.counter} goed!</h2><Link to="/board">
                            <button className={"button3 button"} onClick={this.continue}>Ga door naar het bord</button>
                        </Link></div> : null}
                    {this.state.finished && this.props.state.cardsOnly ?
                        <div><h2>Je had er {this.state.counter} goed!</h2>
                            <button className={"button3 button"} onClick={this.cardsOnly}>Pak een nieuwe kaart</button>
                        </div> : null}
                </header>
            </div>
        );
    }
}

export default withRouter(Cards);

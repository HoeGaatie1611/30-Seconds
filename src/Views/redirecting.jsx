import React from 'react';
import '../CSS/App.css';
import {withRouter} from 'react-router-dom';

class Redirecting extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    };

    componentWillMount() {
        if(this.props.state.cardsOnly)
            this.props.history.push('/cards')
        else if(this.props.state.turn === null)
            this.props.history.push('/');
        else if(this.props.state.turn === 1)
            this.props.history.push('/cards');
        else
            this.props.history.push('/noturn');
    }

    render() {
        return (
            <div className="App">
                <header className="App-header">
                </header>
            </div>
        );
    }
}

export default withRouter(Redirecting);

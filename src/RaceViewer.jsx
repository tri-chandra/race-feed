import React from 'react';
import axios from 'axios';
import RaceIcon from './RaceIcon';

import './RaceViewer.css';

class RaceViewer extends React.Component {
    constructor(props) {
        super(props);

		this.state = {
            races: []
        };

        this.interval = 5000;
        this.fetchData = this.fetchData.bind(this);
    }

    async componentDidMount() {
        this.fetchData();
    }

    componentWillUnmount() {
        clearInterval(this.timer);
    }

    async fetchData() {
        const data = await axios.get('https://s3-ap-southeast-2.amazonaws.com/bet-easy-code-challenge/next-to-jump');
        const races = data.data.result;

        this.timer = setTimeout(this.fetchData, this.interval);

        this.setState({races});
    }

    render() {
        return (
            <div className="grid-container">
                <span className="item table-header"></span>
                <span className="item table-header">Event Name</span>
                <span className="item table-header">Venue</span>
                <span className="item table-header">Start Time</span>
                {this.state.races.map(
                    race => (<React.Fragment key={race.EventID}>
                        <RaceIcon type={race.EventTypeDesc} className="item icon" />
                        <span className="item">{race.EventName}</span>
                        <span className="item">{race.Venue.Venue}</span>
                        <span className="item">{race.AdvertisedStartTime}</span>
                    </React.Fragment>)
                )}
                
            </div>
        );
    }
}

export default RaceViewer;
import React from 'react';
import axios from 'axios';

class RaceViewer extends React.Component {
    constructor(props) {
        super(props);

		this.state = {
            races: []
        };

        this.interval = 15000;
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
// console.log(races)
        this.setState({races});
    }

    render() {
        return (
            <div>
                {this.state.races.map(
                    race => (<div key={race.EventID}>
                        <span>{race.EventName}</span>
                        <span>{race.Venue.Venue}</span>
                        <span>{race.AdvertisedStartTime}</span>
                        <span>{race.EventTypeDesc}</span>
                    </div>)
                )}
                
            </div>
        );
    }
}

export default RaceViewer;
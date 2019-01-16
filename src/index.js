import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './styles/main.scss';
import './styles/reset.scss';
import './styles/typography.scss';
import './styles/buttons.scss';
import Note from './components/Note/component';
import Timer from './components/Timer/component';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            content: '',
            isFormDisabled: true,
            timerSetOn: 30,
            timerCurrentCount: null,
            isTimerRunning: false
        };

        this.interval = null;
    }

    handleChange = content => {
        this.setState({ content: content });
    };

    handleStartTimeChange = event => {
        this.setState({
            timerSetOn: event.target.value
        });
    };

    startTimer = () => {
        this.setState({
            content: '',
            isTimerRunning: true,
            isFormDisabled: false
        });
        this.setState({ timerCurrentCount: this.state.timerSetOn });
        this.interval = setInterval(this.tick, 1000);
    };

    tick = () => {
        let currentCount = this.state.timerCurrentCount - 1;
        if (currentCount < 1) {
            this.endTimer();
        }
        this.setState({ timerCurrentCount: currentCount });
    };

    endTimer = () => {
        clearInterval(this.interval);
        this.setState({
            isTimerRunning: false,
            isFormDisabled: true
        });
    };

    render() {
        let placeholderMessage = 'Write a note...';
        const timerSettings = (
            <div className="form-group timer-settings">
                <label htmlFor="timerInput" className="form-label">
                    Seconds
                </label>
                <input
                    className="form-input timer-input"
                    type="number"
                    min="0"
                    max="3600"
                    step="5"
                    name="timerInput"
                    defaultValue={this.state.timerSetOn}
                    disabled={this.state.isTimerRunning}
                    onChange={this.handleStartTimeChange}
                />
                <button
                    className="btn primary"
                    disabled={this.state.isTimerRunning}
                    onClick={this.startTimer}
                >
                    <span>Start</span>
                </button>
            </div>
        );
        const timerDisplay = <Timer time={this.state.timerCurrentCount} />;
        return (
            <div className="App">
                {!this.state.isTimerRunning && timerSettings}
                {this.state.isTimerRunning && timerDisplay}
                <Note
                    content={this.state.content}
                    handleChange={this.handleChange}
                    isDisabled={this.state.isFormDisabled}
                    placeholderMessage={placeholderMessage}
                />
            </div>
        );
    }
}

const rootElement = document.getElementById('root');
ReactDOM.render(<App />, rootElement);

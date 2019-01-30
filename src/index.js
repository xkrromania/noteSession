import React, { Component, Fragment } from "react";
import ReactDOM from "react-dom";
import "./styles/main.scss";
import "./styles/reset.scss";
import "./styles/typography.scss";
import "./styles/buttons.scss";
import Note from "./components/Note/component";
import Timer from "./components/Timer/component";
import noteService from "./services/noteService";

class App extends React.Component {
  constructor(props) {
    super(props);
    const noteContent = noteService.get();

    this.state = {
      content: noteContent,
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
      content: "",
      isTimerRunning: true,
      isFormDisabled: false
    });
    this.setState({ timerCurrentCount: this.state.timerSetOn });
    this.interval = setInterval(this.tick, 1000);
  };

  startInfiniteTimer = () => {
    this.setState({
      content: "",
      isTimerRunning: true,
      isFormDisabled: false,
      timerCurrentCount: Infinity
    });
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
    noteService.save(this.state.content);
    this.setState({
      isTimerRunning: false,
      isFormDisabled: true
    });
  };

  resetTimer = () => {
    this.setState({ timerCurrentCount: 30 });
    this.endTimer();
  };

  render() {
    let placeholderMessage = "Write a note...";
    const timerSettings = (
      <Fragment>
        {!this.state.isTimerRunning && (
          <div className="timer-settings">
            <div className="form-group">
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
            <button
              className="btn writing-action"
              disabled={this.state.isTimerRunning}
              onClick={this.startInfiniteTimer}
            >
              <span>Just write</span>
            </button>
          </div>
        )}
      </Fragment>
    );
    const timerDisplay = (
      <Fragment>
        {this.state.isTimerRunning &&
          this.state.timerCurrentCount !== Infinity && (
            <Timer time={this.state.timerCurrentCount} />
          )}
      </Fragment>
    );

    const resetButton = (
      <Fragment>
        {this.state.timerCurrentCount === Infinity && (
          <button
            className="btn writing-action"
            disabled={!this.state.isTimerRunning}
            onClick={this.resetTimer}
          >
            <span>End Writing</span>
          </button>
        )}
      </Fragment>
    );

    return (
      <div className="App">
        {timerSettings}
        {timerDisplay}
        {resetButton}

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

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);

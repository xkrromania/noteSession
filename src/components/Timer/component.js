import React, { Component } from "react";
import "./style.scss";

class Timer extends Component {
  render() {
    const time = this.props.time;
    let timeMessage = "not started yet";

    if (time < 1) {
      timeMessage = "time has expired";
    } else {
      timeMessage = time + " seconds";
    }

    return (
      <div className="timer">
        Time left:
        <span className="timer-digits"> {timeMessage}</span>
      </div>
    );
  }
}

export default Timer;

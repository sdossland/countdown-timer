import React, {Component} from 'react';
import { connect } from 'react-redux';
import getActions from './actions';

const mapStateToProps = redux => {
  return {
    output: redux.output,
    errorMsg: redux.errorMsg,
    beginTimeErrorMsg: redux.beginTimeErrorMsg,
    endTimeErrorMsg: redux.endTimeErrorMsg
  }
};

const mapDispatchToProps = dispatch => {
  return getActions(dispatch);
};


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      beginInput: '',
      endInput: ''
    }
  };
  runTimer = (beginTimeInSeconds, endTimeInSeconds) => {
    const secondsToDisplay = endTimeInSeconds - beginTimeInSeconds;
    this.props.startCountdown(secondsToDisplay);
    if (this.timer) clearInterval(this.timer);
    this.timer = setInterval(() => {
      if (this.props.output === 0) {
        clearInterval(this.timer);
        return this.props.resetCounter();
      }
      this.props.countdownInterval();
    }, 1000);
  };
  valueChange = (key) => (e) => {
    this.setState({
      [key]: String(e.target.value).replace(/[^0-9:]/g, '') // remove all non numeric char except ":"
    });
  };
  validateTime(hh, mm, ss) {
    if (!(Number(hh) < 24) || !(Number(mm) < 60) || !(Number(ss) < 60)) {
      throw new Error('Invalid Time');
    }
  }
  startCountdown = () => {
    const [beginHh, beginMm, beginSs] = this.state.beginInput.split(':').map(Number);
    const [endHh, endMm, endSs] = this.state.endInput.split(':').map(Number);

    //validate begin time
    try {
      this.validateTime(beginHh, beginMm, beginSs)
    } catch(e) {
      return this.props.setBeginErrorMsg();
    }
    //validate end time
    try {
      this.validateTime(endHh, endMm, endSs)
    } catch(e) {
      return this.props.setEndErrorMsg();
    }
    //convert begin and end times to seconds
    const beginTimeInSeconds = beginHh * 3600 + beginMm * 60 + beginSs;
    const endTimeInSeconds = endHh * 3600 + endMm * 60 + endSs;

    if (endTimeInSeconds > beginTimeInSeconds) {
      //start timer
      this.runTimer(beginTimeInSeconds, endTimeInSeconds);
    } else {
      this.props.setErrorMsg();
    }
  };
  render() {
    return (
      <div>
        <header>
          <h1>Countdown Timer</h1>
        </header>
        <div>begin time
          <input maxLength="8" placeholder="HH:MM:SS" value={this.state.beginInput}
                 onChange={this.valueChange('beginInput')} required />
        </div>
        <div>end time
          <input maxLength="8" placeholder="HH:MM:SS" value={this.state.endInput}
                 onChange={this.valueChange('endInput')} required/>
          <div>{this.props.output}</div>
          <button type="button" onClick={this.startCountdown}>Start Countdown</button>
          <div>{this.props.errorMsg || this.props.beginTimeErrorMsg || this.props.endTimeErrorMsg}</div>
        </div>
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);

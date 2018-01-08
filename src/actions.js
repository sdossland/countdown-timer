import { COUNTDOWN_TICK, COUNTDOWN_START, COUNTDOWN_RESET, ERROR_MSG, BEGIN_ERROR_MSG, END_ERROR_MSG } from './constants';

export default function getActions(dispatch) {
  return {
    countdownInterval: function() {
      dispatch({
        type: COUNTDOWN_TICK
      });
    },
    startCountdown: function(secondsToDisplay) {
      dispatch({
        type: COUNTDOWN_START,
        value: secondsToDisplay
      });
    },
    resetCounter: function() {
      dispatch({
        type: COUNTDOWN_RESET
      })
    },
    setErrorMsg: function() {
      dispatch({
        type: ERROR_MSG,
        value: 'End time must be greater than begin time.'
      })
    },
    setBeginErrorMsg: function() {
      dispatch({
        type: BEGIN_ERROR_MSG,
        value: 'Begin time is invalid. Please use HH:MM:SS format assuming 24 hour clock.'
      })
    },
    setEndErrorMsg: function() {
      dispatch({
        type: END_ERROR_MSG,
        value: 'End time is invalid. Please use HH:MM:SS format assuming 24 hour clock.'
      })
    }
  }
};
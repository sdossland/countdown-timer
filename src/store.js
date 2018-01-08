import { createStore } from 'redux';
import { COUNTDOWN_TICK, COUNTDOWN_START, COUNTDOWN_RESET, ERROR_MSG, BEGIN_ERROR_MSG, END_ERROR_MSG } from './constants';

const initialState = {
  output: '',
  errorMsg: '',
  beginTimeErrorMsg: '',
  endTimeErrorMsg: ''
};

function counter(state = initialState, action) {
  switch (action.type) {
    case COUNTDOWN_TICK:
      return {...state, output: state.output - 1};
    case COUNTDOWN_START:
      return {...state, output: action.value, errorMsg: '', beginTimeErrorMsg: '', endTimeErrorMsg: ''};
    case COUNTDOWN_RESET:
      return {...initialState};
    case ERROR_MSG:
      return {...state, errorMsg: action.value};
    case BEGIN_ERROR_MSG:
      return {...state, beginTimeErrorMsg: action.value};
    case END_ERROR_MSG:
      return {...state, endTimeErrorMsg: action.value};
    default:
      return state
  }
}

let store = createStore(
  counter,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

export default store;
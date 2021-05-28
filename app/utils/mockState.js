import * as initialState from './initialState.json';
import * as extendedState from './extendedState.json';

export default () => ({...initialState, ...extendedState}); // initial state (initial - reddit data, extended - custom data), should be passed from server

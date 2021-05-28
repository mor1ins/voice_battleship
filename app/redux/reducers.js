import {
  UPDATE_LAYOUT,
  UPDATE_SHIPTYPES,
  BATTLE_FIRE,
  NEW_GAME,
  MAKE_TURN,
  MAKE_HIT,
} from './actions';
import {PositionToString} from '../utils/mappers';
import Tts from 'react-native-tts';

function numberToChar(n) {
  switch (n) {
    case 0:
      return 'А';
    case 1:
      return 'Б';
    case 2:
      return 'В';
    case 3:
      return 'Г';
    case 4:
      return 'Д';
    case 5:
      return 'Е';
    case 6:
      return 'Ж';
    case 7:
      return 'З';
    case 8:
      return 'И';
    case 9:
      return 'К';
  }
}

const checkBattleCell = (ships, position) =>
  ships.some(({positions}) =>
    positions.some(p => p[0] === position[0] && p[1] === position[1]),
  );

function areEqual(a, b) {
  return JSON.stringify(a) === JSON.stringify(b);
}

const rootReducer = (state = {}, action) => {
  let posKey;
  let isCellHited;
  let scoreboard;

  console.log(action);

  switch (action.type) {
    case UPDATE_SHIPTYPES:
      return {
        ...state,
        shipTypes: action.payload,
      };
    case UPDATE_LAYOUT:
      return {
        ...state,
        layout: action.payload,
      };
    case BATTLE_FIRE:
      posKey = PositionToString(action.position);
      if (state.battlefield[posKey] !== undefined) {
        return state;
      }
      isCellHited = checkBattleCell(state.layout, action.position);
      if (isCellHited) {
        state.layout.map(
          unit =>
            (unit.positions = unit.positions.filter(
              p => !areEqual(p, action.position),
            )),
        );

        if (state.layout.some(unit => unit.positions.length === 0)) {
          state.wasDestroyed.push(action.position);
          state.layout = state.layout.filter(unit => unit.positions.length > 0);
        }
        scoreboard = {
          left: {
            ...state.scoreboard.left,
            scores: state.scoreboard.left.scores + 1,
          },
          right: state.scoreboard.right,
        };
      }
      return {
        ...state,
        battlefield: {
          ...state.battlefield,
          [posKey]: isCellHited,
        },
        scoreboard: (isCellHited && scoreboard) || state.scoreboard,
      };
    case MAKE_TURN:
      console.log('Make turn on ' + action.position);
      let [x, y] = action.position;
      y = numberToChar(y);
      setTimeout(() => Tts.speak(`${y} ${x}`), 1000);
      return {...state};
    case MAKE_HIT:
      scoreboard = {
        right: {
          ...state.scoreboard.right,
          scores: state.scoreboard.right.scores + 1,
        },
        left: state.scoreboard.left,
      };
      return {
        ...state,
        scoreboard: scoreboard,
      };
    case NEW_GAME:
      return {...state, ...action.payload};

    default:
      return state;
  }
};

export default rootReducer;

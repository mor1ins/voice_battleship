export const UPDATE_SHIPTYPES = '[shipTypes] Update';
export const UPDATE_LAYOUT = '[layout] Update';
export const BATTLE_FIRE = '[battle] Fire!';
export const NEW_GAME = '[game] New game';
export const MAKE_TURN = '[battle] Make turn!';
export const MAKE_HIT = '[battle] Make hit!';

export const UpdateShipTypes = payload => ({
  type: UPDATE_SHIPTYPES,
  payload,
});

export const UpdateLayout = payload => ({
  type: UPDATE_LAYOUT,
  payload,
});

export const Fire = position => {
  console.log(`Fire ${position}`);
  return {
    type: BATTLE_FIRE,
    position,
  };
};

export const Turn = position => {
  console.log(position);
  return {
    type: MAKE_TURN,
    position,
  };
};

export const Hit = () => {
  return {
    type: MAKE_HIT,
  };
};

export const NewGame = initialState => ({
  type: NEW_GAME,
  payload: initialState,
});

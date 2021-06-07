export const UPDATE_SHIPTYPES = '[shipTypes] Update';
export const UPDATE_LAYOUT = '[layout] Update';
export const BATTLE_FIRE = '[battle] Fire!';
export const NEW_GAME = '[game] New game';
export const MAKE_TURN = '[battle] Make turn!';
export const MAKE_HIT = '[battle] Make hit!';

let enemy = {
  lastFire: null,
  enemyBattlefield: [
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
    // [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],

    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    // [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  ],
};

export const UpdateShipTypes = payload => ({
  type: UPDATE_SHIPTYPES,
  enemy: enemy,
  payload,
});

export const UpdateLayout = payload => ({
  type: UPDATE_LAYOUT,
  enemy: enemy,
  payload,
});

export const Fire = position => {
  console.log(`Fire ${position}`);
  return {
    type: BATTLE_FIRE,
    enemy: enemy,
    position,
  };
};

export const Turn = () => {
  console.log(`Make turn`);
  return {
    type: MAKE_TURN,
    enemy: enemy,
  };
};

export const Hit = isDestroyed => {
  return {
    destroyed: isDestroyed,
    enemy: enemy,
    type: MAKE_HIT,
  };
};

export const NewGame = initialState => ({
  type: NEW_GAME,
  enemy: enemy,
  payload: initialState,
});

export const PositionToString = p => `${p[0]}:${p[1]}`;
export const UnitToString = (type, positions) =>
  `${type}_${positions.map(p => PositionToString(p)).join('_')}`;
export const PlayerToString = (side, title) => `${side}_${title}`;
export const UnitStatusPicToString = (unitType, position) =>
  `${unitType}_${PositionToString(position)}`;
export const SizedStatusBlockToString = (size, idx) =>
  `shipStatus_${size}_${idx}`;

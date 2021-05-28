import React from 'react';
import PropTypes from 'prop-types';
import {View, StyleSheet, Dimensions} from 'react-native';
import BattleCell from './BattleCell';
import {PositionToString} from '../utils/mappers';

const borderWidth = 20;
const styles = StyleSheet.create({
  container: {
    borderColor: '#ffb100',
    borderWidth: borderWidth,
    borderTopWidth: 80,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
});
const BattleField = ({dimensions, store}) => {
  // console.log(Dimensions.get('screen'));
  const cells = [];
  const unit = (Dimensions.get('screen').width - 40) / (dimensions[0] + 1);
  for (let y = -1; y < dimensions[1]; y += 1) {
    for (let x = -1; x < dimensions[0]; x += 1) {
      const pos = [x, y];
      cells.push(
        <BattleCell
          width={unit}
          key={PositionToString(pos)}
          position={pos}
          store={store}
        />,
      );
    }
  }
  return <View style={styles.container}>{cells}</View>;
};
BattleField.propTypes = {
  dimensions: PropTypes.arrayOf(PropTypes.number).isRequired,
};
export default BattleField;

import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {View, Image, Text, StyleSheet} from 'react-native';
import {PositionToString, SizedStatusBlockToString} from '../utils/mappers';

const shipTypeImgSrcMap = {
  carrier: require('../assets/Aircraft_Shape.png'),
  battleship: require('../assets/Battleship_Shape.png'),
  cruiser: require('../assets/Cruiser_Shape.png'),
  submarine: require('../assets/Submarine_Shape.png'),
  destroyer: require('../assets/Carrier_Shape.png'),
};
const hitImg = require('../assets/Hit_small.png');
const missImg = require('../assets/Miss_small.png');

const styles = StyleSheet.create({
  container: {
    width: '50%',
    height: 20,
    flexDirection: 'row',
    marginTop: 4,
    marginBottom: 4,
  },
  typeImg: {
    height: '100%',
    width: '100%',
    resizeMode: 'stretch',
  },
  typeContainer: {
    flex: 1,
    paddingLeft: 4,
    paddingRight: 2,
  },
  statusContainer: {
    flex: 1,
    width: '50%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusImg: {
    width: 13,
    height: 13,
    marginRight: 3,
    resizeMode: 'contain',
  },
});

export const GetStatusBlockFromSizeAndStatus = (size, isWasted) => {
  // const imgSource = isWasted ? hitImg : missImg;
  const imgSource = isWasted ? hitImg : missImg;
  // Array.prototype.keys() isn't working in react-native
  return [...Array(size)].map((_i, i) => (
    <Image
      key={SizedStatusBlockToString(size, i)}
      source={imgSource}
      style={styles.statusImg}
    />
  ));
};

const Unit = ({type, isWasted, positions}) => (
  <View style={styles.container}>
    <View style={styles.typeContainer}>
      <Image source={shipTypeImgSrcMap[type]} style={styles.typeImg} />
    </View>
    <View style={styles.statusContainer}>
      {GetStatusBlockFromSizeAndStatus(positions.length, isWasted)}
    </View>
  </View>
);

Unit.propTypes = {
  type: PropTypes.string.isRequired,
  isWasted: PropTypes.bool,
  positions: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number)),
};
Unit.defaultProps = {
  isWasted: false,
};

const mapStateToProps = (state, {positions}) => ({
  isWasted: positions.every(p => state.battlefield[PositionToString(p)]),
});
export default connect(mapStateToProps)(Unit);

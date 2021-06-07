import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {Fire, Turn} from '../redux/actions';
import {PositionToString} from '../utils/mappers';
import {
  SHOTRESULT_DESTROY,
  SHOTRESULT_HIT,
  SHOTRESULT_MISS,
  SHOTRESULT_WAITING,
} from '../utils/shotResults';
import {TouchableOpacity, View, Image, Text, StyleSheet} from 'react-native';
import Tts from 'react-native-tts';

const hitImg = require('../assets/Hit.png');
const missImg = require('../assets/Miss.png');

const styles = StyleSheet.create({
  cell: {
    backgroundColor: '#f8f8f8',
    borderWidth: 0.5,
    borderColor: '#cfcfcf',
    alignItems: 'center',
    // fontSize: 20,
    justifyContent: 'center',
  },
});

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

export const BattleCellPure = ({
  shotResult,
  actions,
  position,
  width,
  store,
}) => {
  const cellStyle = [styles.cell, {width, height: width}];
  // console.log(`shotResult: ${shotResult}, ${position}`);
  const cell = (r => {
    if (r === SHOTRESULT_WAITING) {
      return (
        <>
          {position[0] === -1 && position[1] === -1 && (
            <View style={cellStyle} />
          )}

          {position[0] !== -1 && position[1] === -1 && (
            <View style={cellStyle}>
              <Text>{position[0]}</Text>
            </View>
          )}

          {position[0] === -1 && position[1] !== -1 && (
            <View style={cellStyle}>
              <Text>{numberToChar(position[1])}</Text>
            </View>
          )}

          {position[0] !== -1 && position[1] !== -1 && (
            <TouchableOpacity onPress={() => actions.Fire(position)}>
            {/*<TouchableOpacity>*/}
              <View style={cellStyle} />
            </TouchableOpacity>
          )}
        </>
      );
    } else if (r === SHOTRESULT_HIT) {
      Tts.speak('Попал');
      return <Image style={cellStyle} source={hitImg} />;
    } else if (r === SHOTRESULT_DESTROY) {
      Tts.speak('Корабль уничтожен');
      return <Image style={cellStyle} source={hitImg} />;
    } else {
      Tts.speak('Мимо');
      store.dispatch(Turn());
      return <Image style={cellStyle} source={missImg} />;
    }
  })(shotResult);
  return cell;
};

BattleCellPure.propTypes = {
  shotResult: PropTypes.string.isRequired,
  actions: PropTypes.objectOf(PropTypes.func).isRequired,
  position: PropTypes.arrayOf(PropTypes.number).isRequired,
  width: PropTypes.number.isRequired,
};

function areEqual(a, b) {
  return JSON.stringify(a) === JSON.stringify(b);
}

const mapStateToProps = (state, {position}) => {
  const bc = state.battlefield[PositionToString(position)];
  const result =
    (bc === undefined && SHOTRESULT_WAITING) ||
    (!bc && SHOTRESULT_MISS) ||
    (state.wasDestroyed.some(p => areEqual(p, position)) &&
      SHOTRESULT_DESTROY) ||
    SHOTRESULT_HIT;
  // console.log('Was Destroyed - ' + JSON.stringify(state.wasDestroyed));
  // console.log('Result: ' + result);
  return {
    shotResult: result,
  };
};

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({Fire}, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(BattleCellPure);

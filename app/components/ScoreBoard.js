import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {View, Text, StyleSheet} from 'react-native';
import {PlayerToString} from '../utils/mappers';

const playerShape = {
  side: PropTypes.string,
  scores: PropTypes.number,
  title: PropTypes.string,
};
const styles = StyleSheet.create({
  item: {
    width: '50%',
    alignItems: 'center',
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 40,
    paddingRight: 40,
  },
  left: {
    backgroundColor: '#ffb100',
  },
  right: {
    backgroundColor: '#21b9a0',
  },
  value: {
    borderBottomWidth: 0.5,
    borderColor: '#484848',
    width: '100%',
    textAlign: 'center',
    fontSize: 40,
    color: '#484848',
    fontWeight: 'bold',
  },
  player: {
    fontSize: 20,
    color: '#484848',
    fontWeight: 'bold',
  },
  container: {
    flexDirection: 'row',
  },
});

const ScoreBoard = ({left, right}) => {
  const players = [left, right].map(({side, scores, title}) => (
    <View style={[styles.item, styles[side]]} key={PlayerToString(side, title)}>
      <Text style={styles.value}>{scores}</Text>
      <Text style={styles.player}>{title}</Text>
    </View>
  ));
  return <View style={styles.container}>{players}</View>;
};

ScoreBoard.propTypes = {
  left: PropTypes.shape(playerShape).isRequired,
  right: PropTypes.shape(playerShape).isRequired,
};

const mapStateToProps = state => ({...state.scoreboard});

export default connect(mapStateToProps)(ScoreBoard);

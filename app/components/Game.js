import React from 'react';
import PropTypes from 'prop-types';
import {View, StyleSheet} from 'react-native';
import {connect} from 'react-redux';
import BattleField from './BattleField';
import InfoBoard from './InfoBoard';
import StartGameButton from './StartGameButton';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    height: '100%',
  },
});
const settingsShape = {
  dimensions: PropTypes.arrayOf(PropTypes.number).isRequired,
};
const Game = ({settings, store}) => (
  <View style={styles.container}>
    <BattleField dimensions={settings.dimensions} store={store} />
    <InfoBoard />
    <StartGameButton store={store} />
  </View>
);

Game.propTypes = {
  settings: PropTypes.shape(settingsShape).isRequired,
};

const mapStateToProps = state => ({
  settings: state.settings,
});

export default connect(mapStateToProps)(Game);

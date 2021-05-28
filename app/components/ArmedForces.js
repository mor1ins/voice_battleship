import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {View, StyleSheet} from 'react-native';
import Unit from './Unit';
import {UnitToString} from '../utils/mappers';

const styles = StyleSheet.create({
  container: {
    flexWrap: 'wrap',
    flexDirection: 'column',
    height: 100,
    marginTop: 5,
  },
});

const ArmedForces = ({shipTypes, shipUnits}) => {
  // console.log('ShipUnits: ' + shipUnits.map(JSON.stringify).join(', '));
  const units = shipUnits
    .filter(unit => shipTypes[unit.ship])
    .map(unit => (
      <Unit
        type={unit.ship}
        key={UnitToString(unit.ship, unit.positions)}
        positions={unit.positions}
      />
    ));
  // console.log(JSON.stringify(shipUnits));
  return <View style={styles.container}>{units}</View>;
};
const shipShape = {
  size: PropTypes.number.isRequired,
  count: PropTypes.number.isRequired,
};
const unitShape = {
  ship: PropTypes.string.isRequired,
  positions: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number)),
};
ArmedForces.propTypes = {
  shipTypes: PropTypes.objectOf(PropTypes.shape(shipShape)).isRequired,
  shipUnits: PropTypes.arrayOf(PropTypes.shape(unitShape)).isRequired,
};
const mapStateToProps = state => ({
  shipTypes: state.shipTypes,
  shipUnits: state.layout,
});

export default connect(mapStateToProps)(ArmedForces);

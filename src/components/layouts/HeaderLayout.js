import React, {PropTypes} from 'react';
import { connect } from 'react-redux';
import { loadVehicle } from '../../actions/generalActions';

class Header extends React.Component {
  constructor(props) {
    super(props);
    if (this.props.vehicleName === '' && this.props.vehicleVin !== '') {
      this.props.loadVehicle(this.props.vehicleVin);
    }
  }

  render() {
    return (
      <div id='header' className='header'>
        {this.props.vehicleVin ? "VIN: " + this.props.vehicleVin : "No Vehicle In Scope" }
      </div>
    );
  }
}

Header.propTypes = {
  vehicleName: PropTypes.string,
  vehicleVin: PropTypes.string
};

const mapStateToProps = (state) => {
  return {
    vehicleName: state.vehicle.name,
    vehicleVin: state.vehicle.vin
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loadVehicle: (vin) => { dispatch(loadVehicle(vin)); }
  };
};

const HeaderLayout = connect(mapStateToProps, mapDispatchToProps)(Header);

export default HeaderLayout;

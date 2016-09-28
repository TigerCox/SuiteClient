import {LOAD_VEHICLE} from '../actions/actionTypes';
import initialState from './initialState';
import {getVehicle} from '../api/api';

const vehicle = (state = initialState.vehicle, action) => {
  if (!action || !action.type) {
    return state;
  }
  switch (action.type) {
    case LOAD_VEHICLE:
      getVehicle(state.vin).then((val) => {
        console.log(val);
      });
      return state;
    default:
      return state;
  }
};

export default vehicle;

import {LOAD_VEHICLE, SUBMIT_FINANCE_DRIVER_SHORT} from './actionTypes';

export const submitFinanceDriverShort = () => {
  return {
    type: SUBMIT_FINANCE_DRIVER_SHORT
  };
};

export const loadVehicle = () => {
  return {
    type: LOAD_VEHICLE
  };
};

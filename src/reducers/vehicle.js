import initialState from './initialState';

const vehicle = (state = initialState.vehicle, action) => {
  if (!action || !action.type) {
    return state;
  }
  switch (action.type) {
    default:
      return state;
  }
};

export default vehicle;

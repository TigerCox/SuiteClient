import {APPLICANT_SET_NAME, APPLICANT_SET_CONTACT, APPLICANT_SET_ADDRESS, APPLICANT_SET_PII, APPLICANT_SET_EMPLOYMENT} from '../../actions/applicant/applicantActionTypes';
import initialState from '../initialState';

const getValue = (state, action, section, name, defaultValue = '') => {
  if (!action || !action[section] || action[section][name] === undefined || action[section][name] === null) {
    return state && state[section] && state[section][name] || defaultValue;
  } else {
    return action && action[section] && action[section][name] || defaultValue;
  }
};

const applicant = (state = initialState.applicant, action) => {
  if (!action || !action.type) {
    return state;
  }
  switch (action.type) {
    case APPLICANT_SET_NAME:
      return Object.assign({}, state, {
        name: {
          first: getValue(state, action, 'name', 'first'),
          middle: getValue(state, action, 'name', 'middle'),
          last: getValue(state, action, 'name', 'last'),
          suffix: getValue(state, action, 'name', 'suffix'),
        }
      });
    case APPLICANT_SET_CONTACT:
      return Object.assign({}, state, {
        contact: {
          phone: getValue(state, action, 'contact', 'phone'),
          email: getValue(state, action, 'contact', 'email')
        }
      });
    case APPLICANT_SET_ADDRESS:
      return Object.assign({}, state, {
        address: {
          line1: getValue(state, action, 'address', 'line1'),
          line2: getValue(state, action, 'address', 'line2'),
          city: getValue(state, action, 'address', 'city'),
          state: getValue(state, action, 'address', 'state'),
          zip: getValue(state, action, 'address', 'zip')
        }
      });
    case APPLICANT_SET_PII:
      return Object.assign({}, state, {
        pii: {
          socialSecurity: getValue(state, action, 'pii', 'socialSecurity'),
          dateOfBirth: getValue(state, action, 'pii', 'dateOfBirth')
        }
      });
    case APPLICANT_SET_EMPLOYMENT:
      return Object.assign({}, state, {
        employment: {
          income: getValue(state, action, 'employment', 'income'),
          lengthAtJob: getValue(state, action, 'employment', 'lengthAtJob')
        }
      });
    default:
      return state;
  }
};

export default applicant;

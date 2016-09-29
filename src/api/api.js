import {SUBMIT_FINANCE_DRIVER_SHORT} from '../actions/actionTypes';
import FinanceDriverShort from './financeDriverShort';

const api = store => next => action => {
  const result = next(action);

  if (action && action.type) {
    switch(action.type) {
      case SUBMIT_FINANCE_DRIVER_SHORT:
        new FinanceDriverShort().submitFinanceDriverShort(store.getState().applicant);
    }
  }

  return result;
};

export default api;

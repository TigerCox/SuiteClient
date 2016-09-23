// This is the app's initial state. Note that reducers each handle a slice of this state.
// Composing all initial state here gives us a clear spot of reference that displays the shape
// of our entire store.
export default {
  ajaxCallsInProgress: 0,
  loadingIndicatorStatus: {
    percent: -1,
    intervalTime: 200
  },
  applicant: {
    name: {
      first: '',
      middle: '',
      last: '',
      suffix: ''
    },
    contact: {
      phone: '',
      email: '',
    },
    address: {
      line1: '',
      line2: '',
      city: '',
      state: '',
      zip: '',
    },
    pii: {
      socialSecurity: '',
      dateOfBirth: ''
    },
    employment: {
      income: '',
      lengthAtJob: ''
    }
  }
};

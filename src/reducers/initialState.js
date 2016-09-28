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
      first: 'Joe',
      middle: 'Tom',
      last: 'Sal',
      suffix: ''
    },
    contact: {
      phone: '503-582-9676',
      email: 'sal@sal.com',
    },
    address: {
      line1: '700 NE Multnomah St',
      line2: '',
      city: 'Portland',
      state: 'OR',
      zip: '97209',
    },
    pii: {
      socialSecurity: '503-37-2849',
      dateOfBirth: '1990-10-10'
    },
    employment: {
      income: '10000',
      lengthAtJob: '2'
    }
  },
  vehicle: {
    name: '',
    vin: '1FA6P8TH1F5408787'
  }
};

import React, {PropTypes} from 'react';
import { connect } from 'react-redux';

import { setApplicantName, setApplicantContact, setApplicantAddress, setApplicantPII, setApplicantEmployment } from '../../actions/applicant/applicantActions';
import { submitFinanceDriverShort } from '../../actions/generalActions';


import FieldGroup from '../widgets/FieldGroup';

import '../../styles/FinanceDriverShort.scss';

const ROOT = {id: 'financeDriverShort', class: 'FinanceDriver FinanceDriverShort'};
const APPLICANT = {id: 'financeDriverShort.applicant', class: 'Applicant'};
const APPLICANT_NAME = {id: 'financeDriverShort.applicant.name', class: 'Name'};
const APPLICANT_NAME_FIRST = {id: 'financeDriverShort.applicant.name.first', label: 'First Name', class: 'FirstName', func: 'onFirstNameChange', isRequired: true};
const APPLICANT_MIDDLE_NAME = {id: 'financeDriverShort.applicant.name.middle', label: 'Middle Name', class: 'MiddleName', func: 'onMiddleNameChange', isRequired: false};
const APPLICANT_LAST_NAME = {id: 'financeDriverShort.applicant.name.last', label: 'Last Name', class: 'LastName', func: 'onLastNameChange', isRequired: true};
const APPLICANT_CONTACT = {id: 'financeDriverShort.applicant.contact', class: 'Contact'};
const APPLICANT_CONTACT_PHONE = {id: 'financeDriverShort.applicant.contact.phone', label: 'Phone', class: 'Phone', func: 'onPhoneChange', isRequired: true};
const APPLICANT_CONTACT_EMAIL = {id: 'financeDriverShort.applicant.contact.email', class: 'Email'};
const APPLICANT_CONTACT_EMAIL_1 = {id: 'financeDriverShort.applicant.contact.email.1', label: 'Email', class: 'Email1', func: 'onEmailChange', isRequired: true};
const APPLICANT_CONTACT_EMAIL_2 = {id: 'financeDriverShort.applicant.contact.email.2', label: 'Verify Email', class: 'Email2', isRequired: false};
const APPLICANT_ADDRESS = {id: 'financeDriverShort.applicant.address', label:'Address', class: 'Address'};
const APPLICANT_ADDRESS_LINE1 = {id: 'financeDriverShort.applicant.address.line1', label: 'Line 1', class: 'Line 1', func: 'onLine1Change', isRequired: true};
const APPLICANT_ADDRESS_LINE2 = {id: 'financeDriverShort.applicant.address.line2', label: 'Line 2', class: 'Line 2', func: 'onLine2Change', isRequired: false};
const APPLICANT_ADDRESS_CITY = {id: 'financeDriverShort.applicant.address.city', label: 'City', class: 'City', func: 'onCityChange', isRequired: true};
const APPLICANT_ADDRESS_STATE = {id: 'financeDriverShort.applicant.address.state', label: 'State', class: 'State', func: 'onStateChange', isRequired: true};
const APPLICANT_ADDRESS_ZIP = {id: 'financeDriverShort.applicant.address.zip', label: 'Zip', class: 'Zip', func: 'onZipChange', isRequired: true};
const APPLICANT_PII = {id: 'financeDriverShort.applicant.pii', class: 'PII'};
const APPLICANT_PII_SOCIAL = {id: 'financeDriverShort.applicant.pii.social', label: 'Social Security', class: 'SocialSecurity', func: 'onSocialSecurityChange', isRequired: true};
const APPLICANT_PII_DOB = {id: 'financeDriverShort.applicant.pii.dob', label: 'Date of Birth', class: 'DOB', func: 'onDOBChange', isRequired: true};
const APPLICANT_EMPLOYMENT = {id: 'financeDriverShort.applicant.employment', label: 'Employment', class: 'Employment'};
const APPLICANT_EMPLOYMENT_INCOME = {id: 'financeDriverShort.applicant.employment.income', label: 'Income', class: 'Income', func: 'onIncomeChange', isRequired: true};
const APPLICANT_EMPLOYMENT_TIMEATJOB = {id: 'financeDriverShort.applicant.employment.lengthAtJob', label: 'Time At Job (Years)', class: 'TimeAtJob', func: 'onTimeOnJobChange', isRequired: true};
const SUBMIT = {id: 'financeDriverShort.submit', label: 'Submit', class: 'Submit', func: 'onSubmit'};

class FDShort extends React.Component {
  constructor(props) {
    super(props);
    this.getValue = this.getValue.bind(this);
    this.setValue = this.setValue.bind(this);
    this.getState = this.getState.bind(this);
    this.setState = this.setState.bind(this);
    this.isValid = this.isValid.bind(this);
    this.getValidationText = this.getValidationText.bind(this);
    this.FormElement = this.FormElement.bind(this);
    this.state = {
      [APPLICANT_CONTACT_EMAIL_2.id]: this.props[APPLICANT_CONTACT_EMAIL_1.id] ? this.props[APPLICANT_CONTACT_EMAIL_1.id] : undefined
    };
  }

  getValue(type) {
    if (type.func) {
      return this.props[type.id];
    } else {
      return this.getState(type);
    }
  }

  setValue(type, value) {
    if (type.func) {
      this.setState(type, true);
      this.props[type.func](value);
    } else {
      this.setState(type, value);
    }
  }

  getState(type) {
    return this.state[type.id];
  }

  setState(type, value) {
    super.setState({ [type.id]: value });
  }

  isValid(type) {
    const text = this.getValidationText(type);
    return text === null ? null : text === "" ? "success" : "error";
  }

  getValidationText(type) {
    if (type.isRequired && this.getState(type) !== undefined && this.getValue(type).length < 1) {
      return type.label + " is required";
    } else if (type.id === APPLICANT_CONTACT_PHONE.id && this.getState(type) !== undefined && this.getValue(type).length !== 10) {
      return type.label + " needs to be a valid phone number";
    } else if (type.id === APPLICANT_CONTACT_EMAIL_1.id && this.getState(type) !== undefined && !this.getValue(type).includes('@')) {
      return type.label + " needs to be a valid email";
    } else if (type.id === APPLICANT_CONTACT_EMAIL_2.id && this.getState(APPLICANT_CONTACT_EMAIL_1) !== undefined && this.getState(type) !== undefined && this.getValue(type) !== this.getValue(APPLICANT_CONTACT_EMAIL_1)) {
      return "Emails need to match";
    }
    return null;
  }

  FormElement({ type }) {
    return (
      <FieldGroup id={type.id} label={type.label} className={type.class} type='text'
        value={this.getValue(type)} onChange={(e) => this.setValue(type, e.target.value)} onBlur={(e) => this.setState(type, e.target.value)}
        validation={this.isValid(type)} help={this.getValidationText(type)} />
    );
  }

  render() {
    return (
      <div id={ROOT.id} className={ROOT.class}>
        <div id={APPLICANT.id} className={APPLICANT.class}>
          <div id={APPLICANT_NAME.id} className={APPLICANT_NAME.class}>
            <this.FormElement type={APPLICANT_NAME_FIRST} />
            <this.FormElement type={APPLICANT_MIDDLE_NAME} />
            <this.FormElement type={APPLICANT_LAST_NAME} />
          </div>
        </div>
        <div id={APPLICANT_CONTACT.id} className={APPLICANT_CONTACT.class}>
          <this.FormElement type={APPLICANT_CONTACT_PHONE} />
          <div id={APPLICANT_CONTACT_EMAIL.id} className={APPLICANT_CONTACT_EMAIL.class}>
            <this.FormElement type={APPLICANT_CONTACT_EMAIL_1} />
            <this.FormElement type={APPLICANT_CONTACT_EMAIL_2} />
          </div>
        </div>
        <div id={APPLICANT_ADDRESS.id} className={APPLICANT_ADDRESS.class}>
          <label htmlFor={APPLICANT_ADDRESS.id}>{APPLICANT_ADDRESS.label}</label>
          <this.FormElement type={APPLICANT_ADDRESS_LINE1} />
          <this.FormElement type={APPLICANT_ADDRESS_LINE2} />
          <this.FormElement type={APPLICANT_ADDRESS_CITY} />
          <this.FormElement type={APPLICANT_ADDRESS_STATE} />
          <this.FormElement type={APPLICANT_ADDRESS_ZIP} />
        </div>
        <div id={APPLICANT_PII.id} className={APPLICANT_PII.class}>
          <this.FormElement type={APPLICANT_PII_SOCIAL} />
          <this.FormElement type={APPLICANT_PII_DOB} />
        </div>
        <div id={APPLICANT_EMPLOYMENT.id} className={APPLICANT_EMPLOYMENT.class}>
          <label htmlFor={APPLICANT_EMPLOYMENT.id}>{APPLICANT_EMPLOYMENT.label}</label>
          <this.FormElement type={APPLICANT_EMPLOYMENT_INCOME} />
          <this.FormElement type={APPLICANT_EMPLOYMENT_TIMEATJOB} />
        </div>
        <div id={SUBMIT.id} className={SUBMIT.class} onClick={(e) => this.props[SUBMIT.func]()}>{SUBMIT.label}</div>
      </div>
    );
  }
}

FDShort.propTypes = {
  [APPLICANT_NAME_FIRST.id]: PropTypes.string.isRequired,
  [APPLICANT_MIDDLE_NAME.id]: PropTypes.string.isRequired,
  [APPLICANT_LAST_NAME.id]: PropTypes.string.isRequired,
  [APPLICANT_CONTACT_PHONE.id]: PropTypes.string.isRequired,
  [APPLICANT_CONTACT_EMAIL.id]: PropTypes.string.isRequired,
  [APPLICANT_ADDRESS_LINE1.id]: PropTypes.string.isRequired,
  [APPLICANT_ADDRESS_LINE2.id]: PropTypes.string.isRequired,
  [APPLICANT_ADDRESS_CITY.id]: PropTypes.string.isRequired,
  [APPLICANT_ADDRESS_STATE.id]: PropTypes.string.isRequired,
  [APPLICANT_ADDRESS_ZIP.id]: PropTypes.string.isRequired,
  [APPLICANT_PII_SOCIAL.id]: PropTypes.string.isRequired,
  [APPLICANT_PII_DOB.id]: PropTypes.string.isRequired,
  [APPLICANT_EMPLOYMENT_INCOME.id]: PropTypes.string.isRequired,
  [APPLICANT_EMPLOYMENT_TIMEATJOB.id]: PropTypes.string.isRequired,

  [APPLICANT_NAME_FIRST.func]: PropTypes.func.isRequired,
  [APPLICANT_MIDDLE_NAME.func]: PropTypes.func.isRequired,
  [APPLICANT_LAST_NAME.func]: PropTypes.func.isRequired,
  [APPLICANT_CONTACT_PHONE.func]: PropTypes.func.isRequired,
  [APPLICANT_CONTACT_EMAIL.func]: PropTypes.func.isRequired,
  [APPLICANT_ADDRESS_LINE1.func]: PropTypes.func.isRequired,
  [APPLICANT_ADDRESS_LINE2.func]: PropTypes.func.isRequired,
  [APPLICANT_ADDRESS_CITY.func]: PropTypes.func.isRequired,
  [APPLICANT_ADDRESS_STATE.func]: PropTypes.func.isRequired,
  [APPLICANT_ADDRESS_ZIP.func]: PropTypes.func.isRequired,
  [APPLICANT_PII_SOCIAL.func]: PropTypes.string.isRequired,
  [APPLICANT_PII_DOB.func]: PropTypes.string.isRequired,
  [APPLICANT_EMPLOYMENT_INCOME.func]: PropTypes.func.isRequired,
  [APPLICANT_EMPLOYMENT_TIMEATJOB.func]: PropTypes.func.isRequired,
  [SUBMIT.func]: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  return {
    [APPLICANT_NAME_FIRST.id]: state.applicant.name.first,
    [APPLICANT_MIDDLE_NAME.id]: state.applicant.name.middle,
    [APPLICANT_LAST_NAME.id]: state.applicant.name.last,
    [APPLICANT_CONTACT_PHONE.id]: state.applicant.contact.phone,
    [APPLICANT_CONTACT_EMAIL.id]: state.applicant.contact.email,
    [APPLICANT_ADDRESS_LINE1.id]: state.applicant.address.line1,
    [APPLICANT_ADDRESS_LINE2.id]: state.applicant.address.line2,
    [APPLICANT_ADDRESS_CITY.id]: state.applicant.address.city,
    [APPLICANT_ADDRESS_STATE.id]: state.applicant.address.state,
    [APPLICANT_ADDRESS_ZIP.id]: state.applicant.address.zip,
    [APPLICANT_PII_SOCIAL.id]: state.applicant.pii.socialSecurity,
    [APPLICANT_PII_DOB.id]: state.applicant.pii.dateOfBirth,
    [APPLICANT_EMPLOYMENT_INCOME.id]: state.applicant.employment.income,
    [APPLICANT_EMPLOYMENT_TIMEATJOB.id]: state.applicant.employment.lengthAtJob
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    [APPLICANT_NAME_FIRST.func]: (firstName) => { dispatch(setApplicantName({ first: firstName })); },
    [APPLICANT_MIDDLE_NAME.func]: (middleName) => { dispatch(setApplicantName({ middle: middleName })); },
    [APPLICANT_LAST_NAME.func]: (lastName) => { dispatch(setApplicantName({ last: lastName })); },
    [APPLICANT_CONTACT_PHONE.func]: (contactNumber) => { dispatch(setApplicantContact({ phone: contactNumber })); },
    [APPLICANT_CONTACT_EMAIL.func]: (contactEmail) => { dispatch(setApplicantContact({ email: contactEmail })); },
    [APPLICANT_ADDRESS_LINE1.func]: (addressLine1) => { dispatch(setApplicantAddress({ line1: addressLine1 })); },
    [APPLICANT_ADDRESS_LINE2.func]: (addressLine2) => { dispatch(setApplicantAddress({ line2: addressLine2 })); },
    [APPLICANT_ADDRESS_CITY.func]: (addressCity) => { dispatch(setApplicantAddress({ city: addressCity })); },
    [APPLICANT_ADDRESS_STATE.func]: (addressState) => { dispatch(setApplicantAddress({ state: addressState })); },
    [APPLICANT_ADDRESS_ZIP.func]: (addressZip) => { dispatch(setApplicantAddress({ zip: addressZip })); },
    [APPLICANT_PII_SOCIAL.func]: (socialSecurity) => { dispatch(setApplicantPII({ socialSecurity: socialSecurity })); },
    [APPLICANT_PII_DOB.func]: (dateOfBirth) => { dispatch(setApplicantPII({ dateOfBirth: dateOfBirth })); },
    [APPLICANT_EMPLOYMENT_INCOME.func]: (income) => { dispatch(setApplicantEmployment({ income: income })); },
    [APPLICANT_EMPLOYMENT_TIMEATJOB.func]: (lengthAtJob) => { dispatch(setApplicantEmployment({ lengthAtJob: lengthAtJob })); },
    [SUBMIT.func]: () => { dispatch(submitFinanceDriverShort()); }
  };
};

const FinanceDriverShort = connect(mapStateToProps, mapDispatchToProps)(FDShort);

export default FinanceDriverShort;

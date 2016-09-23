import React, {PropTypes} from 'react';
import { connect } from 'react-redux';

import { setApplicantName } from '../../actions/applicant/applicantActions';

import FieldGroup from '../widgets/FieldGroup';

const ROOT_ID = {id: 'financeDriverShort', class: 'FinanceDriver FinanceDriverShort'};
const APPLICANT_FIRST_NAME = {id: 'applicant.name.first', label: 'First Name', class: 'Name FirstName', func: 'onFirstNameChange', isRequired: true};
const APPLICANT_MIDDLE_NAME = {id: 'applicant.name.middle', label: 'Middle Name', class: 'Name MiddleName', func: 'onMiddleNameChange', isRequired: true};
const APPLICANT_LAST_NAME = {id: 'applicant.name.last', label: 'Last Name', class: 'Name LastName', func: 'onLastNameChange', isRequired: true};

class FDShort extends React.Component {
  constructor(props) {
    super(props);
    this.getValue = this.getValue.bind(this);
    this.setValue = this.setValue.bind(this);
    this.getState = this.getState.bind(this);
    this.setState = this.setState.bind(this);
    this.validate = this.validate.bind(this);
    this.state = {};
  }

  createId(baseId, id, includeWithNoBaseId = true) {
    return (baseId && (baseId + '.' + id)) || (includeWithNoBaseId && id);
  }

  getValue(type) {
    return this.props[type.id];
  }

  setValue(type, value) {
    this.setState(type, true);
    this.props[type.func](value);
  }

  getState(type) {
    return this.state[type.id];
  }

  setState(type, value) {
    super.setState({ [type.id]: value });
  }

  validate(type) {
    return this.getState(type) === undefined ? null : (type.isRequired && this.getValue(type).length < 1) ? type.label + " is required" : "";
  }

  render() {
    return (
      <div id={ROOT_ID.id} className={ROOT_ID.class}>
        <form>
          <FieldGroup id={this.createId(ROOT_ID.id, APPLICANT_FIRST_NAME.id)} label={APPLICANT_FIRST_NAME.label} className={APPLICANT_FIRST_NAME.class} type='text'
            value={this.getValue(APPLICANT_FIRST_NAME)} onChange={(e) => this.setValue(APPLICANT_FIRST_NAME, e.target.value)} onBlur={(e) => this.setState(APPLICANT_FIRST_NAME, true)} validation={this.validate(APPLICANT_FIRST_NAME)} />
          <FieldGroup id={this.createId(ROOT_ID.id, APPLICANT_MIDDLE_NAME.id)} label={APPLICANT_MIDDLE_NAME.label} className={APPLICANT_MIDDLE_NAME.class} type='text'
            value={this.getValue(APPLICANT_MIDDLE_NAME)} onChange={(e) => this.setValue(APPLICANT_MIDDLE_NAME, e.target.value)} onBlur={(e) => this.setState(APPLICANT_MIDDLE_NAME, true)} validation={this.validate(APPLICANT_MIDDLE_NAME)} />
          <FieldGroup id={this.createId(ROOT_ID.id, APPLICANT_LAST_NAME.id)} label={APPLICANT_LAST_NAME.label} className={APPLICANT_LAST_NAME.class} type='text'
            value={this.getValue(APPLICANT_LAST_NAME)} onChange={(e) => this.setValue(APPLICANT_LAST_NAME, e.target.value)} onBlur={(e) => this.setState(APPLICANT_LAST_NAME, true)} validation={this.validate(APPLICANT_LAST_NAME)} />
        </form>
      </div>
    );
  }
}

FDShort.propTypes = {
  [APPLICANT_FIRST_NAME.id]: PropTypes.string.isRequired,
  [APPLICANT_MIDDLE_NAME.id]: PropTypes.string.isRequired,
  [APPLICANT_LAST_NAME.id]: PropTypes.string.isRequired,
  [APPLICANT_FIRST_NAME.func]: PropTypes.func.isRequired,
  [APPLICANT_MIDDLE_NAME.func]: PropTypes.func.isRequired,
  [APPLICANT_LAST_NAME.func]: PropTypes.func.isRequired
};

const mapStateToProps = (state) => {
  return {
    [APPLICANT_FIRST_NAME.id]: state.applicant.name.first,
    [APPLICANT_MIDDLE_NAME.id]: state.applicant.name.middle,
    [APPLICANT_LAST_NAME.id]: state.applicant.name.last,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    [APPLICANT_FIRST_NAME.func]: (firstName) => {
      dispatch(setApplicantName({ first: firstName }));
    },
    [APPLICANT_MIDDLE_NAME.func]: (middleName) => {
      dispatch(setApplicantName({ middle: middleName }));
    },
    [APPLICANT_LAST_NAME.func]: (lastName) => {
      dispatch(setApplicantName({ last: lastName }));
    }
  };
};

const FinanceDriverShort = connect(mapStateToProps, mapDispatchToProps)(FDShort);

export default FinanceDriverShort;

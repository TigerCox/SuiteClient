import {APPLICANT_SET_NAME, APPLICANT_SET_CONTACT, APPLICANT_SET_ADDRESS, APPLICANT_SET_PII, APPLICANT_SET_EMPLOYMENT} from './applicantActionTypes';

export const setApplicantName = (name) => {
  return {
    type: APPLICANT_SET_NAME,
    name
  };
};

export const setApplicantContact = (contact) => {
  return {
    type: APPLICANT_SET_CONTACT,
    contact
  };
};

export const setApplicantAddress = (address) => {
  return {
    type: APPLICANT_SET_ADDRESS,
    address
  };
};

export const setApplicantPII = (pii) => {
  return {
    type: APPLICANT_SET_PII,
    pii
  };
};

export const setApplicantEmployment = (employment) => {
  return {
    type: APPLICANT_SET_EMPLOYMENT,
    employment
  };
};

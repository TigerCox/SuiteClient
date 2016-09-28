// This service abstracts away the specific network request tech and config that we're using.
// This keeps all API calls short and consistent.
// If you are already using jQuery, you can use it to make AJAX calls here instead since
// Axios weighs about 20k. But note that jQuery's promise implementation is quirky.
import axios from 'axios';
import getBaseUrl from '../../buildTools/baseUrl';
import config from './config';

const api = null;

// Note that this can't be called until we're in the browser
// since we need to sniff the URL to know what environment we're in
// and therefore, what the baseURL should be for API calls.
const getInitializedApi = function() {
  if (api) return api; // return initialized api if already initialized.
  return axios.create({
    baseURL: getBaseUrl(),
    responseType: 'json',
    withCredentials: true
  });
};

const get = function(url) {
  return getInitializedApi().get(url);
};

const post = function(url, data) { // eslint-disable-line no-unused-vars
  return getInitializedApi().post(url, data);
};

// The API calls your app uses go down here. Export each function so they can be imported for use elsewhere...
export function getCustomers() {
  return get('API/CRMServiceBase/v1/users/search/');
}

export function getVehicle(vin) {
  return get(config.url + 'rest/suite/vehicle-description?accountId=6&vin=' + vin);
}

export function submitFinanceDriverShort(applicant) {
  return post(config.url + 'rest/finance/prequalifyAndSubmitLead', {
    "dealerId":"100221",
    "email": applicant.contact.email,
    "phone": applicant.contact.phone,
    "preQual":{
      "PartnerDealerIds":{
        "string":[
          "100221"
        ]
      },
      "Applicant":{
        "FirstName": applicant.name.first,
        "MiddleInitial": applicant.name.middle.charAt(0),
        "LastName": applicant.name.last,
        "SSN": applicant.pii.socialSecurity,
        "DateOfBirth": applicant.pii.dateOfBirth + "Z",
        "HomePhone": applicant.contact.phone,
        "AddressLine1": applicant.address.line1,
        "City": applicant.address.city,
        "State": applicant.address.state,
        "ZipCode": applicant.address.zip,
        "TotalMonthsEmployed": "" + parseInt(applicant.employment.lengthAtJob) * 12,
        "MonthlyIncome": parseInt(applicant.employment.income)
      },
      "ConsentIndicator":true,
      "PrivacyNotice":true
    },
    "raqLeadContact":{
      "id":0,
      "acceptDeclineDecisions":false,
      "originalHref":"https://ebusiness.dealertrack.com/Suite/?accountId=3&zip=97209&qaMode=true#PrequalPlace:Prequal",
      "divisionId":0,
      "modelId":0,
      "styleId":0,
      "bodyTypes":null,
      "price":0,
      "msrp":0,
      "options":null,
      "urlsAreEncrypted":false,
      "raqMirroringEnabled":true,
      "odometer":0,
      "estimatedPayment":0,
      "distanceToDealer":0,
      "loanSelected":true,
      "hasCreditAppInfo":false,
      "hasPrequalInfo":true,
      "fdDownPayment":0,
      "fdTerm":0,
      "fdNetTradeIn":0,
      "tradeInYear":0,
      "tradeInValue":0,
      "tradeInAmountOwed":0,
      "tradeInOdometer":0,
      "tradeInIsSystemProvided":false,
      "tradeDriverStandalone":false,
      "hasTradeInLoan":false,
      "answersByQuestionId":{

      },
      "dealer":{
        "id":"100221",
        "name":"Metro Automall",
        "phoneNumber":"555-666-7878",
        "address":{
          "_type":"com.dealertrack.dr.api.rest.shared.data.ContactAddressDTO",
          "street":"1111 Marcus Avenue",
          "city":"Miami",
          "state":"FL",
          "zipCode":"33010"
        }
      },
      "contactInfo":{
        "firstName": applicant.name.first,
        "lastName": applicant.name.last,
        "email": applicant.contact.email,
        "phone": applicant.contact.phone,
        "address": applicant.address.line1,
        "city": applicant.address.city,
        "state": applicant.address.state,
        "zipCode": applicant.address.zip,
        "responseMethod":"Email",
        "purposes":[

        ],
        "userComments":"I consent to receive autodialed, pre-recorded and artificial voice telemarketing and sales calls and text messages from or on behalf of dealer (or any financing source to which dealer assigns my contract) at the telephone number (s) provided in this communication, including any cell phone numbers. I understand that this consent is not a condition of purchase or credit. (503-234-1523)",
        "systemComments":""
      },
      "accountId":3,
      "didSubmitRaq":false,
      "additionalAcceptanceSelections":[

      ],
      "menuDriverProducts":{

      },
      "modelRefresh":false
    },
    "accountId":3
  });
}

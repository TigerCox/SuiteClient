import baseAPI from './base';

const submissionTemplate = (applicant) => {
  return {
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
  };
};

class FinanceDriverShort extends baseAPI {
  submitFinanceDriverShort(applicant) {
    return this.post('rest/finance/prequalifyAndSubmitLead', submissionTemplate(applicant)).then((val) => {
      if (val.status !== 200) {
        alert(val.statusText);
      } else if (val.data.errorMsg !== null) {
        alert(val.data.errorMsg);
      } else {
        alert("prequalRefNum:" + val.data.prequalRefNum + ", leadRefNum:" + val.data.leadRefNum);
      }
    }).catch((val) => {
      alert(val);
    });
  }
}

export default FinanceDriverShort;

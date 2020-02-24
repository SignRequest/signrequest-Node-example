const request = require("superagent");

const baseUrl = "https://yourteam.signrequest.com/api/v1";

// 4) Cancel a Sign Request:

const resendSignRequest = () => {
    request
    .post(`${baseUrl}/signrequests/uuid/resend_signrequest_email/`)
    .set("Authorization", "Token YOUR_TOKEN_HERE")
    .then(response => {
        console.log("Response: ", response.body)
    })
    .catch(console.error);
};

resendSignRequest();
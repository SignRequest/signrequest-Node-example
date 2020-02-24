const request = require("superagent");

const baseUrl = "https://yourteam.signrequest.com/api/v1";

// 4) Cancel a Sign Request:

const cancelSignRequest = () => {
    request
    .post(`${baseUrl}/signrequests/uuid/cancel_signrequest/`)
    .set("Authorization", "Token YOUR_TOKEN_HERE")
    .then(response => {
        console.log("Response: ", response.body)
    })
    .catch(console.error);
};

cancelSignRequest();
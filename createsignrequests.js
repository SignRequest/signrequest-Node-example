const request = require("superagent");

const baseUrl = "https://yourteam.signrequest.com/api/v1";

// 3) Create a Sign Request:

const data = {
    document: "https://yourteam.signrequest.com/api/v1/documents/uuid/",
    signers: [
        {
            email: 'name+1@provider.com'
        },
        {
            email: 'name+2@provider.com'
        }
    ],
    from_email: "name@provider.com",
    message: "Please sign this document",
    needs_to_sign: true,
    who: "o",
    subject: "SignTest - YourTeam API"
};

const createSignRequest = () => {
    request
    .post(`${baseUrl}/signrequests/`)
    .set("Authorization", "Token your_team_token")
    .send(data)
    .then(response => {
        console.log("Response: ", response.body)
    })
    .catch(console.error);
};

createSignRequest();
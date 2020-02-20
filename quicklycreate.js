const request = require("superagent");

const baseUrl = "https://yourteam.signrequest.com/api/v1";

const data = {
    file_from_url: "your_url_here",
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
    subject: "SignTest - YourTeam API",
    auto_delete_days: 1
};

const createSignRequest = () => {
    request
    .post(`${baseUrl}/signrequest-quick-create/`)
    .set("Authorization", "Token YOUR_TOKEN_HERE")
    .send(data)
    .then(response => {
        console.log("Response: ", response.body)
    })
    .catch(console.error);
};

createSignRequest();
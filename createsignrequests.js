const request = require("superagent");

const baseUrl = "https://yourteam.signrequest.com/api/v1";

// 3) Create a Sign Request:

const data = {
    document: "https://yourteam.signrequest.com/api/v1/documents/uuid/",
    signers: [
        {
            email: 'name+1@provider.com',
            //order: 1,
            //embeded_url_id: "id01",
            //redirect_url: "add_url", (for an embed_url)
            //password: "add_password", (optional)
            //after_document: "add_previous_document_here" (to chain multiple documents)
        },
        {
            email: 'name+2@provider.com',
            //order: 2,
            //embeded_url_id: "id02",
            //redirect_url: "add_url", (for an embed_url)
            //password: "add_password", (optional)
            //after_document: "add_previous_document_here" (to chain multiple documents)
        }
    ],
    from_email: "name+3@provider.com",
    message: "Please sign this document",
    needs_to_sign: true,
    who: "o",
    //it can also be "mo" (me and others), "m" (only me)
    subject: "SignTest - YourTeam API"
};

const createSignRequest = () => {
    request
    .post(`${baseUrl}/signrequests/`)
    .set("Authorization", "Token YOUR_TOKEN_HERE")
    .send(data)
    .then(response => {
        console.log("Response: ", response.body)
    })
    .catch(console.error);
};

createSignRequest();
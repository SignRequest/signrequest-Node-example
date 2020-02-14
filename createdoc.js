const request = require("superagent");

const baseUrl = "https://yourteam.signrequest.com/api/v1";

// 1) Get Documents:

const getDocs = () => {
    request(`${baseUrl}/documents/`)
    .set("Authorization", "Token your_token")
    .then(response => {
        console.log("Response: ", response.body)
    })
    .catch(console.error);
};

getDocs();

// 2) Create a New Document:

const data = {
    file_from_url: "your_file_pdf"
};

const createDoc = () => {
    request
    .post(`${baseUrl}/documents/`)
    .set("Authorization", "Token your_team_token")
    .send(data)
    .then(response => {
        console.log("Response: ", response.body)
    })
    .catch(console.error);
};

createDoc();


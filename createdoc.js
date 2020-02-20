const request = require("superagent");

const baseUrl = "https://yourteam.signrequest.com/api/v1";

// 1) Get Documents:

const getDocs = () => {
  request(`${baseUrl}/documents/`)
    .set("Authorization", "Token YOUR_TOKEN_HERE")
    .then(response => {
      console.log("Response: ", response.body);
    })
    .catch(console.error);
};

getDocs();

// 2) Create a New Document:

const data = {
    file_from_url: "your_url_here"
//   template:
//     "https://yourteam.signrequest.com/api/v1/templates/uuid/",
//   prefill_tags: [
//       {external_id: "contact01_name", text: "contact01"},
//       {external_id: "contact02_name", text: "contact02"},
//       {external_id: "date_prefill01", date_value: "YYYY-MM-DD"},
//       {external_id: "date_prefill02", date_value: "YYYY-MM-DD"}
//   ],
//   auto_delete_days: 1
};

const createDoc = () => {
  request
    .post(`${baseUrl}/documents/`)
    .set("Authorization", "Token YOUR_TOKEN_HERE")
    .send(data)
    .then(response => {
      console.log("Response: ", response.body);
    })
    .catch(console.error);
};

createDoc();
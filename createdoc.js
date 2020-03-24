const request = require("superagent");
const fs = require('fs');

const baseUrl = "https://yourteam.signrequest.com/api/v1";

// 1) Get Documents

const getDocs = () => {
  request(`${baseUrl}/documents/`)
    .set("Authorization", "Token YOUR_TOKEN_HERE")
    .then(response => {
      console.log("Response: ", response.body);
    })
    .catch(console.error);
};

getDocs();

//transform File to base64

const buffer = Buffer.from('demo_document.pdf', 'binary');

const dataFile = fs.readFileSync(buffer);

const pdf = dataFile.toString('base64');

console.log(pdf)

// 2) Create a New Document:

const data = {
    file_from_url: "your_pdf_url",
//  file_from_content: pdf,
//  file_from_content_name: 'demo_document.pdf',
//  name: 'demo_document.pdf',
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
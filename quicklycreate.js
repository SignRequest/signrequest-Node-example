const request = require("superagent");

const baseUrl = "https://yourteam.signrequest.com/api/v1";

//transform File to base64

const buffer = Buffer.from('./pdf/demo_document.pdf', 'binary');

const dataFile = fs.readFileSync(buffer);

const pdf = dataFile.toString('base64');

console.log(pdf)

const data = {
  file_from_url: "your_url_here",
  //  file_from_content: pdf,
  //  file_from_content_name: './pdf/demo_document.pdf',
  //  name: 'demo_document.pdf',
  signers: [
    {
      email: "name+1@provider.com"
    },
    {
      email: "name+2@provider.com"
    }
  ],
  from_email: "name@provider.com",
  message: "Please sign this document",
  needs_to_sign: true,
  who: "o",
  subject: "SignTest - YourTeam API",
  auto_delete_days: 1
  //   template:
  //     "https://yourteam.signrequest.com/api/v1/templates/uuid/",
  //   prefill_tags: [
  //       {external_id: "contact01_name", text: "contact01"},
  //       {external_id: "contact02_name", text: "contact02"},
  //       {external_id: "date_prefill01", date_value: "YYYY-MM-DD"},
  //       {external_id: "date_prefill02", date_value: "YYYY-MM-DD"}
  //   ],
};

const createSignRequest = () => {
  request
    .post(`${baseUrl}/signrequest-quick-create/`)
    .set("Authorization", "Token YOUR_TOKEN_HERE")
    .send(data)
    .then(response => {
      console.log("Response: ", response.body);
    })
    .catch(console.error);
};

createSignRequest();

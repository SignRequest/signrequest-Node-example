const hummus = require("hummus");
const request = require("superagent");

const docoutput = "document.pdf";

//Start Hummus pdf to create a specific document output
const pdfWriter = hummus.createWriter(__dirname + `/output/${docoutput}`, {
  version: hummus.ePDFVersion14,
});
//Set up page configuration:
const page = pdfWriter.createPage(0, 0, 595, 842);
const cxt = pdfWriter.startPageContentContext(page);

//black color
const textOptionsBlack = {
  font: pdfWriter.getFontForFile(__dirname + "/fonts/arial.ttf"),
  size: 14,
  colorspace: "gray",
  color: 0x00,
  underline: true,
};

//white color
const textOptionsWhite = {
  font: pdfWriter.getFontForFile(__dirname + "/fonts/arial.ttf"),
  size: 14,
  colorspace: "gray",
  color: 0xFFFFFF,
  underline: true,
};

// writeText
cxt
  .writeText("Please sign here:", 75, 805, textOptionsBlack)
  .writeText("[[s|1]]", 75, 780, textOptionsWhite)
  .writeText(
    "Customer name:",
    370,
    805,
    textOptionsBlack
  )
  .writeText("[[t|1| id: contact_name]]", 370, 780, textOptionsWhite)
  .writeText("Do you agree with this contract?", 370, 400, textOptionsBlack)
  .writeText("[[c|1| id: checkbox1]]", 370, 380, textOptionsWhite)

//Create 4 pages when: const page = pdfWriter.createPage();

// page.mediaBox = [0, 0, 595, 842];
// for (var i = 0; i < 4; ++i) {
//   pdfWriter.writePage(page);
// }

pdfWriter.writePage(page);
pdfWriter.end();
console.log("Document Successfully Created!");
console.log("Creating a SignRequest...");

//Send SignRequest:

const baseUrl = "https://<your_team>.signrequest.com/api/v1";

//base 64 doc

const fs = require("fs");

const buffer = Buffer.from(__dirname + `/output/${docoutput}`, "binary");

const dataFile = fs.readFileSync(buffer);

const pdf = dataFile.toString("base64");

console.log("Output document encoded to base64. \n")

//Data based on /signrequest-quick-create/ for /documents/ + /signrequests/ change the code below:

const data = {
  file_from_content: pdf,
  file_from_content_name: __dirname + `/output/${docoutput}`,
  name: "demo_document.pdf",
  signers: [
    {
      email: "name+1@provider.com",
      order: 1,
    },
  ],
  from_email: "name@provider.com",
  message: "Hi, \n \nPlease sign the document below. \nBest regards",
  who: "o",
  subject: "Document",
  prefill_tags: [
    { external_id: "contact_name", text: "Name" },
    { external_id: "checkbox1", checkbox_value: true },
  ],
};

const Token = "Token PASTE_YOUR_TOKEN_HERE"

const createSignRequest = () => {
  request
    .post(`${baseUrl}/signrequest-quick-create/`)
    //Prod
    .set("Authorization", Token)
    .send(data)
    .then((response) => {
      console.log("Response: ", response.body);
    })
    .catch(console.error);
};

createSignRequest();

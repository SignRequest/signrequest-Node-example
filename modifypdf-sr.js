const hummus = require("hummus");
const request = require("superagent");

const document = "demo_document.pdf";
const docoutput = "demo_document_mod.pdf";

const pdfWriter = hummus.createWriterToModify(__dirname + `/pdf/${document}`, {
  modifiedFilePath: __dirname + `/output/${docoutput}`,
});

const pageModifier = new hummus.PDFPageModifier(pdfWriter, 0, true);

const cxt = pageModifier.startContext().getContext();

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
  color: 0xffffff,
  underline: false,
};

//white color - multiline
const textOptionsWhiteMulti = {
  font: pdfWriter.getFontForFile(__dirname + "/fonts/arial.ttf"),
  size: 36,
  colorspace: "gray",
  color: 0xffffff,
  underline: false,
};

//Refference: 1) Width - X (left-right), 2) Height - Y (botton-up)

// writeText
cxt
  .writeText("Please sign here:", 75, 240, textOptionsBlack)
  .writeText("[[s|1]]", 75, 220, textOptionsWhite)
  .writeText("Customer name:", 300, 240, textOptionsBlack)
  .writeText("[[t|1| id: contact_name]]", 300, 220, textOptionsWhite)
  .writeText("Multiline Text:", 90, 650, textOptionsBlack)
  .writeText("[[t|1| id: multiline_text]]", 90, 600, textOptionsWhiteMulti)
  .writeText("Do you agree with this contract?", 370, 400, textOptionsBlack)
  .writeText("[[c|1| id: checkbox1]]", 370, 380, textOptionsWhite);


pageModifier.endContext().writePage();
pdfWriter.end();

console.log("Document Successfully Modified! \n");
console.log("Initializing a SignRequest... \n");

//Send SignRequest:

const baseUrl = "https://<your_team>.signrequest.com/api/v1";

//base 64 doc

const fs = require("fs");

const buffer = Buffer.from(__dirname + `/output/${docoutput}`, "binary");

const dataFile = fs.readFileSync(buffer);

const pdf = dataFile.toString("base64");

console.log("Output document encoded to base64. \n")

const data = {
  file_from_content: pdf,
  file_from_content_name: __dirname + `/output/${docoutput}`,
  name: "demo_document.pdf",
  signers: [
    {
      email: "name+1@provider.com",
      order: 1,
      first_name: 'Name',
      last_name: 'Last Name'
    },
  ],
  from_email: "name@provider.com",
  message: "Hi, \n \nPlease sign the document below. \nBest regards",
  who: "o",
  subject: "Document",
  prefill_tags: [
    { external_id: "contact_name", text: "Name Last Name" },
    { external_id: "checkbox1", checkbox_value: true },
    {
      external_id: "multiline_text",
      text:
        "Lorem ipsum dolor sit amet, aliquam tristique nulla. \nNam fusce ipsum molestie auctor, placerat faucibus. \nProin ligula libero quam leo porta, phasellus metus urna justo nec fringilla, risus quis aliquam sollicitudin, et per sed diam.",
    },
  ],
};

const Token = "Token PASTE_YOUR_TOKEN_HERE"

const createSignRequest = () => {
  request
    .post(`${baseUrl}/signrequest-quick-create/`)
    .set("Authorization", Token)
    .send(data)
    .then((response) => {
      console.log("Response: ", response.body);
    })
    .catch(console.error);
};

createSignRequest();

console.log('SignRequest created! Check your e-mail for more details, or use your Embed/Prepare URL. \n \n')

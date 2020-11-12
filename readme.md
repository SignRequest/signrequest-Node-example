# SignRequest API - Node Example

## Example to GET, create documents and send sign requests to SignRequest's API

### Getting Started

1) Clone this Repository
2) Install Dependencies with: ```npm install```.

### Create a Document:

createdoc.js

1) Add your team subdomain in "baseUrl".
2) Create a Document at createdoc.js:
i) Fill the header with your Token in "your_token_here".
ii) Add the data in "file_from_url", a sharable url with a .pdf document.
Obs: You can send a pdf document encoding it to base64, for that, use the snippet provided in 'pdf2base64.pdf'. For that, use ```file_from_content``` and ```file_from_content_name``` and ```name```.
Obs2: To run tests, use the attached 'demo_document.pdf'.
3) Run the code with: ```node createdoc.js```.

### Create a Sign Request:

createsignrequests.js

1) Add your team subdomain in "baseUrl".

**DATA OBJECT:**

2) Add your newly created document in data.document.
3) Add the signers information in data.signers[].
4) Add the sender e-mail address at "from_email".
5) Add your customized message.
6) Add any additional information in the Data Object, such as "who" needs to sign or subject.

For more information check the documentation for the "/signrequests/" endpoint.

https://signrequest.com/api/v1/docs/#tag/signrequests

7) Add your team's Token in the "createSignRequest" header at "Authorization".

### Quickly Create Document and Sign Request:

quicklycreate.js

To send a request to the "/signrequest-quick-create/" endpoint, which incorporates both previous endpoints in one. You can use "quicklycreate.js" file. 

For more info, check the documentation: https://signrequest.com/api/v1/docs/#tag/signrequest-quick-create

### Cancel Sign Request

cancelsr.js

To cancel a sign request, send a POST request to ```/signrequests/uuid/cancel_signrequest/``` including the sign request's uuid.

### Resend Sign Request

resendsr.js

To resend the email of a sign request, send a POST request to ```/signrequests/uuid/resend_signrequest_email/``` including the sign request's uuid.

### iframe.html

You can use this boilerplate for an iframe embeded url of a sign request.

## Create and Modify PDFs

See example of how to create new and modify existing PDF documents via Node.js, containing placeholders and texts that can be sent as SignRequests. This example uses HummusJS: https://github.com/galkahana/HummusJS

See:

[Create PDFs with SignRequests](https://github.com/SignRequest/signrequest-Node-example/blob/master/createpdf-sr.js)

[Modify PDFs with SignRequests](https://github.com/SignRequest/signrequest-Node-example/blob/master/modifypdf-sr.js)
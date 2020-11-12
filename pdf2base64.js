//Example - Converting PDF to base64

const fs = require('fs');

const buffer = Buffer.from('demo_document.pdf', 'binary');

const data = fs.readFileSync(buffer);

const pdf = data.toString('base64');

console.log(pdf)
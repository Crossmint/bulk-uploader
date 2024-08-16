const fs = require('fs');
const csv = require('csv-parser');
require('dotenv').config();

const collectionId = process.env.COLLECTION_ID;
const apiKey = process.env.API_KEY;
const apiUrl = `https://staging.crossmint.com/api/2022-06-09/collections/${collectionId}/templates`;

// Rate limiting setup
const rateLimit = 100; // requests per minute
const interval = 60000 / rateLimit; // interval in milliseconds

async function sendRequest(data) {
  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-API-KEY': `${apiKey}`
      },
      body: JSON.stringify(data)
    });
    const responseData = await response.json();
    console.log('Success:', responseData);
  } catch (error) {
    console.error('Error:', error.message);
  }
}

// Read and process the CSV file
function processFile() {
  let promise = Promise.resolve();
  fs.createReadStream('metadata.csv')
    .pipe(csv())
    .on('data', (row) => {
      promise = promise.then(() => {
        const postData = {
          metadata: {
            name: row.name,
            image: row.image, // this should be a publicly accessible URL
            description: row.description,
          },
          supply: {limit: Number(row.supply)},
          reuploadLinkedFiles: false, // this is optional
        };
        return sendRequest(postData).then(() => new Promise(resolve => setTimeout(resolve, interval)));
      });
    })
    .on('end', () => {
      promise.then(() => {
        console.log('Finished processing file.');
      });
    });
}

processFile();
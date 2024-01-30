import fs from 'fs';
import weaviate from 'weaviate-ts-client';

const client = weaviate.client({
    scheme: 'http',
    host: 'localhost:8080',
});

const test = Buffer.from( fs.readFileSync('./test.jpg') ).toString('base64');

const resImage = await client.graphql.get()
  .withClassName('MemeDB')
  .withFields(['image'])
  .withNearImage({ image: test })
  .withLimit(1)
  .do();

// Write result to filesystem
const result = resImage.data.Get.MemeDB[0].image;
fs.writeFileSync('./result.jpg', result, 'base64');
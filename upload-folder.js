import fs from 'fs';
import { toBase64FromBlob } from 'weaviate-ts-client';
import weaviate from 'weaviate-ts-client';

const client = weaviate.client({
    scheme: 'http',
    host: 'localhost:8080',
});
const imgFiles = fs.readdirSync('./img');

const promises = imgFiles.map(async (imgFile) => {
    const b64 = toBase64FromBlob(`./img/${imgFile}`);

    await client.data.creator()
        .withClassName('MemeDB')
        .withProperties({
            image: b64,
            text: imgFile.split('.')[0].split('_').join(' ')
        })
        .do(); 
});

await Promise.all(promises);
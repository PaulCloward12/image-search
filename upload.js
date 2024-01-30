/*
    Store an imageImages must first be converted to base64. 
    Once converted, store it to the cooresponding class in the schema. 
    Weaviate will automatically use the neural network in the background 
    to vectorize it and update the embedding.
*/
import fs from 'fs';
import weaviate from 'weaviate-ts-client';

const client = weaviate.client({
    scheme: 'http',
    host: 'localhost:8080',
});

const img = fs.readFileSync('./img/crown2.jpg');

const b64 = Buffer.from(img).toString('base64');
try{
  let result = await client.data.creator()
  .withClassName('MemeDB')
  .withProperties({
    image: b64,
    text: 'show meme'
  })
  .do();
  console.log("(success) result: ", result);
}catch(e){
  // "invalid object: no such prop with name 'thisPropShouldNotEndUpInTheSchema' found..."
  console.error('Expecting error about thisPropShouldNotEndUpInTheSchema:', e.message);
}



   
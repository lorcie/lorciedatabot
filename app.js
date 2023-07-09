const express = require('express');
const axios = require('axios');
const MongoClient = require('mongodb').MongoClient;
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 8081;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const swaggerUi = require('swagger-ui-express'),
swaggerDocument = require('./swagger.json');

app.use(
    '/api-docs',
    swaggerUi.serve, 
    swaggerUi.setup(swaggerDocument)
  );

app.get('/movies', async (req, res) => {
    const input = req.query.input || 'Propose movies about Civil War';
    try {
      const embedding = await getEmbedding(input);

      const documents = await findSimilarDocuments(embedding);
      let movies = documents
        .map((movie) => ({
          title: movie.title,
          plot: movie.plot,
          fullplot: movie.fullplot,
          released: movie.released,
          poster: movie.poster
        }));
  
      res.send(movies);
    } catch (error) {
        console.log(error);
      res.status(400).send('Error while getting list of movies');
    }
});

app.post('/query', async (req, res) => {
    const input = req.body.input;
    try {
      const embedding = await getEmbedding(input);

      const documents = await findSimilarDocuments(embedding);
      let movies = documents
        .map((movie) => ({
          title: movie.title,
          plot: movie.plot,
          fullplot: movie.fullplot,
          released: movie.released,
          poster: movie.poster
        }));
  
      res.send(movies);
    } catch (error) {
        console.log(error);
      res.status(400).send('Error while getting list of movies');
    }
});

app.listen(PORT, () => {
    console.log(`server started on port ${PORT}`);
});

async function getEmbedding(query) {
    // Define the OpenAI API url and key.
    const url = 'https://api.openai.com/v1/embeddings';
    const openai_key = process.env.OPENAI_KEY; // Replace with your OpenAI key.
    
    // Call OpenAI API to get the embeddings.
    let response = await axios.post(url, {
        input: query,
        model: "text-embedding-ada-002"
    }, {
        headers: {
            'Authorization': `Bearer ${openai_key}`,
            'Content-Type': 'application/json'
        }
    });
    
    if(response.status === 200) {
        return response.data.data[0].embedding;
    } else {
        throw new Error(`Failed to get embedding. Status code: ${response.status}`);
    }
}

async function findSimilarDocuments(embedding) {
    const url = `mongodb+srv://${process.env.MONGODB_LOGIN}:${process.env.MONGODB_PWD}@${process.env.MONGODB_ID}.mtf5rms.mongodb.net/?retryWrites=true&w=majority`; // Replace with your MongoDB url.
    const client = new MongoClient(url);
    
    try {
        await client.connect();
        
        const db = client.db(process.env.MONGODB_NAME); // Replace with your database name.
        const collection = db.collection(process.env.MONGODB_COLLECTION); // Replace with your collection name.
        
        // Query for similar documents.
        const documents = await collection.aggregate([
            {
            "$search": {
            "index": "moviesPlotIndex",
            "knnBeta": {
            "vector": embedding,
            "path": "plot_embedding",
            "k": 5
            }
            }
            }
            ]).toArray();
        
        return documents;
    } finally {
        await client.close();
    }
}

async function main() {
    const query = 'Propose movies about Civil War'; // Replace with your query.
    
    try {
        const embedding = await getEmbedding(query);
        const documents = await findSimilarDocuments(embedding);
        
        console.log(documents);
    } catch(err) {
        console.error(err);
    }
}

//main();
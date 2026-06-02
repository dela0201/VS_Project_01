const { MongoClient, ServerApiVersion } = require('mongodb');

const uri = "mongodb+srv://admin:vR1rM9sGOznl0Php@humile.sf9cnm0.mongodb.net/?appName=Humile";

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function connectDB() {
  await client.connect();
  return client.db("Courses"); // ← targets the "Courses" database
}

module.exports = { client, connectDB };


async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    await client.close();
  }
}
run().catch(console.dir);

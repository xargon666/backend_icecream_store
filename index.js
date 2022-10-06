const express = require("express");
const app = express();
const port = process.env.PORT || 5000; // req for Heroku only?
// const mongodb = process.env.MONGODB_URL
// console.log({mongodb})
const username = 'devchris'
const password = 'password1234'
const mongoDbUri = `mongodb+srv://${username}:${password}@icecreamshoptest.xk9grgg.mongodb.net/?retryWrites=true&w=majority`
const client = new MongoClient(uri);

async function run() {
    try {
      const database = client.db('icecreamShop');
      const products = database.collection('products');
      // Query for a movie that has the title 'Back to the Future'
      const getAll = await database.users.find();
      console.table(database);
    } finally {
      // Ensures that the client will close when you finish/error
      await client.close();
    }
  }
  run().catch(console.dir);

// Routes
const testRouter = require('./routes/test');
const userRouter = require('./routes/user');
const productRouter = require('./routes/product');

app.use('/test',testRouter)
app.use('/user',userRouter)
app.use('/product',productRouter)

app.listen(port, () => {
    console.log(`Listening on http://localhost:${port}`)
});

// CORS stuff - elminates errors in cases I don't understand yet
const cors = require('cors'); 
app.use(express.json())
app.use(cors());

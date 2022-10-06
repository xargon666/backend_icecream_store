const express = require("express");
const app = express();
const port = process.env.PORT || 5000; // req for Heroku only?
const mongodb = process.env.MONGODB_URL
console.log({mongodb})
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
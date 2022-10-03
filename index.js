const express = require("express");
const app = express();
const port = 5000;

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

// const cors = require('cors'); 
// app.use(express.json())
// app.use(cors());
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const router = require('./routes/routes');
const dotenv = require('dotenv');

const app = express();

app.use(cors());
app.use(express.json());
app.use('/api', router);

dotenv.config();
const PORT = process.env.PORT || 8080;

mongoose.set("strictQuery", false);
mongoose.connect(process.env.MONGO_URI)
.then(() =>{
    console.log('Connected to MongoDB');
    app.listen(PORT, () => {
        console.log(`Node API runs at ${PORT}`);
    });
}).catch((error) => {
    console.log(error)
});
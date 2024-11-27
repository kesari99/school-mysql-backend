const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv');

const app = express();
dotenv.config();

var corsOptions = {
    origin: "http://localhost:8081"
}


//middleware
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


const router = require('./routes/schoolRoute.js');

app.use('/api/school', router);

app.get('/', (req, res) => {
    res.json({ message: "Welcome to the application." });

})

const PORT = process.env.PORT || 8080;


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
})
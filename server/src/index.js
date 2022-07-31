const app = require('./App');
const dotenv = require('dotenv');
const conneciton = require('./config/db');
dotenv.config();




app.get('/', (req, res) => {

    const date = new Date();
    console.log(date);
    res.send('Hello World');
});

conneciton.once('open', () => {
    console.log(`Database Connected`)
});
const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})


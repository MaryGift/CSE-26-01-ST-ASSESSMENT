//1.dependencies
const express = require ('express');
const path = require ('path');
const mongoose = require('mongoose');



require('dotenv').config(); // this will load environment variables from a .env file into process.env
const productRoutes = require('./routes/productRoutes');
//2.Instatiations.
const app = express();
const PORT = 3001;

//3.Configurations.
//setting up database connection
mongoose.connect(process.env.DATABASE), 
mongoose.connection.
    once('open', () => {
    console.log('connected to database')
})  .on('error', (err) => {
    console.error(`database connection error: ${err.message}`);
});

app.set('view engine', 'pug'); // tells project that we are going to use pug
app.set('views', path.join(__dirname, 'views')) //1st view means that all our front end pages will be found after underscore _dirname.
// 2nd views, specifies the views directory,


4.//Middleware.
app.use(express.static(path.join (__dirname, 'public'))); //this helps to serve static files
app.use(express.urlencoded({extended: false})); 
app.use(express.json());// this helps to parse data from forms.
//to parse JSON data.


app.use('/', products); // this will use the dashboard routes for all routes starting with /dashboard
app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`);
});
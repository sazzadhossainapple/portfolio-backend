const mongoose = require('mongoose');
const dotenv = require('dotenv').config();
const colors = require('colors');

const app = require('./app');

// database connection

DATABASE_Development = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.kqw4pwk.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority&appName=Cluster0`;

const connectDB = async () => {
    try {
        await mongoose
            .connect(DATABASE_Development)
            .then(() => {
                console.log(`Database connection is successful`.red.bold);
            })
            .catch((err) => console.log(err));
    } catch (error) {
        console.log(error);
    }
};

// server run port
const port = process.env.PORT || 8080;

connectDB().then(() => {
    app.listen(port, () => {
        console.log(`App is running on port ${port}`.yellow.bold);
    });
});

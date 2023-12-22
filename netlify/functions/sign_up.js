const mongoose = require('mongoose');
const { User_signup} = require('../../backend/schema/sign_up_schema.js');
const mongoURI = "mongodb://0.0.0.0:27017/noteit";

exports.handler = async function(event, context) {
    // DB connection
    await mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });

    try {

console.log("+++++++",event.body.email)
        let jsonObj ={email:JSON.parse(event.body).email,password:JSON.parse(event.body).password}

        const docs = await User_signup.collection.insertOne(jsonObj)
        return {
            statusCode: 200,
            body: "Accounted Created!",
            headers: {
                'Access-Control-Allow-Origin': '*', // replace '*' with your origin
                'Access-Control-Allow-Headers': 'Content-Type'
            }
        };
    } catch (err) {
        console.log("===mail====",JSON.parse(event.body).email)
        console.log('error', err);
        return {
            statusCode: 200,
            body: "Error creating account",
            headers: {
                'Access-Control-Allow-Origin': '*', // replace '*' with your origin
                'Access-Control-Allow-Headers': 'Content-Type'
            }
        };
    }
};
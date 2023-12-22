const mongoose = require('mongoose');
const {  User_notes } = require('../../backend/schema/user_notes_schema.js');
const mongoURI = "mongodb://0.0.0.0:27017/noteit";

exports.handler = async function(event, context) {
  // DB connection
  await mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });

  try {

      let {email, tag , data} =JSON.parse(event.body)

      const docs = await User_notes.collection.insertOne({email, tag , data})
      return {
          statusCode: 200,
          body: "True",
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
          body: "False",
          headers: {
              'Access-Control-Allow-Origin': '*', // replace '*' with your origin
              'Access-Control-Allow-Headers': 'Content-Type'
          }
      };
  }
};
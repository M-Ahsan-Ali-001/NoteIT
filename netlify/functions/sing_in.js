const mongoose = require('mongoose');
const { User_signup } = require('../../backend/schema/sign_up_schema.js');
const mongoURI = "mongodb://0.0.0.0:27017/noteit";

exports.handler = async function (event, context) {
  try {
    await mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });

    const { email, password } = JSON.parse(event.body);

   console.log(email,password)
    const docs = await User_signup.findOne({ email, password});

    if (docs) {
      return {
        statusCode: 200,
        body: "Login successful",
        headers: {
          'Access-Control-Allow-Origin': '*', // replace '*' with your origin
          'Access-Control-Allow-Headers': 'Content-Type'
        }
      };
    } else {
      return {
        statusCode: 200,
        body: "Invalid credentials",
        headers: {
          'Access-Control-Allow-Origin': '*', // replace '*' with your origin
          'Access-Control-Allow-Headers': 'Content-Type'
        }
      };
    }
  } catch (err) {
    console.error(err);
    return {
      statusCode: 200,
      body: "Internal server error",
      headers: {
        'Access-Control-Allow-Origin': '*', // replace '*' with your origin
        'Access-Control-Allow-Headers': 'Content-Type'
      }
    };
  } finally {
    await mongoose.disconnect();
  }
};

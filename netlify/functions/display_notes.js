const mongoose = require('mongoose');
// const Prometheus = require('promes');

// const prometheus = new Prometheus({ appName: 'prometheus' });
const {  User_notes } = require('../../backend/schema/user_notes_schema.js');
const mongoURI = "mongodb+srv://Anonymous:FOX.user786@spmnoteapp.ehlsydv.mongodb.net/";

exports.handler = async function(event, context) {


  
  // prometheus.observe({
  //   functionName: context.functionName,
  //   event,
  //   context,
  // });

  
    // DB connection
    await mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });
  try{

    console.log("asdasdasd",JSON.parse(event.body).email)

    const doc =await User_notes.collection.find({"email":JSON.parse(event.body).email}).toArray((err, documents) => {
        console.log("8*******");
        if (err) throw err;
    
        // Process the result
        console.log("8*******",documents);
    
        //return doc
     
      });
      if(doc){
        console.log("8*******",doc);


  
      }
     

      return {
        statusCode: 200,
        body: JSON.stringify(doc),
        headers: {
            'Access-Control-Allow-Origin': '*', // replace '*' with your origin
            'Access-Control-Allow-Headers': 'Content-Type',
         
        }
    };

  }

  catch(err){
    return {
        statusCode: 200,
        body: err,
        headers: {
            'Access-Control-Allow-Origin': '*', // replace '*' with your origin
            'Access-Control-Allow-Headers': 'Content-Type',
    
        }
    };

  }
  
  };
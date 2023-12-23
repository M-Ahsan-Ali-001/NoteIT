const mongoose = require('mongoose');
const {  User_notes } = require('../../backend/schema/user_notes_schema.js');
const mongoURI = "mongodb+srv://Anonymous:FOX.user786@spmnoteapp.ehlsydv.mongodb.net/";
const { ObjectId } = require('mongodb');
exports.handler = async function(event, context) {
    // DB connection
    await mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });
  try{

    console.log("+++++asdasdasd",(event.body))
    const id= new ObjectId(JSON.parse((event.body)).note_id)

    await User_notes.collection.deleteOne({_id:id },function(err,reslt){

        if (err) throw err;
        console.log("_)_",reslt);

        if(reslt. deletedCount === 1){

            return {
                statusCode: 200,
                body: JSON.parse("Deleted"),
                headers: {
                    'Access-Control-Allow-Origin': '*', // replace '*' with your origin
                    'Access-Control-Allow-Headers': 'Content-Type',
                 
                }
            }

        }
        else{


            return {
                statusCode: 200,
                body: JSON.parse("Wrong ID!"),
                headers: {
                    'Access-Control-Allow-Origin': '*', // replace '*' with your origin
                    'Access-Control-Allow-Headers': 'Content-Type',
                 
                }
            }
        }
    


    })
     


   return{
    statusCode: 200,
                body: JSON.parse("ok!"),
   }
    

  }

  catch(err){

    console.log("__error___",err)
    return {
        statusCode: 200,
        
        body:'erroe',
        headers: {
            'Access-Control-Allow-Origin': '*', // replace '*' with your origin
            'Access-Control-Allow-Headers': 'Content-Type',
    
        }
    };

  }
  
  };
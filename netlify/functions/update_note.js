const mongoose = require('mongoose');
const {  User_notes } = require('../../backend/schema/user_notes_schema.js');
const mongoURI = "mongodb://0.0.0.0:27017/noteit";
const { ObjectId } = require('mongodb');
exports.handler = async function(event, context) {
    // DB connection
    await mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });
  try{

    console.log("+++++asdasdasd",(event.body))
    const body = JSON.parse(event.body)
    const id= new ObjectId(body.note_id)
    
   // const email= new (body.email)
    
    const tag= body.tag
    
    const data=  body.data



    await User_notes.collection.updateOne({_id:id } , {$set:{tag:tag,data:data}} ,function(err,reslt){

        if (err) throw err;
        console.log("_)_",reslt);

        if(reslt.modifiedCount > 1){

            return {
                statusCode: 200,
                body: JSON.stringify("Deleted"),
                headers: {
                    'Access-Control-Allow-Origin': '*', // replace '*' with your origin
                    'Access-Control-Allow-Headers': 'Content-Type',
                 
                }
            }

        }
        else{


            return {
                statusCode: 200,
                body: JSON.stringify("Wrong ID!"),
                headers: {
                    'Access-Control-Allow-Origin': '*', // replace '*' with your origin
                    'Access-Control-Allow-Headers': 'Content-Type',
                 
                }
            }
        }
    


    })
     


   return{
    statusCode: 200,
                body: JSON.stringify("ok!"),
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
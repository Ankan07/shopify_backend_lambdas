

const MongoClient = require('mongodb').MongoClient;

const url = 'mongodb+srv://ankan:ankan@cluster0-qp6co.mongodb.net/test?retryWrites=true&w=majority';
 
let client = null;
const connectToDb = async (databasename) => {
    if(!client) {
        client = await new MongoClient(url, {useUnifiedTopology: true, useNewUrlParser: true}).connect();
    }
    return client.db(databasename);
}




exports.handler = async (event, context) => {
    context.callbackWaitsForEmptyEventLoop = false;
   try{
    const db = await connectToDb('shopify_database');
    var insert = await db.collection('shopify').insertOne(event);
    
    return insert
   }
   
   
   
   catch(err){
       return err
       
       
       
   }
    
}

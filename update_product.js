const MongoClient = require('mongodb').MongoClient;

const ObjectId = require('mongodb').ObjectId;



const url = 'mongodb+srv://ankan:ankan@cluster0-qp6co.mongodb.net/test?retryWrites=true&w=majority';

let client = null;
const connectToDb = async(databasename) => {
    if (!client) {
        client = await new MongoClient(url, { useUnifiedTopology: true, useNewUrlParser: true }).connect();
    }
    return client.db(databasename);
}




exports.handler = async(event, context) => {
    context.callbackWaitsForEmptyEventLoop = false;
    try {
        const db = await connectToDb('shopify_database');
        var  update_result= await db.collection('shopify').updateOne({ "_id": ObjectId(event.id) }, { $set: { "email": event.email, "total_price": event.price } })

        return {
            "message": "updated",
            "status": "sucess"
        }
    }



    catch (err) {


        return {

            "message": "could not update update",
            "status": "error"
        }



    }

}

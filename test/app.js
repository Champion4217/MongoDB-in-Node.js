const {MongoClient} = require("mongodb");
const uri = require("./atlas_uri");




const client = new MongoClient(uri);
const dbName = "blog";
const collection_name = "comments";
const commentsCollection = client.db(dbName).collection(collection_name);



const connectToDatabase = async() => {
    try{
        await client.connect();
        console.log("connected to (dbName) database");
    }catch(err){
        console.log(err);
    }
    };

    const sampleAccounts = [
        {
          account_id: "MDB011235813",
          account_holder: "Ada Lovelace",
          account_type: "checking",
          balance: 60218,
        },
        {
          account_id: "MDB829000001",
          account_holder: "Muhammad ibn Musa al-Khwarizmi",
          account_type: "savings",
          balance: 267914296,
        },
       ]
        

    const main = async () => {
        try {
          await connectToDatabase()
          let result = await commentsCollection.insertMany(sampleAccounts)
          console.log(`Inserted ${result.insertedCount} documents`)
          console.log(result)
        } catch (err) {
          console.error(`Error inserting documents: ${err}`)
        } finally {
          await client.close()
        }
       }

       main()
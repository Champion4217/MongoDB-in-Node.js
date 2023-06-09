// Require MongoDB language driver
const { MongoClient } = require("mongodb")
require("dotenv").config()

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri)
const safeURI = `${uri.slice(0, 14)}****${uri.slice(30, 31)}****${uri.slice(47)}`;

const dbname = "bank"
const collection_name = "accounts"

const accountsCollection = client.db(dbname).collection(collection_name)

// Connect to the database
const connectToDatabase = async () => {
  try {
    await client.connect()
    console.log(`Connected to the ${dbname} database 🌍 \nFull connection string: ${safeURI}`)
  } catch (err) {
    console.error(`Error connecting to the database: ${err}`)
  }
}

const documentsToUpdate = { account_type: "checking" }
const update = { $push: { transfers_complete: "TR413308000" } }


const main = async () => {
  try {
    await connectToDatabase();
    // TODO: Run the method on the accounts collection and assign it to a variable, `result`
     let result = await accountsCollection.updateMany(documentsToUpdate, update)
    result.modifiedCount > 0
      ? console.log(`Updated ${result.modifiedCount} documents`)
      : console.log("No documents updated");
  } catch (err) {
    console.error(`Error updating documents: ${err}`)
  } finally {
    await client.close()
  }
}

main()
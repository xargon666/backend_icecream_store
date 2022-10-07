const {MongoClient} = require('mongodb');



 async function main(){
    /**
     * Connection URI. Update <username>, <password>, and <your-cluster-url> to reflect your cluster.
     * See https://docs.mongodb.com/ecosystem/drivers/node/ for more details
     */
     const uri = "mongodb+srv://devtom:password1234@icecreamshoptest.xk9grgg.mongodb.net/?retryWrites=true&w=majority";
 

     const client = new MongoClient(uri);
     
    try {
        // Connect to the MongoDB cluster
        await client.connect();

        // Make the appropriate DB calls
        await  listDatabases(client);

                
        ///////////////////////////////////////////////////////
        /////////////////////// CREATE ////////////////////////
        ///////////////////////////////////////////////////////
        
        // await createProduct(client,
        //     {
        //         product_name: '',
        //         nutfree: true,
        //         description: '',
        //         gultenfree: true,
        //         ingredients: '',
        //         lactosefree: true,
        //         price: 1.99,
        //         sugarfree: true, 
        //         vegan: true,
        //         amountsold: 57 
        //     }
        // );



        // await createMultipleUsers(client, [
        // {
        //     username: '',
        //     amountpuchases: 4,
        //     amountspent: 13.99,
        //     email: '@outlook.com',
        //     password: '',
        //     signupdate: 2019-10-25
        //   },
        //   {
        //     username: '',
        //     amountpuchases: 14,
        //     amountspent: 53.99,
        //     email: '@gmail.com',
        //     password: '',
        //     signupdate: 2011-11-21
        //   },
        // ]);


        ///////////////////////////////////////////////////////
        //////////////////////// READ /////////////////////////
        ///////////////////////////////////////////////////////

        // find by product name:
        await findOneThingFromDB(client, "Salt & Vinegar");

        // find all products
        await findallproducts(client)

        // find all users
        await findallusers(client)

        // NEED TO DO: READ MULTIPLE 


        /////////////////////////////////////////////////////////
        //////////////////////// UPDATE /////////////////////////
        /////////////////////////////////////////////////////////
        
        //update one
        await updateOneUser (client,'Will94',{username:'Will96'})

        //upsert one (try update, but if nothing to update then make a new document)
        const upsertThis1 = {
            product_name: 'Lovely Icey Lolly',
            nutfree: true,
            description: 'A lovely-lolly made in a traditional way and eco friend',
            gultenfree: true,
            ingredients: 'fruits of the forest',
            lactosefree: true,
            price: 1.99,
            sugarfree: true,
            vegan: true,
            amountsold: 57
        }

        const upsertThis2 = {
            product_name: 'The Strawberry-Nado',
            nutfree: true,
            description: "The Strawberry-Nado is so fruity and sweet it'll blow ya mind!",
            gultenfree: true,
            ingredients: 'water, fruit, sugar, stawberries',
            lactosefree: true,
            price: 4.49,
            sugarfree: false,
            vegan: true,
            amountsold: 2901
            }


        await upsertOneProduct (client,'Lovely Icey Lolly',upsertThis1)
        await upsertOneProduct (client,'The Strawberry-Nado',upsertThis2)

        // NEED TO DO: UPDATE MULTIPLE 


        /////////////////////////////////////////////////////////
        //////////////////////// DELETE /////////////////////////
        /////////////////////////////////////////////////////////
        
        await deleteProductByName(client, 'The Strawberry-Nado')

        // NEED TO DO: DELETE MULTIPLE 


    } catch (e) {
        console.error(e);
    } finally {
        await client.close();
    }
}




async function listDatabases(client){
    databasesList = await client.db().admin().listDatabases();
 
    console.log("Databases:");
    databasesList.databases.forEach(db => console.log(` - ${db.name}`));
};

main().catch(console.error);




//  https://www.mongodb.com/blog/post/quick-start-nodejs-mongodb-how-to-get-connected-to-your-database
// https://www.mongodb.com/developer/languages/javascript/node-crud-tutorial/?_ga=2.25106298.1372048758.1665072722-1548087475.1664788853



// FUNCTION
               

        ///////////////////////////////////////////////////////////////
        //////////////////////// CREATE FUNCTION///////////////////////
        ///////////////////////////////////////////////////////////////

        async function createProduct(client, newProduct){
            const result = await client.db("icecreamShop").collection("products").insertOne(newProduct);
            console.log(`New product created with the following id: ${result.insertedId}`);
        }
                       

        async function createMultipleUsers(client, newUsers){
            const result = await client.db("icecreamShop").collection("users").insertMany(newUsers);
        
            console.log(`${result.insertedCount} new user(s) created with the following id(s):`);
            console.log(result.insertedIds);       
        }


        ////////////////////////////////////////////////////////////////
        //////////////////////// READ FUNCTION /////////////////////////
        ////////////////////////////////////////////////////////////////


// Find a single product
async function findOneThingFromDB(client, nameOfListing) {
    const result = await client.db("icecreamShop").collection("products").findOne({ product_name: nameOfListing });
    if (result) {
        console.log(`Found a listing in the collection with the name '${nameOfListing}':`);
        console.log(result);
    } else {
        console.log(`No listings found with the name '${nameOfListing}'`);
    }
}

// Find all products
async function findallproducts(client) {
    const result = await client.db("icecreamShop").collection("products").find({}).toArray();

    if (result) {
        console.log(result);
    } else {
        console.log(`Nothing found in product collection`);
    }
}

// Find all users
async function findallusers(client) {
    const result = await client.db("icecreamShop").collection("users").find({}).toArray();

    if (result) {
        console.log(result);
    } else {
        console.log(`Nothing found in user collection`);
    }
}


        ////////////////////////////////////////////////////////////////
        ////////////////////// UPDATE FUNCTION /////////////////////////
        ////////////////////////////////////////////////////////////////

        //update one
    async function updateOneUser(client,username,updateInfo){
        const result = await client.db('icecreamShop').collection('users').updateOne({username},{$set:updateInfo})

        console.log(`${result.matchedCount} document(s) matched the query criteria.`);
        console.log(`${result.modifiedCount} document(s) was/were updated.`);
    }

    //upsert
    async function upsertOneProduct(client,product_name,updateInfo){
        const result = await client.db('icecreamShop').collection('products').updateOne({product_name},{$set:updateInfo},{upsert:true})

        console.log(`${result.matchedCount} document(s) matched the query criteria.`);
        console.log(`${result.modifiedCount} document(s) was/were updated.`);
    }

        ////////////////////////////////////////////////////////////////
        ////////////////////// DELETE FUNCTION /////////////////////////
        ////////////////////////////////////////////////////////////////


    async function deleteProductByName(client, nameOfProduct) {
        const result = await client.db("icecreamShop").collection("products")
                .deleteOne({ product_name: nameOfProduct });
        console.log(`${result.deletedCount} document(s) was/were deleted.`);
    }

    
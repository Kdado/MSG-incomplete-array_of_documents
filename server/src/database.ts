import * as mongodb from "mongodb";
import { Student } from "./student";
import { studentRouter } from "./student.routes";
 
export const collections: {
   students?: mongodb.Collection<Student>;
} = {};
 
export async function connectToDatabase(uri: string) {
   const client = new mongodb.MongoClient(uri);
   await client.connect();
 
   const db = client.db("studentDB");
   await applySchemaValidation(db);
 
   const studentsCollection = db.collection<Student>("students");
   collections.students = studentsCollection;
}
 
// Update our existing collection with JSON schema validation so we know our documents will always match the shape of our Employee model, even if added elsewhere.
// For more information about schema validation, see this blog series: https://www.mongodb.com/blog/post/json-schema-validation--locking-down-your-model-the-smart-way
async function applySchemaValidation(db: mongodb.Db) {
   const jsonSchema = {
       $jsonSchema: {
           bsonType: "object",
           required: ["firstName", "lastName", "phone", "parentEmail"],
           additionalProperties: false,
           properties: {
               _id: {},
                firstName: {
                   bsonType: "string",
                   description: "'firstName' is required and is a string",
                },
                lastName: {
                    bsonType: "string",
                    description: "'lastName' is required and is a string",
                },
                phone: {
                   bsonType: "int",
                   description: "'phone' is required and is a number",
                },
                parentEmail: {
                   bsonType: "string",
                   description: "'email' is required and is a string",
                },
                numberOfCasesInAccount: {
                    bsonType: "number",
                    description: "'number of cases in account' is not required nad is a number"
                },
                transactions: {
                    bsonType: "array",
                    description: "'transactopns' is not required and it is an array",
                    choco:{
                        bsonType: ["object"],
                        required: ["chocoType", "quantity", "date"],
                        additionalProperties: false,
                        description: "'choco' must containt the stated fields",
                        chocoType: {
                            bsonType: "string",
                            description: "'chocoType' is required and can only be one of the given specific string values"
                        },
                        quantity: {
                            bsonType: "int",
                            description: "'quantity' is required and can only be a whole number"
                        },
                        date: {
                            bsonType: "Date",
                            description: "'date' is required and can only be a date value"
                        }
                    }
                }
                //chocolate case given to the student (only whole cases can be given = int variable only accepted)
                /*chocoCase: {
                    bsonType: ["object"],
                    required: ["chocoType", "quantity", "date"],
                    additionalProperties: false,
                    description: "'chocoCase' is optional and is an object",
                    chocoType: {
                        bsonType: "string",
                        description: "'chocoType' is required and can only be one of the given enum values"
                    },
                    quantity: {
                        bsonType: "int",
                        description: "'quantity' is required and can only be a whole number"
                    },
                    date: {
                        bsonType: "Date",
                        description: "'date' is required and can only be a date value"
                    }
                },*/
           },
       },
   };
 
   // Try applying the modification to the collection, if the collection doesn't exist, create it
  await db.command({
       collMod: "students",
       validator: jsonSchema
   }).catch(async (error: mongodb.MongoServerError) => {
       if (error.codeName === 'NamespaceNotFound') {
           await db.createCollection("students", {validator: jsonSchema});
       }
   });
}
//Possible aggregate pipeline to find the sum of cases in an array of transactions 
async function sumOfCasesInAcc(db:mongodb.Db){
    const pipeline = [  {
        '$unwind': {
          'path': '$transactions'
        }
      }, {
        '$group': {
          '_id': '$_id', 
          'sumOfCases': {
            '$sum': '$transactions.quantity'
          }
        }
      }
    ];

    const aggCursor = db.collection<Student>("students").aggregate(pipeline);

    await aggCursor.forEach(studentCasesInAcc => {
        console.log(`${studentCasesInAcc._id}: ${studentCasesInAcc.sumOfCases}`);
    })
}
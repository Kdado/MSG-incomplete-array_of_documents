import * as mongodb from "mongodb";
 
export interface Student {
   _id?: mongodb.ObjectId;
   firstName: string;
   lastName: string;
   phone: number;
   parentEmail: string;
   numberOfCasesInAccount: number;
   transactions: [{
      typeOfTransaction: string,
      chocoType: string,
      quantity: number,
      date: Date
   }]
   //transactions: Array<{chocoType: string, quantity: number, date: Date}>;
   //casesInAccount: number;
}
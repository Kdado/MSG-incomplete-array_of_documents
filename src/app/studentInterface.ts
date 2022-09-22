export interface student {
    _id?: string;
    firstName?: string;
    lastName?: string;
    phone?: number;
    parentEmail?: string;
    numberOfCasesInAccount?: number; //not sure to keep or use to populate the sum quantity from the array of transactions.quantity
    transactions?: [{
            typeOfTransaction?: string,
            chocoType?: string,
            quantity?: number,
            date?: Date
    }]

}
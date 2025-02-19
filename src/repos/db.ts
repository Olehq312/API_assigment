import mongoose from "mongoose";

export async function testConnection() {
    try {
       await connect();
       await disconnect();
       console.log("Database connection test successful");

    } 
    
    catch (error) {
        console.log("Error testing database connection", error);
    }
}





export async function connect() {
    try {
        if (!process.env.DBHOST) {
            throw new Error("DBHOST undefined");
        }
        await mongoose.connect(process.env.DBHOST);

        if (mongoose.connection.db) {
            await mongoose.connection.db.admin().command({ping: 1});
            console.log("Connected to database successfully");
        }

        else{
            throw new Error("DBHOST undefined");
        }


    } catch (error) {
        console.log("Error connecting to database", error);
    }
}





export async function disconnect() {
    try {
        await mongoose.disconnect();
        console.log("Disconnected from database successfully");
    } catch (error) {
        console.log("Error disconnecting from database", error);
    }
}
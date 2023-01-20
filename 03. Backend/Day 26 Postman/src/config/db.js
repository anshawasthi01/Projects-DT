import { Sequelize } from "sequelize";

export const sequelize = new Sequelize("test-db", "user", "pass", {
    dialect: "sqlite",
    host: "./config/debug.sqlite"
});

export const connectToDatabase = async () => {
    try{
        await sequelize.authenticate();
        console.log("Connected to db");
    }catch(e){
        console.error(e);
    process.exit();    
    }
}
import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/db";

class User extends Model {};

User.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    username: {
        type: DataTypes.STRING,
        autoIncrement: false,
        primaryKey: true  
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, { sequelize });

export default User;
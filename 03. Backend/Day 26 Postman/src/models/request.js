import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/db";

class Request extends Model {};

Request.init({
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    url: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: ""  
    },
    type: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: ""  
    },
    body: {
        type: DataTypes.STRING,
    }
}, { sequelize });

export default Request;
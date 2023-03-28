import { Sequelize, DataTypes, Model } from "sequelize";

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
    host: process.env.DB_HOST,
    dialect: 'mysql'
})


class Place extends Model {
    declare id_place: number
}

Place.init({
    id_place: {
        type: DataTypes.INTEGER.UNSIGNED,
        primaryKey: true,
        autoIncrement: true
    },
    title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            minLength(value: string) {
                if (value.length < 6) {
                    throw new Error('Minimal 6 karakter')
                }
            }
        }
    },
    image: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.TEXT,
    }

}, {
    tableName: 'places',
    sequelize
})


export default Place
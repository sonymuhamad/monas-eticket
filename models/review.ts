import { Sequelize, DataTypes, Model, Attributes, InferAttributes, InferCreationAttributes, CreationOptional } from "sequelize";

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
    host: process.env.DB_HOST,
    dialect: 'mysql'
})

class Review extends Model<InferAttributes<Review>, InferCreationAttributes<Review>> {
    declare id_review: CreationOptional<number>
    declare name: string
    declare text: string
    declare avatar: string
    declare shown: boolean
}

Review.init({

    id_review: {
        type: DataTypes.INTEGER.UNSIGNED,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false,
        validate: {
            minLength(value: string) {
                if (value.length < 4) {
                    throw new Error('Nama reviewer tidak boleh kurang dari 4')
                }
            }
        }
    },
    text: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    avatar: {
        type: DataTypes.STRING,
        allowNull: false
    },
    shown: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    }

}, {
    tableName: 'reviews',
    sequelize
})


export default Review

export type ReviewProps = Attributes<Review>


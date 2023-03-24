import { Sequelize, DataTypes } from "sequelize";

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
    host: process.env.DB_HOST,
    dialect: 'mysql'
})

const Ticket = sequelize.define('Ticket', {
    id_ticket: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: new DataTypes.STRING(255),
        allowNull: false,
        validate: {
            minCharacter(value: string) {
                if (value.length < 6) {
                    throw new Error('Nama ticket harus memiliki minimal 6 Karakter')
                }
            }
        }
    },
    price: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false,
    },
    discount: {
        type: DataTypes.INTEGER.UNSIGNED,
        defaultValue: 0,
        allowNull: false,
    },
    actual_price: {
        type: DataTypes.VIRTUAL,
        get() {
            const discountPriced = (this.getDataValue('discount') / this.getDataValue('price')) * 100
            return this.getDataValue('price') - discountPriced
        },
        set(value) {
            throw new Error('Actual price cannot be set')
        }
    },
    terms: {
        type: DataTypes.TEXT,
    },
    how_to_use: {
        type: DataTypes.TEXT
    },
}, {

})

export { Ticket }



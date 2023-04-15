import { Sequelize, DataTypes, Model, InferAttributes, CreationOptional, InferCreationAttributes, Attributes } from "sequelize";

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS, {
    host: process.env.DB_HOST,
    dialect: 'mysql'
})

interface Ticket extends Model<InferAttributes<Ticket>, InferCreationAttributes<Ticket>> {
    id_ticket: CreationOptional<number>
    name: string
    price: number
    discount: number
    terms: string
    how_to_use: string
    actual_price: number
}

const Ticket = sequelize.define('Ticket', {
    id_ticket: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
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
            if (this.getDataValue('discount') === 0) {
                return this.getDataValue('price')
            }

            const discountPriced = (this.getDataValue('discount') / 100) * this.getDataValue('price')
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
    tableName: "tickets"
})

export type TicketProps = Attributes<Ticket>

export { Ticket }



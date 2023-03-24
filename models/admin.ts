import {
    Sequelize,
    DataTypes,
    Model,
    InferAttributes,
    InferCreationAttributes,
    CreationOptional
} from "sequelize";
const bcrypt = require('bcrypt')

const sequelize = new Sequelize('monas-eticket', 'root', '918256ccd741;', {
    host: 'localhost',
    dialect: 'mysql'
})

class Admin extends Model<InferAttributes<Admin>, InferCreationAttributes<Admin>>{

    declare id: CreationOptional<number>
    declare username: string
    declare email: string
    declare password: string
    declare created_at: CreationOptional<Date>
    declare updated_at: CreationOptional<Date>

    valid_password = async (password: string) => {
        return await bcrypt.compare(password, this.password)
    }


}

Admin.init(
    {
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true
        },
        username: {
            type: new DataTypes.STRING(255),
            allowNull: false,
            unique: true,
            validate: {
                minCharacter(value: string) {
                    if (value.length < 6) {
                        throw new Error('Username minimal 6 karakter')
                    }
                }
            }
        },
        email: {
            type: new DataTypes.STRING(255),
            allowNull: false,
            unique: true,
            validate: {
                isEmail: {
                    msg: "Invalid Email"
                }
            }
        },
        password: {
            type: new DataTypes.STRING(255),
            allowNull: false,
            validate: {
                minCharacter(value: string) {
                    if (value.length < 8) {
                        throw new Error('Password harus minimal 8 karakter')
                    }
                }
            },
        },
        created_at: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
        },
        updated_at: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
        }
    },
    {
        tableName: 'admin',
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        hooks: {
            async beforeCreate(instance, options) {
                instance.password = await bcrypt.hash(instance.password, 10)
            }
        },

        sequelize,
    },
)


export default Admin


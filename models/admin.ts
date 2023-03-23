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

    valid_password = (password: string) => {
        return bcrypt.compareSync(password, this.password)
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
                min: {
                    args: [6],
                    msg: "Minimal 6 Karakter untuk membuat username"
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
                    if (value.length <= 7) {
                        throw new Error('Password harus minimal 8 karakter')
                    }
                }
            }
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

        },

        sequelize,
    },
)


export default Admin


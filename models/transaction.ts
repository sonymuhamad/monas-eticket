import { Sequelize, DataTypes, Model } from "sequelize";

import { Ticket } from "./ticket";

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: process.env.DB_HOST,
    dialect: "mysql",
  }
);

class Transaction extends Model {
  declare id_transaction: number;
}

Transaction.init(
  {
    id_transaction: {
      type: DataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
    },
    date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      validate: {
        minimumDate(value: DataTypes.DateOnlyDataType) {
          if (new Date(value.toString(value)) < new Date()) {
            throw new Error(
              "Tidak dapat membuat transaksi pada tanggal tersebut"
            );
          }
        },
      },
    },
    email_customer: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: {
          msg: "Invalid Email",
        },
      },
    },
    email_verified: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    payment_valid: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    email_verification_code: {
      type: DataTypes.STRING,
      allowNull: false,
      set() {
        const random = Math.floor(Math.random() * (1000000 - 10) + 10);
        this.setDataValue("email_verification_code", random);
      },
    },
  },
  {
    tableName: "transactions",
    sequelize,
  }
);

class DetailTransaction extends Model {
  // Detail Transaction means all the ticket purchased in Transactions
  // model one to many From Transaction
  // One to One from Ticket

  declare id_detail_transaction: number;
}

DetailTransaction.init(
  {
    id_detail_transaction: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
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
        const discountPriced =
          (this.getDataValue("discount") / this.getDataValue("price")) * 100;
        return this.getDataValue("price") - discountPriced;
      },
      set(value) {
        throw new Error("Actual price cannot be set");
      },
    },
  },
  {
    tableName: "detail_transactions",
    sequelize,
  }
);

Transaction.hasMany(DetailTransaction, {
  foreignKey: {
    allowNull: false,
  },
});

DetailTransaction.belongsTo(Transaction, {
  foreignKey: {
    allowNull: false,
  },
  onDelete: "CASCADE",
});

Ticket.hasMany(DetailTransaction);
DetailTransaction.belongsTo(Ticket);

export { DetailTransaction, Transaction };

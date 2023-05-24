import {
  Sequelize,
  DataTypes,
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
  Attributes,
  ForeignKey,
  HasManyCreateAssociationMixin,
  HasManyAddAssociationMixin,
  Association,
  BelongsToCreateAssociationMixin,
  HasManyGetAssociationsMixin,
  NonAttribute,
} from "sequelize";
const nodemailer = require("nodemailer");

import { Ticket } from "./ticket";
import { getEmailVerificationTemplate } from "@/components/external/email-verification-template";
import { getEmailSuccessPaymentTemplate } from "@/components/external";

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: process.env.DB_HOST,
    dialect: "mysql",
  }
);

class Transaction extends Model<
  InferAttributes<Transaction>,
  InferCreationAttributes<Transaction>
> {
  declare id_transaction: CreationOptional<number>;
  declare date: Date;
  declare email_customer: string;
  declare email_verified: CreationOptional<boolean>;
  declare payment_valid: CreationOptional<boolean>;
  declare payment_transaction_id: CreationOptional<string>;
  declare email_verification_code: CreationOptional<string>;
  declare createDetailTransaction: HasManyCreateAssociationMixin<
    DetailTransaction,
    "transaction_id"
  >;
  declare addDetailTransactions: HasManyAddAssociationMixin<
    DetailTransaction,
    number
  >;
  declare getDetailTransactions: HasManyGetAssociationsMixin<DetailTransaction>;
  public declare static associations: {
    detail_transactions: Association<Transaction, DetailTransaction>;
  };
  declare detailtransactions: NonAttribute<DetailTransaction[]>;

  sendEmail = async () => {
    let transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: "sonyfadhil11@gmail.com",
        pass: "mkvgvrnqoxbgyqmi",
      },
    });

    await transporter.sendMail({
      from: "sonyfadhil11@gmail.com",
      to: this.email_customer,
      subject: "Email verification",
      text: `Email verification code`,
      html: getEmailVerificationTemplate({
        verification_code: this.email_verification_code,
      }),
    });
  };

  getId = () => {
    return String(this.id_transaction);
  };

  sendEmailSuccessPayment = async () => {
    let transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: "sonyfadhil11@gmail.com",
        pass: "mkvgvrnqoxbgyqmi",
      },
    });

    await transporter.sendMail({
      from: "sonyfadhil11@gmail.com",
      to: this.email_customer,
      subject: "Email verification",
      text: `Email verification code`,
      html: getEmailSuccessPaymentTemplate({ hashedId: this.getId() }),
      /// kirim link tiketnya dia
    });
  };
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
    payment_transaction_id: {
      type: DataTypes.STRING,
    },
    email_verification_code: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: String(Math.floor(Math.random() * (10000000 - 10) + 10)),
    },
  },
  {
    tableName: "transactions",
    sequelize,
  }
);

class DetailTransaction extends Model<
  InferAttributes<DetailTransaction>,
  InferCreationAttributes<DetailTransaction>
> {
  // Detail Transaction means all the ticket purchased in Transactions
  // model one to many From Transaction
  // One to One from Ticket

  declare id_detail_transaction: CreationOptional<number>;
  declare price: number;
  declare discount: number;
  declare actual_price: number | null;
  declare transaction_id: ForeignKey<Transaction["id_transaction"]>;
  declare ticket_id: ForeignKey<Ticket["id_ticket"]>;
  declare quantity: number;

  declare setTicket: BelongsToCreateAssociationMixin<Ticket>;

  public declare static associations: {
    tickets: Association<DetailTransaction, Ticket>;
  };
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
        if (this.getDataValue("discount") === 0) {
          return this.getDataValue("price");
        }

        const discountPriced =
          (this.getDataValue("discount") / 100) * this.getDataValue("price");
        return Math.ceil(this.getDataValue("price") - discountPriced);
      },
      set(value) {
        throw new Error("Actual price cannot be set");
      },
    },
    quantity: {
      type: DataTypes.INTEGER.UNSIGNED,
      defaultValue: 0,
      allowNull: false,
    },
  },
  {
    tableName: "detail_transactions",
    sequelize,
  }
);

Transaction.hasMany(DetailTransaction, {
  onDelete: "CASCADE",
});

DetailTransaction.belongsTo(Transaction, {
  foreignKey: {
    allowNull: false,
  },
  onDelete: "CASCADE",
});

Ticket.hasMany(DetailTransaction, {
  onDelete: "CASCADE",
});

DetailTransaction.belongsTo(Ticket, {
  foreignKey: {
    allowNull: false,
  },
  onDelete: "CASCADE",
});

export { DetailTransaction, Transaction, sequelize };

export type TransactionProps = Attributes<Transaction>;
export type DetailTransactionProps = Attributes<DetailTransaction>;

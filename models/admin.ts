import {
  Sequelize,
  DataTypes,
  Model,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
} from "sequelize";
const bcrypt = require("bcrypt");
const CryptoJS = require("crypto-js");
const nodemailer = require("nodemailer");
const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: process.env.DB_HOST,
    dialect: "mysql",
  }
);

import { getEmailTemplate } from "@/components/external";

class Admin extends Model<
  InferAttributes<Admin>,
  InferCreationAttributes<Admin>
> {
  declare id: CreationOptional<number>;
  declare username: string;
  declare email: string;
  declare password: string;
  declare created_at: CreationOptional<Date>;
  declare updated_at: CreationOptional<Date>;

  setNewPassword = async (newPassword: string) => {
    if (newPassword.length < 6) {
      return { error: "Password minimal 6 karakter" };
    }
    this.password = await bcrypt.hash(newPassword, 10);
    await this.save();
    return { ok: true };
  };

  valid_password = async (password: string) => {
    return await bcrypt.compare(password, this.password);
  };

  generateChiperText = () => {
    const chipText = CryptoJS.AES.encrypt(
      String(this.id),
      process.env.CHIPERKEY
    );
    this.sendEmail(
      chipText
        .toString()
        .replace("+", "xMl3Jk")
        .replace("/", "Por21Ld")
        .replace("=", "Ml32")
    );
  };

  sendEmail = async (hashedId: string) => {
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
      to: this.email,
      subject: "Set new password from Monas E-ticket",
      text: `Reset Password Processes`,
      html: getEmailTemplate({ hashedId }),
    });
  };
}

Admin.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    username: {
      type: new DataTypes.STRING(255),
      allowNull: false,
      unique: true,
      validate: {
        minCharacter(value: string) {
          if (value.length < 6) {
            throw new Error("Username minimal 6 karakter");
          }
        },
      },
    },
    email: {
      type: new DataTypes.STRING(255),
      allowNull: false,
      unique: true,
      validate: {
        isEmail: {
          msg: "Invalid Email",
        },
      },
    },
    password: {
      type: new DataTypes.STRING(255),
      allowNull: false,
      validate: {
        minCharacter(value: string) {
          if (value.length < 6) {
            throw new Error("Password harus minimal 6 karakter");
          }
        },
      },
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    updated_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    tableName: "admin",
    createdAt: "created_at",
    updatedAt: "updated_at",
    hooks: {
      async beforeCreate(instance, options) {
        instance.password = await bcrypt.hash(instance.password, 10);
      },
    },

    sequelize,
  }
);

export default Admin;

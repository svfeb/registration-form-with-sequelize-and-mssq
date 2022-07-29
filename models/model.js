const bcrypt = require("bcryptjs");

const validator = require("validator");
const { Sequelize } = require("sequelize");
const sequelize = require("./dbConn");
const Users = sequelize.define(
  "users",
  {
    userName: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
    },

    email: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        notNull: {
          args: true,
          msg: "A password is required",
        },
        notEmpty: {
          args: true,
          msg: "Please provide a password",
        },
        validator: function (val) {
          if (
            !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,12}$/.test(
              val
            )
          ) {
            throw new Error(
              "The password must contain at least 6 and maximum 12 characters including at least 1 uppercase, 1 lowercase, one number and one special character."
            );
          }
        },
      },
    },
    confirmPassword: {
      type: Sequelize.VIRTUAL,
      allowNull: false,

      set(val) {
        if (val === this.password) {
          this.setDataValue("confirmPassword", bcrypt.hashSync(val, 12));
        }
      },
      validate: {
        notNull: {
          args: true,
          msg: "Both password must match",
        },
      },
    },
  },
  {
    timestamps: false,
    hooks: {
      beforeCreate: async (user) => {
        if (user.password) {
          const salt = await bcrypt.genSalt(12);

          user.password = await bcrypt.hash(user.password, salt);
        }
      },

      beforeUpdate: async (user) => {
        if (user.password) {
          const salt = await bcrypt.genSalt(12);

          user.password = await bcrypt.hash(user.password, salt);
        }
      },
    },
  }
);

module.exports = Users;

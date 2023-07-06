const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('pokemon', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    }, 
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        is: /^[a-zA-Z]+$/,
        len: {
          args:[1, 20],
          msg: "name must be between 1 and 20 characters"
        }
      }
    },
    sprites: {
      type: DataTypes.STRING,
    },  
    hp: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: {
          args: 1,
          msg: "HP must be greater than 1"
        },
        max: {
          args: 255,
          msg: "HP must be less than 255"
        },
      }
    },
    attack: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: {
          args: 1,
          msg: "Attack must be greater than 1"
        },
        max: {
          args: 255,
          msg: "Attack must be less than 255"
        },
      }
    },
    defense: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: {
          args: 1,
          msg: "Defense must be greater than 1"
        },
        max:{
          args: 255,
          msg: "Defense must be less than 255"
        },
      }
    },
    speed: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min:{
          args: 1,
          msg: "Speed must be greater than 1"
        },
        max:{
          args: 255,
          msg: "Speed must be less than 255"
        },
      }
    },  
    height: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min: {
          args: 1,
          msg: "Height must be greater than 1"
        },
        max: {
          args: 100,
          msg: "Height must be less than 100"
        }
      }
    },  
    weight: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        min:{
          args: 1,
          msg: "Weight must be greater than 1"
        },
        max: {
          args: 100,
          msg: "Weight must be less than 100"
        }
      }
    }
  },
  {
    timestamps: false,
  });
};

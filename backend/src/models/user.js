'use strict'
const { Model } = require('sequelize')

const {
  ensurePasswordIsStrongEnough,
  addAuthenticationOn
} = require('../middleware/passwordValidation')

const { usersClassicEntryValidation, 
  usersTextEntryValidation 
} = require('../middleware/usersEntryValidation')

const { deleteFile } = require('../middleware/deleteFile')

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate (models) {
      User.hasMany(models.Post, { foreignKey: 'userId' })
    }

    softDestroy () {
      return this.update({
        deleted: true,
        email: `deleted-user${this.id}@groupomania.com`,
        imageUrl: null,
        bio: 'Utilisateur Supprimé',
        firstName: 'Utilisateur',
        lastName: 'Supprimé'
      })
    }
  }
  User.init(
    {
      firstName: {
        type: DataTypes.STRING(30),
        allowNull: false,
        validate: {
          usersClassicEntryValidation
        }
      },
      lastName: {
        type: DataTypes.STRING(40),
        allowNull: false,
        validate: {
          usersClassicEntryValidation
        }
      },
      email: {
        type: DataTypes.STRING(60),
        allowNull: false,
        validate: {
          isEmail: true,
          //utilisation d'une méthode pour pouvoir afficher un message d'erreur customisé
          async ensureEmailIsUnique (email) {
            if (await User.findOne({ where: { email } }))
              throw new Error('Un compte existe déjà avec cette adresse mail !')
          }
        }
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          ensurePasswordIsStrongEnough
        }
      },
      imageUrl: DataTypes.STRING,
      bio: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
          usersTextEntryValidation
        },
        defaultValue: '#teamGroupomania'
      },
      admin: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      },
      deleted: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      }
    },
    {
      sequelize,
      modelName: 'User'
    }
  )

  addAuthenticationOn(User)

  User.afterUpdate(async user => {
    if (user.dataValues.imageUrl !== user._previousDataValues.imageUrl) {
      await deleteFile(user._previousDataValues.imageUrl)
    }
  })

  return User
}
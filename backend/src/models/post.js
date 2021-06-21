'use strict'
const { Model } = require('sequelize')

const { deleteFile } = require('../middleware/deleteFile')

module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate (models) {
      Post.belongsTo(models.User, { foreignKey: 'userId' })
      Post.hasMany(models.Comments)
      Post.hasMany(models.Likes)
    }
  }
  Post.init(
    {
      userId: DataTypes.INTEGER,
      imageUrl: DataTypes.STRING,
      content: DataTypes.TEXT,
      likesCount: DataTypes.INTEGER,
      commentsCount: DataTypes.INTEGER
    },
    {
      sequelize,
      validate: {
        eitherContentOrImageUrl () {
          if (!this.content && !this.imageUrl) {
            throw new Error('Vous ne pouvez pas créer de publication vide !')
          }
        }
      },
      modelName: 'Post'
    }
  )

  Post.afterDestroy(async post => {
    if (post.imageUrl) {
      await deleteFile(post.imageUrl)
    }
  })

  Post.afterUpdate(async post => {
    if (post.dataValues.imageUrl !== post._previousDataValues.imageUrl) {
      await deleteFile(post._previousDataValues.imageUrl)
    }
  })

  return Post
}
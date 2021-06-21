'use strict'

const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  class Comments extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate (models) {
      Comments.belongsTo(models.User, { foreignKey: 'userId' })
      Comments.belongsTo(models.Post, { foreignKey: 'postId' })
    }
  }
  Comments.init(
    {
      postId: DataTypes.INTEGER,
      userId: DataTypes.INTEGER,
      content: {
        type: DataTypes.TEXT,
        allowNull: false
      }
    },
    {
      sequelize,
      modelName: 'Comments'
    }
  )
  
  Comments.afterCreate(async comments => {
    const post = await comments.getPost()
    await post.update({
      commentsCount: post.commentsCount + 1
    })
  })
  Comments.afterDestroy(async comments => {
    const post = await comments.getPost()
    post.update({
      commentsCount: post.commentsCount - 1
    })
  })

  return Comments
}
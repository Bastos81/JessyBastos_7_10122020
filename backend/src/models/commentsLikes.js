'use strict'
const { Model } = require('sequelize')

module.exports = (sequelize, DataTypes) => {
  class CommentsLikes extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate (models) {
      CommentsLikes.belongsTo(models.User, { foreignKey: 'userId' })
      CommentsLikes.belongsTo(models.Post, { foreignKey: 'postId' })
      CommentsLikes.belongsTo(models.Comments, { foreignKey: 'commentsId' })
    }
  }
  CommentsLikes.init(
    {
      postId: DataTypes.INTEGER,
      commentsId: DataTypes.INTEGER,
      userId: DataTypes.INTEGER
    },
    {
      sequelize,
      modelName: 'CommentsLikes'
    }
  )

  CommentsLikes.afterCreate(async commentsLike => {
    const comment = await commentsLike.getComments()
    await comment.update({
      commentsLikesCount: comment.commentsLikesCount + 1
    })
  })

  CommentsLikes.afterDestroy(async commentsLike => {
    const comment = await commentsLike.getComments()
    await comment.update({
      commentsLikesCount: comment.commentsLikesCount - 1
    })
  })


  
  return CommentsLikes
}
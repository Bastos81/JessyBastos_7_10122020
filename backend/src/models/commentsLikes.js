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
    const comment = await commentsLike.getComment()
    await comment.update({
      commentsLikesCount: comment.commentsLikesCount + 1
    })
  })

  CommentsLikes.afterDestroy(async commentsLike => {
    const comment = await commentsLike.getComment()
    await comment.update({
      commentsLikesCount: comment.commentsLikesCount - 1
    })
  })

  CommentsLikes.afterCreate(async commentsLike => {
    const post = await commentsLike.getPost()
    const comment = await commentsLike.getComment()
    const user = await commentsLike.getUser()

    if (user.id == comment.userId) return

    const notification = await sequelize.models.Notification.create({
      content: `<b>${user.firstName} ${
        user.lastName
      }</b> a aimé votre commentaire du ${post.readableCreatedAt()}`,
      recipientUserId: post.userId,
      postId: post.id,
      commentsId: comment.id,
      senderUserId: user.id
    })
  })


  
  return CommentsLikes
}
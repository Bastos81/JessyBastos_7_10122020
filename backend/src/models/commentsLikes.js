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
      CommentsLikes.belongsTo(models.Comments, { foreignKey: 'commentsId' })
    }
  }
  CommentsLikes.init(
    {
      commentsId: DataTypes.INTEGER,
      userId: DataTypes.INTEGER
    },
    {
      sequelize,
      modelName: 'commentsLikes'
    }
  )

  CommentsLikes.afterCreate(async commentsLikes => {
    const comments = await commentsLikes.getComments()
    await comments.update({
      commentsLikesCount: post.commentsLikesCount + 1
    })
  })

  CommentsLikes.afterDestroy(async commentsLikes => {
    const comments = await commentsLikes.getComments()
    await comments.update({
      commentsLikesCount: post.commentsLikesCount - 1
    })
  })

  CommentsLikes.afterCreate(async commentsLikes => {
    const comments = await commentsLikes.getComments()
    const user = await commentsLikes.getUser()

    if (user.id == comments.userId) return

    const notification = await sequelize.models.Notification.create({
      content: `<b>${user.firstName} ${
        user.lastName
      }</b> a aimé votre commentaire du ${comments.readableCreatedAt()}`,
      recipientUserId: comments.userId,
      commentsId: comments.id,
      senderUserId: user.id
    })
  })
  
  return CommentsLikes
}
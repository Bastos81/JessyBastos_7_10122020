const db = require('../models')
const { CommentsLikes } = db.sequelize.models

exports.likeOneComments = async (req, res, next) => {
  try {
    const existingCommentsLike = await CommentsLikes.findOne({
      where: { userId: req.user.id, postId: req.params.postId, commentsId: req.params.commentsId},
    })
    if (existingCommentsLike) {
      await existingCommentsLike.destroy()
      res.status(200).json({ commentsLike: false })
    } else {
      await CommentsLikes.create({ userId: req.user.id, postId: req.params.postId, commentsId: req.params.commentsId })
      res.status(201).json({ commentsLike: true })
    }
  } catch (error) {
    res.status(400).json({ error })
  }
}

exports.getLikeOnOneComments = async (req, res, next) => {
  try {
    const existingCommentsLike = await CommentsLikes.findOne({
      where: { userId: req.user.id, postId: req.params.postId, commentsId: req.params.commentsId }
    })
    res.status(200).json({ commentsLike: existingCommentsLike ? true : false })
  } catch (error) {
    res.status(400).json({ error })
  }
}

exports.getAllLikesOfOneComments = async (req, res, next) => {
  try {
    const allCommentsLikes = await CommentsLikes.findAll({
      where: { commentsId: req.params.commentsId },
      include: db.Post,
      include: db.User
    })
    res.status(200).json({ allCommentsLikes })
  } catch (error) {
    res.status(400).json({ error })
  }
}
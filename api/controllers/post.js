import {db} from "../db.js"
import jwt from 'jsonwebtoken'

export const getPosts = (req, res) => {
  const q = req.query.cat ? "SELECT * FROM posts WHERE cat=?" : "SELECT * FROM posts"

  db.query(q, [req.query.cat], (err, data) => {
    if (err) return res.status(500).send(err)

    return res.status(200).json(data)
  })
}

export const getPost = (req, res) => {
  const q = "SELECT p.id, `username`, `title`, `desc`, p.img, u.img AS userImg, `cat`, `date` FROM users u JOIN posts p ON u.id=p.uid WHERE p.id=?"

  db.query(q, [req.params.id], (err, data) => {
    if (err) return res.status(500).json(err)

    return res.status(200).json(data[0])
  })
}

export const addPost = (req, res) => {
  const q = "INSERT INTO posts(`title`, `desc`, `img`, `cat`, `date`, `uid`) VALUES (?)"

  const values = [
    req.body.title,
    req.body.desc,
    req.body.img,
    req.body.cat,
    req.body.date,
    req.body.uid
  ]

  db.query(q, [values], (err, data) => {
    if (err) return res.status(500).send(err)
    return res.status(200).json("博客成功发布")
  })
}

export const deletePost = (req, res) => {
  const postId = req.params.id
    const q = "DELETE FROM posts WHERE `id` = ?"

    db.query(q, [postId], (err, data) => {
      if (err) return res.status(403).json("只能删除自己的博客！")

      return res.json("博客已删除！")
    })

  // const token = req.cookies.access_token
  // if (!token) return res.status(401).json("未登录！")

  // jwt.verify(token, "jwtkey", (err, uesrInfo) => {
  //   if (err) return res.status(403).json("无效token!")
  // })
}

export const updatePost = (req, res) => {
  const postId = req.params.id
  const q = "UPDATE posts SET `title`=?, `desc`=?, `img`=?, `cat`=? WHERE `id`=?"

  const values = [
    req.body.title,
    req.body.desc,
    req.body.img,
    req.body.cat,
  ]

  db.query(q, [...values, postId], (err, data) => {
    if (err) return res.status(500).send(err)
    return res.status(200).json("博客成功更新")
  })
}
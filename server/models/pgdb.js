const {
  signToken
} = require('../utils')
module.exports = pgPool => {
  return {
    addNewUser({
      username,
      email
    }) {
      const userAdd = signToken(username + email).then((e) => {
        return pgPool.query(`
        insert into users (username, email, token)
        values ($1, $2, $3) returning *
      `, [username, email, e])
      }).then(res => {
        const user = res.rows[0]
        user.apiKey = user.token
        return user
      })
      return userAdd
    },
    addNewPost({
      userId,
      content
    }) {
      return pgPool.query(`
        insert into posts (user_id, content)
        values ($1, $2) returning *
      `, [userId, content])
        .then(res => {
          return res.rows[0]
        })
    },
    getUserById(userId) {
      return pgPool.query(`
        select * from users where id = $1
      `, [userId])
        .then(res => {
          return res.rows[0]
        })
    },
    getUserByEmail(email) {
      return pgPool.query(`
        select * from users where email = $1
      `, [email])
        .then(res => {
          return res.rows
        })
    },
    getAllUsers(limit) {
      return pgPool.query(`
        select * from users limit $1
      `, [limit])
        .then(res => {
          return res.rows
        })
    },
    getCompleteUsers() {
      return pgPool.query(`
        select * from users
      `)
        .then(res => {
          return res.rows
        })
    },
    getAllPosts(limit) {
      limit = (limit) ? `limit ${limit}` : '';
      return pgPool.query(`select * from posts ${limit}`)
      .then(res => {
        return res.rows
      })
    },
    getPosts(userId) {
      return pgPool.query(`
        select content from posts where user_id = $1
      `, [userId])
        .then(res => {
          return res.rows
        })
    }
  }
}
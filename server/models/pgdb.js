const {
  signToken
} = require('../utils')
const bcrypt = require('bcrypt');
module.exports = pgPool => {
  return {
     async addNewUser({username, email, password }) {
       const token = await signToken(username + email + password).then((api) => {return api})
       const saltRounds = 10;
       const newPassword = await bcrypt.hash(password, saltRounds).then((hashed) => {return hashed })
       const createdAt = new Date();
        return pgPool.query(`
        insert into users (username, email, token, password, date_created)
        values ($1, $2, $3, $4, $5) returning *
      `, [username, email, token, newPassword, date_created]).then(res => {
        const user = res.rows[0]
        user.apiKey = user.token
        return user
      }).catch(e => {return e})
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
      limit = (limit) ? `limit ${limit}` : '';
      return pgPool.query(`
        select * from users ${limit}
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
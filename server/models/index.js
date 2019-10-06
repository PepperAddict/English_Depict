const { signToken } = require('../utils')
module.exports = pgPool => {
  return {
    addUser ({ userName, userEmail }) {
      return pgPool.query(`
        insert into users (userName, userEmail)
        values ($1, $2) returning *
      `, [userName, userEmail])
      .then(res => {
        const user = res.rows[0]
        user.token = signToken(user)
        return user
      }).catch(e => {return 'there was a problem'})
    },
    addPosts ({ userId, posts }) {
      return pgPool.query(`
        insert into Posts (user_id, place)
        values ($1, $2) returning *
      `, [userId, posts])
      .then(res => {
        return res.rows[0]
      })
    },
    getUserById (userId) {
      return pgPool.query(`
        select * from users where id = $1
      `, [userId])
      .then(res => {
        return res.rows[0]
      })
    },
    getPosts (userID) {
      return pgPool.query(`
        select place from Posts where user_id = $1
      `, [userID])
      .then(res => {
        return res.rows
      })
    }
  }
}
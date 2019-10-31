module.exports = pgPool => {
  return {
    addBlog({student_id, subject, content}) {
      const created_at = new Date();
      return pgPool.query(`
        insert into blogs (student_id, subject, content, created_at) values ($1, $2, $3, $4) returning *
      `, [student_id, subject, content, created_at])
        .then(res => {
          return res.rows[0]
        })
        .catch(err => {
          console.log(err)
        })
    },
    getAllBlogs(limit) {
      limit = (limit) ? `limit ${limit}` : '';
      return pgPool.query(`
      select * from blogs ${limit} order by created_at desc`).then(res => {
        return res.rows
      }).catch((err) => console.log(err))
    }
  }
}
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
    },
    addVocabulary({student_id, vocabulary_word, vocabulary_definition}) {
      const definition = vocabulary_definition ? vocabulary_definition : 'none';
      const created_at = new Date();
      return pgPool.query(`
      insert into vocabulary (student_id, vocabulary_word, vocabulary_definition, created_at) values ($1, $2, $3, $4) returning *
      `, [student_id, vocabulary_word, definition, created_at])
      .then(res => {
        return res.rows[0]
      })
      .catch(err => {
        console.log(err)
      })
    },
    getVocabularyByID(student_id) {
      return pgPool.query(`
      select * from vocabulary where student_id = $1
      `, [student_id])
      .then((res => {
        return res.rows[0]
      }))
      .catch((e) => {throw new Error(e)})
    }
  }
}
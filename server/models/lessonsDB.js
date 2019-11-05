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
      select * from vocabulary where student_id = ${student_id}
      `)
      .then((res => {
        if (res.rows) {
          return res.rows
        }
      }))
    }, 
    removeVocabulary(vocab_id) {
      return pgPool.query(`
      delete from vocabulary where vocab_id=${vocab_id} returning *
      `).then((res) => {
        return res.rows
      }).catch(e => {
        console.log(e)
      })
    },
    updateStudentAvatar({student_id, avatar}) {

      return pgPool.query(`
      update students set avatar='${avatar}' where student_id=${student_id} returning *
      `).then((res => {
        return res.rows[0]
      })).catch((e) => {
        console.log(e)
      })
    }
  }
}
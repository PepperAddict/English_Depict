module.exports = pgPool => {
  return {
    addBlog({
      student_id,
      subject,
      content
    }) {
      const created_at = new Date();
      return pgPool.query(`
        insert into blogs (student_id, subject, content, created_at) values ($1, $2, $3, $4) returning *
      `, [student_id, subject, content, created_at])
        .then(res => {
          return res.rows[0];
        })
        .catch(err => {
          console.log(err);
        });
    },
    getBlogByID(blog_id) {
      return pgPool.query(`
      select * from blogs where blog_id=${blog_id}`)
        .then((res) => {
          return res.rows;
        }).catch((err) => console.log(err));
    },
    editBlog({
      blog_id,
      subject,
      content,
      updated_at
    }) {
      return pgPool.query(`
      update blogs set subject='${subject}', content='${content}', updated_at='${updated_at}' where blog_id=${blog_id} returning *
      `).then((res) => {
        return res.rows[0];
      }).catch((e => {
        console.log(e);
      }));
    },
    getAllBlogs(student_id, limit) {
      return pgPool.query(`
      select * from blogs where student_id=${student_id} order by created_at desc limit 10`)
        .then(res => {
          return res.rows;
        }).catch((err) => console.log(err));
    },
    addVocabulary({
      student_id,
      vocabulary_word,
      vocabulary_definition
    }) {
      const definition = vocabulary_definition ? vocabulary_definition : 'none';
      const created_at = new Date();
      return pgPool.query(`
      insert into vocabulary (student_id, vocabulary_word, vocabulary_definition, created_at) values ($1, $2, $3, $4) returning *
      `, [student_id, vocabulary_word, definition, created_at])
        .then(res => {
          return res.rows[0];
        })
        .catch(err => {
          console.log(err);
        });
    },
    getVocabularyByID(student_id) {

      return pgPool.query(`
      select * from vocabulary where student_id = ${student_id}
      `)
        .then((res => {
          if (res.rows) {
            return res.rows;
          }
        }));
    },
    removeVocabulary(vocab_id) {
      return pgPool.query(`
      delete from vocabulary where vocab_id=${vocab_id} returning *
      `).then((res) => {
        return res.rows;
      }).catch(e => {
        console.log(e);
      });
    },
    updateStudentAvatar({
      student_id,
      avatar
    }) {

      return pgPool.query(`
      update students set avatar='${avatar}' where student_id=${student_id} returning *
      `).then((res => {
        return res.rows[0];
      })).catch((e) => {
        console.log(e);
      });
    },
    updateStudentName({
      student_id,
      name
    }) {

      return pgPool.query(`
      update students set name='${name}' where student_id=${student_id} returning *
      `).then((res => {
        return res.rows[0];
      })).catch((e) => {
        console.log(e);
      });
    },
    addComment({
      blog_id,
      student_id,
      teacher_id,
      content
    }) {

      const teacher = teacher_id ? teacher_id : null;
      const student = student_id ? student_id : null;
      const created_at = new Date();
      return pgPool.query(`
      insert into comments (student_id, teacher_id, content, created_at, blog_id) 
      values ($1, $2, $3, $4, $5) returning *
      `, [student, teacher, content, created_at, blog_id])
        .then(res => {
          return res.rows[0];
        })
        .catch(err => {
          console.log(err);
        });
    },
    getCommentByBlogID(blog_id) {
      return pgPool.query(`
      select * from comments where blog_id = ${blog_id}
      `)
        .then((res => {
          if (res.rows) {
            return res.rows;
          }
        }));
    },
    addTask({
      task_code,
      student_id,
      teacher_id,
      task_date,
      entry
    }) {
      const created_at = new Date();
      return pgPool.query(`
      insert into tasks (task_code, student_id, teacher_id, task_date, entry, created_at)
      values ($1, $2, $3, $4, $5, $6) returning *
      `, [task_code, student_id, teacher_id, task_date, entry, created_at])
        .then(res => {
          return res.rows[0];
        }).catch(err => console.log(err));
    },
    getTasks(student_id) {
      return pgPool.query(`
      select * from tasks where student_id= $1`, [student_id])
      .then((res => {
        if (res.rows) {
          return res.rows;
        }
      }))
      .catch((err) => console.log(err))
    }
  };
};
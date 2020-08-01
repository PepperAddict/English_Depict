module.exports = pgPool => {
  return {
    addBlog({ student_id, subject, content }) {
      const created_at = new Date();
      return pgPool
        .query(
          `
        insert into blogs (student_id, subject, content, created_at) values ($1, $2, $3, $4) returning *
      `,
          [student_id, subject, content, created_at]
        )
        .then(res => {
          return res.rows[0];
        })
        .catch(err => {
          console.log(err);
        });
    },

    getBlogByID(blog_id) {
      return pgPool
        .query(
          `
      select * from blogs where blog_id=$1`,
          [blog_id]
        )
        .then(res => {
          return res.rows;
        })
        .catch(err => console.log(err));
    },
    editBlog({ blog_id, subject, content, updated_at }) {
      return pgPool
        .query(
          `
      update blogs set subject = $1, content = $2, updated_at = $3 where blog_id = $4 returning *
      `,
          [subject, content, updated_at, blog_id]
        )
        .then(res => {
          return res.rows[0];
        })
        .catch(e => {
          console.log(e);
        });
    },
    submitTask({task_id, submission}){
      const date = new Date();
      return pgPool.query(`
      update tasks set submission = $1, viewed = true, completed_at = $2 where task_id = $3 returning *
      `, [submission, date, task_id])
      .then(res => {
        return res.rows[0]
      }).catch(e => console.log(e))
    },
    completeTask({task_id, accepted, message}) {
      return pgPool.query(`
      update tasks set accepted = $1, message = $2 where task_id = $3 returning *
      `, [accepted, message, task_id]).then(res => {
        return res.rows[0]
      }).catch(e => console.log(e))
    },
    //TODO: paginate later
    getAllBlogs(student_id, limit) {
      return pgPool
        .query(
          `
      select * from blogs where student_id = $1 order by created_at desc limit 10`,
          [student_id]
        )
        .then(res => {
          return res.rows;
        })
        .catch(err => console.log(err));
    },
    getAllTasks(student_id) {
      return pgPool.query(`select * from tasks where student_id=$1 order by created_at desc`, [student_id])
      .then(res => {
        return res.rows;
      }).catch(e => console.log(e))
    },
    addVocabulary({
      student_id,
      teacher_id,
      vocabulary_word,
      vocabulary_definition
    }) {
      const definition = vocabulary_definition ? vocabulary_definition : "none";
      const created_at = new Date();
      return pgPool
        .query(
          `
      insert into vocabularies (student_id, teacher_id, vocabulary_word, vocabulary_definition, created_at) values ($1, $2, $3, $4, $5) returning *
      `,
          [student_id, teacher_id, vocabulary_word, definition, created_at]
        )
        .then(res => {
          return res.rows[0];
        })
        .catch(err => {
          console.log(err);
        });
    },
    getVocabularyByParent(student_id) {
      return pgPool
        .query(
          `select * from vocabularies where student_id = $1`,[student_id])
        .then(res => {
          if (res.rows) {
            return res.rows;
          }
        });
    },
    getVocabularyByTeacher(teacher_id) {
      return pgPool.query(`select * from vocabularies where teacher_id = $1`,
        [teacher_id])
        .then(res => {
          if (res.rows) {
            return res.rows;
          }
        }).catch(err => console.log(err));
    },
    removeVocabulary(vocab_id) {
      return pgPool
        .query(
          `
      delete from vocabularies where vocab_id = $1 returning *
      `,
          [vocab_id]
        )
        .then(res => {
          return res.rows;
        })
        .catch(e => {
          console.log(e);
        });
    },
    updateStudentAvatar({ student_id, avatar }) {
      return pgPool
        .query(
          `
      update students set avatar = $1 where student_id = $2 returning *
      `,
          [avatar, student_id]
        )
        .then(res => {
          return res.rows[0];
        })
        .catch(e => {
          console.log(e);
        });
    },
    updateStudentName({ student_id, name }) {
      return pgPool
        .query(
          `
      update students set name = $1 where student_id = $2 returning *
      `,
          [name, student_id]
        )
        .then(res => {
          return res.rows[0];
        })
        .catch(e => {
          console.log(e);
        });
    },
    addComment({ blog_id, student_id, teacher_id, content }) {
      const teacher = teacher_id ? teacher_id : null;
      const student = student_id ? student_id : null;
      const created_at = new Date();
      return pgPool
        .query(
          `
      insert into comments (student_id, teacher_id, content, created_at, blog_id) 
      values ($1, $2, $3, $4, $5) returning *
      `,
          [student, teacher, content, created_at, blog_id]
        )
        .then(res => {
          return res.rows[0];
        })
        .catch(err => {
          console.log(err);
        });
    },
    getCommentByBlogID(blog_id) {
      return pgPool
        .query(
          `
      select * from comments where blog_id = $1
      `,
          [blog_id]
        )
        .then(res => {
          if (res.rows) {
            return res.rows;
          }
        });
    },
    addTask({ task_code, student_id, teacher_id, parent_id, task_date, entry }) {
      const created_at = new Date();
      return pgPool
        .query(
          `
      insert into tasks (task_code, student_id, teacher_id, parent_id, task_date, entry, created_at)
      values ($1, $2, $3, $4, $5, $6, $7) returning *
      `,
          [task_code, student_id, teacher_id, parent_id, task_date, entry, created_at]
        )
        .then(res => {
          return res.rows[0];
        })
        .catch(err => console.log(err));
    },
    getTasks(student_id) {
      return pgPool
        .query(
          `
      select * from tasks where student_id= $1`,
          [student_id]
        )
        .then(res => {
          if (res.rows) {
            return res.rows;
          }
        })
        .catch(err => console.log(err));
    },
    getTaskByID(task_id) {
      return pgPool
        .query(`select * from tasks where task_id = $1 limit 1`, [task_id])
        .then(res => {
          return res.rows[0];
        }).catch(err => console.log(err));
    }
  };
};

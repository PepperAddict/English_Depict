const {
  signToken
} = require('../utils');

module.exports = pgPool => {
  return {
    async addNewStudent({
      teacher_id, username, name, question, password, theme
    }) {
      const apiKey = await signToken(username + password).then((api) => {
        return api;
      });
      const date_created = new Date();
      return pgPool.query(`
      insert into students (teacher_id, username, name, password, theme, student_key, created_at, question)
      values ($1, $2, $3, $4, $5, $6, $7, $8) returning *`, 
      [teacher_id, username, name, password, theme, apiKey, date_created, question])
        .then((res => {
          return res.rows[0];
        }))
        .catch((e) => {
          console.log(e);
        });
    },
    verifyStudent({second_password, student_id}) {

      return pgPool.query(`update students set verified=true, second_password='${second_password}'
      where student_id=${student_id}`).then(() => {
        return pgPool.query(`select * from students where student_id=${student_id}`)
          .then((res) => {
            return res.rows[0];
          });
      }).catch((e) => {
        console.log(e);
      });
    },
    loginStudent(username) {
      return pgPool.query(`select * from students where username='${username}'`)
        .then((res => {

          return res.rows;
        }))
        .catch((e) => {
          throw new Error(e);
        });
    },
    getStudentByID(student_id) {
      return pgPool.query(`select * from students where student_id=${student_id}`)
        .then((res) => {
          return res.rows;
        });
    },

    getStudent(userId) {
      return pgPool.query(`
        select * from students where teacher_id = $1
      `, [userId])
        .then(res => {
          return res.rows;
        });
    },

    updateMessage({student_id, message}) {
      return pgPool.query(`
      update students set message='${message}' where student_id=${student_id} returning *
      `).then((res) => {
        return res.rows[0];
      }).catch((err) => console.log(err));
    }
  };
};
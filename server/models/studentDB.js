const {
  signToken
} = require('../utils');

module.exports = pgPool => {
  return {
    async addNewStudent({
      parent_id, teacher_id, username, name, question, password, theme, identifier
    }) {
      const apiKey = await signToken(username + password).then((api) => {
        return api;
      });
      const date_created = new Date();
      return pgPool.query(`
      insert into students (parent_id, teacher_id, username, name, password, theme, student_key, created_at, question, identifier)
      values ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10) returning *`, 
      [parent_id, teacher_id, username, name, password, theme, apiKey, date_created, question, identifier])
        .then((res => {
          return res.rows[0];
        }))
        .catch((e) => {

          throw new Error(e)
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
        select * from students where parent_id = $1
      `, [userId])
        .then(res => {
          return res.rows;
        });
    },

    updateMessage({student_id, message}) {
      return pgPool.query(`
      update students set message=$1 where student_id=$2 returning *
      `,[message, student_id]).then((res) => {
        return res.rows[0];
      }).catch((err) => console.log(err));
    },
    shareStudent({id, share, student_id}) {
      return pgPool.query(
        `UPDATE users SET share = $1 WHERE id = $2 RETURNING *`,[share, id])
      .then((res) => {
        return pgPool.query(`
        update students set share=$1 where student_id=$2 returning *
        `, [share, student_id])
      }).catch((err) => {
        console.log(err)
      })
    }
  };
};
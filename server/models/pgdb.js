const {
  signToken
} = require('../utils');
const bcrypt = require('bcryptjs');
module.exports = pgPool => {
  return {
    async addNewUser({
      username,
      email,
      password,
      verify_token,
      amazon
    }) {
      //first let's check if the email exists in the database, 
      //if it does and password matches, sign in. if none then register
      return pgPool.query(`select * from users where email = $1`, [email]).then(async res => {
        if (res.rows.length > 0) {
          let hashedPassword = await bcrypt.compare(password, res.rows[0].password);
          if (hashedPassword) {
            res.rows[0].apiKey = res.rows[0].token;
            // TODO: Make it redirect to dashboard with message that 
            // password matched with username upon logging them in
            throw new Error('Your password matched!')
          } else {
            throw new Error('Email already exists!');
          }
        } else {
          //setting up for registration
          const token = await signToken(username + email + password).then((api) => {
            return api;
          });
          const saltRounds = 10;
          const newPassword = await bcrypt.hash(password, saltRounds).then((hashed) => {
            return hashed;
          });
          const date_created = new Date();
          return pgPool.query(`
        insert into users (username, email, token, password, created_at, verify_token, amazon)
        values ($1, $2, $3, $4, $5, $6, $7) returning *
      `, [username, email, token, newPassword, date_created, verify_token, amazon]).then(res => {
            const user = res.rows[0];
            user.apiKey = user.token;
            return user;
          });
        }
      });
    },
    async addNewTeacher({
      username,
      email,
      password,
      verify_token,
    }) {
      //first let's check if the email exists in the database, 
      //if it does and password matches, sign in. if none then register
      return pgPool.query(`select * from teachers where email = $1`, [email]).then(async res => {
        if (res.rows.length > 0) {
          let hashedPassword = await bcrypt.compare(password, res.rows[0].password);
          if (hashedPassword) {
            res.rows[0].apiKey = res.rows[0].token;
            // TODO: Make it redirect to dashboard with message that 
            // password matched with username upon logging them in
            throw new Error('Your password matched!')
          } else {
            throw new Error('Email already exists!');
          }
        } else {
          //setting up for registration
          const token = await signToken(username + email + password).then((api) => {
            return api;
          });
          const saltRounds = 10;
          const newPassword = await bcrypt.hash(password, saltRounds).then((hashed) => {
            return hashed;
          });
          const date_created = new Date();
          return pgPool.query(`
        insert into teachers (username, email, token, password, created_at, verify_token)
        values ($1, $2, $3, $4, $5, $6) returning *
      `, [username, email, token, newPassword, date_created, verify_token]).then(res => {
            const user = res.rows[0];
            user.apiKey = user.token;
            return user;
          });
        }
      });
    },
    setVerified(email) {
      return pgPool.query(`update users set verified = true where email = $1 returning *`, [email])
      .then(res => {
        return res.rows[0]
      }) 
    },
    setTeacherVerified(email) {
      return pgPool.query(`update teachers set verified = true where email = $1 returning *`, [email])
      .then(res => {
        return res.rows[0]
      }) 
    },
    removeUser(id) {
      return pgPool.query(`delete from users where id = $1 returning *`, [id])
      .then(res => {
        return res.rows
      }).catch(e => console.log(e))
    },
    removeStudent(student_id) {
      return pgPool.query(`delete from tasks where student_id = $1 returning *`, [student_id])
      .then(() => {
        return pgPool.query('delete from vocabularies where student_id = $1 returning *', [student_id])
        .then(() => {
          //now remove student 
          return pgPool.query('delete from students where student_id = $1 returning *', [student_id])
        }).then((res) => {
          let data = {message: "success"}
          return data
        })
      }).catch(e => console.log(e))
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
          return res.rows[0];
        });
    },
    getUserById(input) {
      return pgPool.query(`
        select * from users where id = $1
      `, [input])
        .then(res => {
          if (res.rows.length === 0) {
            throw new Error('no results found');
          }
          return res.rows[0];
        })
        .catch((e) => {
          console.log(e)
          throw new Error(e);
        });
    },
    getTeacherById(id) {
      return pgPool.query(`
        select * from teachers where teacher_id = $1
      `, [id])
        .then(res => {
          if (res.rows.length === 0) {
            throw new Error('no results found');
          }
          return res.rows[0];
        })
        .catch((e) => {
          throw new Error(e);
        });
    },
    getUserByEmail(email) {
      return pgPool.query(`
        select * from users where email = $1
      `, [email])
        .then(res => {
          return res.rows[0];
        });
    },
    getAllUsers(limit) {
      //get users with a limit or all if limit isn't supplied
      limit = (limit) ? `limit ${limit}` : '';
      return pgPool.query(`
        select * from users ${limit}
      `)
        .then(res => {
          return res.rows;
        });
    },
    getUserByUnknown(search) {
      if (search)
      return pgPool.query(`
      select * from users where username LIKE '%${search}%' or email LIKE '%${search}%'`)
      .then((res) => {
      return res.rows
      }).catch((er) =>console.log(er))
    },
    getAllPosts(limit) {
      //get posts with a limit or all if limit isn't supplied
      limit = (limit) ? `limit ${limit}` : '';
      return pgPool.query(`select * from posts $1`, [limit])
        .then(res => {
          return res.rows;
        });
    },
    getPosts(userId) {
      return pgPool.query(`
        select content from posts where user_id = $1
      `, [userId])
        .then(res => {
          return res.rows;
        });
    },

    login(email, password) {

      return pgPool.query(`
        select * from users where email = $1
      `,[email] )
        .then(async res => {
          if (res.rows.length > 0) {
            let hashedPassword = await bcrypt.compare(password, res.rows[0].password);
            if (hashedPassword) {
              res.rows[0].apiKey = res.rows[0].token;
              return res.rows[0];
            } else {
              throw new Error('incorrectPassword');
            }
          } else {
            throw new Error('noEmail');
          }
        }).catch((e) => {
          throw new Error(e);
        });

    },
    loginTeacher(email, password) {

      return pgPool.query(`
        select * from teachers where email = $1
      `,[email] )
        .then(async res => {
          if (res.rows.length > 0) {
            let hashedPassword = await bcrypt.compare(password, res.rows[0].password);
            if (hashedPassword) {
              res.rows[0].apiKey = res.rows[0].token;
              return res.rows[0];
            } else {
              throw new Error('incorrectPassword');
            }
          } else {
            throw new Error('noEmail');
          }
        }).catch((e) => {
          throw new Error(e);
        });
    },
    addChat({student_id, teacher_id, content}) {
      let teacherOrstudentOne = student_id ? 'student_id' : 'teacher_id';
      let teacherOrstudentTwo = student_id ? student_id : teacher_id;
      let date = new Date();

      return pgPool.query(`
      insert into chats (${teacherOrstudentOne}, content, created_at)
      values ($1, $2, $3) returning *
      `, [teacherOrstudentTwo, content, date])
        .then((res) => {
          return res.rows[0];
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
};
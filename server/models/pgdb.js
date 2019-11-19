const {
  signToken
} = require('../utils');
const bcrypt = require('bcryptjs');
module.exports = pgPool => {
  return {
    async addNewUser({
      username,
      email,
      password
    }) {
      //first let's check if the email exists in the database, 
      //if it does and password matches, sign in. if none then register
      return pgPool.query(`select * from users where email = '${email}'`).then(async res => {
        if (res.rows.length > 0) {
          let hashedPassword = await bcrypt.compare(password, res.rows[0].password);
          if (hashedPassword) {
            res.rows[0].apiKey = res.rows[0].token;
            return res.rows[0];
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
        insert into users (username, email, token, password, date_created)
        values ($1, $2, $3, $4, $5) returning *
      `, [username, email, token, newPassword, date_created]).then(res => {
            const user = res.rows[0];
            user.apiKey = user.token;
            return user;
          });
        }
      });
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
    getAllPosts(limit) {
      //get posts with a limit or all if limit isn't supplied
      limit = (limit) ? `limit ${limit}` : '';
      return pgPool.query(`select * from posts ${limit}`)
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
        select * from users where email = '${email}'
      `, )
        .then(async res => {
          if (res.rows.length > 0) {
            let hashedPassword = await bcrypt.compare(password, res.rows[0].password);
            console.log(hashedPassword);
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
          console.log(res);
          return res.rows[0];
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
};
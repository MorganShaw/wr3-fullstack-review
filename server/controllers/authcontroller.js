const bcrypt = require('bcrypt');

module.exports = {
    //login method - handler function, list it also at authctrl.login in endpoint in index.js
    login: async (req, res) => {
        const db = req.app.get('db');
        const {email, password} = req.body;
        const user = await db.check_user(email);
        if(!user[0]){
            return res.status(401).send('Incorrect credentials');
        } else {
            const authenticated = bcrypt.compareSync(password, user[0].password)
            if(authenticated){
                req.session.user = {
                    userID: user[0].user_id,
                    email: user[0].email,
                    firstName: user[0].first_name,
                    lastName: user[0].lastName
                }
                res.status(200).send(req.session.user)
            } else {
                res.status(403).send("Email or password incorrect")
            }
        }

    },
      //register method - handler function, list it also at authctrl.login in endpoint in index.js
    register: async (req, res) => {
        const db = req.app.get('db');
        //using camelCase why? see lecture at 11:50am;
        const {firstName, lastName, email, password} = req.body;
        //Checking if user exists already, by making a SQL query, using email to check, since email is a distinct value per user.
        const existingUser = await db.check_user(email);
        if(existingUser[0]){
            return res.status(409).send('User already exists')
        }
        const salt = bcrypt.genSaltSync(10);
        //think this: hash takes as argument password - potatoes, and add salt)
        const hash = bcrypt.hashSync(password, salt);
        //Why destructure newUser from the array? See req.session in login method. That is NOT destructured. Two options. This one is cleaner.
        //End goal here, if it checks out that there isn't already an existing user:
        const [newUser] = await db.create_user([firstName, lastName, email, hash])
        //This is creating a session for the new user, saving the values of the SQL query to the userId, email, firstName, lastName properties.
        req.session.user = {
            userId: newUser.user_id,
            email: newUser.email,
            firstName: newUser.firstName,
            lastName: newUser.lastName
        }
        res.status(200).send(req.session.user)

    },
    //We don't need async for logout and getUser because we're not using any asynchronous code (promises, etc.). 
    logout: (req, res) => {
        req.session.destroy();
        res.sendStatus(200);
    },
    //This is to check to see if user is logged in already. Something about redux...see lecture at 12:06pm.
    getUser: (req, res) => {
        if (req.session.user){
            res.status(200).send(req.session.user)
        } else {
            res.sendStatus(404);
        }
    }
}
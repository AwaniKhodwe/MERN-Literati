const router = require('express').Router();
let User = require('../models/users_db');

// router.route('/').get((req, res)=>{
//     User.find()
//         .then(users => res.json(users))
//         .catch(err => res.status(400).json('Error: '+ err));
// });

router.route('/signup').post((req, res)=>{
    const username = req.body.uname;
    const password = req.body.pword;
    const newUser = new User({username, password});
    

    newUser.save()
        .then(()=>res.json('User Added!'))
        .catch(err => res.status(400).json("Error: " + err));
});

router.route('/login').post((req, res)=>{
    const username = req.body.uname;
    const password = req.body.pword;

    User.findOne({username})
        .then(user => {
            if(!user){
                console.log("Find One in not user 404:"+username);
                return res.status(404).json({error: 'User not found'});
            }

            if(user.password === password){
                return res.json({message: 'Login Successful'});
            }else{
                console.log("Find One in not user 401:"+username);
                console.log("User paswd 401:"+user.password)
                return res.status(404).json({error: 'Invalid Password'});
            }
        })
        .catch(err => {
            return res.status(500).json({error: 'Server Error'});
        })
})

module.exports = router;
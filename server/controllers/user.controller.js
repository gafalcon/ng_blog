const {User, USER_ROLE} = require('../models/user.model')
const {USER_SUBSCRIPTIONS} = require('../models/push_notif.model');

exports.login = async (req, res) => {
    //TODO validate google Token
    console.log("Login controller")
    console.log(req.body);
    let user = await User.findOne({email: req.body.email})

    if (user) {
        console.log("User already in db")
    } else {
        user = new User({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            photoUrl: req.body.photoUrl,
            role: USER_ROLE.REGULAR_USER
        })
        await user.save();
    }

    const token = user.generateAuthToken();
    res.header("x-auth-token", token).send({
        authToken: token,
        role: user.role
    })
}

exports.getToken = async (req, res) => {
    let user = await User.findById(req.user._id)
    const token = user.generateAuthToken();
    res.header("x-auth-token", token).send({
        authToken: token,
        role: user.role
    })
}

exports.profile = async (req, res) => {
    let user;
    if (req.params.user_id)
        user = await User.findById(req.params.user_id)
    else
        user = await User.findById(req.user._id);
    res.send(user)
}

//can send query to find by role: ?role={USER_ROLE}, by name, firstname, email, etc
exports.users = async (req, res) => {
    const users = await User.find(req.query);
    res.send(users);
}

exports.updateRole = async (req, res) => {
    const role = USER_ROLE.get(req.body.role)
    try {
        let user = await User.findById(req.body.id);
        user.role = role
        await user.save()
        res.send(user)
    } catch( ex) {
        res.status(400).json({error: 'cannot find user'});
    }
}

exports.getUserPosts = async (req, res) => {
    //TODO
    res.send({"hello": "world"})
}

exports.newSubscription = async (req, res) => {
    const subscription = req.body
    console.log('Received Subscription on the server: ', subscription);
    USER_SUBSCRIPTIONS.push(subscription);
    res.status(200).json({message: "Subscription added successfully."});
}

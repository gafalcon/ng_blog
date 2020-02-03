const nodemailer = require("nodemailer");
const webpush = require('web-push')
const {Post} = require('../models/post.model')
const {User} = require('../models/user.model')
const {USER_SUBSCRIPTIONS} = require('../models/push_notif.model');

webpush.setVapidDetails('mailto:gabofalc@gmail.com', process.env.PUBLIC_VAPID, process.env.PRIVATE_VAPID)

var sendEmail = async function(user, post_id) {
    const fromMail = 'gabofalc@gmail.com';
    const emails = await User.find().select('email -_id').lean()
    const receipients = emails.map((elem) => elem.email).join(',')
    console.log(receipients)
    const subject  = 'New Post on Example post';
    let text = `
<h1>Blog</h1>
${user} just created a new post. View it <a href="http://localhost:4200/post/${post_id}">here</a>
`

    // auth
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.GMAIL_USER,
            pass: process.env.GMAIL_PASS
        }
    });

    // email options
    let mailOptions = {
        from: fromMail,
        to: receipients,
        subject: subject,
        text: text,
        html: text
    };

    // send email
    transporter.sendMail(mailOptions, (error, response) => {
        if (error) {
            console.log(error);
        }
        console.log(response)
    });
}

var sendNotification = (user, post_id) => {
    const notificationPayload = {
        notification: {
            title: 'New Post',
            body: `${user} just created a new post`,
            icon: 'assets/icons/icon-512x512.png',
        },
    }

    const promises = []
    USER_SUBSCRIPTIONS.forEach(subscription => {
        promises.push(
            webpush.sendNotification(
                subscription,
                JSON.stringify(notificationPayload)
            )
        )
    })
    Promise.all(promises).then(() => console.log("sent"))
}

exports.newPost = async function(req, res) {
    const createdAt = new Date();
    req.body['createdBy'] = req.user._id;
    req.body['createdAt'] = createdAt;
    let post = new Post(req.body);

    const result = await post.save()
    res.send(result)

    await sendEmail(post.creator, post._id)
    sendNotification(post.creator, post._id)
}


exports.getPost = async function(req, res) {
    try {
        const post = await Post.findById(req.params.postId).lean()
        res.send(post)
    } catch (err) {
        res.status(400).send({error: 'cannot find post'})
    }
}

exports.findPostsByUser = async function(req, res) {
    if (req.query.createdBy) {
        let posts = await Post.find({createdBy: req.query.createdBy}).sort('-createdAt').lean()
        res.send(posts);
    }else {
        let posts = await Post.find().sort('-createdAt').lean()
        res.send(posts);
    }
}

exports.deletePost = async function(req, res) {
    try {
        const post = await Post.findByIdAndDelete(req.params.postId)
        res.send(post)
    } catch (err) {
        res.status(400).send({error: 'cannot find post'})
    }
}

exports.editPost = async function(req, res) {
    //TODO
    res.send({})
}

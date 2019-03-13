const router = require('express').Router();
const axios = require('axios');
const keys = require('../config').slack;
const User = require('../models/user');

//redirect to slack to get authorization 
router.get('/slack/redirect', async (req, res) => {
    if (!req.query.code) {
        console.log('come back with fckin code!');
    }
    const oauthURL = 'https://slack.com/api/oauth.access?client_id=' + keys.slack.clientID + '&'
                     + 'client_secret=' + keys.slack.clientSecret + '&'
                     + 'code=' + req.query.code;

    let responseFromSocial = await axios.get(oauthURL);
    console.log(responseFromSocial);  // 이미 유저데이터를 포함하는데 어쎄쓰 토큰은 뭐하는 걸까>? @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
    const accessToken = responseFromSocial.data.access_token;
    const userdataURL = 'https://slack.com/api/users.identity?token=' + accessToken;
    let responseWithUserData = await axios.get(userdataURL);
    const userInfo = JSON.parse(responseWithUserData.body).user;
    let user = await User.findOne({ userId: userInfo.id });
    if (!user) {
        user = await new User({
            username: userInfo.name,
            userId: userInfo.id,
            picture: userInfo.image_48
        }).save();
    }

    req.session.regenerate(() => {
        req.session.user = user;
        res.redirect('/');
    })

});

router.get('/slack', (req, res) => {
    res.send(req.session.user);
});

module.exports = router;

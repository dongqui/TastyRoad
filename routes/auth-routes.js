const router = require('express').Router();
const request = require('request');
const keys = require('../passport-config/keys');
const User = require('../models/user')

//redirect to slack to get authorization 
router.get('/slack/redirect', (req, res) => {
    if (!req.query.code) {
        console.log('come back with fckin code!');
    } else {
        const oauthURL = 'https://slack.com/api/oauth.access?client_id=' + keys.slack.clientID + '&'
                         + 'client_secret=' + keys.slack.clientSecret + '&'
                         + 'code=' + req.query.code;
        request.get(oauthURL, (error, response, body) => {
            if (error) throw error;

            //retrieve userdata using access-token provided by slack api
            const accessToken = JSON.parse(body).access_token;

            const userdataURL = 'https://slack.com/api/users.identity?token=' + accessToken;

            request.get(userdataURL, (error, response, body) => {

                //save userdata in our database

                const userInfo = JSON.parse(body).user
                console.log('@@@@@@@@', userInfo);
                try {

                User.findOne({userId: userInfo.id}, (err, user) => {
                    if (!user) {
                        new User ({
                            username: userInfo.name,
                            userId: userInfo.id,
                            picture: userInfo.image_48
                        }).save((err, data) => {
                            if (err) throw err;

                            if (data) {
                                return req.session.regenerate(() => {
                                    req.session.user = data;
                                    res.redirect('/');
                                })
                            }
                        })
                    } else {
                    return req.session.regenerate(() => {
                        req.session.user = user;
                        res.redirect('/');
                        })
                    }
                })}
		catch(err) {
		  console.log(err);
		  res.redirect('/');
		}
            })
        })
    }
});

router.get('/slack', (req, res) => {
    res.send(req.session.user);
});

module.exports = router;

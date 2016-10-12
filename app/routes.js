var Story = require("./models/story")

module.exports = function(app, passport) {

    // LOGIN ===============================
    // =====================================
    // show the login form
    app.post('/login', passport.authenticate('local-login', {
        successRedirect : '/api/user', // redirect to the secure profile section
        failureRedirect : '/api/user', // redirect back to the signup page if there is an error
        failureFlash : true // allow flash messages
    }));


    // =====================================
    // LOGOUT ==============================
    // =====================================
    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/api/user');
    });

    // get the logged in user
    app.get('/api/user', function(req, res){
        if(req.user){
            res.json({ loggedIn: true, user: req.user})
        } else {
            res.json({loggedIn: false})
        }
    })

    app.post('/api/story', function(req, res){
        console.log("This is req body ", req.body)
        new Story({sentence: req.body.sentence})
        .save(function(err,data){
            res.json(data)
        })
    })

    app.get('/api/story', function(req, res){
        Story.find(function(err,stories){
            res.json(stories)
        })
    })

    app.delete('/api/story/:storyId', function(req, res){
        var storyId = req.params.storyId; 
        Story.findOne({_id: storyId}, function(err, story){
            story.remove(function(err, deleteStory){
                res.json(deleteStory)
            })
        })
    })
};

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on 
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/');
}
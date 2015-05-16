/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /friends              ->  index
 * POST    /friends              ->  create
 * GET     /friends/:id          ->  show
 * PUT     /friends/:id          ->  update
 * DELETE  /friends/:id          ->  destroy
 */

'use strict';

var _ = require('lodash');
var Friend = require('./friend.model');
var User = require('../user/user.model');

// Get list of friends
exports.index = function(req, res) {
    var userId = req.user._id;
    Friend.find({
        userId: userId
    }, function(err, friends) {
        if (err) {
            return handleError(res, err);
        }

        _matchUserGoogleId(0, friends.length, friends, function(_friends) {
            return res.json(200, _friends);
        });

    });
};

var _matchUserGoogleId = function(_index, _total, _friends, _callback) {

    if(!_friends || !_friends[_index]){
        return 
    }
    
    var _aux = _.clone(_friends[_index], false);
    User.findOne({
        'google.id': _friends[_index].googleId
    }, function(err, user) {

        if (user) {
            _friends[_index] = _aux._doc;
            _friends[_index].userInfo = user;
        }

        ++_index;

        if (_index < _total) {
            _matchUserGoogleId(_index, _total, _friends, _callback);
        } else {
            _callback(_friends);
        }

    })

};


// Get a single friend
exports.show = function(req, res) {
    var userId = req.user._id;
    Friend.find({
        _id: req.params.id,
        userId: userId
    }, function(err, friend) {
        if (err) {
            return handleError(res, err);
        }
        if (!friend) {
            return res.send(404);
        }
        return res.json(friend);
    });
};

// Creates a new friend in the DB.
exports.create = function(req, res) {
    req.body.userId = req.user._id;
    Friend.create(req.body, function(err, friend) {
        if (err) {
            return handleError(res, err);
        }
        return res.json(201, friend);
    });
};

// Updates an existing friend in the DB.
exports.update = function(req, res) {
    var userId = req.user._id;

    console.log('body: ' + req.body._id);
    console.log('userid ' + userId )
    Friend.find({
        _id: req.body._id,
        userId: userId
    }, function(err, friend) {
        console.log(friend);
        if (err) {
            return handleError(res, err);
        }
        if (!friend) {
            return res.send(404);
        }
        var updated = _.merge(friend[0], req.body);
        updated.save(function(err, friend) {
            if (err) {
                return handleError(res, err);
            }
            return res.json(200, friend);
        });
    });
};

// Deletes a friend from the DB.
exports.destroy = function(req, res) {
    var userId = req.user._id;
    Friend.findOneAndRemove({
        _id: req.params.id,
        userId: userId
    }, function(err, friend) {
        if (err) {
            return handleError(res, err);
        }
        if (!friend) {
            return res.send(404);
        }
        friend.remove(function(err) {
            if (err) {
                return handleError(res, err);
            }
            return res.send(204);
        });
    });
};

function handleError(res, err) {
    return res.send(500, err);
}

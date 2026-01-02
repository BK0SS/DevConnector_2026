const express = require("express");
const router = express.Router();
const { check, validationResult } = require('express-validator');
// @desc register user,
// @access Public sa
router.post(
	"/",
	[check("name", "Name is required").not().isEmpty(),
        check('email', 'plesase include a valid email').isEmail(),
        check('password', 'the password should be at least 6 characters long').isLength({min:6})
    ],
	(req, res) => {
        const errors = validationResult(req);
        if(!errors.isEmpty())
        {
            //if the user does not include the information
            //correclty it is a bad request 
            return res.status(400).json({errors: errors.array() });
        }
		
		res.send("User route");
	}
);

module.exports = router;

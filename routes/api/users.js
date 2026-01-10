const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");
const User = require("../../models/User");
const gravatar = require("gravatar");
const bcrypt = require("bcryptjs");
const config = require("config");
const jwt = require("jsonwebtoken");
// @desc register user,
// @access Public sa
router.post(
	"/",
	[
		check("name", "Name is required").not().isEmpty(),
		check("email", "plesase include a valid email").isEmail(),
		check(
			"password",
			"the password should be at least 6 characters long"
		).isLength({ min: 6 }),
	],
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			//if the user does not include the information
			//correclty it is a bad request
			return res.status(400).json({ errors: errors.array() });
		}
		//see if the user exists
		const { name, email, password } = req.body;
		try {
			let user = await User.findOne({ email });
			if (user) {
				return res
					.status(400)
					.json({ errors: [{ msg: "user already exists" }] });
			}

			//get user gravatar
			const avatar = gravatar.url(email, {
				s: "200",
				r: "pg",
				d: "mm",
			});
			user = new User({
				name,
				email,
				password,
				avatar,
			});
			//ecrypt password
			const salt = await bcrypt.genSalt(10);

			//hash password
			user.password = await bcrypt.hash(password, salt);

			//save the user to the Db
			await user.save(); //anything that returrns a promise, there should be await in front

			//return json web token
			const payload = {
				user: {
					id: user.id,
				},
			};
			jwt.sign(payload, config.get("jwtSecret"),
                {expiresIn:3600000}, (err,token) =>{
                    if(err) throw err;
                    res.json({token});
                });
		} catch (err) {
			console.error(err.message);
			res.status(500).send("server error");
		}
	}
);

module.exports = router;

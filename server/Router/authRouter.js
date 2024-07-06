const express = require('express')
const controller = require("../Controller/authController")
const validator = require("../Middleware/authMiddleware")
const validationSchema = require("../Validation/authValidator")
const router = express.Router()

router.route("/signup").post(validator(validationSchema.signUpSchema),controller.signUp)

router.route("/verify-email").post(controller.verifyEmail)

router.route("/signin").post(validator(validationSchema.signInSchema),controller.signIn)

module.exports = router;
const express = require('express');
const router = express.Router()
const secureMiddleware = require("../Middleware/authorizedMiddleware")
const controller = require("../Controller/favouriteController")

router.route("/addtofavourite").post(secureMiddleware,controller.addFavourites)

router.route("/removefromfavourite/:recipeId").post(secureMiddleware,controller.removeFavourites)

router.route("/getfavourites").get(secureMiddleware,controller.getFavourites)

module.exports = router
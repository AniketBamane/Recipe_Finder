const express = require('express')
const controller = require("../Controller/recipeController")
const router = express.Router()

router.route("/getallrecipes").get(controller.getRecipes)

router.route("/getrecipe/:id").get(controller.getRecipeById)

module.exports = router;
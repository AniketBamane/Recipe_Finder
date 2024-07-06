const z = require("zod")

const signInSchema = z.object({
  email: z.string({required_error:"please enter email"}).trim().email(),
  password: z.string({required_error:"please enter password"}).min(6,{message:"password must be at least 6 characters"}),
})


const signUpSchema = signInSchema.extend({
  username: z.string({
    required_error:"please enter a username !"
  }).trim().min(3,{message:"username must be at least 3 characters"}),
})

module.exports = {
  signInSchema,
  signUpSchema,
}
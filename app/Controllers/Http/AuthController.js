'use strict'

class AuthController {
  async login({request, response, auth}){
    const { email, password } = request.only(['email','password'])
    const token = await auth.attempt(email,password)

    return response.ok(token)
  }

  async logout({ request, response, auth }) { 
    const refreshToken = request.input('refreshToken')

    await auth
      .authenticator('jwt')
      .revokeTokens([refreshToken], true)

  return response.status(200).send({"message" : 'Se ha cerrado la sesión'})
}
}

module.exports = AuthController

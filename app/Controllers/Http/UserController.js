'use strict'
const User = use('App/Models/User')
class UserController {

  async index ({auth}) {
    const user = await auth.getUser()
    return user
  }

  async indexAllUsers () {
    const users = await User.all()
    return users
  }

  async store({ request }){
    const userData = request.only(['email','password'])
    const user = await User.create(userData)

    return user
  }

  async update ({request, response, auth}){
    const user = await auth.getUser()
    user.email = request.input('email')
    user.password = request.input('password')
        
    if (await user.save())
      return user
  
    return response.status(400).send('No se actualizó la información')
    }

    async destroy ({ response, auth }) {
      const user = await auth.getUser()
      
      if (await user.delete())
          return user
      
      return response.status(400).send('No se eliminó el usuario')
  }
}

module.exports = UserController

'use strict'
const Pendiente = use('App/Models/Pendiente')

class PendienteController {

    async index ({params}) {
        if (params.id){
            const pendiente = await Pendiente.find(params.id)
            return pendiente
        }
        const pendientes = await Pendiente.all()
        return pendientes
    }

    async pendientesUsuario ({auth}) {
        const user = await auth.getUser()
        const pendiente = await Pendiente.where({'userId': user._id}).fetch()
        return pendiente
    }

    async store({request, auth}){
        const pendiente = new Pendiente
        const user = await auth.getUser()
        pendiente.descripcion = request.input('descripcion')
        pendiente.estado = 0
        pendiente.userId = user._id
    
        if (await pendiente.save())
            return pendiente
        
        return response.status(400).send('No se guardó la información')
    }

    async update ({params, response}){
        const pendiente = await Pendiente.find(params.id)
        pendiente.estado = 1
        
        if (await pendiente.save())
            return pendiente
  
        return response.status(400).send('No se actualizó la información')
    }

    async destroy ({ params, response }) {
        const pendiente = await Pendiente.find(params.id)
      
        if (await pendiente.delete())
          return pendiente
      
        return response.status(400).send('No se eliminó el pendiente')
    }
}

module.exports = PendienteController

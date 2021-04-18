'use strict'
const Receta = use('App/Models/Receta')

class RecetaController {

    async index ({params}) {
        if (params.id){
            const receta = await Receta.find(params.id)
            return receta
        }
        const recetas = await Receta.all()
        return recetas
    }

    async recetasUsuario ({auth}) {
        const user = await auth.getUser()
        const receta = await Receta.where({'userId': user._id}).fetch()
        return receta
    }

    async store({request, auth}){

        const receta = new Receta
        const user = await auth.getUser()
        receta.nombre = request.input('nombre')
        receta.ingredientes = request.input('ingredientes')
        receta.preparacion = request.input('preparacion')
        receta.userId = user._id
    
        if (await receta.save())
            return receta
        
        return response.status(400).send('No se guardó la información')
    }

    async update ({request, response}){
        //const receta = await Receta.find(params.id)
        const receta = await Receta.find(request.input('id'))
        receta.nombre = request.input('nombre')
        receta.ingredientes = request.input('ingredientes')
        receta.preparacion = request.input('preparacion')
        
        if (await receta.save())
            return receta
  
        return response.status(400).send('No se actualizó la información')
    }

    async destroy ({ params, response }) {
        const receta = await Receta.find(params.id)
      
        if (await receta.delete())
          return receta
      
        return response.status(400).send('No se eliminó la receta')
    }
}

module.exports = RecetaController

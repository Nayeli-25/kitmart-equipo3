'use strict'
const Sensor = use('App/Models/Sensor')

class SensorController {

    async index ({params}) {
        if (params.id){
            const sensor = await Sensor.find(params.id)
            return sensor
        }
        const sensores = await Sensor.all()
        return sensores
    }
    async sensoresPorTipo ({params}) {
      const sensor = await Sensor.where({'tipo': params.tipo}).fetch()
      return sensor
  }
    
    async store({request, response}){
        const sensorData = request.only(['nombre', 'descripcion', 'tipo','pinIn', 'pinOut', 'estado'])
        const sensor = await Sensor.create(sensorData)
    
        return response.created({
          status: true,
          data: sensor
        })
      }
      
    async destroy ({ params, response }) {
      const sensor = await Sensor.find(params.id)
    
      if (await sensor.delete())
        return sensor
    
      return response.status(400).send('No se eliminó el usuario')
  }
}

module.exports = SensorController

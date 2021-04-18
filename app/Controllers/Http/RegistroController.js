'use strict'
const Registro = use('App/Models/Registro')
const Sensor = use('App/Models/Sensor')

class RegistroController {

    async index ({params}) {
        if (params.sensorId){
            const registro = await Registro.where({'sensorId': params.sensorId}).fetch()
            return registro
        }
        const registros = await Registro.all()
        return registros
    }

    async store({request}){
        /*const registroData = request.only(['sensorId', 'valor', 'fecha'])
        const registro = await Registro.create(registroData)
    
        return registro*/

        const registro = new Registro
        registro.sensorId = request.input('sensorId')
        registro.valor = request.input('valor')
        registro.fecha = (await this.fecha()).toString()
        //registro.fecha = Date()

        if (await registro.save())
            return registro
        
        return response.status(400).send('No se guardó la información')
    }

    async ultimoRegistro ({params}) {
        const registro = await Registro.where({'sensorId': params.sensorId}).sort({created_at: -1}).limit(1).fetch()
        return registro
    }

    async registrosPlagas () {
        const sensor = await Sensor.where({'nombre': 'pir_plagas'}).fetch()
        const sensorJson = sensor.toJSON()
        const registro = await Registro.where({'sensorId': sensorJson[0]._id}).sort({created_at: -1}).limit(5).fetch()
        return registro
    }

    async registrosPlagasAll () {
        const sensor = await Sensor.where({'nombre': 'pir_plagas'}).fetch()
        const sensorJson = sensor.toJSON()
        const registro = await Registro.where({'sensorId': sensorJson[0]._id}).sort({created_at: -1}).fetch()
        return registro
    }

    async estadoRefri () {
        const sensor = await Sensor.where({'nombre': 'puertas_refrigerador'}).fetch()
        const sensorJson = sensor.toJSON()
        const registro = await Registro.where({'sensorId': sensorJson[0]._id}).sort({created_at: -1}).limit(1).fetch()
        return registro
    }

    async temperatura () {
        const sensor = await Sensor.where({'nombre': 'temperatura_casa'}).fetch()
        const sensorJson = sensor.toJSON()
        const registro = await Registro.where({'sensorId': sensorJson[0]._id}).sort({created_at: -1}).limit(1).fetch()
        return registro
    }

    async temperaturas () {
        const sensor = await Sensor.where({'nombre': 'temperatura_casa'}).fetch()
        const sensorJson = sensor.toJSON()
        const registro = await Registro.where({'sensorId': sensorJson[0]._id}).sort({created_at: -1}).fetch()
        return registro
    }

    async humedadPlantas () {
        const sensor = await Sensor.where({'nombre': 'humedad_plantas'}).fetch()
        const sensorJson = sensor.toJSON()
        const registro = await Registro.where({'sensorId': sensorJson[0]._id}).sort({created_at: -1}).limit(1).fetch()
        return registro
    }

    async humedadesPlantas () {
        const sensor = await Sensor.where({'nombre': 'humedad_plantas'}).fetch()
        const sensorJson = sensor.toJSON()
        const registro = await Registro.where({'sensorId': sensorJson[0]._id}).sort({created_at: -1}).fetch()
        return registro
    }

    async prevencionAccidentes () {
        const sensor = await Sensor.where({'nombre': 'ultrasonico_accidentes'}).fetch()
        const sensorJson = sensor.toJSON()
        const registro = await Registro.where({'sensorId': sensorJson[0]._id}).sort({created_at: -1}).limit(5).fetch()
        return registro
    }

    async updateLed ({params}){
        const sensor = await Sensor.where({'_id': params.id}).update({ 'estado': params.estado })
        return sensor
            
    }

    async fecha() {
        const diaActual = new Date()
        const day = diaActual.getDate()
        const month = diaActual.getMonth()+1
        const year = diaActual.getFullYear()
        const hora = diaActual.getHours()
        const minutos = diaActual.getMinutes()
        const segundos = diaActual.getSeconds()
        const fecha  = year + '/' + month + '/' + day + ' - ' + hora + ':' + minutos + ':' + segundos

        return fecha
    }
}

module.exports = RegistroController

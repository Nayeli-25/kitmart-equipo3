'use strict'
const Route = use('Route')

Route.group(() => {
    Route.post('login','AuthController.login')
    Route.get('usuario', 'UserController.index')
    Route.get('usuarios', 'UserController.indexAllUsers')
    Route.resource('users', 'UserController')
      .apiOnly()
      .validator(new Map([
        [['users.store'], ['StoreUser']]
      ]))

  }).prefix('api')

  Route.group(() => {
    Route.put('users','UserController.update')
    Route.delete('user', 'UserController.destroy')
    Route.post('logout', 'AuthController.logout')
    //Sensores
    Route.post('sensor','SensorController.store')
    Route.get('sensor/:id?','SensorController.index')
    Route.get('sensores/:tipo','SensorController.sensoresPorTipo')
    Route.delete('sensor/:id','SensorController.destroy')
    //Registros
    Route.get('registro/:sensorId?','RegistroController.index')
    Route.post('registro','RegistroController.store')
    
    Route.get('ultimoRegistro/:sensorId','RegistroController.ultimoRegistro')

    Route.get('plagas','RegistroController.registrosPlagas')
    Route.get('plagasAll','RegistroController.registrosPlagasAll')

    Route.get('temperatura','RegistroController.temperatura')
    Route.get('temperaturas','RegistroController.temperaturas')

    Route.get('estado','RegistroController.estadoRefri')

    Route.get('humedad','RegistroController.humedadPlantas')
    Route.get('humedades','RegistroController.humedadesPlantas')

    Route.get('prevencionAccidentes','RegistroController.prevencionAccidentes')
    Route.put('leds/:id/:estado','RegistroController.updateLed')
    
    //Recetas
    Route.get('receta/:id?','RecetaController.index')
    Route.get('recetasUsuario','RecetaController.recetasUsuario')
    Route.post('receta','RecetaController.store')
    Route.put('receta','RecetaController.update')
    Route.delete('receta/:id','RecetaController.destroy')
    //Pendientes
    Route.get('pendiente/:id?','PendienteController.index')
    Route.get('pendientesUsuario','PendienteController.pendientesUsuario')
    Route.post('pendiente','PendienteController.store')
    Route.put('pendiente/:id','PendienteController.update')
    Route.delete('pendiente/:id','PendienteController.destroy')
    
  }).prefix('api').middleware('auth')



  Route.get('pendientes','SensoresEjemploController.index')

  Route.get('recetas/:id?','RecetaController.index')
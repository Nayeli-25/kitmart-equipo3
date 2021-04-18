'use strict'

class KitmartController {
  constructor ({ socket, request }) {
    this.socket = socket
    this.request = request
  }

  onTemperatura (data) {
    this.socket.broadcast('temperatura', data)
    console.log(data)
  }

  onPlantas (data) {
    this.socket.broadcast('plantas', data)
    console.log(data)
  }

  onPlagas (data) {
    this.socket.broadcast('plagas', data)
    console.log(data)
  }

  onLed (data) {
    this.socket.broadcast('led', data)
    console.log(data)
  }

  onControlEspacios (data) {
    this.socket.broadcast('controlEspacios', data)
    console.log(data)
  }

  onHistorial (data) {
    this.socket.broadcast('historial', data)
    console.log(data)
  }

  onVentilador (data) {
    this.socket.broadcast('ventilador', data)
    console.log(data)
  }
}

module.exports = KitmartController

'use strict'
const { formatters } = use('Validator')

class StoreRegistro {
  get rules () {
    return {
      fecha: 'required | max:25'
    }
  }

  get validateAll() {
    return true
  }

  get formatter() {
    return formatters.JsonApi
  }
}

module.exports = StoreRegistro

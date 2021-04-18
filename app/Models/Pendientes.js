'use strict'

const BaseModel = use('MongooseModel')

/**
 * @class Pendientes
 */
class Pendientes extends BaseModel {
  /**
   * Pendientes's schema
   */
  static get schema () {
    return {

    }
  }
}

module.exports = Pendientes.buildModel('Pendientes')

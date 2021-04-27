import { Component, OnInit } from '@angular/core';
import { RegistroService } from 'src/app/services/registro.service';
import { SensorService } from 'src/app/services/sensor.service';
import { environmentSockets } from 'src/environments/environment.prod';
import { Sensor } from '../../models/sensor';
import Ws from "@adonisjs/websocket-client";
import { Router } from '@angular/router';

@Component({
  selector: 'app-control-espacios',
  templateUrl: './control-espacios.component.html',
  styleUrls: ['./control-espacios.component.css']
})
export class ControlEspaciosComponent implements OnInit {

  temperaturaRefri: any = ''
  registrosRefrigerador: any = ''
  registrosUtrasonico: any = ''
  registrosPlagas: any = ''
  ws: any
  chat: any
  apiURL = environmentSockets.apiURL;
  show: string
  ultrasonico: any = ''
  estado: string
  idUltrasonico: string

  constructor(private registroService:RegistroService, private sensorService:SensorService) { 
    this.updateShow()
    this.getTemperaturaRefri()
    this.getEstadoRefri()
    this.getUltrasonico()
    this.getRegistrosPlagas()
  }

  ngOnInit(): void {
    this.ws = Ws(`${this.apiURL}`)

    this.ws.connect()
    this.chat = this.ws.subscribe("kitmart")

    this.chat.on("controlEspacios", (data: any)=> {
      console.log(data)
    })
  }

  getTemperaturaRefri() {
    this.registroService.getTemperaturaRefri().subscribe((resp: any)=> {
      this.temperaturaRefri = resp
      //console.log(resp)
    })
  }

  getEstadoRefri() {
    this.registroService.getEstadoRefri().subscribe((resp: any)=> {
      this.registrosRefrigerador = resp
      //console.log(resp)
    })
  }

  getUltrasonico() {
    this.registroService.prevencionAccidentes().subscribe((resp: any)=> {
      this.registrosUtrasonico = resp
      //console.log(resp)
    })
  }

  getRegistrosPlagas() {
    this.registroService.controlPlagas().subscribe((resp: any)=> {
      this.registrosPlagas = resp
      //console.log(resp)
    })
  }

  cambiaEstado(id:string, estado:string) {
    
    this.registroService.updateEstado(id, estado).subscribe((resp: any)=> {
    })
    this.chat.emit("controlEspacios", "Soy angular")
    this.updateShow()
  }

  updateShow () {
    this.sensorService.getSensorPorTipo("D").subscribe((resp: any)=> {
      this.ultrasonico = resp
    })
      
    for (let i = 0; i < this.ultrasonico.length; i++) {
      const element = this.ultrasonico[i];
      this.estado = element.estado
      this.idUltrasonico = element._id
    }
    console.log(this.estado)
    
    if (this.estado == '1')
      this.show = 'true'
    else
      this.show = 'false'
  }
}

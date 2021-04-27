import { Component, OnInit } from '@angular/core';
import { RegistroService } from 'src/app/services/registro.service';
import { SensorService } from 'src/app/services/sensor.service';
import { environmentSockets } from 'src/environments/environment.prod';
import Ws from "@adonisjs/websocket-client";


@Component({
  selector: 'app-iluminacion',
  templateUrl: './iluminacion.component.html',
  styleUrls: ['./iluminacion.component.css']
})
export class IluminacionComponent implements OnInit {

  ws: any
  chat: any
  apiURL = environmentSockets.apiURL;
  leds: Array<any> = []
  estadoLed: any = ''

  constructor(private registroService: RegistroService, private sensorService: SensorService ) { 
    this.sensorService.getSensorPorTipo("E").subscribe((resp: any)=> {
      this.leds = resp
    })
  }

  ngOnInit(): void {
    this.ws = Ws(`${this.apiURL}`)

    this.ws.connect()
    this.chat = this.ws.subscribe("kitmart")

    this.chat.on("led", (data: any)=> {
      console.log(data)
    })
  }


  cambiaEstado(id:string, estado:string) {
    this.registroService.updateEstado(id, estado).subscribe((resp: any)=> {
    })
    this.chat.emit("led", "Soy angular")
    //this.estadoLed = 'Encendido' 
  }
}

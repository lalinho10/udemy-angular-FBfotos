import { Component, OnInit } from '@angular/core';

import { CargaImagenesService } from '../../services/carga-imagenes.service';

@Component({
  selector: 'app-fotos',
  templateUrl: './fotos.component.html',
  styles: []
})

export class FotosComponent implements OnInit {
  imagenes: any[];

  constructor( private cargaImagenesService: CargaImagenesService ) { }

  ngOnInit() {
    this.cargaImagenesService.consultarReferenciaImagenes().subscribe( imagenes => {
      this.imagenes = imagenes;
    });
  }

}

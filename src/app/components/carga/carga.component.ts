import { Component, OnInit } from '@angular/core';

import { FileItem } from '../../models/file-item';

import { CargaImagenesService } from '../../services/carga-imagenes.service';

@Component({
  selector: 'app-carga',
  templateUrl: './carga.component.html',
  styles: []
})

export class CargaComponent implements OnInit {
  isDropFileHover = false;
  imagenes: FileItem[] = [];

  constructor( private cargaImagenesService: CargaImagenesService ) {}

  ngOnInit() {
  }

  cargarImagenes(): void {
    this.cargaImagenesService.guardarImagenes( this.imagenes );
  }

  limpiarImagenes(): void {
    this.imagenes = [];
  }
}

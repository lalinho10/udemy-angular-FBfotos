import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';

import { FileItem } from '../models/file-item';

@Injectable({
  providedIn: 'root'
})

export class CargaImagenesService {
  obsPercent: Observable<number>;
  obsURL: Observable<string> = new Observable<string>();

  private CARPETA_IMAGENES = 'img';

  constructor(
    private db: AngularFirestore,
    private storage: AngularFireStorage
  ) {}

  public consultarReferenciaImagenes(): Observable<any> {
    return this.db.collection( `/${ this.CARPETA_IMAGENES }` ).valueChanges();
  }

  public guardarImagenes( imagenes: FileItem[] ) {
    for ( const imagen of imagenes ) {
      const fileRef = this.storage.ref( `${ this.CARPETA_IMAGENES }/${ imagen.nombreArchivo }` );
      const task = this.storage.upload( `${ this.CARPETA_IMAGENES }/${ imagen.nombreArchivo }`, imagen.archivo );

      this.obsPercent = task.percentageChanges();
      this.obsPercent.subscribe( progreso => imagen.progreso = progreso );

      task.snapshotChanges().pipe( finalize( () => {
        this.obsURL = fileRef.getDownloadURL();
        this.obsURL.subscribe( url => {
          imagen.url = url;
          this._guardarReferenciaImagen( { nombre: imagen.nombreArchivo, url: imagen.url } );
        });
      })).subscribe();
    }
  }

  private _guardarReferenciaImagen( imagen: { nombre: string, url: string } ) {
    this.db.collection( `/${ this.CARPETA_IMAGENES }` ).add( imagen );
  }
}

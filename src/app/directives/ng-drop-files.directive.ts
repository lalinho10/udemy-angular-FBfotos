import { Directive, EventEmitter, HostListener, Input, Output } from '@angular/core';

import { FileItem } from '../models/file-item';

@Directive({
  selector: '[appNgDropFiles]'
})

export class NgDropFilesDirective {
  @Input() imagenes: FileItem[] = [];
  @Output() dropFilesHover: EventEmitter<boolean> = new EventEmitter();

  constructor() {}

  @HostListener( 'dragover', [ '$event' ] )
  public onDragOver() {
    this.dropFilesHover.emit( true );
    this._preventAndStop( event );
  }

  @HostListener( 'dragleave', [ '$event' ] )
  public onDragLeave() {
    this.dropFilesHover.emit( false );
  }

  @HostListener( 'drop', [ '$event' ] )
  public onDrop( event ) {
    const transfer = this._getTransfer( event );

    if ( !transfer ) {
      return;
    }

    this._extractFiles( transfer.files );
    this._preventAndStop( event );
    this.dropFilesHover.emit( false );
  }

  private _getTransfer( event: any ) {
    return event.dataTransfer ? event.dataTransfer : event.originalEvent.dataTransfer;
  }

  private _extractFiles( imageList: FileList ) {
    // tslint:disable-next-line:forin
    for ( const propertyName in Object.getOwnPropertyNames( imageList ) ) {
      const tempImageFile = imageList[propertyName];

      if ( this._canBeLoaded( tempImageFile ) ) {
        const newImage = new FileItem( tempImageFile );
        this.imagenes.push( newImage );
      }
    }
  }

  // Validaciones
  private _canBeLoaded( image: File ) {
    if ( !this._alreadyDropped( image.name ) && this._isImage( image.type ) ) {
      return true;
    } else {
      return false;
    }
  }

  private _preventAndStop( event ) {
    event.preventDefault();
    event.stopPropagation();
  }

  private _alreadyDropped( nombreArchivo: string ): boolean {
    for ( const imagen of this.imagenes ) {
      if ( imagen.nombreArchivo === nombreArchivo ) {
        console.log( `El archivo ${ nombreArchivo } ya está agregado` );
        return true;
      }
    }
    return false;
  }

  private _isImage( fileType: string ) {
    return ( fileType === '' || fileType === undefined ) ? false : fileType.startsWith( 'image' );
  }
}

import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'userAccessName'
})
export class UserAccessNamePipe implements PipeTransform {

  transform(value:number): string {
    switch(value) {
      case 0: return 'Usuário'
      case 1: return 'Moderador'
      case 2: return 'Administrador'
      default: return 'INVÁLIDO'
    }
  }
}

import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { mergeMap, tap, map, catchError, of } from "rxjs";
import * as usuariosActions from '../acctions/usuarios.actions';
import { UsuarioService } from '../../services/usuario.service';


@Injectable()
export class UsuariosEffects{

  constructor(
    private actions$: Actions,
    private usuaerioService: UsuarioService){}

  cargarUsuarios$ = createEffect(
    () => this.actions$.pipe(
      ofType( usuariosActions.cargarUsuarios ),
      //tap (data => console.log('effect tap', data)),
      mergeMap(
        () => this.usuaerioService.getUsers()
        .pipe(
          //tap(data => console.log(data) )
          map( users => usuariosActions.cargarUsuariosSuccess({usuarios: users})),
          catchError(err => of (usuariosActions.cargarUsuariosError({payload: err})))
        )
      )
    )
  );
}

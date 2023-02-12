import { Injectable } from "@angular/core";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { mergeMap, tap, map, catchError, of } from "rxjs";
import * as usuariosActions from '../acctions';
import { UsuarioService } from '../../services/usuario.service';


@Injectable()
export class UsuarioEffects{

  constructor(
    private actions$: Actions,
    private usuaerioService: UsuarioService){}

  cargarUsuario$ = createEffect(
    () => this.actions$.pipe(
      ofType( usuariosActions.cargarUsuario ),
      //tap (data => console.log('effect tap', data)),
      mergeMap(
        (action) => this.usuaerioService.getUserById(action.id)
        .pipe(
          //tap(data => console.log(data) )
          map( user => usuariosActions.cargarUsuarioSuccess({usuario: user})),
          catchError(err => of (usuariosActions.cargarUsuarioError({payload: err})))
        )
      )
    )
  );
}

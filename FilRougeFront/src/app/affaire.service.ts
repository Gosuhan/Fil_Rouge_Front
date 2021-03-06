import { Injectable } from '@angular/core';
import { ApiService } from './api.service';
import { Iaffaire } from './iaffaire';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { tap } from 'rxjs/operators';
import { Iarme } from './iarme';

@Injectable()
export class AffaireService {
  constructor(private api: ApiService) {}

  update$: Subject<any> = new Subject<any>();

  selectedAffaire: Iaffaire;

  getAffaires(): Observable<Iaffaire[]> {
    return this.api.getAffaires() as Observable<Iaffaire[]>;
  }

  getOneAffaire(id) : Observable<Iaffaire>{
    return this.api.getOneAffaire(id) as Observable<Iaffaire>;
  }

  getAffairesVehicule(id): Observable<Iaffaire[]> {
    return this.api.getAffairesVehicule(id) as Observable<Iaffaire[]>;
  }

  updateAffaire(affaire: Iaffaire): Observable<Iaffaire> {
    return this.api
      .updateAffaire(affaire.id_affaire, affaire)
      .pipe(tap(data => this.update$.next()));
  }

  createAffaire(affaire: Iaffaire): Observable<Iaffaire> {
    return this.api
      .createAffaire(affaire)
      .pipe(tap(data => this.update$.next()));
  }

  deleteAffaires(id) {
    return this.api.deleteAffaire(id).pipe(tap(data => this.update$.next()));
  }
}

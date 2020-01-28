import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { mPersona } from '../models/persona.model';
import { mbp } from '../models/bp.model';

@Injectable({
  providedIn: 'root'
})
export class personaservice {
  constructor(public http: HttpClient) {
  }

  PostPersona(persona: mPersona){
    const uri = 'http://localhost/Beneficios/api/v0/Beneficios/Persona';
    const body ={
      // idPersona: persona.idPersona,
      ClaveLector : persona.claveLector,
      nombre : persona.nombre,
      apellidoPat: persona.apellidoPat,
      apellidoMat: persona.apellidoMat,
      fechaNac: persona.fechanac,
      seccion: persona.seccion,
      direccion: persona.direccion,
      idUser: persona.idUser,
      idLocalidad: persona.idLocalidad
    };
    return this.http.post(uri,body);
  }
  getPersonas(){
    const uri = 'http://localhost/Beneficios/api/v0/Beneficios/Persona';
    return this.http.get(uri);
  }

  deletePersona(id: number){
    const uri = 'http://localhost/Beneficios/api/v0/Beneficios/Persona';
    return this.http.delete(`${uri}/${id}`);
  }

  getPersonaPorId(id: number){
    const uri = 'http://localhost/Beneficios/api/v0/Beneficios/Persona';
    return this.http.get(`${uri}/${id}`);
    
  }

  getBeneficioPorPersona(id:number){
    const uri = 'http://localhost/Beneficios/api/v0/Beneficios/BeneficioPersona';
    return this.http.get(`${uri}/${id}`);
  }
  insertarBeneficioPersona(bp:mbp){
    const uri = 'http://localhost/Beneficios/api/v0/Beneficios/BeneficioPersona';
    const body ={
      idBP: bp.idBP,
      idPersona: bp.idPersona,
      idBeneficio: bp.idBeneficio,
      Descripcion:bp.Descripcion,
      fecha: bp.Fecha,
      idUser: bp.idUser
    };
    return this.http.post(uri,body);
  }

  BuscarPersonaPorNombre(nombre: string){
    const uri ='http://localhost/Beneficios/api/v0/Beneficios/BeneficioPersona'
    return this.http.get(`${uri}/${nombre}/SearchNombre`);
  }

  BuscarPersonaPorClave(clave: string){
    const uri ='http://localhost/Beneficios/api/v0/Beneficios/BeneficioPersona'
    return this.http.get(`${uri}/${clave}/SearchClave`);
  }
}
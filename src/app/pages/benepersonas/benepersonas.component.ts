import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { mPersona } from 'src/app/models/persona.model';
import { mLocalidad } from 'src/app/models/localidad.model';
import { Catalogoservice } from 'src/app/services/catalogo.service';
import { personaservice } from 'src/app/services/persona.service';
import { mbp } from 'src/app/models/bp.model';
import { beneficio } from 'src/app/models/beneficio.model';
import Swal from 'sweetalert2';
declare var $: any;


@Component({
  selector: 'app-benepersonas',
  templateUrl: './benepersonas.component.html',
  styleUrls: ['./benepersonas.component.css']
})
export class BenepersonasComponent implements OnInit {
  loading: boolean = false;
  persona:mPersona = new mPersona();
  localidades: mLocalidad [] = [];
  apoyos: mbp[] = [];
  beneficiopersona: mbp = new mbp();
  beneficios: beneficio[]=[];
  d;
  m;
  a;
  date;
  fechaa;
  nombrecomple;
  constructor(public routeractivated: ActivatedRoute,
              public catalogoservice: Catalogoservice,
              public personaservice: personaservice) {
    this.date = new Date();
    this.d = this.date.getDate().toString();
    this.m = this.date.getMonth() + 1;
    this.a = this.date.getFullYear().toString();
    this.fechaa = `${this.d}/${this.m}/${this.a}`;
    this.beneficiopersona.Fecha = this.fechaa;
    this.beneficiopersona.idUser = 3;
    this.loading = true;
    this.routeractivated.params.subscribe(params =>{
      this.persona.idPersona = params['id'];
      // console.log(this.persona);
      this.beneficiopersona.idPersona = this.persona.idPersona;
      
    });
    this.catalogoservice.GetLocalidades().subscribe((data:any)=>{
      this.localidades = data.data;
    });
    this.catalogoservice.GetBeneficios().subscribe((data:any)=>{
      this.beneficios = data.data;
    });
    this.personaservice.getPersonaPorId(this.persona.idPersona).subscribe((data: any)=>{
      this.persona = data.data[0];
      this.nombrecomple = `${this.persona.nombre } ${this.persona.apellidoPat}`;
    });
    
    this.getBp();
   }

  ngOnInit() {
  }

  getBp(){
    this.loading = true;

    this.personaservice.getBeneficioPorPersona(this.persona.idPersona).subscribe((data:any)=>{
      this.apoyos = data.data;
      this.loading = false;
      // console.log(data);
    });
  }

  modalBeneficios() {
    $('#beneficiomodal').modal();
  }
  insertarpersona(){
    // console.log(this.beneficiopersona);
    Swal.fire({
      title: 'espere',
      text: 'Guardando informacion',
      icon:'info',
      allowOutsideClick: false
    });
    Swal.showLoading();
    return this.personaservice.insertarBeneficioPersona(this.beneficiopersona).subscribe((data: any) => {
      // console.log(data);
      if(data.success){
        Swal.fire({
          title: 'Correcto!',
          text: 'se Guardaron los datos correctamente',
          icon: 'success'
        });
        this.getBp();
        $('#beneficiomodal').modal('hide');
      }
      else {
        Swal.fire({
          title: 'Error!',
          text: data.Messages,
          icon: 'error'
        });
      }
    });
  }

}

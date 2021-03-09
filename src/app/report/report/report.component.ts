import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { ReportInterface } from '../models/report.interface';
import { ReportingService } from '../services/reporting.service';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.scss'],
})
export class ReportComponent implements OnInit {

  /* Variable que indica la longitud máxima del campo description */
  descriptionMaxLength = 254;

  /* Variable que indica la longitud actual del campo description */
  descriptionActualLength;

  /* Formulario reactivo para el reporte */
  reportForm = new FormGroup({
    description: new FormControl('', [
      Validators.required, // requerido
      Validators.minLength(1), // número mínimo de caracteres, 1
      Validators.maxLength(this.descriptionMaxLength), // número máximo de caracteres, 3
    ]),
    reportCategory: new FormControl('', [
      Validators.required, // requerido
    ]),
  });

  constructor(private reportingService: ReportingService) {}

  ngOnInit(): void {
    /* Se establece la longitud por defecto y se aplica método para registrar los cambios de longitud */
    this.descriptionActualLength = 0;
    this.saveActualCharactersOfDescription();
  }

  /* Método que registra los cambios de longitud del campo description */
  saveActualCharactersOfDescription() {
    this.reportForm.get('description').valueChanges.subscribe((value) => {

      /* Controlar que "value" no sea null (especificado por hacer reset del formulario) */
      if (value != null) {
        /* Se aplica el valor de la longitud actual del campo description */
        this.descriptionActualLength = value.length;
      }

    });
  }

  /* Método que registra el reporte en el backend */
  sendReportData() {
    /* Mostrar aviso - cargando */
    Swal.fire({
      title: 'Espere',
      text: 'Se estan guardando sus datos',
      icon: 'info',
      allowOutsideClick: false,
    });
    Swal.showLoading();
    
    /* Recoger valores del formulario */
    let formData: ReportInterface = {
      description: this.reportForm.value.description,
      reportCategory: this.reportForm.value.reportCategory
    }

    /* realizar petición para registrar los datos del atleta */
    this.reportingService
      .createReport(formData)
      .subscribe((res) => {
        Swal.fire({
          title: 'Registro de datos',
          text: 'Datos registrados correctamente.',
          icon: 'success',
          input: undefined,
        });
      });

      /* Se resetea el formulario */
      this.reportForm.reset();

      /* Se resetea el contador de longitud del campo description */
      this.descriptionActualLength = 0;
  }
}

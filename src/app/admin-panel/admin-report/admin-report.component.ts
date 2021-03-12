import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AdminReportInterface } from '../models/admin-report.interface';
import { FullReportInterface } from '../models/full-report.interface';
import { AdminServiceService } from '../services/admin-service.service';

@Component({
  selector: 'app-admin-report',
  templateUrl: './admin-report.component.html',
  styleUrls: ['./admin-report.component.scss'],
})
export class AdminReportComponent implements OnInit {
  /* Variable que indica la longitud máxima del campo description */
  descriptionMaxLength = 254;

  /* Usuario administrador actual */
  actualUserAdmin;

  /* Variable que guarda el reporte consultado */
  actualReport: FullReportInterface;

  /* Variable que almacena el administrador asignado al reporte */
  adminToResolve;


  /* Formulario reactivo para el reporte */
  adminReportForm = new FormGroup({
    description: new FormControl('', [
      Validators.required, // requerido
      Validators.minLength(1), // número mínimo de caracteres, 1
      Validators.maxLength(this.descriptionMaxLength), // número máximo de caracteres, 3
    ]),
    reportStatus: new FormControl('', [
       // requerido
    ]),
  });

  constructor(
    private adminService: AdminServiceService,
    private activatedRoute: ActivatedRoute,
    private route: Router,
  ) { }

  ngOnInit(): void {
    /* Obtener usuario admin actual */
    this.getActualUserAdmin();

    /* Obtener el reporte actual */
    this.getActualReport();
  }


  getActualUserAdmin() {
    this.actualUserAdmin = localStorage.getItem('dietUsernameSession');
  }


  getActualReport() {
    /* Obtener el id actual desde la URL activa */
    const id = this.activatedRoute.snapshot.paramMap.get('id');

    /* Obtener el reporte con el id indicado */
    this.adminService.getOneReport(id).subscribe((res: FullReportInterface) => {
      // Guardar reporte dentro de la variable actualReport
      this.actualReport = res;

      // Guardar el administrador asignado al reporte
      this.adminToResolve = res.adminToResolve;
    },
      /* Si no existe el reporte, se redirige a la pantalla de error 404 */
      (error) => {
        this.route.navigate(['/404']);
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
    let formData: AdminReportInterface = {
      description: this.adminReportForm.value.description,
      reportStatus: this.adminReportForm.value.reportStatus,
    };

    /* realizar petición para actualizar las anotaciones del administrador */
    this.adminService.updateReportAnnotation(this.actualReport.id, formData.description).subscribe((res) => {

      if (formData.reportStatus == "PENDING") {
  
        this.adminService.setReportPending(this.actualReport.id).subscribe((res) => {
          
          /* Swal.fire({
            title: 'Registro de datos',
            text: 'Reporte pendiente.',
            icon: 'success',
            input: undefined,
          }); */
        });
      }
  
      if (formData.reportStatus == "RESOLVED") {
  
        this.adminService.setReportResolved(this.actualReport.id).subscribe((res) => {
  
          /* Swal.fire({
            title: 'Registro de datos',
            text: 'Reporte resuelto.',
            icon: 'success',
            input: undefined,
          }); */
        });
      }

      Swal.fire({
        title: 'Registro de datos',
        text: 'Datos registrados correctamente.',
        icon: 'success',
        input: undefined,
      });
    });

    


    /* Se resetea el formulario */
    this.adminReportForm.reset();

    /* Se resetea el contador de longitud del campo description */
    // this.descriptionActualLength = 0;

    /* Redirigir a home */
    this.route.navigate(['/admin-panel']);

  }
}
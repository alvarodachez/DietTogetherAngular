import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LogInService } from 'src/app/entry/services/log-in.service';
import Swal from 'sweetalert2';
import { PrivateService } from '../services/private.service';

@Component({
  selector: 'app-view-private',
  templateUrl: './view-private.component.html',
  styleUrls: ['./view-private.component.scss']
})
export class ViewPrivateComponent implements OnInit {
  /* Variable que almacena la pestaña activa: estado, registros o diario */
  activeMenuTab: string;

  /* Variable que almacena la barra de progreso */
  progressBar: any = '';

  /* Variable que almacena la actividad privada actual */
  actualPrivateActivity: any;

  /* Variable que almacena el ranking del atleta */
  athleteRanking: any;

  /* Variable que almacena el modo de registro: clásico o progresivo */
  registerMode: any;

  /* Variable que almacena los registros del modo clásico */
  registersClassicMode: any = [];
  
  isRegisterActive: boolean = true;

  nextRegisterDate: any;

  weightDifference = 0;

  actualPage: number = 1;

  /* Variable que almacena los registros del modo progresivo */
  registersProgressiveMode: any = [];
  

  /* Variable que almacena el formulario para añadir un registro */
  addRegisterForm = new FormGroup({
    weightKilograms: new FormControl('', [
      Validators.required, // requerido
      Validators.pattern('^[0-9]*$'), // números válidos, del 0 al 9
      Validators.minLength(1), // número mínimo de caracteres, 1
      Validators.maxLength(3), // número máximo de caracteres, 3
      Validators.min(1), // valor mínimo, 1
      Validators.max(300), // valor máximo, 300
    ]),
    weightGrams: new FormControl('', [
      Validators.required, // requerido
      Validators.pattern('^[0-9]*$'), // números válidos, del 0 al 9
      Validators.minLength(1), // número mínimo de caracteres, 1
      Validators.maxLength(3), // número máximo de caracteres, 3
    ]),
  });

  constructor(
    private privateService: PrivateService,
    private router: Router,
    private login: LogInService
  ) { }

  ngOnInit(): void {
    this.activeMenuTab = 'estado';

    this.getProgressBar();

    this.getActivePrivateActivity();

    this.getAthleteRanking();
  }

  changeMenuTab(toChange: string) {
    this.activeMenuTab = toChange;
  }

  getProgressBar() {
    this.login.isUserInSession();
    this.privateService.getProgressBar().subscribe((response) => {
      this.progressBar = response;
    });
  }

  /* Método que obtiene la actividad privada actual */
  getActivePrivateActivity() {
    this.login.isUserInSession();
    this.privateService.getPrivateActivity().subscribe(res => {
      this.actualPrivateActivity = res;
      this.registerMode = res.registerMode;

      if (this.actualPrivateActivity.totalRegisters != null) {
        this.registersClassicMode = this.actualPrivateActivity.totalRegisters;

        /* Se ordenan los registros por id, si existe más de uno */
        if (this.registersClassicMode.length > 1) {
          this.sortRegisters(this.registersClassicMode);
        }

        this.setNextRegisterDate(this.registersClassicMode);
      }

      if (this.actualPrivateActivity.daylyRegisters != null) {
        this.registersProgressiveMode = this.actualPrivateActivity.daylyRegisters;

        /* Se ordenan los registros por id, si existe más de uno */
        if (this.registersProgressiveMode.length > 1) {
          this.sortRegisters(this.registersProgressiveMode);
        }

        this.setNextRegisterDate(this.registersProgressiveMode);
      }

      // Se resetea la diferencia de peso
      this.weightDifference = 0;

      this.calculateWeightDifference(this.registersClassicMode);
      
    });
  }

  /* Método que obtiene el ranking del atleta */
  getAthleteRanking() {
    this.privateService.getAthleteRanking().subscribe(res => {
      this.athleteRanking = res;
    });
  }

  setNextRegisterDate(registers: any) {
    if (registers.length >= 1) {
      this.nextRegisterDate = registers[0].nextDateRegister;

      if (new Date(Date.now()) > new Date(Date.parse(this.nextRegisterDate))) {
        this.isRegisterActive = true;
      } else {
        this.isRegisterActive = false;
      }
    }
  }

  resetAddRegisterForm() {
    this.addRegisterForm.reset();
  }

  createClassicRegister() {
    this.login.isUserInSession();
    
    const kilograms = this.addRegisterForm.value.weightKilograms;
    const grams = this.addRegisterForm.value.weightGrams;

    const register = {
      weight: parseFloat(kilograms + '.' + grams),
    };

    this.privateService.createRegister(register).subscribe((response) => {
      this.getActivePrivateActivity();
      this.getAthleteRanking();
    });
  }

  /* Método que ordena los registros del atleta, por fecha de creación */
  sortRegisters(registers: any) {
    registers.sort((a, b) => {
      if (new Date(a.weightDate) < new Date(b.weightDate)) {
        return 1;
      }

      if (new Date(a.weightDate) > new Date(b.weightDate)) {
        return -1;
      }

      return 0;
    });
  }

  calculateWeightDifference(registers: any) {
    for (const r of registers) {
      this.weightDifference += r.weightDifference;
    }
  }

  getOutActivity() {
    Swal.fire({
      title: '¡Estás a punto de salir!',
      text:
        'Si sales de la actividad no podrás volver a ella. Tus puntos se sumarán al total de tu perfil.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, quiero salir.',
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: 'Espere',
          text: 'Saliendo del grupo',
          icon: 'info',
          allowOutsideClick: false,
        });
        Swal.showLoading();
        this.privateService.getOut().subscribe((response) => {
          Swal.fire(
            'Has salido de la actividad',
            'Se han sumado tus puntos',
            'success'
          );

          this.router.navigate(['/welcome']);
        });
      }
    });
  }

}

import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { GroupService } from '../services/group.service';
import { AthleteRankingInterface } from '../models/athlete-ranking.interface';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { LogInService } from '../../entry/services/log-in.service';

@Component({
  selector: 'app-view-group',
  templateUrl: './view-group.component.html',
  styleUrls: ['./view-group.component.scss'],
})
export class ViewGroupComponent implements OnInit {
  showActive: boolean;

  actualGroup: any;
  athletes: any = [];
  actualPage: number = 1;
  nextRegisterDate: any;
  isRegisterActive: boolean = true;
  progressBar: any;
  registers: any;
  weightDifference: number;
  registersToVerify: any = [];
  userIsGroupAdmin: boolean;
  isBoostAthlete:string = "false";
  actualUserSession = "Holis"

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
    private groupService: GroupService,
    private router: Router,
    private login: LogInService
  ) {
    this.actualGroup = 'hola';
    this.registers = 'holi';
    this.progressBar = 'buenas';
  }

  ngOnInit(): void {
    this.login.isUserInSession();
    this.showActive = true;
    this.getActualGroup();
    this.getRegisters();
    this.getProgressBar();
  }

  changeRanking() {
    this.showActive = true;
  }

  changeRegisters() {
    this.showActive = false;
  }

  resetAddRegisterForm() {
    this.addRegisterForm.reset();
  }

  getActualGroup() {
    this.login.isUserInSession();
    this.groupService.getActiveGroup().subscribe((response) => {
      this.actualGroup = response.actualGroup;

      const actualUser = localStorage.getItem('dietUsernameSession');
      this.actualUserSession = actualUser;

      if(this.actualGroup.boostDay.boostAthlete != null && this.actualGroup.boostDay.boostAthlete != undefined){

        this.isBoostAthlete = this.actualGroup.boostDay.boostAthlete.username;
      }

      this.actualGroup.athletes.forEach((athlete) => {
        this.groupService.getAthlete(athlete).subscribe((res) => {
          let athleteRanking: AthleteRankingInterface = {
            name: res.name,
            point: res.gamePoints,
            roles: res.roles,
            username: res.username,
          };

          /* Se comprueba si el atleta coincide con el usuario actual y si es groupManager */
          if (
            athleteRanking.username == actualUser &&
            athleteRanking.roles.includes('GROUP_MANAGER')
          ) {
            /* Si el atleta es groupManager, se obtienen los registros */
            this.getRegistersToVerify();
          }

          this.athletes.push(athleteRanking);

          if (this.athletes.length > 1) {
            this.athletes = this.athletes.sort(
              (a: AthleteRankingInterface, b: AthleteRankingInterface) => {
                if (a.point < b.point) {
                  return 1;
                }

                if (a.point > b.point) {
                  return -1;
                }

                return 0;
              }
            );
          }
        });
      });
    });
  }

  getRegisters() {
    this.login.isUserInSession();
    this.groupService.getRegisters().subscribe(
      (response) => {
        if (response[0] == null) {
          this.registers = [];
        } else {
          this.registers = response;

          /* Se ordenan los registros por id, si existe más de uno */
          if (this.registers.length > 1) {
            this.sortRegisters();
          }
        }

        this.setNextRegisterDate();

        // Se resetea la diferencia de peso
        this.weightDifference = 0;

        // Se calcula la diferencia de peso, recorriendo todos los registros.
        for (const r of this.registers) {
          this.weightDifference += r.weightDifference;
        }
      },
      (error) => {}
    );
  }

  /* Método que ordena los registros del atleta, por fecha de creación */
  sortRegisters() {
    this.registers.sort((a, b) => {
      if (new Date(a.weightDate) < new Date(b.weightDate)) {
        return 1;
      }

      if (new Date(a.weightDate) > new Date(b.weightDate)) {
        return -1;
      }

      return 0;
    });
  }

  crearRegistro() {
    this.login.isUserInSession();
    const registro = {
      weight: parseFloat(
        this.addRegisterForm.value.weightKilograms +
          '.' +
          this.addRegisterForm.value.weightGrams
      ),
    };

    this.groupService.createRegister(registro).subscribe((response) => {
      this.getRegisters();
      this.athletes = [];
      this.getActualGroup();
    });
  }

  getProgressBar() {
    this.login.isUserInSession();
    this.groupService.getProgressBar().subscribe((response) => {
      this.progressBar = response;
    });
  }

  setNextRegisterDate() {
    if (this.registers.length >= 1) {
      this.nextRegisterDate = this.registers[0].nextDateRegister;

      if (new Date(Date.now()) > new Date(Date.parse(this.nextRegisterDate))) {
        this.isRegisterActive = true;
      } else {
        this.isRegisterActive = false;
      }
    }
  }

  getOutGroup() {
    this.login.isUserInSession();
    Swal.fire({
      title: '¡Estás a punto de salir!',
      text:
        'Si sales del grupo no podrás volver a el. Tus puntos se sumarán al total de tu perfil.',
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
        this.groupService.getOutGroup().subscribe((response) => {
          Swal.fire(
            'Has salido de un grupo',
            'Se han sumado tus puntos',
            'success'
          );

          this.router.navigate(['/group']);
        });
      }
    });
  }

  getRegistersToVerify() {
    // Obtener lista de registros por verificar
    this.groupService.getRegistersToVerify().subscribe((res) => {
      this.registersToVerify = res;
    });
  }

  verifyRegister(idRegister: any) {
    // Aceptar registro en la verificación
    this.groupService.verifyRegister(idRegister).subscribe((res) => {
      // Resetear grupo y registros por verificar
      this.resetGroupAndRegistersToVerify();
    });
  }

  declineRegister(idRegister: any) {
    // Denegar registro en la verificación
    this.groupService.declineRegister(idRegister).subscribe((res) => {
      // Resetear grupo y registros por verificar
      this.resetGroupAndRegistersToVerify();
    });
  }

  resetGroupAndRegistersToVerify() {
    /* Resetear grupo */
    this.actualGroup = 'reset';
    this.athletes = [];
    this.getActualGroup();

    /* Resetear registros por verificar */
    this.getRegistersToVerify();
  }
}

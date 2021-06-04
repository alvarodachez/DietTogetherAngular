import { Component, OnInit ,NgModule} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { LogInService } from 'src/app/entry/services/log-in.service';
import { ProfileService } from '../services/profile.service';

import { NgxChartsModule } from '@swimlane/ngx-charts';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.scss'],
})
export class MyProfileComponent implements OnInit {
  /* Variable que almacena la pestaña mostrada actualmente */
  showMenu: string;

  actualUser: string;


  /** Grafica para registros totales */
  chartData : any[];
  labelX = "Fechas";
  labelY = "Pesos";

  maxLabelWeightRegister;
  minLabelWeightRegister;

  /** Grafica para registros en diferencias de peso totales */
  chartWeightDifferenceData : any[];
  labelXWeightDifference = "Fechas";
  labelYWeightDifference = "Diferencias";

  maxLabelWeightDifferenceRegister;
  minLabelWeightDifferenceRegister;

  /** Grafica para puntacion total */
  totalPoints;
  textValue = "puntos";

  /** Grafica para baremos del atleta */
  chartScaleData;

  labelXScale = "Fechas";
  labelYScale = "Pesos";

  /* Variable que almacena el atleta actual */
  actualAthlete: any;

  athleteName: any = '';
  athleteSurname: any = '';
  athleteBirthday: any = '';
  athleteTotalPoints: any = -1;
  athleteIMC: any = '';
  athleteActualScale: any = '';
  athleteScales: any = [];
  athleteHeight: any = '';
  athleteWeight: any = '';

  birthdateType: string = 'text';
  profileFormLocked: boolean = true;

  profileForm = new FormGroup({
    name: new FormControl({ value: '', disabled: true }, Validators.required),
    surname: new FormControl(
      { value: '', disabled: true },
      Validators.required
    ),
    birthday: new FormControl(
      { value: '', disabled: true },
      Validators.required
    ),
    // height: new FormControl({value: '', disabled: true}, Validators.required),
  });


  


  /* view: any[] = []; */
  constructor(
    private profileService: ProfileService,
    private login: LogInService
  ) {
  }

  ngOnInit(): void {
    /* Pestaña por defecto - Datos personales */
    this.showMenu = 'personal';

    this.actualUser = localStorage.getItem('dietUsernameSession');

    this.login.isUserInSession();
    this.getActualAthlete();

    this.getChartTotalRegisters();

    this.getChartTotalWeightDifferenceRegisters();
  }


  /* Método que establece el valor de la pestaña actual */
  changeShowMenu(toChange: string) {
    this.showMenu = toChange;
  }

  /* Método que obtiene el atleta actual */
  getActualAthlete() {
    this.login.isUserInSession();
    this.profileService.getAthlete().subscribe((res) => {
      this.actualAthlete = res;

      this.athleteName = res.name;
      this.athleteSurname = res.surname;
      this.athleteBirthday = res.birthDay;
      this.athleteTotalPoints = res.totalPoints;
      this.athleteIMC = res.physicalData.imc.imcValue;
      this.athleteActualScale = res.physicalData.imc.actualScale;
      this.athleteScales = res.physicalData.imc.scales;
      this.athleteHeight = res.physicalData.height;
      this.athleteWeight = res.physicalData.weight;
      this.totalPoints = res.totalPoints;

      let chartScaleData = [];

      for(let scale of res.physicalData.imc.scales){
        let scaleData = {
          "name": scale.scale,
          "value":scale.weightScale
        }

        chartScaleData.push(scaleData);
      }

      this.chartScaleData = chartScaleData;
    });
  }

  /* Establecer formulario ProfileForm como modificable */
  setProfileFormToModify() {
    let name = this.profileForm.get('name');
    let surname = this.profileForm.get('surname');
    let birthday = this.profileForm.get('birthday');
    // let height = this.profileForm.get('height');

    name.disabled ? name.enable() : name.disable();
    surname.disabled ? surname.enable() : surname.disable();
    birthday.disabled ? birthday.enable() : birthday.disable();
    // height.disabled ? height.enable() : height.disable();

    /* Establecer foco para resaltar los campos */
    this.profileForm.markAllAsTouched();

    /* Convertir el tipo del campo birtdate, de string a date */
    this.birthdateStringToDate();

    /* Desbloquear o bloquear formulario de perfil */
    this.unlockOrBlockProfileForm();
  }

  /* Método auxiliar que convierte el tipo del campo birtdate, de string a date */
  birthdateStringToDate() {
    this.birthdateType == 'text'
      ? (this.birthdateType = 'date')
      : (this.birthdateType = 'text');
  }

  /* Método auxiliar que cambia el estado del formulario ProfileForm (bloqueado o desbloqueado) */
  unlockOrBlockProfileForm() {
    this.profileFormLocked == true
      ? (this.profileFormLocked = false)
      : (this.profileFormLocked = true);
  }

  /* Enviar los datos modificados del formulario sendProfileForm */
  sendProfileForm() {
    const data = {
      name: this.profileForm.get('name').value,
      surname: this.profileForm.get('surname').value,
      birthday: this.profileForm.get('birthday').value,
    };

    this.profileService.updateProfileData(data).subscribe((res) => {
      this.getActualAthlete();

      this.setProfileFormToModify();
    });

    this.profileForm.reset();
  }

  getChartTotalRegisters() {
  
    this.profileService.getChartTotalRegisters().subscribe(res => {
      console.log(res);
      this.chartData = res;
      let series = res[0].series
      console.log(series)
      let maxValue = 0;
      let minValue = 999999999;

      for(let s of series){
        if(s.value < minValue){
          minValue = s.value;
        }

        if(s.value > maxValue){
          maxValue = s.value;
        }
      }

      this.maxLabelWeightRegister = maxValue;
      this.minLabelWeightRegister = minValue;
    })
  }

  getChartTotalWeightDifferenceRegisters() {
  
    this.profileService.getChartTotalWeightDifferenceRegisters().subscribe(res => {
      console.log(res);
      this.chartWeightDifferenceData = res;
      let series = res[0].series
      console.log(series)
      let maxValue = -99999999999;
      let minValue = 999999999;

      for(let s of series){
        if(s.value < minValue){
          minValue = s.value;
        }

        if(s.value > maxValue){
          maxValue = s.value;
        }
      }

      this.maxLabelWeightDifferenceRegister = maxValue;
      this.minLabelWeightDifferenceRegister = minValue;
    })
  }

  
}

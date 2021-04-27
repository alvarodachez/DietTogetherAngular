import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { LogInService } from 'src/app/entry/services/log-in.service';
import { ProfileService } from '../services/profile.service';

@Component({
  selector: 'app-my-profile',
  templateUrl: './my-profile.component.html',
  styleUrls: ['./my-profile.component.scss'],
})
export class MyProfileComponent implements OnInit {

  /* Variable que almacena la pestaña mostrada actualmente */
  showMenu: string;

  actualUser: string;

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

  birthdateType: string = "text";
  profileFormLocked: boolean = true;

  profileForm = new FormGroup({
    name: new FormControl({value: '', disabled: true}, Validators.required),
    surname: new FormControl({value: '', disabled: true}, Validators.required),
    birthDay: new FormControl({value: '', disabled: true}, Validators.required),
    // height: new FormControl({value: '', disabled: true}, Validators.required),
  });

  constructor(private profileService: ProfileService, private login:LogInService) {}

  ngOnInit(): void {
    /* Pestaña por defecto - Datos personales */
    this.showMenu = 'personal';

    this.actualUser = localStorage.getItem('dietUsernameSession');

    this.login.isUserInSession();
    this.getActualAthlete();
  }

  /* Método que establece el valor de la pestaña actual */
  changeShowMenu(toChange: string) {
    this.showMenu = toChange;
  }

  /* Método que obtiene el atleta actual */
  getActualAthlete() {
    this.login.isUserInSession();
    this.profileService.getAthlete().subscribe(res => {
      
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

      console.log(this.actualAthlete);
    });
  }


  /* Establecer formulario ProfileForm como modificable */
  setProfileFormToModify() {
    let name = this.profileForm.get('name');
    let surname = this.profileForm.get('surname');
    let birthDay = this.profileForm.get('birthDay');
    // let height = this.profileForm.get('height');

    name.disabled ? name.enable() : name.disable();
    surname.disabled ? surname.enable() : surname.disable();
    birthDay.disabled ? birthDay.enable() : birthDay.disable();
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
    this.birthdateType == "text" ? this.birthdateType = "date" : this.birthdateType = "text";
  }

  /* Método auxiliar que cambia el estado del formulario ProfileForm (bloqueado o desbloqueado) */
  unlockOrBlockProfileForm() {
    this.profileFormLocked == true ? this.profileFormLocked = false : this.profileFormLocked = true;
  }


  /* Enviar los datos modificados del formulario sendProfileForm */
  sendProfileForm() {

  }
  
}

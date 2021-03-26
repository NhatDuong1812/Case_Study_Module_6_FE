import { Component, OnInit } from '@angular/core';
import {userdetail} from '../model/userdetail';
import {UserdetailService} from '../service/userdetail/userdetail.service';
import {User} from '../model/user';
import {Router} from '@angular/router';
import {Customer} from '../model/customer';
import { Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  validateName = true;
  validateUsername = true;
  validatePassword = true;
  // validateEmail = true;
  validateTel = true;
  validateAddress = true;
  createSuccess = false;
  logindisplay = false;
  createEmail = true;
  createAddress = true;
  validateemailDup = true;
  createspace = true;
  // email = this.customer.email;


  listUser: User[] = [] ;
  listUserName: string[] = [];

  customer: Customer ={};


  constructor(private userdetailservice: UserdetailService, private router: Router) { }

  ngOnInit(): void {
    // this.userdetailservice.getAllUser().subscribe(listUser =>{
    //   this.listUser = listUser;
    // });


  }

  validateEmail() {

    const regularExpression = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
    return regularExpression.test(String(this.customer.email).toLowerCase());
  }




  register(){


    // fix
    if ((this.customer.name + '').length > 0 && this.customer.name != undefined && (!(this.customer.name + '').startsWith(' ')) ) {
      this.validateName = true;
    }else {
      this.validateName = false;
    }

    if ((this.customer.username + '').length !== 9 && (!(this.customer.username + '').startsWith(' ')) ){
      this.validateUsername = true;
      for (let i = 0 ; i < this.listUser.length; i++){
        if (this.customer.username == this.listUser[i].username){
          this.validateUsername = false;
          break;
        }else {
          this.validateUsername = true;
        }
      }
    }else {
      this.validateUsername = false;
    }



    if ((this.customer.password + '').length > 5 && this.customer.password != undefined && (!(this.customer.password + '').startsWith(' ')) ){
      this.validatePassword = true;}
    else {
      this.validatePassword = false;
    }

    if ((this.validateEmail()) && ((this.customer.email + '').length !== 9 && (!(this.customer.email + '').startsWith(' ')) )){
      this.createEmail = true;

    }else {
      this.createEmail = false;
    }

    if (((this.customer.tel + '').length > 7 && (this.customer.tel + '').length < 12 && (this.customer.tel + '').length !== 9 )   ){
      this.validateTel = true;

      // this.router.navigate(["login"]);
    }else {
      this.validateTel = false;
    }

    if (((this.customer.address + '').length) !== 9 && (!(this.customer.address + '').startsWith(' '))   ){
      this.createAddress = true;
    }else {
      this.createAddress = false;
    }

    console.log((this.customer.tel + '').length);
    console.log((this.customer.address + '').length);
    console.log(!(this.customer.address + '' ).startsWith(' ') );
    console.log(this.createAddress);

    console.log(this.validateName);
    console.log(this.validateUsername);
    console.log(this.validatePassword);
    console.log(this.validateTel);
    console.log(this.validateAddress);
    console.log(this.createEmail);
    console.log(this.createAddress);

    if (this.validateName && this.validateUsername && this.validatePassword && this.validateTel && this.validateAddress && this.createEmail && this.createAddress  ){
      this.userdetailservice.createNewCustomer(this.customer).subscribe(() => {
        alert("hoang");
        this.createSuccess = true;
        this.logindisplay = true;
      });
    }
  }


}

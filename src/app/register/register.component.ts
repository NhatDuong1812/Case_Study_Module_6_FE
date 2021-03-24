import { Component, OnInit } from '@angular/core';
import {userdetail} from '../model/userdetail';
import {UserdetailService} from '../service/userdetail/userdetail.service';
import {User} from '../model/user';
import {Router} from '@angular/router';
import {Customer} from '../model/customer';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  validateName = true;
  validateUsername = true;
  validatePassword = true;
  validateEmail = true;
  validateTel = true;
  validateAddress = true;

  listUser: User[] = [] ;
  listUserName: string[] = [];

  customer: Customer ={};

  constructor(private userdetailservice: UserdetailService, private router: Router) { }

  ngOnInit(): void {
    this.userdetailservice.getAllUser().subscribe(listUser =>{
      this.listUser = listUser;
    });
  }


  register(){
    if ((this.customer.name + '').length > 0 && this.customer.name != undefined){
      this.validateName = true
      if ((this.customer.username + '').length > 5 && this.customer.username != undefined){
        for (let i = 0 ; i < this.listUser.length; i++){
          if (this.customer.username == this.listUser[i].username){
            this.validateUsername = false;
            break;
          }else {
            this.validateUsername = true;
          }
        }
        if (this.validateUsername){
          if ((this.customer.password + '').length > 5 && this.customer.password != undefined){
            this.validatePassword = true;
            if (((this.customer.tel + '').length > 7 && (this.customer.tel + '').length < 12) || this.customer.tel == undefined){
              this.validateTel = true;
              this.userdetailservice.createNewCustomer(this.customer).subscribe(() => {
               // alert("success");
                // this.returnUrl = this.route.snapshot.queryParams.returnUrl || '/login';
                // this.router.navigate(["/login"]);

              });
              this.router.navigate(["login"]);
            }else {
              this.validateTel = false;
            }
          }else {
            this.validatePassword = false;
          }
        }
      }else {
        this.validateUsername = false;
      }
    }else {
      this.validateName = false;
    }

  }


}

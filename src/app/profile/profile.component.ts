import { Component, OnInit } from '@angular/core';
import {AuthService} from '../service/auth/auth.service';
import {userdetail} from '../model/userdetail';
import {UserdetailService} from '../service/userdetail/userdetail.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Customer} from '../model/customer';
import {AngularFireStorage} from '@angular/fire/storage';
import {finalize} from 'rxjs/operators';

// import { TokenStorageService } from '../_services/token-storage.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  isUserLogin = false;
  currentUser : any;
  userDetail : userdetail = {};
  username : any;
  editProfile = true;
  changePass = true;
  newPass : string | undefined ;
  oldPass : string | undefined ;
  checkPass : string | undefined ;
  checkPassMessage = true;
  oldPassMessage = true;
  changePassSuccess = true;
  customer : Customer = {};

  path = '';
  selectedImage: any = null;
  title = 'demouploadfile';
  imgSrc: any;

  constructor(private route: Router, private storage: AngularFireStorage, private authService : AuthService, private userDetailService : UserdetailService,private activatedRoute: ActivatedRoute) {

    this.authService.currentUserSubject.subscribe(value => {
      this.currentUser = value;
      if(this.currentUser){
        this.isUserLogin = true;
      }

    })
  }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(paramMap => {
      this.username = paramMap.get('username');
      console.log(this.username)
      this.userDetailService.getUserDetailByUserName(this.currentUser.username).subscribe(value1 => {
        this.userDetail = value1;
        this.imgSrc = this.userDetail.avatar;
      })
    })
  }
  showFormEdit(){
    this.editProfile = false;
  }
  editSuccess(){
    this.customer.name = this.userDetail.name;
    this.customer.address = this.userDetail.address;
    this.customer.tel = this.userDetail.tel;
    this.customer.email = this.userDetail.email;
    this.userDetailService.editUserDetail(this.currentUser.username,this.customer).subscribe(() =>{
      this.editProfile = true;
    })
  }
  cancelEdit(){
    this.userDetailService.getUserDetailByUserName(this.currentUser.username).subscribe(userDetail =>{
      this.userDetail = userDetail;
    })
    this.editProfile = true;
  }
  changePassword(){
    this.changePass = !this.changePass;
  }
  changePasswordSuccess(){
    console.log(JSON.parse(localStorage.getItem('password') as string))
    console.log((this.newPass + '').length);
    if (JSON.parse(localStorage.getItem('password') as string) == this.oldPass){
      this.oldPassMessage = true;
      if (this.newPass != undefined){
        if(this.checkPass == this.newPass && (this.newPass + '').length > 5){
          this.checkPassMessage = true;
          this.customer.password = this.newPass;
          this.userDetailService.editUserDetail(this.currentUser.username, this.customer).subscribe(() => {
            this.changePassSuccess = false;
          });
        }else {
          this.checkPassMessage = false;
        }
      }else {
        this.checkPassMessage = false;
      }
    }else {
      this.oldPassMessage = false;
    }
  }
  // tslint:disable-next-line:typedef
  submit(){
    if (this.selectedImage != null){
      const filePath = `avatar/${this.selectedImage.name.split(',').slice(0, -1).join(',')}_${new Date().getTime()}`;
      const fileRef = this.storage.ref(filePath);
      this.storage.upload(filePath, this.selectedImage).snapshotChanges().pipe(
        finalize( () => {
          fileRef.getDownloadURL().subscribe( async url => {
            this.imgSrc = url;
            this.customer.avatar = url.toString();
            this.customer.name = this.userDetail.name;
            this.customer.address = this.userDetail.address;
            this.customer.tel = this.userDetail.tel;
            this.customer.email = this.userDetail.email;
            console.log(url.toString())
            await this.userDetailService.editUserDetail(this.currentUser.username,this.customer).toPromise();
          });
        })
      ).subscribe();
    }
  }
  // tslint:disable-next-line:typedef
  showPreview(event: any){
    if (event.target.files && event.target.files[0]){
      const reader = new FileReader();
      reader.onload = (e: any) => this.imgSrc = e.target.result;
      reader.readAsDataURL(event.target.files[0]);
      this.selectedImage = event.target.files[0];
      this.submit();
      console.log(this.imgSrc)
    }else {
      this.imgSrc = '';
      this.selectedImage = null;
    }
  }
  addSong(){
    this.route.navigate(["/createsong/" + this.currentUser.username]);
  }
  addSinger(){
    this.route.navigate(["/createsinger/" + this.currentUser.username]);
  }
  listSong(){
    this.route.navigate(["/listsong/" + this.currentUser.username]);
  }
  createPlayList(){
    this.route.navigate(["/create-playlist/" + this.currentUser.username]);
  }
  listPlayList(){
    this.route.navigate(["/list-playlist/" + this.currentUser.username]);
  }
}

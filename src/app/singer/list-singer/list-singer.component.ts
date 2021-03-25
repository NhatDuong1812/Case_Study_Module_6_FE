import { Component, OnInit } from '@angular/core';
import {singer} from "../../model/singer";
import {SingerService} from "../../service/singer/singer.service";
import {AuthService} from "../../service/auth/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-list-singer',
  templateUrl: './list-singer.component.html',
  styleUrls: ['./list-singer.component.css']
})
export class ListSingerComponent implements OnInit {
  listSinger: singer[] = [];
  currentUser: any;
  page = 0;
  size = 5;
  sort = 'name';
  totalPage=0;
  totalElements=0;
  pageDisplay = 0;
  color: string= 'blue';
  constructor(private singerService: SingerService,
              private authService: AuthService,
              private route: Router) {
    this.authService.currentUserSubject.subscribe(value => {
      this.currentUser = value;
    })
  }

  ngOnInit(): void {
    this.getAllPageSinger();
  }
  getAllPageSinger(): void{
    this.singerService.getAllSingerPage(this.page, this.size, this.sort).subscribe(list =>{
      this.listSinger    = list.content;
      this.totalPage     = list.totalPages;
      this.totalElements = list.totalElements;
      this.size          = list.size;
    }, error => {
      console.log(error);
    })
  }

  nextPage() {
    if (this.page == this.totalPage) return;
    this.page = this.page+1;
    this.getAllPageSinger();
    if (this.page ==1 || this.page >= this.totalPage- 1) return;
    else this.pageDisplay =this.pageDisplay+1;
  }
  previousPage(){
    if (this.page ==0) return;
    this.page =this.page -1;
    if (this.page-2 <= 0 || this.page == this.totalPage -1 ) return;
    else this.pageDisplay = this.pageDisplay -1;

    this.getAllPageSinger();

  }
  addSinger(){
    this.route.navigate(['/create-singer/'+ this.currentUser.username])
  }
  siwtchSingerDetail(name: string){
    this.route.navigate(["/edit-singer/"+this.currentUser.username,name]);
  }
  changeColor(value: number): string{
    if (value-1 == this.page) return 'red';
    else return '';
  }
  click(number: number){
    this.page = number -1;
    if (number-2< 0) this.pageDisplay =0;
    else if(number+2>this.totalPage) this.pageDisplay = this.totalPage-3;
    else this.pageDisplay = number-2 ;
  }
}

import { Component, ElementRef, ViewChild } from '@angular/core';
import { User } from '../model/user.model';
import { UserService } from '../services/user.service';
import { Router } from '@angular/router';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-list-user',
  templateUrl: './list-user.component.html',
  styleUrls: ['./list-user.component.css']
})
export class ListUserComponent {
  users: User[];
  @ViewChild('saveList') saveList: ElementRef;

  constructor(private router: Router, private userService: UserService) { }
  // Initialize with default list of users
  ngOnInit() {
    if (localStorage.getItem("username") != null) {
      this.userService.getUsers().subscribe(data => { this.users = data; });
    } else
      this.router.navigate(['/login']);
  }
  // logOffuser
  logOutUser(): void {
    if (localStorage.getItem("username") != null) {
      localStorage.removeItem("username");
      this.router.navigate(['/login']);
    }
  }
  // Delete User
  deleteUser(user: User): void {
    let result = confirm('Do you want to delete the user?')
    if (result) {
      this.userService
        .deleteUser(user.id)
        .subscribe((data: any) => {
          this.users = this.users.filter(u => u !== user);
        });
    }
  };
  // Modify USer
  editUser(user: User): void {
    localStorage.removeItem("editUserId");
    localStorage.setItem("editUserId", user.id.toString());
    this.router.navigate(['edit-user']);
  };
  // Add New User
  addUser(): void {
    this.router.navigate(['add-user']);
  };

  saveListAsPDF() {
    console.log("save btn clicked");
    
    let DATA: any = document.getElementById('saveList');
    let cloneData = DATA.cloneNode(true);
    let hideAction = document.querySelectorAll<HTMLElement>('.hide-action');
    console.log(hideAction)

    for (let i = 0; i < hideAction.length; i++) {
      let hideActionNode = hideAction[i];
      hideActionNode.style.display = "none";
    }
    html2canvas(DATA).then((canvas) => {
      let fileWidth = 208;
      let fileHeight = (canvas.height * fileWidth) / canvas.width;
      const FILEURI = canvas.toDataURL('image/png');
      let PDF = new jsPDF('p', 'mm', 'a4');
      let position = 0;
      PDF.addImage(FILEURI, 'PNG', 0, position, fileWidth, fileHeight);
      PDF.save('UserList.pdf');
    });
    for (let i = 0; i < hideAction.length; i++) {
      let hideActionNode = hideAction[i];
      hideActionNode.style.display = "block";

    }
  }
  saveListAsExcel() {
    let element = document.getElementById('excel-table');
    const ws: XLSX.WorkSheet =XLSX.utils.table_to_sheet(element);
 
    /* generate workbook and add the worksheet */
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
 
    /* save to file */  
    XLSX.writeFile(wb, 'ExcelSheet.xlsx');
 
  }
}

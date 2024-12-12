import { Component, OnInit } from '@angular/core';
import { ClientService } from 'src/app/shared/client.service';
import { faEdit, faRemove, faEye } from '@fortawesome/free-solid-svg-icons';
import { Router } from '@angular/router';

@Component({
  selector: 'app-client-list',
  templateUrl: './client-list.component.html',
  styleUrls: ['./client-list.component.scss']
})
export class ClientListComponent implements OnInit {

  clientList:any[] = [];
  faEdit = faEdit;
  faRemove = faRemove;
  filteredList: any[] = [];
  faEye = faEye;
  constructor(private clientService: ClientService, private router: Router) {}

  ngOnInit(): void {
      this.clientService.getData().subscribe(({
        next: (data) => {
          this.clientList = data;
          this.filteredList = this.clientList;
        },
        error: (err) => {
          console.log("err", err);
        }
      }))
  }

  onRemove(id: number){
    this.clientService.deleteData(id).subscribe(({
      next: (res) => {
        this.clientList = this.clientList.filter((item) => item?.id !== id);
        this.filteredList = this.clientList;
      }
    }))
  }

  onEdit(id: number){
    this.router.navigate([`add-data/${id}/isEditPage`]);
  }

  onView(id: number){
    this.router.navigate([`add-data/${id}/isViewPage`]);
  }

  onSearch(e:any){
    const search = e?.target?.value;
    if(search){
      this.filteredList = this.clientList.filter((users) => {
        return users?.client?.name?.toLowerCase().includes(search?.toLowerCase())
      });
    }
    else{
      this.filteredList = this.clientList;
    }
  }
}

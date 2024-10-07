import { Component, OnInit, TemplateRef } from '@angular/core';
import { AppStateService } from '../../services/appState/app-state.service';
import { UserService } from '../../services/users/user.service';
import { User } from '../../model/user.model';
import { FunctionsglobalAppService } from '../../services/functionsglobal/functionsglobal-app.service';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent implements OnInit{

  userToDelete!: User;
  closeResult = '';
  constructor(public appState: AppStateService, private service: UserService, 
    public functions: FunctionsglobalAppService, private modalService : NgbModal, private router: Router){}

  ngOnInit(): void {
    this.functions.getUsers({});
    
  }

  //-----------------------------
  

	open(content: TemplateRef<any>, user: User) {
		this.modalService.open(content, { ariaLabelledBy: 'modal-basic-title' }).result.then(
			(result) => {
				this.closeResult = `Closed with: ${result}`;
        this.handleDeleteUser(user);
        
			},
			(reason) => {
				this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
			},
		);
	}

	private getDismissReason(reason: any): string {
		switch (reason) {
			case ModalDismissReasons.ESC:
				return 'by pressing ESC';
			case ModalDismissReasons.BACKDROP_CLICK:
				return 'by clicking on a backdrop';
			default:
				return `with: ${reason}`;
		}
	}
  //----------------------------
  
  
  handleSearch() {
    this.functions.getUsers({page: 1});
    }
  
  

  handleGoToPage(page: number) {
    
    this.functions.getUsers({page: page});
  }

  handleGoToPreviousPage() {
    let currentPage = this.appState.userState.currentPage - 1;
    this.appState.setUserSate({
      currentPage
    });
    this.functions.getUsers({});
  }

  handleGoToNextPage() {
    let currentPage = this.appState.userState.currentPage + 1;
    this.appState.setUserSate({
      currentPage
    });
    this.functions.getUsers({});
  }

  handleDeleteUser(user: User) {
    //Déclaration de variable

    //Traitements------------
    //if(confirm("êtes-vous sûr?"))
    this.service.deleteUser(user)
    .subscribe({
      next : () => {
        //this.getUsers();
        let users = this.appState.userState.users.filter((u:any) => u.id != user.id);
        let currentPage = this.appState.userState.currentPage;
        if(users.length == 0) {
            --currentPage
            this.appState.setUserSate({currentPage});
            if(currentPage == 0) {
              currentPage = 1;
              this.appState.setUserSate({currentPage}); 
            }
            this.functions.getUsers({});
        } else {
          let totalUsers = this.appState.userState.totalUsers - 1;
          this.appState.setUserSate({
            totalUsers, 
            users
          }); 
        }
       
      }, 
      error : (err: any) => {
        console.log(err);
      }
    });
  }

  handleEditUser(user: User) {
    this.router.navigateByUrl(`benevole/edit-users/${user.id}`);
    }


}



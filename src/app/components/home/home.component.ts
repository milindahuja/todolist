/**
 * Created By : Milind Ahuja 
 */

 import { Component, OnInit } from '@angular/core';
 import { RouterModule, Routes ,Router} from '@angular/router';
 import { ToastrService } from 'ngx-toastr';

 // Components
 import { TaskListComponent } from '../task/list/task-list.component';
 import { TaskDetailsComponent } from '../task/details/task-details.component';
 import { TaskAddComponent } from '../task/add/task-add.component';

 // Services
 import { routerTransition } from '../../services/config/config.service';

 @Component({
 	selector: 'app-home',
 	templateUrl: './home.component.html',
 	styleUrls: ['./home.component.css'],
 	animations: [routerTransition()],
 	host: {'[@routerTransition]': ''}
 })


 export class HomeComponent implements OnInit {
 	active:string;
 	constructor(private router: Router,private toastr: ToastrService) {
 		// Detect route changes for active sidebar menu
 		this.router.events.subscribe((val) => {
 			this.routeChanged(val);
 		});
 	}

 	ngOnInit() {
 	}

 	// Detect route changes for active sidebar menu
 	routeChanged(val){
 		this.active = val.url;
 	}

 	// Logout User
 	logOut(){
 		this.toastr.success('Success', "Logged Out Successfully");
 		localStorage.removeItem('userData');
 		this.router.navigate(['/login']);
 	}
 }


 // Define and export child routes of HomeComponent
 export const homeChildRoutes : Routes = [
 {
 	path: '',
 	component: TaskListComponent
 },
 {
 	path: 'add',
 	component: TaskAddComponent
 },
 {
 	path: 'update/:id',
 	component: TaskAddComponent
 },
 {
 	path: 'detail/:id',
 	component: TaskDetailsComponent
 }
 ];

/**
 * Created By : Milind Ahuja 
 */

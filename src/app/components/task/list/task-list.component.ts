/**
 * Created By : Milind Ahuja 
 */

import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

// Services
import { TaskService } from '../../../services/task/task.service';
import { routerTransition } from '../../../services/config/config.service';

@Component({
	selector: 'app-task-list',
	templateUrl: './task-list.component.html',
	styleUrls: ['./task-list.component.css'],
	animations: [routerTransition()],
	host: { '[@routerTransition]': '' }
})

export class TaskListComponent implements OnInit {
	taskList: any;
	taskListData: any;
	STATUS_ENUM = {
		1: "Created",
		2: "Working",
		3: "Finished",
		4: "Cancelled"
	}
	constructor(private taskService: TaskService, private toastr: ToastrService, private router: Router) { }
	// Call task list function on page load
	ngOnInit() {
		this.getTaskList();
	}

	// Get task list from services
	getTaskList() {
		this.taskService.getAllTasks().subscribe(
			(response) => {
				this.success(response);
			});
	}

	// Get task list success
	success(data) {
		for (let i = 0; i < data.length; i++) {
			data[i].status = this.STATUS_ENUM[data[i].status];
			data[i].name = data[i].title + ' ' + data[i].description + ' ' + data[i].status;
		}

		this.taskListData = data;
	}

	// Delete a task with its id
	deleteTask(id: number, title) {
		// get confirm box for confirmation
		const r = confirm('Are you sure, you want to delete ' + title + '?');
		if (r === true) {
			this.taskService.deleteTask(id).subscribe(
				(response) => {
					this.toastr.success('Task deleted!', 'Success');
					this.getTaskList();
				});
		}
	}

	// Logout User
	logOut(){
		this.toastr.success('Success', "Logged Out Successfully");
		localStorage.removeItem('userData');
		this.router.navigate(['/login']);
	}
}
/**
 * Created By : Milind Ahuja 
 */

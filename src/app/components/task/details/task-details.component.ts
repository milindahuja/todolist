/**
 * Created By : Milind Ahuja 
 */
import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { RouterModule, Routes, Router, ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

// Services
import { TaskService } from '../../../services/task/task.service';
import { routerTransition } from '../../../services/config/config.service';

@Component({
	selector: 'app-task-details',
	templateUrl: './task-details.component.html',
	styleUrls: ['./task-details.component.css'],
	animations: [routerTransition()],
	host: { '[@routerTransition]': '' }
})

export class TaskDetailsComponent implements OnInit {
	taskId: any;
	taskListData: any;
	selectedTask: any;
	STATUS_ENUM = {
		1 : "Created",
		2 : "Working",
		3 : "Finished",
		4 : "Cancelled"
	}
	constructor(private router: Router, private route: ActivatedRoute, private taskService: TaskService, private toastr: ToastrService) {
		// Get task detail id number sent in params
		this.route.params.subscribe(params => {
			this.taskId = params['id'];
			if (this.taskId && this.taskId != null && this.taskId !== undefined) {
				this.getTaskDetails(this.taskId);
			}
		});
	}

	ngOnInit() {
	}

	// Get task details
	getTaskDetails(id: number) {
		this.taskService.getAllTasks().subscribe(
			(response) => {
				this.taskListData = response;
				this.selectedTask = this.getSelectedTask(id, this.taskListData);
			});
	}

	// get the details for selected task from the passed id
	getSelectedTask(selectedTaskId, taskList){
		for (var i=0; i < taskList.length; i++) {
			if (taskList[i]._id === selectedTaskId) {
				taskList[i].status = this.STATUS_ENUM[taskList[i].status];
				return taskList[i];
			}
		}
	}
}

/**
 * Created By : Milind Ahuja 
 */

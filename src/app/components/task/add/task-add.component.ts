/**
 * Created By : Milind Ahuja 
 */
import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { RouterModule, Routes, Router, ActivatedRoute } from '@angular/router';

// Services
import { ValidationService } from '../../../services/config/config.service';
import { TaskService } from '../../../services/task/task.service';
import { routerTransition } from '../../../services/config/config.service';

import { ToastrService } from 'ngx-toastr';

@Component({
	selector: 'app-task-add',
	templateUrl: './task-add.component.html',
	styleUrls: ['./task-add.component.css'],
	animations: [routerTransition()],
	host: { '[@routerTransition]': '' }
})

export class TaskAddComponent implements OnInit {
	// create taskAddForm of type FormGroup
	taskAddForm: FormGroup;
	id: any;
	statusObj = [{
		"id": 1,
		"name": "Created"
	}, {
		"id": 2,
		"name": "Working"
	},{
		"id": 3,
		"name": "Finished"
	}, {
		"id": 4,
		"name": "Cancelled"
	}];

	constructor(private formBuilder: FormBuilder, private router: Router, private route: ActivatedRoute, private taskService: TaskService, private toastr: ToastrService) {

		// Check for route params
		this.route.params.subscribe(params => {
			this.id = params['id'];
			// check if ID exists in route & call update or add methods accordingly
			if (this.id && this.id !== null && this.id !== undefined) {
				this.getTaskDetails(this.id);
			} else {
				this.createForm(null);
			}
		});
	}

	ngOnInit() {
	}

	// Submit task form
	addTask() {
		let todolist = {
			"title": this.taskAddForm.value.title,
			"description": this.taskAddForm.value.description,
			"status": 1
		};
		if (this.id && this.id !== null && this.id !== undefined) {
			todolist.status = parseInt(this.taskAddForm.value.status);
			this.taskService.updateTask(this.id, {todolist}).subscribe(
				(response)=>{   
				this.router.navigate(['/']);
				this.toastr.success('Task updated!', 'Success');
			});
		} else {
			this.id = null;
			todolist.status = 1;
			this.taskService.doAddTask({todolist}).subscribe(
				(response)=>{
				this.router.navigate(['/']);
				this.toastr.success('Task added!', 'Success');
			});
	
		}
	}

	// If this is update form, get task details and update form
	getTaskDetails(id: number) {
		this.taskService.getAllTasks().subscribe(
			(response) => {
				let taskListData = response;
				const selectedTask = this.getSelectedTask(id, taskListData);
				this.createForm(selectedTask);
			});
	}

	// to get the selected task object from the passed id
	getSelectedTask(selectedTaskId, taskList){
		for (var i=0; i < taskList.length; i++) {
			if (taskList[i]._id === selectedTaskId) {
				return taskList[i];
			}
		}
	}

	// If this is update request then auto fill form
	createForm(data) {
		if (data === null) {
			this.taskAddForm = this.formBuilder.group({
				title: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(25)]],
				description: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(500)]]
			});
		} else {
			this.taskAddForm = this.formBuilder.group({
				title: [data.title, [Validators.required, Validators.minLength(3), Validators.maxLength(25)]],
				description: [data.description, [Validators.required, Validators.minLength(3), Validators.maxLength(500)]],
				status: [data.status]
			});
		}
	}

}

/**
 * Created By : Milind Ahuja 
 */
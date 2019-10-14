/**
 * Created By : Milind Ahuja
 */

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Injectable()
export class TaskService {

  constructor(private http: HttpClient) { }

  // Get all the tasks via API
  getAllTasks() {
    return this.http.get('https://engine-staging.viame.ae/assessment/user/list');
  }

  // Add new tasks via API
  doAddTask(data) {
    return this.http.post(' https://engine-staging.viame.ae/assessment/user/task', data);
  }
  
  // Delete tasks via API
  deleteTask(id: number) {
    return this.http.delete('https://engine-staging.viame.ae/assessment/user/task/'+ id);
  }

  // Update Tasks via API
  updateTask(id: number, data){
    return this.http.put('https://engine-staging.viame.ae/assessment/user/task/'+ id, data);
    
  }

}
/**
 * Created By : Milind Ahuja
 */

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { enableProdMode } from '@angular/core';

// Modules
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

// Services
import { AuthService } from './services/auth/auth.service';
import { UserService } from './services/user/user.service';
import { TaskService } from './services/task/task.service';
import { TokenInterceptor } from './services/my-http-interceptor';

// Pipes
import { FilterPipe } from './pipes/filter.pipe';

// Components
import { AppComponent } from './components/index/app.component';
import { TaskListComponent } from './components/task/list/task-list.component';
import { TaskDetailsComponent } from './components/task/details/task-details.component';
import { TaskAddComponent } from './components/task/add/task-add.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent, homeChildRoutes } from './components/home/home.component';
import { HighlightTaskDirective } from './directives/highlight-task.directive';
import { AppRoutingModule } from './app-routing.module';
import { RegisterComponent } from './components/register/register.component';




@NgModule({
	declarations: [
		AppComponent,
		TaskListComponent,
		TaskDetailsComponent,
		TaskAddComponent,
		LoginComponent,
		HomeComponent,
		FilterPipe,
		HighlightTaskDirective,
		RegisterComponent
	],
	imports: [
		BrowserModule,
		RouterModule,
		AppRoutingModule,
		FormsModule,
		ReactiveFormsModule,
		HttpClientModule,
		BrowserAnimationsModule,
		ToastrModule.forRoot({
			timeOut: 3000,
			positionClass: 'toast-top-right',
			preventDuplicates: true,
		}),
	],
	providers: [AuthService, UserService, TaskService, {
		provide: HTTP_INTERCEPTORS,
		useClass: TokenInterceptor,
		multi: true
	  }],
	bootstrap: [AppComponent]
})

// enableProdMode();

export class AppModule { }

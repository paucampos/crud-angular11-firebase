import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { Employee } from 'src/app/shared/models/employee.interface';
import { EmployeesService } from '../employees.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  employees$ = this.employeesSvc.employees;
  navigationExtras: NavigationExtras = { // desde angular 7.2
    state: {
      value: null
    }
  };

  constructor(private router: Router, private employeesSvc: EmployeesService) { }

  ngOnInit(): void {
  }

  onGoToEdit(item: Employee): void {
    this.navigationExtras.state.value = item;
    this.router.navigate(['edit'], this.navigationExtras);
  }

  onGoToSee(item: Employee): void {
    this.navigationExtras.state.value = item;
    this.router.navigate(['details'], this.navigationExtras);
  }

  async onGoToDelete(empId: string): Promise<void> {
    try {
      await this.employeesSvc.onDeleteEmployee(empId);
      alert('Deleted');
    } catch (err) {
      console.error('Error en onGoToDelete: ', err.message);
    }
  }
}

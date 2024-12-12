import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html',
  styleUrls: ['./contact-form.component.scss']
})
export class ContactFormComponent {
  personForm!: FormGroup;
  contactPersonList: any[] = [];
  isViewPage: boolean = false;
  @Output() contactAdded = new EventEmitter();
  @Input() mode: any;
  @Input() set personData(value: any){
    if(value){
      this.contactPersonList = value;
    }
  }
  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
      this.initializePersonForm();
      if(this.mode === 'isViewPage'){
        this.isViewPage = true;
      }
  }


  initializePersonForm(){
    this.personForm = this.fb.group({
      personName: ['', Validators.required],
      personMobile: ['', Validators.required],
      personEmail: ['', [Validators.required, Validators.email]],
      personDepartment: [''],
      personDesignation: [''],
    })
  }

  onPersonForm(){
    const personValue = this.personForm?.value;
    if(personValue?.personName && personValue?.personMobile && personValue?.personEmail){
      this.contactPersonList.push(personValue);
      this.personForm.reset();
      this.contactAdded.emit(this.contactPersonList);
    }
  }
  
  onCancel(){
    this.personForm.reset();
  }
}

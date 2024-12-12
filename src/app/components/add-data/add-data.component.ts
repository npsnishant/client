import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, MinLengthValidator, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { min } from 'rxjs';
import { ClientService } from 'src/app/shared/client.service';

@Component({
  selector: 'app-add-data',
  templateUrl: './add-data.component.html',
  styleUrls: ['./add-data.component.scss']
})
export class AddDataComponent implements OnInit {
  clientForm!: FormGroup;
  clientData: any;
  personData: any;
  clientEditData: any;
  clientId: any;
  isEdit: boolean = false;
  selectedFile: any;
  attachmentUrl: any;
  isViewPage: boolean = false;
  mode: string = '';
  constructor(private fb: FormBuilder, private clientService: ClientService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.clientId = this.route.snapshot.paramMap.get('id');
    if (this.clientId) {
      this.isEdit = true;
      this.clientService.getSingleData(this.clientId).subscribe((user) => {
        if (user) {
          this.clientEditData = user;
          this.personData = this.clientEditData?.person;
          this.clientForm.patchValue(this.clientEditData?.client);
          if (this.clientEditData?.attachment) {
            this.attachmentUrl = this.clientEditData?.attachment?.content;
          }
        }
      })
    }

    this.mode = this.route.snapshot.paramMap.get('type') || '';
    if (this.mode === 'isViewPage') {
      this.isViewPage = true;
    }
    this.initializeClientForm();
  }

  initializeClientForm() {
    this.clientForm = this.fb.group({
      gstNo: ['', Validators.required],
      panNo: ['', Validators.required],
      code: ['', Validators.required],
      name: ['', [Validators.required, Validators.maxLength(20)]],
      address: ['', [Validators.required, Validators.maxLength(50)]],
      pincode: ['', [Validators.required, Validators.pattern(/^\d{6}$/)]],
      country: ['', Validators.required],
      state: ['', Validators.required],
      city: ['', Validators.required],
      mobileNo: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      latitude: [''],
      longitude: [''],
      currency: ['', Validators.required],
    })
  }

  onSubmitData() {
    if (this.clientForm.valid && !this.isEdit) {
      this.clientData = this.clientForm?.value;
      const finalData = {
        client: this.clientData,
        person: this.personData,
        attachment: this.selectedFile ? this.selectedFile : this.clientEditData?.attachment
      }
      this.clientService.postData(finalData).subscribe(({
        next: (data) => {
          this.router.navigate(['']);
        },
        error: (err) => {
          console.log("error", err);
        }
      }))
    }
  }

  onUpdateData() {
    this.clientData = this.clientForm?.value;
    const finalData = {
      client: this.clientData,
      person: this.personData,
      attachment: this.selectedFile ? this.selectedFile : this.clientEditData?.attachment
    }
    this.clientService.updateData(finalData, this.clientId).subscribe(({
      next: (data) => {
        console.log("data", data);
        this.router.navigate(['']);
      },
      error: (err) => {
        console.log("error", err);
      }
    }))
  }

  onFileSelected(event: any) {

    // currently saving only image files
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.selectedFile = {
          name: file.name,
          type: file.type,
          size: file.size,
          content: e.target.result
        };
        this.attachmentUrl = e.target.result; // Store Base64 image for preview
      };
      reader.readAsDataURL(file);
    }
  }

  onContactAdded(val: any) {
    this.personData = val;
  }

  onCancel() {
    if (this.isEdit) {
      this.clientForm.patchValue(this.clientEditData?.client);

    }
    else {
      this.clientForm.reset();
    }
  }

}

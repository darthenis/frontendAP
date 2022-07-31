import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { education } from '../../../portfolio/components/education/type';
import { experience } from '../../../portfolio/components/experience/type';
import { FilesUpdate, FormControls, FormData } from './interfaces';
import {
  faTimes,
  faArrowUp,
  faCamera,
  faSpinner,
} from '@fortawesome/free-solid-svg-icons';
import { skill } from '../../../portfolio/components/skills/type';
import { project } from '../../../portfolio/components/projects/type';
import { AboutMe } from '../../../portfolio/components/about-me/type';
import { __core_private_testing_placeholder__ } from '@angular/core/testing';
import { LoadingService } from 'src/app/services/loading.service';

@Component({
  selector: 'app-dynamic-form',
  templateUrl: './dynamic-form.component.html',
  styleUrls: ['./dynamic-form.component.css'],
})
export class DynamicFormComponent implements OnInit {
  @Input() formData!: FormData;
  @Input() editData!: education | experience | skill | project | AboutMe | any;
  @Input() formTitle: string = '';
  @Output() cancel = new EventEmitter<string>();
  @Output() formSubmit = new EventEmitter<any>();
  @Output() formEditSubmit = new EventEmitter<any>();
  @ViewChild('fileInput')
  fileInput!: ElementRef;

  idUser: number = 1;

  fileName: File | null = null;

  filesUpdate: FilesUpdate[];

  isLoading$ = this.loadingService.isLoadingPost;

  faTimes = faTimes;
  faArrowUp = faArrowUp;
  faCamera = faCamera;
  faSpinner = faSpinner;

  public myForm: FormGroup = this.fb.group({});

  constructor(
    private fb: FormBuilder,
    private loadingService: LoadingService
  ) {}

  ngOnInit(): void {
    this.createForm(this.formData.controls);

    this.myForm.patchValue(this.editData);
  }

  createForm(controls: FormControls[]) {
    for (let control of controls) {
      const validatorosToAdd = [];

      for (const [key, value] of Object.entries(control.validators)) {
        switch (key) {
          case 'required':
            if (value) {
              validatorosToAdd.push(Validators.required);
            }
            break;
          case 'minLength':
            validatorosToAdd.push(Validators.minLength(value));
            break;
          case 'maxLength':
            validatorosToAdd.push(Validators.maxLength(value));
            break;
          case 'url':
            validatorosToAdd.push(
              Validators.pattern(
                /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/
              )
            );
            break;
          default:
            break;
        }
      }

      this.myForm.addControl(
        control.name,
        this.fb.control(control.value, validatorosToAdd)
      );
    }
  }

  onSubmit() {
    this.formSubmit.emit(this.myForm.value);
  }

  checkImage(event: any, name: string, sizeMax: number) {

    const file = event.target?.files[0] as File;

    if (file.size > sizeMax) {
      return this.myForm.get(name)?.setErrors({ maxSize: true });
    }

    if (file) {

      this.myForm.get(name)?.setValue(file);

    }

  }

  deleteFile(name: string) {
    this.myForm.get(name)?.setValue('');

    this.fileInput.nativeElement.value = '';

    this.filesUpdate = this.filesUpdate.filter((e) => e.name !== name);
  }
}

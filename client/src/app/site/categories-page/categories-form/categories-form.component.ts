import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute, Params} from "@angular/router";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ICategoriesService} from "@core/services/categories.service";
import {switchMap} from "rxjs/operators";
import {fromEvent, Observable, of} from "rxjs";
import {Category} from "@shared/interfaces";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-categories-form',
  templateUrl: './categories-form.component.html',
  styleUrls: ['./categories-form.component.scss']
})
export class CategoriesFormComponent implements OnInit, AfterViewInit {

  @ViewChild('file') fileRef: ElementRef;

  form: FormGroup;
  image: File;
  imagePreview: string | ArrayBuffer;
  isNew: boolean = true;
  category: Category;

  constructor(private route: ActivatedRoute,
              private categoriesService: ICategoriesService,
              private snackbar: MatSnackBar) {
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      name: new FormControl(null, Validators.required)
    });

    this.form.disable();

    this.route.params.pipe(
      switchMap((params: Params) => {
        if (params['id']) {
          this.isNew = false;
          return this.categoriesService.getById(params['id']);
        }
        return of(null);
      })
    ).subscribe(
      (category: Category) => {
        if (category) {
          this.category = category;
          this.form.patchValue({
            name: category.name
          });
          this.imagePreview = category.imageSrc;
        }
        this.form.enable();
      },
      err => {
        this.showToast(err.error.message);
      }
    );
  }

  ngAfterViewInit(): void {
    fromEvent(this.fileRef.nativeElement, 'change')
      .subscribe((event: Event) => {
        const file = (event.target as HTMLInputElement).files[0];
        this.image = file;

        const reader = new FileReader();
        fromEvent(reader, 'load')
          .subscribe(() => {
            this.imagePreview = reader.result;
          });
        reader.readAsDataURL(file);
      });
  }

  openFileBrowser() {
    this.fileRef.nativeElement.click();
  }

  onSubmit() {
    let obs$: Observable<Category>;
    this.form.disable();
    if (this.isNew) {
      obs$ = this.categoriesService.create(this.form.value.name, this.image);
    } else {
      obs$ = this.categoriesService.update(this.category._id, this.form.value.name, this.image);
    }
    obs$.subscribe(
      (category: Category) => {
        this.category = category;
        this.showToast('Category was saved successfully');
        this.form.enable();
      },
      err => {
        this.form.enable();
        this.showToast(err.error.message)
      }
    );
  }

  showToast(msg: string): void {
    this.snackbar.open(msg, null, {
      duration: 3000,
      horizontalPosition: "center",
      verticalPosition: "top"
    });
  }
}

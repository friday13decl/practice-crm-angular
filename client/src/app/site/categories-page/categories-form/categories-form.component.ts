import {AfterViewInit, Component, ElementRef, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {ICategoriesService} from '@core/services/categories.service';
import {switchMap} from 'rxjs/operators';
import {fromEvent, Observable, of} from 'rxjs';
import {Category} from '@shared/interfaces';
import {MatSnackBar} from '@angular/material/snack-bar';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-categories-form',
  templateUrl: './categories-form.component.html',
  styleUrls: ['./categories-form.component.scss']
})
export class CategoriesFormComponent implements OnInit, AfterViewInit {

  @ViewChild('file') fileRef: ElementRef;

  @ViewChild('dialogContainer')
  dialogContainer: TemplateRef<any>;

  form: FormGroup;
  image: File;
  imagePreview: string | ArrayBuffer;
  isNew = true;
  category: Category;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private categoriesService: ICategoriesService,
              private snackbar: MatSnackBar,
              private dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      name: new FormControl(null, Validators.required)
    });

    this.form.disable();

    this.route.paramMap.pipe(
      switchMap((params: ParamMap) => {
        if (params.get('id')) {
          this.isNew = false;
          return this.categoriesService.getById(params.get('id'));
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
      err => this.showToast(err.error.message)
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

  openFileBrowser(): void {
    this.fileRef.nativeElement.click();
  }

  deleteCategory(): void {
    const dialogRef = this.dialog.open(this.dialogContainer);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.form.disable();
        this.categoriesService.delete(this.category._id)
          .subscribe(
            ({message}) => this.showToast(message),
            err => this.showToast(err.error.message),
            () => this.router.navigate(['/categories'])
          );
      }
    });
  }

  onSubmit(): void {
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
        this.showToast(err.error.message);
      }
    );
  }

  showToast(msg: string): void {
    this.snackbar.open(msg, null, {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'top'
    });
  }
}

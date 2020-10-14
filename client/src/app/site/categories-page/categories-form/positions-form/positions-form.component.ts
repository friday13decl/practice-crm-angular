import {Component, Input, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {IPositionsService} from '@core/services/positions.service';
import {Position} from '@shared/interfaces';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-positions-form',
  templateUrl: './positions-form.component.html',
  styleUrls: ['./positions-form.component.scss']
})
export class PositionsFormComponent implements OnInit {

  @Input()
  categoryId: string;

  @ViewChild('dialogContainer')
  dialogContainer: TemplateRef<any>;

  @ViewChild('deleteDialogContainer')
  deleteDialogContainer: TemplateRef<any>;

  positions: Array<Position> = [];
  loading = true;
  form: FormGroup;
  deleteCandidateName: string;

  constructor(private positionsService: IPositionsService,
              private snackbar: MatSnackBar,
              private dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.form = new FormGroup({
      id: new FormControl(),
      name: new FormControl(null, Validators.required),
      cost: new FormControl(null, [Validators.required, Validators.min(1)])
    });

    this.positionsService.fetch(this.categoryId)
      .subscribe(positions => {
        this.positions = positions;
        this.loading = false;
      });
  }

  openDialog(position?: Position): void {
    if (position) {
      this.form.patchValue({
        id: position._id,
        name: position.name,
        cost: position.cost
      });
    } else {
      this.form.reset();
    }

    this.dialog.open(this.dialogContainer, {
      maxWidth: 600
    });
  }

  deletePosition(event: Event, position: Position): void {
    event.stopPropagation();

    this.deleteCandidateName = position.name;
    const dialogRef = this.dialog.open(this.deleteDialogContainer);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.positionsService.delete(position).subscribe(
          message => {
            this.showToast('Position was deleted');
            this.positions = this.positions.filter(p => p._id !== position._id);
          },
          err => this.showToast(err.error.message)
        );
      }
    });
  }

  onSubmit(): void {
    this.form.disable();
    const newPosition: Position = {
      _id: this.form.value.id,
      name: this.form.value.name,
      cost: this.form.value.cost,
      category: this.categoryId,
    };
    let obs$: Observable<Position>;
    if (newPosition._id) {
      obs$ = this.positionsService.update(newPosition);
    } else {
      obs$ = this.positionsService.create(newPosition);
    }
    obs$.subscribe(
      position => {
        this.showToast('Position was saved');
        const idx = this.positions.findIndex(p => p._id === position._id);
        if (idx > -1) {
          this.positions[idx] = position;
        } else {
          this.positions.push(position);
        }
      },
      err => this.showToast(err.error.message),
      () => this.form.enable()
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

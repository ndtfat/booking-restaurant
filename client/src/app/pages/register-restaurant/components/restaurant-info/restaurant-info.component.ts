import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'app-restaurant-info',
    templateUrl: './restaurant-info.component.html',
    styleUrls: ['./restaurant-info.component.scss'],
})
export class RestaurantInfoComponent implements OnInit {
    @Input() restaurantInfo: any;
    @Output() clickDone = new EventEmitter<boolean>();
    @Output() clickBack = new EventEmitter<boolean>();
    @Output() restaurantInfoChange = new EventEmitter();

    photo!: File;
    fileUploadedURL: string = '';
    formRestaurantInfo!: FormGroup;

    ngOnInit(): void {
        this.formRestaurantInfo = new FormGroup({
            name: new FormControl(this.restaurantInfo.name, { validators: [Validators.required] }),
            phoneNumber: new FormControl(this.restaurantInfo.phoneNumber, {
                validators: [Validators.required, Validators.minLength(10)],
            }),
            address: new FormControl(this.restaurantInfo.address, { validators: [Validators.required] }),
            openTime: new FormControl(this.restaurantInfo.openTime, { validators: [Validators.required] }),
            closeTime: new FormControl(this.restaurantInfo.closeTime, { validators: [Validators.required] }),
        });

        this.photo = this.restaurantInfo.photo;
        if (this.restaurantInfo.photo) this.fileUploadedURL = URL.createObjectURL(this.photo);

        this.formRestaurantInfo.valueChanges.subscribe((data) => {
            this.restaurantInfo = { ...data, photo: this.photo };
            this.restaurantInfoChange.emit(this.restaurantInfo);
        });
    }

    onUploadPhoto(event: any) {
        if (event.target.files.length) {
            this.photo = event.target.files[0];
            this.restaurantInfo.photo = this.photo;

            this.fileUploadedURL = URL.createObjectURL(this.photo);
        }
    }

    onClickBack() {
        this.clickBack.emit(true);
    }

    onDone() {
        this.clickDone.emit(this.formRestaurantInfo.valid);
    }
}

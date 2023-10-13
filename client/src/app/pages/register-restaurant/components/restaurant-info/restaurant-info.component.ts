import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Category } from 'src/app/models/Restaurant';

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
    menu!: Category[];
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
            reservationSize: new FormControl(this.restaurantInfo.reservationSize, {
                validators: [Validators.required, Validators.min(0)],
            }),
        });

        this.photo = this.restaurantInfo.photo;
        if (this.restaurantInfo.photo) this.fileUploadedURL = URL.createObjectURL(this.photo);

        this.menu = this.restaurantInfo.menu;

        // two way binding for restaurantInfo
        this.formRestaurantInfo.valueChanges.subscribe((data) => {
            this.restaurantInfo = { ...data, photo: this.photo, menu: this.menu };
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

    onAddCategory() {
        this.menu.push({ name: '', items: [] });
        this.restaurantInfo.menu = [...this.menu];
    }

    onDeleteCategory(index: number) {
        if (this.menu.length > 1) {
            this.menu = this.menu.filter((item, i) => i !== index);
            this.restaurantInfo.menu = [...this.menu];
        }
    }

    onMenuInputChange(index: number, field: string, e: any) {
        const value = field === 'name' ? e.target.value : e.target.value.split('\n');
        this.menu.forEach((item, i) => {
            if (index === i) {
                if (field === 'name' || field === 'items') item[field] = value;
            }
        });

        this.restaurantInfo.menu = [...this.menu];
    }

    onClickBack() {
        this.clickBack.emit(true);
    }

    onDone() {
        this.clickDone.emit(this.formRestaurantInfo.valid);
    }
}

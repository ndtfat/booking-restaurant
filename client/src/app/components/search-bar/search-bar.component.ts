import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NgIconComponent } from '@ng-icons/core';

@Component({
    selector: 'app-search-bar',
    styleUrls: ['./search-bar.component.scss'],
    template: `
        <div class="wrapper">
            <div class="select-wrapper">
                <ng-icon class="icon" name="ionLocationOutline" />
                <select class="select" [(ngModel)]="selectedLocation" (ngModelChange)="onLocationChange()">
                    <option [defaultSelected]="true">Hồ Chí Minh</option>
                    <option *ngFor="let province of provinces" [value]="province">
                        {{ province }}
                    </option>
                </select>
            </div>

            <div class="search-wrapper">
                <ng-icon class="icon" name="ionSearchOutline" />
                <input
                    type="text"
                    class="input"
                    placeholder="Restaurant name..."
                    [(ngModel)]="searchText"
                    (ngModelChange)="onSearchTextChanged()"
                />
                <ng-icon
                    *ngIf="isSearching"
                    class="icon clear"
                    name="ionCloseCircleOutline"
                    (click)="onClearSearch()"
                />
            </div>
        </div>
    `,
})
export class SearchBarComponent {
    provinces: string[] = [
        'Hà Nội',
        'Đà Nẵng',
        'Hải Phòng',
        'Cần Thơ',
        'Bắc Ninh',
        'Bình Dương',
        'Khánh Hòa',
        'Lâm Đồng',
        'Quảng Ninh',
    ];

    isSearching: boolean = false;
    searchText: string = '';
    selectedLocation: string = 'Hồ Chí Minh';
    @Output() searchTextChanged = new EventEmitter<string>();
    @Output() locationChanged = new EventEmitter<string>();

    onLocationChange() {
        this.locationChanged.emit(this.selectedLocation);
    }

    onSearchTextChanged() {
        this.isSearching = !!this.searchText;
        this.searchTextChanged.emit(this.searchText);
    }

    onClearSearch() {
        this.searchText = '';
        this.isSearching = !!this.searchText;
    }
}

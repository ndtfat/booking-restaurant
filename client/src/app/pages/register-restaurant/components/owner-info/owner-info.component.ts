import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
    selector: 'app-owner-info',
    templateUrl: './owner-info.component.html',
    styleUrls: ['./owner-info.component.scss'],
})
export class OwnerInfoComponent implements OnInit {
    @Input() ownerInfo!: any;
    @Output() clickNextStep = new EventEmitter<boolean>();
    @Output() ownerInfoChange = new EventEmitter();
    @ViewChild('pwInput') input!: ElementRef;

    pwShow: boolean = false;
    pwTyping: boolean = false;
    formOwnerInfo!: FormGroup;

    ngOnInit(): void {
        this.formOwnerInfo = new FormGroup({
            email: new FormControl(this.ownerInfo.email, { validators: [Validators.required, Validators.email] }),
            username: new FormControl(this.ownerInfo.username, { validators: [Validators.required] }),
            password: new FormControl(this.ownerInfo.password, { validators: [Validators.required] }),
        });

        this.formOwnerInfo.valueChanges.subscribe((data) => {
            this.ownerInfo = { ...data };
            this.ownerInfoChange.emit(this.ownerInfo);
        });
    }

    constructor() {}

    onPasswordChange(e: Event) {
        this.pwTyping = !!this.formOwnerInfo.value.password;
    }

    onShowPassword() {
        this.pwShow = !this.pwShow;
        this.input.nativeElement.type = this.input.nativeElement.type === 'password' ? 'text' : 'password';
    }

    onNextStep() {
        this.clickNextStep.emit(this.formOwnerInfo.valid);
    }
}

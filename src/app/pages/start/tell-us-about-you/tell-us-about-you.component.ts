import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AboutYouService} from "../../../services/about-you.service";
import {AboutYouForm} from "../../../models/user";

@Component({
  selector: 'app-tell-us-about-you',
  templateUrl: './tell-us-about-you.component.html',
  styleUrls: ['./tell-us-about-you.component.scss', '../../../shared/shared.scss']
})
export class TellUsAboutYouComponent implements OnInit {
  submitted: boolean = true;

  tellUsForm = new FormGroup({
    type: new FormControl('', [Validators.required]),
    placement: new FormControl('', [Validators.required]),
    howQuickly: new FormControl('', [Validators.required]),
    why: new FormControl('', [Validators.required]),
    relocate: new FormControl('', [Validators.required])
  });

  constructor(
    private aboutYouService: AboutYouService
  ) { }

  ngOnInit(): void {
  }

  onSubmit(): void {
    this.aboutYouService.addForm(this.tellUsForm.value as AboutYouForm);
    this.submitted = true;
  }
}

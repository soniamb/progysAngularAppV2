/**
 * @license
 * Copyright Akveo. All Rights Reserved.
 * Licensed under the MIT License. See License.txt in the project root for license information.
 */
import { Component, OnInit } from '@angular/core';
import { AnalyticsService } from './@core/utils/analytics.service';
import {NbThemeService} from "@nebular/theme";
import * as firebase from 'firebase';

@Component({
  selector: 'ngx-app',
  template: '<router-outlet></router-outlet>',
})
export class AppComponent implements OnInit {

  constructor(private analytics: AnalyticsService,private themeService: NbThemeService,) {
      this.themeService.changeTheme('corporate');
    firebase.initializeApp({
      apiKey: "AIzaSyBLC0cLWmh0edoSMHpcAi_XXU3QNViBHBE",
      authDomain: "progys-a0dd1.firebaseapp.com",
      databaseURL: "https://progys-a0dd1.firebaseio.com",
      projectId: "progys-a0dd1",
      storageBucket: "progys-a0dd1.appspot.com",
      messagingSenderId: "831344663707"
    });
  }

  ngOnInit(): void {
    this.analytics.trackPageViews();
  }
}

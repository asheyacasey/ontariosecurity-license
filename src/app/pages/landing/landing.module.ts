import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {LandingV1Component} from './landing-v1/landing-v1.component';
import {PartialsModule} from "../../partials/partials.module";
import {LandingRoutingModule} from "./landing-routing.module";
import {CoursesListComponent} from './courses-list/courses-list.component';
import {MainComponent} from './main/main.component';
import {FaqComponent} from './faq/faq.component';
import {FooterComponent} from './footer/footer.component';
import {LandingV3Component} from './landing-v3/landing-v3.component';
import {LandingV4Component} from './landing-v4/landing-v4.component';
import {LandingRegisterComponent} from './register/landing-register.component';
import {ReactiveFormsModule} from "@angular/forms";
import {CountUpModule} from "ngx-countup";
import {TestimonialsComponent} from './testimonials/testimonials.component';
import {EligibilityTestComponent} from './eligibility-test/eligibility-test.component';
import {LandingRegisterModalComponent} from './register-modal/landing-register-modal.component';
import {LandingRedirectComponent} from './landing-redirect/landing-redirect.component';
import {PrivacyPolicyComponent} from './privacy-policy/privacy-policy.component';
import {TermsOfServiceComponent} from './terms-of-service/terms-of-service.component';
import {StaticComponent} from './static/static.component';
import {TopMenuComponent} from './top-menu/top-menu.component';
import {TopMenuV4Component} from './top-menu-v4/top-menu-v4.component';
import {SocialLoginModule} from "@abacritt/angularx-social-login";
import {SignInWithGoogleComponent} from './sign-in-with-google/sign-in-with-google.component';
import {JobOffersCountComponent} from './job-offers-count/job-offers-count.component';
import {ComparisonComponent} from './comparison/comparison.component';
import {NgbCarouselModule} from "@ng-bootstrap/ng-bootstrap";
import {HiringPartnersComponent} from './hiring-partners/hiring-partners.component';
import { HelplineComponent } from './helpline/helpline.component';
import { BraggingComponent } from './bragging/bragging.component';
import { CourseDescriptionComponent } from './course-description/course-description.component';
import { CourseValueComponent } from './course-value/course-value.component';
import { MoneyBackGuaranteeComponent } from './money-back-guarantee/money-back-guarantee.component';
import { LicensingProcessComponent } from './licensing-process/licensing-process.component';
import { FaqV2Component } from './faq-v2/faq-v2.component';


@NgModule({
  declarations: [
    LandingV1Component,
    CoursesListComponent,
    MainComponent,
    FaqComponent,
    FooterComponent,
    LandingV3Component,
    LandingV4Component,
    LandingRegisterComponent,
    TestimonialsComponent,
    EligibilityTestComponent,
    LandingRegisterModalComponent,
    LandingRedirectComponent,
    PrivacyPolicyComponent,
    TermsOfServiceComponent,
    StaticComponent,
    TopMenuComponent,
    TopMenuV4Component,
    SignInWithGoogleComponent,
    JobOffersCountComponent,
    ComparisonComponent,
    HiringPartnersComponent,
    HelplineComponent,
    BraggingComponent,
    CourseDescriptionComponent,
    CourseValueComponent,
    MoneyBackGuaranteeComponent,
    LicensingProcessComponent,
    FaqV2Component,
  ],
  exports: [
    SignInWithGoogleComponent
  ],
  imports: [
    CommonModule,
    PartialsModule,
    LandingRoutingModule,
    ReactiveFormsModule,
    CountUpModule,
    SocialLoginModule,
    NgbCarouselModule,
  ]
})
export class LandingModule {
}

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
import {LandingRegisterComponent} from './register/landing-register.component';
import {ReactiveFormsModule} from "@angular/forms";
import {CountUpModule} from "ngx-countup";
import {TestimonialsComponent} from './testimonials/testimonials.component';
import {EligibilityTestComponent} from './eligibility-test/eligibility-test.component';
import {LandingRegisterModalComponent} from './register-modal/landing-register-modal.component';
import {LandingRedirectComponent} from './landing-redirect/landing-redirect.component';
import {PrivacyPolicyComponent} from './privacy-policy/privacy-policy.component';
import {TermsOfServiceComponent} from './terms-of-service/terms-of-service.component';
import { StaticComponent } from './static/static.component';
import { TopMenuComponent } from './top-menu/top-menu.component';
import {SocialLoginModule} from "@abacritt/angularx-social-login";
import { SignInWithGoogleComponent } from './sign-in-with-google/sign-in-with-google.component';
import { JobOffersCountComponent } from './job-offers-count/job-offers-count.component';


@NgModule({
    declarations: [
        LandingV1Component,
        CoursesListComponent,
        MainComponent,
        FaqComponent,
        FooterComponent,
        LandingV3Component,
        LandingRegisterComponent,
        TestimonialsComponent,
        EligibilityTestComponent,
        LandingRegisterModalComponent,
        LandingRedirectComponent,
        PrivacyPolicyComponent,
        TermsOfServiceComponent,
        StaticComponent,
        TopMenuComponent,
        SignInWithGoogleComponent,
        JobOffersCountComponent,
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
    ]
})
export class LandingModule {
}

import {Component, OnInit} from '@angular/core';

export interface HiringPartner {
  name: string,
  logoUri: string
}

export interface HiringPartners {
  firstLine: HiringPartner[];
  secondLine: HiringPartner[];
}

@Component({
  selector: 'app-hiring-partners',
  templateUrl: './hiring-partners.component.html',
  styleUrls: ['./hiring-partners.component.scss']
})
export class HiringPartnersComponent implements OnInit {

  hiringPartners: HiringPartner[] = [
    {name: 'Commander Security', logoUri: '/assets/v3/partner-logos/commander-security.png'},
    {name: 'VR United Security', logoUri: '/assets/v3/partner-logos/vr-united-security.png'},
    {name: 'IronGate Protection', logoUri: '/assets/v3/partner-logos/irongate-protection.png'},
    {name: 'Safety First Security', logoUri: '/assets/v3/partner-logos/safety-first-security-services.png'},
    {name: 'Cantec Security Services', logoUri: '/assets/v3/partner-logos/cantec-security-services.png'},
    {name: 'Sriven Protection Services', logoUri: '/assets/v3/partner-logos/sriven-protection-services.png'},
    {name: 'ASG Security Group Ltd', logoUri: '/assets/v3/partner-logos/asg-security-group-ltd.png'},
    {name: 'Paragon Security', logoUri: '/assets/v3/partner-logos/paragon-security.png'},
    {name: 'Greig Security', logoUri: '/assets/v3/partner-logos/greig-security.png'},
    {name: 'Duke\'s Royal Guard Inc.', logoUri: '/assets/v3/partner-logos/dukes-royal-guard-inc.png'},
    {name: 'Corpa Investigation & Security', logoUri: '/assets/v3/partner-logos/corpa-investigation-and-security.png'},
    {name: 'Wincon Security', logoUri: '/assets/v3/partner-logos/wincon-security.png'},
    {name: 'Special Security Services', logoUri: '/assets/v3/partner-logos/special-security-services.png'},
    {name: 'Best Guard Security', logoUri: '/assets/v3/partner-logos/best-guard-security.png'},
  ];

  hiringPartnersPartitioned: HiringPartner[][] = [];

  constructor() {
    this.hiringPartnersPartitioned = [
      ...Array(Math.ceil(this.hiringPartners.length / 6))]
      .map((_, i) => this.hiringPartners.slice(i * 6, i * 6 + 6));
  }

  ngOnInit(): void {
  }


  /**
   * Returns the lines for hiring partners when they are split by the phone image (left and right sides)
   */
  hiringPartnersSplitLeft(): HiringPartners {
    return {
      firstLine: this.hiringPartners.filter((v, i) => i <= 3),
      secondLine: this.hiringPartners.filter((v, i) => i >= 7 && i <= 10)
    }
  }

  /**
   * Returns the lines for hiring partners when they are split by the phone image (left and right sides)
   */
  hiringPartnersSplitRight(): HiringPartners {
    return {
      firstLine: this.hiringPartners.filter((v, i) => i >= 4 && i <= 6),
      secondLine: this.hiringPartners.filter((v, i) => i >= 11)
    }
  }

  /**
   * Returns the lines for hiring partners when they are not split
   */
  hiringPartnersSingle(): HiringPartners {
    return {
      firstLine: this.hiringPartners.filter((v, i) => i <= 6),
      secondLine: this.hiringPartners.filter((v, i) => i >= 7),
    }
  }

}

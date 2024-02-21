import {Component, OnInit} from '@angular/core';

interface ComparisonEntry {
  benefit: string;
  ourHas: boolean;
  theirHas: boolean;
}

@Component({
  selector: 'app-comparison',
  templateUrl: './comparison.component.html',
  styleUrls: ['./comparison.component.scss']
})
export class ComparisonComponent implements OnInit {

  comparisonEntries: ComparisonEntry[] = [
    {
      benefit: 'Mobile-Friendly & Easy-to-Follow 12 Lessons (33.5 hours)',
      ourHas: true,
      theirHas: false,
    },
    {
      benefit: 'Online Learning, Mock Quizzes',
      ourHas: true,
      theirHas: true,
    },
    {
      benefit: 'Learn at Your Own Pace, Access Available 24/7 Forever',
      ourHas: true,
      theirHas: false,
    },
    {
      benefit: 'Assistance with Completing Forms and Submission',
      ourHas: true,
      theirHas: false,
    },
    {
      benefit: 'Proprietary Security Guard Resume Builder ($49 value)',
      ourHas: true,
      theirHas: false,
    },
    {
      benefit: '24/7 Helpline & Free Passport Size Photo for Application  ($45 value)',
      ourHas: true,
      theirHas: false,
    },
    {
      benefit: 'Aggressive Job Placement Efforts and Priority Hiring',
      ourHas: true,
      theirHas: false,
    },
    {
      benefit: 'Discounted Members-only Pricing for more Courses ($300 in savings)',
      ourHas: true,
      theirHas: false,
    },
    {
      benefit: 'Content and Support Available in Hindi, Punjabi & Farsi',
      ourHas: true,
      theirHas: false,
    },
    {
      benefit: '1 Day CPR Training Near You (if needed)',
      ourHas: true,
      theirHas: true,
    },
    {
      benefit: 'Insider Access to Companies & Jobs Not Advertised Publicly',
      ourHas: true,
      theirHas: false,
    }
  ];

  constructor() {
  }

  ngOnInit(): void {
  }

}

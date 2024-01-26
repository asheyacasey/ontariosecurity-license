import {Injectable} from '@angular/core';
import {FAQItem} from "../models/faq";
import {Language} from "../models/language";


@Injectable({
  providedIn: 'root'
})
export class FaqService {
  languages: Language[] = [
    {
      name: 'English',
      code: 'en'
    },
    {
      name: 'Punjabi',
      code: 'pa'
    }, {
      name: 'Farsi',
      code: 'fa',
      rtl: true
    }, {
      name: 'Hindi',
      code: 'hi'
    }
  ];

  itemsByLanguage: Map<string, FAQItem[]> = new Map<string, FAQItem[]>([
    [this.languages[0].name, [
      {
        question: 'How long do I have to complete the course?',
        answer: 'You have all the time you need. Go at your own pace, the material is available and accessible to you forever.',
        open: false
      }, {
        question: 'I am an International Student, what is the best option for me?',
        answer: 'Most of our students and course takers are International Students, so we can guide you very competently. Security is a great industry for students. It provides flexible hours and working conditions conducive to a full-time student.\n' +
          'We also connect our students, who take our online training course, with employers and Companies looking to hire and we will help you get a job.\n' +
          'We have different languages available for the course material: Punjabi, Hindi and many others.\n' +
          'You will need either a Work Permit or a Study permit.\n' +
          'If you have a Study Permit, read carefully what it says on the document about working. If you are allowed to work off-campus, then that is perfect. Many International Students can now work up to 40 hours weekly on a Study Permit.\n' +
          'If confused or uncertain, send us a line at <a href="mailto:tcn@ontariosecuritylicense.ca">tcn@ontariosecuritylicense.ca</a> and we will guide you further on your specific situation.',
        open: false
      }, {
        question: 'What languages can I see the study material in?',
        answer: '- English\n' +
          '- Hindi\n' +
          '- Punjabi\n' +
          '- Farsi\n' +
          'But remember, you will need to take the Ministry test in English so review both your native language and the English material.',
        open: false
      }, {
        question: 'From start to end, how much money will it cost me?',
        answer: '- Course Fee: $199.99 with CPR\n' +
          '- Test Booking Fee: $66.50\n' +
          '- Application Processing Fee: $80\n' +
          'So total will be approximately $346.50 + tax',
        open: false
      },
      {
        question: 'What are the requirements of working in Ontario as a Security Guard?',
        answer: '- Be 18 years of age or older\n' +
          '- Complete the Course and get TCN Training Completion Number\n' +
          '- Have valid CPR\n' +
          '- Pass the Ministry Test\n' +
          '- Have proof of eligibility to work in Canada (Canadian Passport, PR Card, Work Permit, Study Permit)\n' +
          '- Clean Criminal Record',
        open: false
      }, {
        question: 'What happens after I write the test and pass?',
        answer: 'You will submit the formal application to the Ministry, which includes:\n' +
          '- Consent to Background Check Form\n' +
          '- Guarantor Form\n' +
          '- Copies of ID\n' +
          '- Proof of eligibility to work in Canada\n' +
          '- Passport size photo\n' +
          'Once you pass, all next steps and directives will be made clear to you. Just follow the steps and links received by the Ministry via email and complete the paperwork and submit all documents to them.',
        open: false
      }, {
        question: 'Is the entire course online?',
        answer: 'Yes.\n' +
          'Even the Ministry test can also be done online now.',
        open: false
      }, {
        question: 'What happens if I fail the Ministry test?',
        answer: 'Don’t worry, you can keep reviewing the course material and then re-take the Ministry test with the same TCN. Many people need multiple attempts to pass the test.',
        open: false
      }, {
        question: 'How can I ask more questions?',
        answer: 'Email us: <a href="mailto:tcn@lionguardsecurity.ca">tcn@lionguardsecurity.ca</a>',
        open: false
      }, {
        question: 'I want to request a language, how can I do it?',
        answer: 'Email us: <a href="mailto:tcn@lionguardsecurity.ca">tcn@lionguardsecurity.ca</a>',
        open: false
      }
    ]], [
      this.languages[1].name, [
        {
          question: 'ਮੈਂ ਇਸ ਕੋਰਸ ਨੂੰ ਕਿੰਨੇ ਸਮੇਂ ਵਿੱਚ ਪੂਰਾ ਕਰਨਾ ਹੈ?',
          answer: 'ਇਸ ਕੋਰਸ ਨੂੰ ਪੂਰਾ ਕਰਨ ਲਈ ਤੁਹਾਡੇ ਕੋਲ ਉਹ ਸਾਰਾ ਸਮਾਂ ਹੈ, ਜਿਸ ਦੀ ਤੁਹਾਨੂੰ ਲੋੜ। ਆਪਣੀ ਗਤੀ ਦੇ ਹਿਸਾਬ ਨਾਲ ਇਸ ਨੂੰ ਪੂਰਾ ਕਰੋ, ਸਮੱਗਰੀ ਹਮੇਸ਼ਾ ਲਈ ਤੁਹਾਡੇ ਕੋਲ ਉਪਲਬਧ ਅਤੇ ਪਹੁੰਚਯੋਗ ਹੈ।',
          open: false,
        }, {
          question: 'ਮੈਂ ਇੱਕ ਅੰਤਰਰਾਸ਼ਟਰੀ ਵਿਦਿਆਰਥੀ ਹਾਂ, ਮੇਰੇ ਲਈ ਸਭ ਤੋਂ ਵਧੀਆ ਵਿਕਲਪ ਕੀ ਹੈ?',
          answer: 'ਸਾਡੇ ਜ਼ਿਆਦਾਤਰ ਵਿਦਿਆਰਥੀ ਅਤੇ ਕੋਰਸ ਕਰਨ ਵਾਲੇ ਲੋਕ ਅੰਤਰਰਾਸ਼ਟਰੀ ਵਿਦਿਆਰਥੀ ਹੀ ਹਨ, ਇਸ ਲਈ ਅਸੀਂ ਬਹੁਤ ਕੁਸ਼ਲਤਾ ਨਾਲ ਤੁਹਾਡਾ ਮਾਰਗਦਰਸ਼ਨ ਕਰ ਸਕਦੇ ਹਾਂ। ਵਿਦਿਆਰਥੀਆਂ ਲਈ ਸੁਰੱਖਿਆ ਇੱਕ ਵਧੀਆ ਉਦਯੋਗ ਹੈ। ਇਹ ਫੁੱਲ-ਟਾਈਮ ਵਿਦਿਆਰਥੀ ਲਈ ਲਚਕਦਾਰ ਘੰਟਿਆਂ ਅਤੇ ਕੰਮ ਕਰਨ ਦੀਆਂ ਸਥਿਤੀਆਂ ਪ੍ਰਦਾਨ ਕਰਦਾ ਹੈ।\n' +
            '\n' +
            'ਅਸੀਂ ਸਾਡੇ ਔਨਲਾਈਨ ਸਿਖਲਾਈ ਕੋਰਸ ਕਰਨ ਵਾਲੇ ਵਿਦਿਆਰਥੀਆਂ ਨੂੰ ਰੁਜ਼ਗਾਰਦਾਤਾਵਾਂ ਅਤੇ ਕੰਪਨੀਆਂ ਨਾਲ ਵੀ ਜੋੜਦੇ ਹਨ, ਤਾਂ ਜੋ ਨੌਕਰੀ ਦੀ ਤਲਾਸ਼ ਕਰ ਰਹੇ ਵਿਦਿਆਰਥੀਆਂ ਨੂੰ ਨੌਕਰੀ ਪ੍ਰਾਪਤ ਕਰਨ ਵਿੱਚ ਅਸੀਂ ਉਹਨਾਂ ਦੀ ਮਦਦ ਕਰ ਸਕੀਏ।\n' +
            '\n' +
            'ਸਾਡੀ ਕੋਰਸ ਸਮੱਗਰੀ ਵੱਖ-ਵੱਖ ਭਾਸ਼ਾਵਾਂ ਵਿੱਚ ਉਪਲਬਧ ਹੈ। ਇਸ ਵਿੱਚ ਪੰਜਾਬੀ, ਹਿੰਦੀ ਅਤੇ ਕਈ ਹੋਰ ਭਾਸ਼ਾਵਾਂ ਸ਼ਾਮਲ ਹਨ।\n' +
            '\n' +
            'ਤੁਹਾਨੂੰ ਜਾਂ ਤਾਂ ਵਰਕ ਪਰਮਿਟ ਜਾਂ ਸਟੱਡੀ ਪਰਮਿਟ ਦੀ ਲੋੜ ਹੋਵੇਗੀ।\n' +
            '\n' +
            'ਜੇਕਰ ਤੁਹਾਡੇ ਕੋਲ ਸਟੱਡੀ ਪਰਮਿਟ ਹੈ, ਤਾਂ ਧਿਆਨ ਨਾਲ ਪੜ੍ਹੋ ਕਿ ਦਸਤਾਵੇਜ਼ ਵਿੱਚ ਕੰਮ ਕਰਨ ਬਾਰੇ ਕੀ ਲਿਖਿਆ ਹੈ। ਜੇ ਤੁਹਾਨੂੰ ਕੈਂਪਸ ਤੋਂ ਬਾਹਰ ਕੰਮ ਕਰਨ ਦੀ ਇਜਾਜ਼ਤ ਦਿੱਤੀ ਜਾਂਦੀ ਹੈ, ਤਾਂ ਇਹ ਬਹੁਤ ਹੀ ਵਧੀਆ ਗੱਲ ਹੈ!\n' +
            '\n' +
            'ਜੇਕਰ ਕੋਈ ਉਲਝਣ ਹੈ ਜਾਂ ਤੁਸੀਂ ਅਨਿਸ਼ਚਿਤ ਹੋ, ਤਾਂ <a href="mailto:tcn@ontariosecuritylicense.ca">tcn@ontariosecuritylicense.ca</a> \'ਤੇ ਸਾਨੂੰ ਇੱਕ ਮੇਲ ਭੇਜੋ ਅਤੇ ਅਸੀਂ ਤੁਹਾਡੀ ਖਾਸ ਸਥਿਤੀ ਬਾਰੇ ਅੱਗੇ ਤੁਹਾਡੀ ਮਦਦ ਕਰਾਂਗੇ।',
          open: false
        }, {
          question: 'ਅਧਿਐਨ ਸਮੱਗਰੀ ਕਿਹੜੀਆਂ ਭਾਸ਼ਾਵਾਂ ਵਿੱਚ ਉਪਲੱਬਧ ਹੈ?',
          answer: 'ਅੰਗਰੇਜ਼ੀ\n' +
            'ਹਿੰਦੀ\n' +
            'ਪੰਜਾਬੀ\n' +
            'ਫਾਰਸੀ\n' +
            '\n' +
            'ਪਰ ਯਾਦ ਰੱਖੋ, ਤੁਹਾਨੂੰ ਮੰਤਰਾਲੇ ਦੀ ਪ੍ਰੀਖਿਆ ਅੰਗਰੇਜ਼ੀ ਵਿੱਚ ਦੇਣੀ ਪਵੇਗੀ, ਇਸ ਲਈ ਆਪਣੀ ਮੂਲ ਭਾਸ਼ਾ ਅਤੇ ਅੰਗਰੇਜ਼ੀ ਸਮੱਗਰੀ ਦੋਵਾਂ ਦੀ ਸਮੀਖਿਆ ਕਰੋ।',
          open: false
        }, {
          question: 'ਸ਼ੁਰੂ ਤੋਂ ਅੰਤ ਤੱਕ, ਮੇਰਾ ਕਿੰਨਾ ਪੈਸਾ ਖਰਚ ਹੋਵੇਗਾ?',
          answer: 'ਕੋਰਸ ਫੀਸ: CPR ਦੇ ਨਾਲ $199.99\n' +
            'ਟੈਸਟ ਬੁਕਿੰਗ ਫੀਸ: $66.50\n' +
            'ਐਪਲੀਕੇਸ਼ਨ ਪ੍ਰੋਸੈਸਿੰਗ ਫੀਸ: $80\n' +
            '\n' +
            'ਇਸ ਲਈ ਕੁੱਲ ਲਗਭਗ $346.50 + ਟੈਕਸ ਹੋਵੇਗਾ',
          open: false
        }, {
          question: 'ਓਨਟਾਰੀਓ ਵਿੱਚ ਸੁਰੱਖਿਆ ਗਾਰਡ ਵਜੋਂ ਕੰਮ ਕਰਨ ਦੀਆਂ ਕੀ ਲੋੜਾਂ ਹਨ?',
          answer: '- 18 ਸਾਲ ਜਾਂ ਇਸ ਤੋਂ ਵੱਧ ਉਮਰ ਦਾ ਹੋਣਾ\n' +
            '- ਕੋਰਸ ਪੂਰਾ ਕਰਨਾ ਅਤੇ TCN ਟਰੇਨਿੰਗ ਕੰਪਲੀਸ਼ਨ ਨੰਬਰ ਪ੍ਰਾਪਤ ਕਰਨਾ\n' +
            '- ਵੈਧ CPR ਹੋਣਾ\n' +
            '- ਮੰਤਰਾਲੇ ਦਾ ਟੈਸਟ ਪਾਸ ਕਰਨਾ\n' +
            '- ਕੈਨੇਡਾ ਵਿੱਚ ਕੰਮ ਕਰਨ ਦੀ ਯੋਗਤਾ ਦਾ ਸਬੂਤ (ਕੈਨੇਡੀਅਨ ਪਾਸਪੋਰਟ, PR ਕਾਰਡ, ਵਰਕ ਪਰਮਿਟ)\n' +
            '- ਸਾਫ਼ ਅਪਰਾਧਿਕ ਰਿਕਾਰਡ',
          open: false
        }, {
          question: 'ਮੇਰੇ ਟੈਸਟ ਦੇਣ ਅਤੇ ਪਾਸ ਹੋਣ ਤੋਂ ਬਾਅਦ ਕੀ ਹੁੰਦਾ ਹੈ?',
          answer: 'ਤੁਸੀਂ ਰਸਮੀ ਅਰਜ਼ੀ ਮੰਤਰਾਲੇ ਨੂੰ ਜਮ੍ਹਾਂ ਕਰੋਗੇ, ਜਿਸ ਵਿੱਚ ਸ਼ਾਮਲ ਹੋਵੇਗਾ:\n' +
            '- ਬੈਕਗ੍ਰਾਊਂਡ ਚੈੱਕ ਫਾਰਮ ਲਈ ਸਹਿਮਤੀ\n' +
            '- ਗਾਰੰਟਰ ਫਾਰਮ\n' +
            '- ਆਈਡੀ ਦੀਆਂ ਕਾਪੀਆਂ\n' +
            '- ਕੈਨੇਡਾ ਵਿੱਚ ਕੰਮ ਕਰਨ ਦੀ ਯੋਗਤਾ ਦਾ ਸਬੂਤ\n' +
            '- ਪਾਸਪੋਰਟ ਫੋਟੋ\n' +
            '\n' +
            'ਇੱਕ ਵਾਰ ਜਦੋਂ ਤੁਸੀਂ ਟੈਸਟ ਪਾਸ ਕਰ ਲੈਂਦੇ ਹੋ, ਤਾਂ ਅਗਲੇ ਸਾਰੇ ਕਦਮਾਂ ਅਤੇ ਨਿਰਦੇਸ਼ਾਂ ਬਾਰੇ ਤੁਹਾਨੂੰ ਸਪੱਸ਼ਟ ਜਾਣਕਾਰੀ ਦੇ ਦਿੱਤੀ ਜਾਵੇਗੀ। ਮੰਤਰਾਲੇ ਦੁਆਰਾ ਈਮੇਲ ਰਾਹੀਂ ਭੇਜੇ ਗਏ ਕਦਮਾਂ ਅਤੇ ਲਿੰਕਾਂ ਦੀ ਪਾਲਣਾ ਕਰੋ ਅਤੇ ਕਾਗਜ਼ੀ ਕਾਰਵਾਈ ਨੂੰ ਪੂਰਾ ਕਰੋ ਅਤੇ ਉਹਨਾਂ ਨੂੰ ਸਾਰੇ ਦਸਤਾਵੇਜ਼ ਜਮ੍ਹਾਂ ਕਰੋ।',
          open: false
        }, {
          question: 'ਕੀ ਸਾਰਾ ਕੋਰਸ ਔਨਲਾਈਨ ਹੈ?',
          answer: 'ਜੀ, ਹਾਂ।\n' +
            '\n' +
            'ਇੱਥੋਂ ਤੱਕ ਕਿ ਮੰਤਰਾਲੇ ਦਾ ਟੈਸਟ ਵੀ ਹੁਣ ਆਨਲਾਈਨ ਹੀ ਦਿੱਤਾ ਜਾ ਸਕਦਾ ਹੈ।',
          open: false
        }, {
          question: 'ਜੇਕਰ ਮੈਂ ਔਨਲਾਈਨ ਕੋਰਸ ਕਰ ਰਿਹਾ ਹਾਂ, ਤਾਂ ਕੀ ਮੈਂ ਆਪਣਾ ਫਸਟ ਏਡ ਸੀਪੀਆਰ ਵੀ ਔਨਲਾਈਨ ਹੀ ਪ੍ਰਾਪਤ ਕਰ ਸਕਦਾ ਹਾਂ?',
          answer: 'ਨਹੀਂ, ਤੁਹਾਨੂੰ ਫਸਟ ਏਡ/ਸੀਪੀਆਰ ਦੇ ਪ੍ਰਬੰਧਨ ਦੇ ਕੁਝ ਪਹਿਲੂਆਂ ਨੂੰ ਸਿੱਖਣ ਲਈ ਕਲਾਸ ਵਿੱਚ ਜਾਣ ਦੀ ਲੋੜ ਪਵੇਗੀ। ਆਮ ਤੌਰ \'ਤੇ, ਇਹ ਸਰਟੀਫਿਕੇਟ ਪ੍ਰਾਪਤ ਕਰਨ ਲਈ ਸਿਰਫ ਇੱਕ ਦਿਨ, ਲਗਭਗ 4-8 ਘੰਟੇ ਲੱਗਦੇ ਹਨ।\n' +
            'ਅਸੀਂ ਪੂਰੇ GTA ਵਿੱਚ ਫਸਟ ਏਡ/ਸੀਪੀਆਰ ਕਲਾਸਾਂ ਦੀ ਪੇਸ਼ਕਸ਼ ਕਰਦੇ ਹਾਂ।',
          open: false
        }, {
          question: 'ਜੇ ਮੈਂ ਮੰਤਰਾਲੇ ਦੇ ਟੈਸਟ ਵਿੱਚ ਅਸਫਲ ਹੋ ਜਾਂਦਾ ਹਾਂ, ਤਾਂ ਕੀ ਹੁੰਦਾ ਹੈ?',
          answer: 'ਤੁਹਾਨੂੰ ਚਿੰਤਾ ਕਰਨ ਦੀ ਲੋੜ ਨਹੀਂ ਹੈ, ਤੁਸੀਂ ਕੋਰਸ ਸਮੱਗਰੀ ਦੀ ਸਮੀਖਿਆ ਕਰਦੇ ਰਹਿ ਸਕਦੇ ਹੋ ਅਤੇ ਫਿਰ ਉਸੇ TCN ਨਾਲ ਮੰਤਰਾਲੇ ਦੀ ਪ੍ਰੀਖਿਆ ਨੂੰ ਦੁਬਾਰਾ ਦੇ ਸਕਦੇ ਹੋ।',
          open: false
        }, {
          question: 'ਮੈਂ ਹੋਰ ਸਵਾਲ ਕਿਵੇਂ ਪੁੱਛ ਸਕਦਾ ਹਾਂ?',
          answer: 'ਸਾਨੂੰ ਈਮੇਲ ਕਰੋ: tcn@lionguardsecurity.ca',
          open: false
        }, {
          question: 'ਮੈਂ ਇੱਕ ਭਾਸ਼ਾ ਲਈ ਬੇਨਤੀ ਕਰਨਾ ਚਾਹੁੰਦਾ ਹਾਂ, ਇਹ ਮੈਂ ਕਿਵੇਂ ਕਰ ਸਕਦਾ ਹਾਂ?',
          answer: 'ਸਾਨੂੰ ਈਮੇਲ ਕਰੋ: tcn@lionguardsecurity.ca',
          open: false
        }
      ]
    ], [
      this.languages[2].name, [
        {
          question: 'در طی چه مدت باید دوره را کامل کنم؟',
          answer: 'شما هرچقدر زمان لازم است می توانید صرف کنید. با سرعت خودتان پیش بروید، مطالب برای همیشه در دسترس شما هستند. ',
          open: false
        }, {
          question: 'من یک دانشجوی بین المللی هستم، بهترین گزینه برای من چیست؟',
          answer: 'اکثر دانشجویان و دوره‌های آموزشی ما دانشجویان بین‌المللی هستند، بنابراین ما می‌توانیم شما را با مهارت عالی راهنمایی کنیم. امنیت یک صنعت عالی برای دانشجویان است. این دوره ساعت و شرایط کاری انعطاف پذیر را برای یک دانشجو تمام وقت فراهم می کند. \n' +
            '\n' +
            'ما همچنین دانشجویانی را که دوره آموزشی آنلاین ما را گذرانده‌اند، با کارفرمایان و شرکت‌هایی که به دنبال استخدام هستند مرتبط می‌کنیم و به شما کمک می‌کنیم تا شغلی پیدا کنید. \n' +
            '\n' +
            'ما زبان های مختلفی برای مطالب دوره داریم. پنجابی و هندی و بسیاری زبان های دیگر. \n' +
            '\n' +
            'شما به یک مجوز کار یا مجوز تحصیل نیاز خواهید داشت. \n' +
            '\n' +
            'اگر مجوز تحصیل دارید، آنچه در سند مربوط به قسمت کار آمده است را با دقت بخوانید. اگر اجازه دارید خارج از دانشگاه کار کنید، پس این عالی است. \n' +
            '\n' +
            'اگر سوالی دارید، با ما در tcn@ontariosecuritylicense.ca تماس بگیرید و ما شما را بیشتر در مورد وضعیت خاص خود راهنمایی خواهیم کرد. \n',
          open: false
        }, {
          question: 'مطالب برای مطالعه را به چه زبان هایی می توانم ببینم؟',
          answer: 'انگلیسی\n' +
            'هندی\n' +
            'پنجابی\n' +
            'فارسی\n' +
            'اما به یاد داشته باشید، شما باید در آزمون وزارت به زبان انگلیسی شرکت کنید، بنابراین زبان مادری و مطالب انگلیسی خود را به طور کامل بررسی کنید. \n',
          open: false
        }, {
          question: 'از ابتدا تا انتها این دوره چقدر برای من هزینه دارد؟',
          answer: 'هزینه دوره: 199.99$ با CPR\n' +
            'هزینه رزرو آزمون: 66.50$ \n' +
            'هزینه پردازش برنامه:  80$ \n' +
            '\n' +
            'بنابراین کل تقریباً 346.50$ + مالیات خواهد بود\n',
          open: false
        }, {
          question: 'شرایط کار در انتاریو به عنوان گارد امنیتی چیست؟',
          answer: '-18 سال یا بیشتر باشید\n' +
            '-دوره را کامل کنید و شماره تکمیل آموزش TCN را دریافت کنید\n' +
            '-داشتن CPR معتبر\n' +
            '- قبولی در آزمون وزارت\n' +
            '-داشتن مدارک واجد شرایط بودن برای کار در کانادا (گذرنامه کانادایی، کارت روابط عمومی، مجوز کار) \n' +
            '- سابقه کیفری پاک',
          open: false
        }, {
          question: 'بعد از شرکت در آزمون و قبولی چه اتفاقی می افتد',
          answer: 'شما درخواست رسمی را به وزارت ارسال خواهید کرد که شامل موارد زیر است:\n' +
            '- رضایت به فرم بررسی سابقه \n' +
            '-فرم ضامن \n' +
            '-کپی کارت شناسایی\n' +
            '- مدارک واجد شرایط کار بودن در کانادا\n' +
            '-عکس پاسپورت سایز\n' +
            '\n' +
            'پس از قبولی، تمام مراحل و دستورالعمل های بعدی برای شما روشن خواهد شد. فقط مراحل و لینک های دریافت شده توسط وزارتخانه را از طریق ایمیل دنبال کنید و مدارک را تکمیل کنید و تمام مدارک را به آنها تحویل دهید. ',
          open: false
        }, {
          question: 'آیا کل دوره به صورت آنلاین است؟',
          answer: 'بله. \n' +
            '\n' +
            'حتی آزمون وزارت نیز می تواند به صورت آنلاین انجام شود. \n' +
            '\n',
          open: false
        }, {
          question: 'اگر دوره را بصورت آنلاین می گذرانم، آیا می توانم CPR کمک های اولیه خود را به صورت آنلاین نیز دریافت کنم؟',
          answer: 'اگر دوره را بصورت آنلاین می گذرانم، آیا می توانم CPR کمک های اولیه خود را به صورت آنلاین نیز دریافت کنم؟',
          open: false
        }, {
          question: 'اگر در آزمون وزارت رد شوم، چه اتفاقی می افتد؟',
          answer: 'نگران نباشید، می توانید به مرور مطالب درسی ادامه دهید و سپس با همان TCN دوباره در آزمون وزارت شرکت کنید. \n',
          open: false
        }, {
          question: 'چگونه می توانم سوالات بیشتری بپرسم؟',
          answer: 'به ما ایمیل بزنید: tcn@lionguardsecurity.ca',
          open: false
        }, {
          question: 'من می خواهم درخواست یک زبان خاص را داشته باشم ، چگونه می توانم این کار را انجام دهم؟',
          answer: 'به ما ایمیل بزنید: tcn@lionguardsecurity.ca',
          open: false
        }
      ]
    ], [
      this.languages[3].name, [
        {
          question: 'मेरे पास कोर्स पूरा करने के लिए कितना समय है?',
          answer: 'आप अपनी जरूरत अनुसार समय ले सकते हैं। अपनी गति से आगे बढ़ें, आपके लिए यह सामग्री हमेशा के लिए उपलब्ध रहेगी, और आप कभी भी इसे एक्सेस कर सकते हैं।\n',
          open: false
        }, {
          question: 'मैं एक अंतर्राष्ट्रीय छात्र हूँ, मेरे लिए सबसे अच्छा विकल्प क्या है?',
          answer: 'हमारे अधिकांश छात्र और पाठ्यक्रम लेने वाले लोग अंतर्राष्ट्रीय छात्र ही हैं, इसलिए हम बहुत ही सक्षमता से आपका मार्गदर्शन कर सकते हैं। छात्रों के लिए सुरक्षा एक महान उद्योग है। यह एक पूर्णकालिक छात्र के लिए काम के अनुकूल लचीले घंटे और स्थितियां प्रदान करता है।\n' +
            '\n' +
            'हम हमारे ऑनलाइन प्रशिक्षण पाठ्यक्रम में भाग लेने वाले छात्रों को उन नियोक्ताओं और कंपनियों के साथ जोड़ते हैं जो उन्हें नौकरी पर रखना चाहते हैं और हम आपको नौकरी दिलाने में आपकी मदद करेंगे।\n' +
            '\n' +
            'हमारे पास पाठ्यक्रम सामग्री के लिए विभिन्न भाषाएँ उपलब्ध हैं। इनमें हिंदी, पंजाबी और कई अन्य भाषाएँ शामिल हैं।\n' +
            '\n' +
            'आपको वर्क परमिट या स्टडी परमिट की आवश्यकता होगी।\n' +
            '\n' +
            'यदि आपके पास स्टडी परमिट है, तो दस्तावेज़ पर काम करने के बारे में जो लिखा है, उसे ध्यान से पढ़ें। यदि आपको ऑफ-कैंपस में काम करने की अनुमति है, तो यह एकदम सही है।\n' +
            '\n' +
            'यदि किसी चीज़ को लेकर भ्रमित या अनिश्चित हैं, तो हमें tcn@ontariosecuritylicense.ca पर ईमेल भेजें और हम आपकी विशिष्ट स्थिति में आपका उचित मार्गदर्शन करेंगे।',
          open: false
        }, {
          question: 'अध्ययन सामग्री किन भाषाओं में उपलब्ध है?',
          answer: 'अंग्रेज़ी\n' +
            'हिन्दी\n' +
            'पंजाबी\n' +
            'फारसी\n' +
            '\n' +
            'लेकिन याद रखें, आपको मंत्रालय की परीक्षा अंग्रेजी में देनी होगी, इसलिए अपनी मूल भाषा और अंग्रेजी सामग्री दोनों की समीक्षा करें।',
          open: false
        }, {
          question: 'शुरू से अंत तक, मेरा कितना पैसा खर्च होगा?',
          answer: 'कोर्स शुल्क: सीपीआर के साथ $199.99\n' +
            'टेस्ट बुकिंग शुल्क: $66.50\n' +
            'आवेदन प्रसंस्करण शुल्क: $80\n' +
            '\n' +
            'तो कुल लगभग $346.50 + टैक्स होगा',
          open: false
        }, {
          question: 'ओंटारियो में एक सुरक्षा गार्ड के रूप में काम करने की क्या आवश्यकताएं हैं?',
          answer: '- 18 साल या उससे अधिक उम्र का होना\n' +
            '- कोर्स पूरा करने और TCN (ट्रेनिंग कंप्लीशन नंबर) प्राप्त करना\n' +
            '- वैध सीपीआआर\n' +
            '- मंत्रालय परीक्षा पास करना\n' +
            '- कनाडा में काम करने के लिए योग्यता का प्रमाण है (कनाडाई पासपोर्ट, पीआर कार्ड, वर्क परमिट)\n' +
            '- साफ़ आपराधिक रिकॉर्ड',
          open: false
        }, {
          question: 'परीक्षा देने और पास होने के बाद क्या होता है?',
          answer: 'आप मंत्रालय को औपचारिक आवेदन भेजेंगे, जिसमें शामिल होगा:\n' +
            '- बैकग्राउंड चेक फॉर्म के लिए सहमति\n' +
            '- गारंटर फॉर्म\n' +
            '- आईडी की प्रतियां\n' +
            '- कनाडा में काम करने की पात्रता का प्रमाण\n' +
            '- पासपोर्ट साइज फोटो\n' +
            '\n' +
            'एक बार जब आप पास हो जाते हैं, तो उसके बाद अगले सभी चरण और निर्देश आपको स्पष्ट कर दिए जाएंगे। मंत्रालय द्वारा ईमेल के माध्यम से प्राप्त चरणों और लिंक का पालन करें और कागजी कार्रवाई पूरी करें और अपने सभी दस्तावेज जमा करें।',
          open: false
        }, {
          question: 'क्या पूरा कोर्स ऑनलाइन है?',
          answer: '\n' +
            'जी, हाँ।\n' +
            '\n' +
            'यहां तक कि मंत्रालय की परीक्षा भी अब ऑनलाइन दी जा सकती है।',
          open: false
        }, {
          question: 'अगर मैं ऑनलाइन कोर्स कर रहा हूं, तो क्या मैं अपना प्राथमिक उपचार सीपीआर भी ऑनलाइन प्राप्त कर सकता हूं?',
          answer: 'नहीं, प्राथमिक चिकित्सा/सीपीआर देने के कुछ पहलुओं को सीखने के लिए आपको कक्षा में जाने की आवश्यकता होगी। आमतौर पर, प्रमाणपत्र प्राप्त करने में केवल एक दिन, लगभग 4-8 घंटे लगते हैं।\n' +
            '\n' +
            'हम पूरे GTA में प्राथमिक उपचार/सीपीआर कक्षाएं प्रदान करते हैं।',
          open: false
        }, {
          question: 'यदि मैं मंत्रालय की परीक्षा में असफल हो जाता हूँ, तो क्या होगा?',
          answer: 'चिंता न करें, आप पाठ्यक्रम सामग्री की समीक्षा करना जारी रख सकते हैं और फिर उसी TCN के साथ मंत्रालय की परीक्षा दोबारा दे सकते हैं।',
          open: false
        }, {
          question: 'मैं और प्रश्न कैसे पूछ सकता हूँ?',
          answer: 'हमें ईमेल करें: tcn@lionguardsecurity.ca',
          open: false
        }, {
          question: 'मैं एक भाषा का अनुरोध करना चाहता हूं, मैं यह कैसे कर सकता हूं?',
          answer: 'हमें ईमेल करें: tcn@lionguardsecurity.ca',
          open: false
        }
      ]
    ]]);

  constructor() {
  }

  getItems(language: Language): FAQItem[] {
    return this.itemsByLanguage.get(language.name) || [];
  }
}

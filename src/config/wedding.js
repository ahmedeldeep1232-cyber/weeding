// ===== Central configuration — edit everything here =====
export const wedding = {
  defaultLang: 'en',
  // Wedding date + ceremony time in Africa/Cairo.
  // time is a DEFAULT placeholder for the countdown only (not shown as confirmed).
  date: { year: 2026, month: 11, day: 11, time: '18:00' },
  timeZone: 'Africa/Cairo',
  // Background music. YouTube is used when youtubeId is set; otherwise audioFile (put it in public/audio).
  music: { youtubeId: '-JUDHox3Pd8', audioFile: '' },
  photo: '/images/couple.jpg',
  // Optional venue: set to { en:'', ar:'', mapUrl:'' } to show the section. null = hidden.
  venue: null,
  en: {
    names: ['Adham Shaban', 'Nagham Ahmed'],
    subtitle: 'A love story, beginning forever',
    open: 'Open Invitation',
    date: '11 November 2026',
    kicker: 'Together with our families',
    message: 'Together with our families, we invite you to celebrate the beginning of our forever.',
    countdown: 'Counting down to our day',
    units: ['Days', 'Hours', 'Minutes', 'Seconds'],
    done: 'Today is the day — thank you for celebrating with us!',
    venueTitle: 'Venue', map: 'Open map',
    play: 'Play music', pause: 'Pause music', footer: 'With love, Adham & Nagham',
  },
  ar: {
    names: ['أدهم شعبان', 'نغم أحمد'],
    subtitle: 'حكاية حب تبدأ للأبد',
    open: 'افتح الدعوة',
    date: '١١ نوفمبر ٢٠٢٦',
    kicker: 'بكل الحب والسعادة',
    message: 'بكل الحب والسعادة، نتشرف بدعوتكم لمشاركتنا أجمل لحظات العمر وبداية حكاية جديدة.',
    countdown: 'العد التنازلي ليومنا',
    units: ['يوم', 'ساعة', 'دقيقة', 'ثانية'],
    done: 'اليوم هو يومنا — شكرًا لمشاركتكم فرحتنا!',
    venueTitle: 'المكان', map: 'افتح الخريطة',
    play: 'تشغيل الموسيقى', pause: 'إيقاف الموسيقى', footer: 'بكل الحب، أدهم ونغم',
  },
}

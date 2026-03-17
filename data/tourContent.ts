const TOUR_START_DATE = new Date("2026-05-10"); // Format: YYYY-MM-DD
const PRE_REG_DATE = new Date("2026-04-10"); // Format: YYYY-MM-DD

const addDays = (date: Date, days: number) => {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
};

const formatBengaliDate = (date: Date) => {
  const bnMonths = [
    "জানুয়ারি",
    "ফেব্রুয়ারি",
    "মার্চ",
    "এপ্রিল",
    "মে",
    "জুন",
    "জুলাই",
    "আগস্ট",
    "সেপ্টেম্বর",
    "অক্টোবর",
    "নভেম্বর",
    "ডিসেম্বর",
  ];
  const bnDigits = ["০", "১", "২", "৩", "৪", "৫", "৬", "৭", "৮", "৯"];
  const day = date
    .getDate()
    .toString()
    .split("")
    .map((d) => bnDigits[parseInt(d)])
    .join("");
  return `${day} ${bnMonths[date.getMonth()]}`;
};

const formatEnglishDate = (date: Date) => {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  return `${months[date.getMonth()]} ${date.getDate()}`;
};

const day1 = TOUR_START_DATE;
const day2 = addDays(TOUR_START_DATE, 1);
// const day3 = addDays(TOUR_START_DATE, 2);
const day4 = addDays(TOUR_START_DATE, 3);
const day5 = addDays(TOUR_START_DATE, 4);
const tourEndDate = day5;

export const content = {
  formLink: "/pre-registration",

  // English content
  en: {
    // Basic Info
    title: "Sundarban",
    subtitle: "A Quest for Nature's Eternal Mystery",
    eventTitle: "CSE Department Tour 2026",
    dept: "Department of Computer Science and Engineering",
    university: "Rangamati Science and Technology University",
    address: "Jhagrabil, Rangamati.",
    batch: "Ovvudoy 07 (7th Batch)",
    date: `${formatEnglishDate(day1)} – ${formatEnglishDate(tourEndDate)}, 2026`,
    duration: "4 Days Total",
    shipStay: "3 Days 2 Night on Ship",
    busTravel: "2 Days/Nights Bus Travel",

    // Places to Visit
    placesTitle: "Places to Visit",
    places: [
      {
        place: "Andermanik Eco-Tourism Center",
        href: "https://maps.app.goo.gl/5kz2MkNTBbZTZogU7",
      },
      {
        place: "Jamtola Watch Tower + Sea Beach",
        href: "https://maps.app.goo.gl/6cmLtM2mvQrCLEFu7",
      },
      {
        place: "Kotka Office Par",
        href: "https://maps.app.goo.gl/e2vjReUTEDGo1mKJ9",
      },
      {
        place: "Dimer Char + Pokkhir Char",
        href: "https://maps.app.goo.gl/7s2Dj4ad5DMWfPm59",
      },
      {
        place: "Kochikhali",
        href: "https://maps.app.goo.gl/butcSeGy88LXrxno8",
      },
      {
        place: "Koromjol Eco-Tourism Center",
        href: "https://maps.app.goo.gl/dGdgKhnwR4t1ho9S7",
      },
    ],
    placeNote:
      "Note: The exact locations may be subject to change based on weather conditions and other factors. We will keep you updated.",

    // Schedule
    scheduleTitle: "Tentative Schedule",
    schedule: [
      {
        date: `${formatEnglishDate(day1)} (Afternoon)`,
        desc: "Bus departs from Rangamati to Khulna",
      },
      {
        date: `${formatEnglishDate(day2)} (Morning)`,
        desc: "Board ship towards Sundarban",
      },
      {
        date: `${formatEnglishDate(day2)} – ${formatEnglishDate(day4)}`,
        desc: "Stay and explore Sundarban on ship",
      },
      {
        date: `${formatEnglishDate(day4)} (Afternoon/Evening)`,
        desc: "Ship tour ends",
      },
      {
        date: `${formatEnglishDate(day4)} (Evening/Night)`,
        desc: "Bus departs from Khulna to Rangamati",
      },
      {
        date: `${formatEnglishDate(day5)} (Morning/Noon)`,
        desc: "Arrive at Rangamati",
      },
    ],

    // Budget
    budgetTitle: "Budget",
    totalBudget: "Total Budget: ৳8,000 (per student)",
    preReg: "Pre-Registration Fee: Minimum ৳3,000 (per student)",
    charge:
      "For bKash transaction, ৳12.5 charge applicable per thousand. No charge for bank transfers.",
    remaining: "Remaining ৳5,000 can be paid on the bus on departure day.",
    nonRefundable: "Pre-registration fee is Non-Refundable.",
    deadline: `Pre-Registration Deadline: ${formatEnglishDate(PRE_REG_DATE)}, 2026`,

    // Payment Methods
    paymentTitle: "Payment Methods",
    bkash: {
      title: "bKash (Send Money)",
      account: "bkash No: 015-2171-2539",
      charge: "bKash charge: ৳12.5 (per thousand)",
      copy: "01521712539",
      holder: "Name: M. Aktaruzzaman Opu",
    },
    bank: {
      title: "Bank Transfer",
      name: "Trust Bank PLC, Rangamati",
      account: "Account: 00480466000580",
      charge: "Charge: Free",
      copy: "00480466000580",
      holder: "Name: M AKTARUZZAMAN OPU",
    },
    paymentNote:
      "After payment, submit proof (screenshot/receipt) via the Pre-Registration Google Form. Form submission is mandatory.",

    // Other Info
    preRegBtn: "Pre-Register Now",
    showFlyer: "View Flyer",
    closingNote:
      "We wish for the active participation and cooperation of students from all batches. Let's make this tour unforgettable together!",
    organizeTitle: "Organized by",
    organizer: "Organized by Ovvudoy – 7 (7th Batch)",
    langSwitch: "Bn",
  },

  // Bengali content
  bn: {
    // Basic Info
    title: "সুন্দরবন",
    subtitle: "প্রকৃতির এক অনন্য রহস্যের সন্ধানে",
    eventTitle: "সিএসই ডিপার্টমেন্ট ট্যুর ২০২৬",
    dept: "কম্পিউটার সায়েন্স ও ইঞ্জিনিয়ারিং বিভাগ",
    university: "রাঙ্গামাটি বিজ্ঞান ও প্রযুক্তি বিশ্ববিদ্যালয়",
    address: "ঝগড়াবিল, রাঙ্গামাটি।",
    batch: "অভ্যুদয় ০৭ (৭ম ব্যাচ)",
    date: `${formatBengaliDate(day1)} – ${formatBengaliDate(tourEndDate)} ২০২৬`,
    duration: "মোট সময়ঃ ৪ দিন",
    shipStay: "৩ দিন ২ রাত শিপে",
    busTravel: "২ দিন/রাত বাসে যাতায়াত",

    // Places to Visit
    placesTitle: "মূল আকর্ষণ ও ভ্রমণ স্থানসমূহ",
    places: [
      {
        place: "আন্দারমানিক ইকো-ট্যুরিজম সেন্টার",
        href: "https://maps.app.goo.gl/5kz2MkNTBbZTZogU7",
      },
      {
        place: "জামতলা ওয়াচ টাওয়ার + সী বিচ",
        href: "https://maps.app.goo.gl/6cmLtM2mvQrCLEFu7",
      },
      {
        place: "কটকা অফিস পাড়",
        href: "https://maps.app.goo.gl/e2vjReUTEDGo1mKJ9",
      },
      {
        place: "ডিমের চর + পক্ষীর চর",
        href: "https://maps.app.goo.gl/7s2Dj4ad5DMWfPm59",
      },
      {
        place: "কচিখালি",
        href: "https://maps.app.goo.gl/butcSeGy88LXrxno8",
      },
      {
        place: "করমজল ইকো-ট্যুরিজম সেন্টার",
        href: "https://maps.app.goo.gl/dGdgKhnwR4t1ho9S7",
      },
    ],
    placeNote:
      "বিঃদ্রঃ আবহাওয়া পরিস্থিতি এবং অন্যান্য কারণের উপর নির্ভর করে ভ্রমণ স্থানসমূহ পরিবর্তিত হতে পারে। কোনো পরিবর্তন হলে জানিয়ে দেয়া হবে।",

    // Schedule
    scheduleTitle: "সম্ভাব্য সময়সূচি",
    schedule: [
      {
        date: `${formatBengaliDate(day1)} (বিকাল)`,
        desc: "রাঙ্গামাটি থেকে খুলনা বাসে যাত্রা শুরু",
      },
      {
        date: `${formatBengaliDate(day2)} (সকাল)`,
        desc: "শিপে সুন্দরবনের উদ্দেশ্যে যাত্রা",
      },
      {
        date: `${formatBengaliDate(day2)} – ${formatBengaliDate(day4)}`,
        desc: "সুন্দরবনে শিপে অবস্থান ও ভ্রমণ",
      },
      {
        date: `${formatBengaliDate(day4)} (বিকাল/সন্ধ্যা)`,
        desc: "শিপের ভ্রমণ সমাপ্তি",
      },
      {
        date: `${formatBengaliDate(day4)} (সন্ধ্যা/রাত)`,
        desc: "খুলনা থেকে বাসে ফেরার যাত্রা",
      },
      {
        date: `${formatBengaliDate(day5)} (সকাল/দুপুর)`,
        desc: "রাঙ্গামাটি পৌঁছানো",
      },
    ],

    // Budget
    budgetTitle: "ট্যুর বাজেট",
    totalBudget: "মোট ট্যুর বাজেটঃ ৮,০০০ টাকা (প্রতি শিক্ষার্থী)",
    preReg: "প্রি-রেজিস্ট্রেশন ফিঃ সর্বনিম্ন ৩,০০০ টাকা (প্রতি শিক্ষার্থী)",
    charge:
      "বিকাশে জমা দেওয়ার ক্ষেত্রে প্রতি হাজারে ১২.৫০ টাকা বিকাশ চার্জ প্রযোজ্য। ব্যাংক ট্রান্সফারের ক্ষেত্রে কোনো চার্জ নেই।",
    remaining:
      "বাকি ৫,০০০ টাকা ট্যুরে যাওয়ার দিন বাসে ওঠার পর জমা দেওয়া যাবে।",
    nonRefundable: "প্রি-রেজিস্ট্রেশনের টাকা অফেরতযোগ্য (Non-Refundable)।",
    deadline: `প্রি-রেজিস্ট্রেশনের শেষ সময়ঃ ${formatBengaliDate(PRE_REG_DATE)}, ২০২৬`,

    // Payment Methods
    paymentTitle: "টাকা জমা দেওয়ার নিয়ম",
    bkash: {
      title: "bKash (Send Money)",
      account: "বিকাশ নম্বরঃ 015-2171-2539",
      charge: "বিকাশ চার্জঃ ১২.৫০ টাকা (প্রতি হাজারে)",
      copy: "01521712539",
      holder: "হিসাবধারীর নামঃ M. Aktaruzzaman Opu",
    },
    bank: {
      title: "ব্যাংক ট্রান্সফার",
      name: "Trust Bank PLC, Rangamati",
      account: "হিসাব নম্বরঃ 00480466000580",
      charge: "চার্জঃ ফ্রি",
      copy: "00480466000580",
      holder: "হিসাবধারীর নামঃ M AKTARUZZAMAN OPU",
    },
    paymentNote:
      "টাকা জমা দেওয়ার পর প্রমাণসহ (স্ক্রিনশট/রসিদ) Pre-Registration এর নির্দিষ্ট Google Form টি পূরণ করা বাধ্যতামূলক!",

    // Other Info
    preRegBtn: "প্রি-রেজিস্ট্রেশন করুন",
    showFlyer: "ফ্লায়ার দেখুন",
    closingNote:
      "সকল ব্যাচের শিক্ষার্থীদের সক্রিয় অংশগ্রহণ ও সহযোগিতা কামনা করছি। চলুন সবাই মিলে এই ট্যুরকে স্মরণীয় করে তুলি।",
    organizeTitle: "আয়োজনে",
    organizer: "ধন্যবাদান্তে, অভ্যুদয় – ৭ (৭ম ব্যাচ)",
    langSwitch: "En",
  },
};

export const formContent = {
  // English form content
  en: {
    nidNote:
      "For travelling to the Sundarbans, NID is required for Bangladesh Forest Department's permission; students must also present a valid ID.",
  },

  // Bengali form content
  bn: {
    nidNote:
      "সুন্দরবনে ভ্রমণের ক্ষেত্রে বাংলাদেশ বন বিভাগের অনুমতি এর অনুমতি গ্রহণের জন্য এনআইডি তথ্য প্রদান আবশ্যক; শিক্ষার্থীদের জন্য স্টুডেন্ট আইডিও বাধ্যতামূলক।",
  },
};

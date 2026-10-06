export interface SocialMediaContentPackage {
  concept_id: string;
  concept_title_en: string;
  concept_title_fa: string;
  category: 'mva_test' | 'anxiety_relief' | 'tristate_laws' | 'teen_freedom' | 'parent_safety';
  target_audience: 'teenagers' | 'parents' | 'both';
  
  // Platform Native Scripts
  tiktok: {
    hook_en: string;
    hook_fa: string;
    on_screen_text_en: string[];
    on_screen_text_fa: string[];
    script_en: string;
    script_fa: string;
    sound_recommendation: string;
    visual_pacing: string;
    hashtags: string[];
  };

  instagram_reels: {
    hook_en: string;
    hook_fa: string;
    visual_aesthetic: string;
    script_en: string;
    script_fa: string;
    caption_en: string;
    caption_fa: string;
    call_to_action_en: string;
    call_to_action_fa: string;
    hashtags: string[];
  };

  youtube_shorts: {
    title_en: string;
    title_fa: string;
    retention_hook_en: string;
    retention_hook_fa: string;
    step_by_step_en: string[];
    step_by_step_fa: string[];
    script_en: string;
    script_fa: string;
    pinned_comment_en: string;
    pinned_comment_fa: string;
  };

  facebook: {
    headline_en: string;
    headline_fa: string;
    body_en: string;
    body_fa: string;
    local_trust_hook_en: string;
    local_trust_hook_fa: string;
    cta_en: string;
    cta_fa: string;
  };

  // AI Media Generation Prompts
  image_prompts: {
    midjourney_v6_en: string;
    midjourney_v6_fa: string;
    flux_pro_en: string;
    dalle3_en: string;
    composition_details_en: string;
    composition_details_fa: string;
    recommended_aspect_ratio: string;
  };

  video_prompts: {
    runway_gen3_en: string;
    runway_gen3_fa: string;
    sora_kling_en: string;
    camera_movement_en: string;
    camera_movement_fa: string;
    sound_fx_en: string;
    sound_fx_fa: string;
    motion_intensity: string;
  };

  // Educational MVA & Law Context
  mva_law_notes: {
    applicable_states: string[];
    md_specific_rule: string;
    md_specific_rule_fa: string;
    tristate_comparison: string;
    tristate_comparison_fa: string;
    mva_test_pass_tip: string;
    mva_test_pass_tip_fa: string;
    psychological_calm_tip: string;
    psychological_calm_tip_fa: string;
  };
}

export const BRAND_INFO = {
  name: "Sam's Driving School",
  website: "samdrivingschool.org",
  address: "751 Rockville Pike, Rockville, MD 20852",
  phone: "(301) 279-0000",
  awards: "Voted 'Best of 2025' in Rockville, MD",
  founder: "Sam (B.S. in Psychology, Certified MVA Master Driving Instructor)",
  coreDifferentiator: "Driving anxiety relief, psychological calming techniques for nervous drivers, zero-yelling environment, dual-brake dual-control vehicles",
  languages: ["English", "Spanish", "Farsi (Persian)"],
  metro: "Free pickup and drop-off from Rockville Metro Station (Red Line)",
  services: [
    {
      title: "36-Hour Drivers Ed Program",
      title_fa: "دوره جامع ۳۶ ساعته آموزش رانندگی",
      details: "30-hour interactive Zoom classes (10-day PM course) + 6 hours Behind-the-Wheel (BTW)",
      details_fa: "۳۰ ساعت کلاس آنلاین تعاملی در زوم (دوره عصرانه ۱۰ روزه) + ۶ ساعت آموزش عملی پشت فرمان",
      price_discounted: "$378",
      price_regular: "$420",
    },
    {
      title: "Behind-the-Wheel (BTW) Lessons",
      title_fa: "جلسات عملی رانندگی در خیابان (BTW)",
      details: "Private 1-on-1 sessions from 2 to 60 hours in dual-brake certified cars",
      details_fa: "آموزش خصوصی انفرادی از ۲ تا ۶۰ ساعت با خودروهای مدرن مجهز به ترمز کمکی مربی",
      price_discounted: "$120",
      price_regular: "$130",
      per: "per 2-hour session",
      per_fa: "برای هر جلسه ۲ ساعته",
    },
    {
      title: "MVA Road Test Car Rental & Warm-up",
      title_fa: "اجاره خودرو برای امتحان شهر MVA به همراه ۴۵ دقیقه تمرین قبل از آزمون",
      details: "MVA-approved certified car + 45-min pre-test confidence coaching & parking maneuvers warm-up",
      details_fa: "خودروی تایید شده MVA به همراه ۴۵ دقیقه مرور فنی، پارک دوبل/دو نقطه‌ای و آرام‌سازی اضطراب قبل از تست",
      price_discounted: "$140",
      price_regular: "$170",
    },
    {
      title: "3-Hour Alcohol & Drug Education Program",
      title_fa: "دوره ۳ ساعته آموزش الکل و مواد مخدر (مخصوص دارندگان گواهینامه خارجی)",
      details: "Mandatory Maryland MVA requirement for out-of-country & out-of-state license transfers",
      details_fa: "الزام رسمی اداره MVA مریلند برای دارندگان گواهینامه بین‌المللی و تبدیل به مریلند",
      price_discounted: "$90",
      price_regular: "$100",
    }
  ],
  localHighSchools: [
    "Richard Montgomery High School (RMHS)",
    "Thomas S. Wootton High School",
    "Rockville High School",
    "Walter Johnson High School",
    "Winston Churchill High School"
  ]
};

export const TRISTATE_LAWS_DATA = [
  {
    id: "gls_age",
    category: "Graduated Licensing System (GLS) & Age Requirements",
    category_fa: "سیستم گواهینامه مرحله‌ای و حداقل سن",
    maryland: {
      permit_age: "15 years, 9 months",
      provisional_age: "16 years, 6 months (must hold permit 9 months claim-free)",
      full_license: "18 years old",
      practice_hours: "60 hours total (at least 10 hours at night)",
      curfew: "12:00 AM (Midnight) – 5:00 AM for provisional drivers",
      passengers: "No non-family passengers under 18 for first 151 days without supervising 21+ adult"
    },
    virginia: {
      permit_age: "15 years, 6 months",
      provisional_age: "16 years, 3 months",
      full_license: "18 years old",
      practice_hours: "45 hours total (at least 15 hours at night)",
      curfew: "12:00 AM (Midnight) – 4:00 AM for drivers under 18",
      passengers: "Only 1 non-family passenger under 21 for the first year"
    },
    dc: {
      permit_age: "16 years old (GRAD Program)",
      provisional_age: "16 years, 6 months (must hold permit 6 months)",
      full_license: "18 years old (with 12-month provisional)",
      practice_hours: "40 hours total (at least 10 hours at night)",
      curfew: "11:00 PM – 6:00 AM (Sept-June Sun-Thu); 12:01 AM – 6:00 AM (Fri-Sat)",
      passengers: "Only 1 passenger under 21 allowed during provisional stage"
    },
    uniform_rule: "All 3 jurisdictions require 0.00% BAC (Zero Tolerance under 21), cell-phone hands-free laws, and mandatory supervised log books.",
    uniform_rule_fa: "هر سه حوزه دارای قانون عدم تحمل مصرف الکل (زیر ۲۱ سال)، ممنوعیت کامل استفاده از موبایل برای نوجوانان و الزام دفترچه ثبت ساعات تمرین هستند.",
    mva_gotcha: "In Maryland, provisional license holders must keep a completely clean, violation-free driving record. A moving violation can delay your progress toward a Full License — always confirm the current consequences with the MVA, since this can change.",
    mva_gotcha_fa: "نکته مهم مریلند: راننده مشروط باید سابقه رانندگی کاملاً پاک و بدون تخلف داشته باشد. تخلف حرکتی می‌تواند روند دریافت گواهینامه کامل را به تاخیر بیندازد — جزئیات دقیق را حتماً از MVA تایید کنید چون ممکن است تغییر کرده باشد."
  },
  {
    id: "move_over",
    category: "Move Over Law (حفظ فاصله با خودروهای متوقف)",
    category_fa: "قانون تغییر خط برای خودروهای متوقف و امدادی",
    maryland: {
      rule: "Must vacate the closest lane or slow to a reasonable speed for stopped emergency/law-enforcement vehicles (police, fire/rescue, ambulance, utility-emergency) displaying active emergency lights. Confirm with current MVA materials whether coverage has since been expanded to other stationary vehicles.",
      penalty: "$80 fine + 1 point; $120 if it contributes to a crash (per the MVA curriculum guide)."
    },
    virginia: {
      rule: "Must move over one lane or reduce speed below limit for emergency vehicles and any stationary vehicle displaying flashing red, blue, amber, or hazard lights.",
      penalty: "Class 1 misdemeanor for reckless driving in severe failure."
    },
    dc: {
      rule: "Must yield right of way and slow significantly or change lanes when approaching emergency vehicles with active flashing emergency lights.",
      penalty: "$100 fine and moving points."
    },
    uniform_rule: "Never speed past emergency lights or hazard flashers in the adjacent lane. Always scan mirrors, signal early, and shift one lane to the left safely.",
    uniform_rule_fa: "هیچ‌گاه با سرعت از کنار چراغ‌های چشمک‌زن یا فلاشر عبور نکنید. زودتر راهنما بزنید و یک لاین فاصله بگیرید یا سرعت را به شدت کاهش دهید.",
    mva_gotcha: "During the MVA test, failing to safely give room to a stopped emergency/law-enforcement vehicle counts as an unsafe lane maneuver!",
    mva_gotcha_fa: "در آزمون عملی MVA، عدم رعایت فاصله ایمن با خودروی امدادی یا پلیس متوقف‌شده می‌تواند نمره منفی ایجاد کند!"
  },
  {
    id: "right_turn_red",
    category: "Right Turn on Red & DC Traffic Cameras",
    category_fa: "گردش به راست در چراغ قرمز و دوربین‌های ترافیکی DC",
    maryland: {
      rule: "Right turn on red is permitted AFTER A COMPLETE 3-SECOND STOP behind the stop bar, yielding to all oncoming traffic, pedestrians, and cyclists, UNLESS a 'NO TURN ON RED' sign is posted.",
      penalty: "Red light photo camera ticket is $75 civil penalty."
    },
    virginia: {
      rule: "Right turn on red is permitted after a complete stop unless restricted by signs. Left turn on red permitted only from one-way street onto another one-way street.",
      penalty: "$50 camera fine."
    },
    dc: {
      rule: "MAJOR RECENT CHANGE: DC passed universal 'No Turn on Red' at signalized intersections with very limited exceptions. Always look for signage and assume no turn on red in DC city limits!",
      penalty: "$150 photo camera fine."
    },
    uniform_rule: "Rolling stops on right turn on red are the #1 cause of automatic failures in road tests across MD, VA, and DC.",
    uniform_rule_fa: "توقف ناقص (رولینگ استاپ) هنگام گردش به راست در چراغ قرمز، عامل شماره یک ردی فوری در آزمون شهر است.",
    mva_gotcha: "At the Gaithersburg or White Oak MVA test: You MUST stop completely behind the thick white line first. Count 1-2-3, THEN creep forward past the crosswalk to view oncoming traffic.",
    mva_gotcha_fa: "در آزمون شهر مریلند: ابتدا باید پشت خط سفید کامل بایستید، ۳ ثانیه بشمارید، سپس با احتیاط به جلو بخزید تا دید کافی پیدا کنید."
  },
  {
    id: "school_buses",
    category: "School Bus Stop Laws (قوانین اتوبوس مدرسه)",
    category_fa: "قوانین توقف پشت اتوبوس مدرسه",
    maryland: {
      rule: "Must stop at least 20 feet away when red flashing lights and stop arm are deployed. If road has a PHYSICAL barrier (grass median, concrete wall), only traffic following bus stops. If road is undivided or has a paved center turn lane, BOTH directions must stop!",
      penalty: "Up to $570 fine and 3 points (police citation) or $250 bus camera ticket."
    },
    virginia: {
      rule: "Both directions must stop unless separated by a physical median. Center turn lane does NOT count as a physical barrier.",
      penalty: "Reckless driving ticket, up to $2,500 fine and 6 points."
    },
    dc: {
      rule: "Both directions must stop on undivided roadways. Physical median exempts oncoming traffic.",
      penalty: "$500 fine."
    },
    uniform_rule: "Never pass a stopped school bus with flashing red lights and extended stop sign arm. Yellow flashing lights indicate prepare to stop.",
    uniform_rule_fa: "عبور از اتوبوس مدرسه‌ای که چراغ قرمز چشمک‌زن و تابلوی ایست باز دارد ممنوع و تخلف بسیار سنگین است.",
    mva_gotcha: "If a school bus activates yellow lights during your road test, do not accelerate to beat it. Gently apply brakes and prepare to stop.",
    mva_gotcha_fa: "اگر اتوبوس مدرسه در حین آزمون چراغ زرد زد، به هیچ وجه گاز ندهید؛ به آرامی ترمز کنید و بایستید."
  },
  {
    id: "parking_backing",
    category: "MVA Closed-Course Maneuvers vs Neighboring Tests",
    category_fa: "مانورهای محوطه بسته MVA در مقایسه با ایالت‌های همجوار",
    maryland: {
      course_type: "Closed course maneuver testing at MVA branch (e.g. White Oak, Gaithersburg, Glen Burnie) before road section.",
      maneuvers: "1) Straight-line backing for 50 feet along a curb without touching or drifting >12 inches away. 2) Two-point reverse turn / 90-degree stall parking. 3) Three-point turn. 4) Pre-trip safety check.",
      curb_rule: "Hitting or bumping a curb or safety cone is an INSTANT AUTOMATIC FAILURE."
    },
    virginia: {
      course_type: "Road test typically administered by public school behind-the-wheel instructor or DMV road route.",
      maneuvers: "Parallel parking, backing, lane changes, hill stops."
    },
    dc: {
      course_type: "Public street road test administered from Brentwood DMV.",
      maneuvers: "Parallel parking on actual DC street, three-point turn, stop signs, traffic circles."
    },
    uniform_rule: "Over-the-shoulder blind spot checks and looking completely out the rear window while backing (not relying solely on backup cameras).",
    uniform_rule_fa: "نگاه فیزیکی از روی شانه به نقطه کور و چرخاندن سر به سمت شیشه عقب هنگام دنده عقب (تنها تکیه نکردن به دوربین دنده عقب) الزامی است.",
    mva_gotcha: "In MD MVA, turning on your backup camera is allowed ONLY as a secondary reference. If you stare at the screen instead of looking over your right shoulder, you will be penalized!",
    mva_gotcha_fa: "در آزمون مریلند، نگاه کردن صرف به نمایشگر دوربین دنده عقب بدون چرخاندن سر و نگاه به شیشه عقب تخلف محسوب می‌شود!"
  }
];

export const MVA_TEST_CHECKLIST = [
  {
    id: "pre_trip",
    title: "1. MVA Pre-Trip Vehicle Inspection (بررسی اولیه خودرو)",
    title_fa: "بررسی اولیه خودرو قبل از شروع آزمون MVA",
    desc: "Examiner stands outside and asks you to test: Left & Right Turn Signals (front and rear), Hazard Flashers, Headlights & High Beams, Foot Brake lights, Emergency/Parking Brake, Horn, and Windshield Wipers.",
    desc_fa: "ممتحن بیرون می‌ایستد و چک می‌کند: راهنمای چپ و راست، فلاشر، چراغ‌ها و نور بالا، چراغ ترمز، ترمز دستی، بوق و برف‌پاک‌کن.",
    psychology_tip: "Before turning the key, perform Sam's 'Grounding Breath' (deep inhale 4s, exhale 6s). Smile, confirm your seatbelt is securely buckled before engine ignition.",
    psychology_tip_fa: "قبل از استارت، تنفس عمیق ۴ ثانیه دم و ۶ ثانیه بازدم را انجام دهید و از بسته بودن کمربند اطمینان حاصل کنید."
  },
  {
    id: "straight_backing",
    title: "2. 50-Foot Straight-Line Backing (دنده عقب مستقیم ۵۰ فوت)",
    title_fa: "دنده عقب مستقیم به طول ۵۰ فوت در امتداد جدول",
    desc: "Back up smoothly 50 feet parallel to the curb. Stay between 6 to 12 inches from the curb without scraping tires or touching cones.",
    desc_fa: "۵۰ فوت در راستای جدول به عقب بروید. فاصله باید بین ۱۵ تا ۳۰ سانتی‌متر باشد بدون برخورد چرخ به جدول.",
    psychology_tip: "Place right arm across the passenger headrest. Turn torso 45 degrees. Feather the brake pedal gently; let vehicle idle backward without pressing accelerator.",
    psychology_tip_fa: "دست راست روی پشتی صندلی شاگرد، نیم‌تنه به عقب چرخیده، بدون فشار روی گاز فقط با کنترل نرم ترمز حرکت کنید."
  },
  {
    id: "two_point_turn",
    title: "3. Reverse Two-Point Turn / Stall Parking (پارک دو نقطه‌ای دنده عقب)",
    title_fa: "پارک عمودی دنده عقب در باکس مشخص شده",
    desc: "Drive past the marked parking space, stop, signal, and reverse smoothly into the stall centered between lines or cones.",
    desc_fa: "از روبروی جای پارک عبور کنید، راهنما بزنید و با دنده عقب خودرو را دقیقا بین خطوط یا مخروط‌ها مستقر کنید.",
    psychology_tip: "Sam's Psychology Anchor: Pivot point at the rear passenger wheel. Stop completely if you need to turn the wheel lock-to-lock. Pausing is NOT penalized; rushing and hitting a cone is!",
    psychology_tip_fa: "توقف کامل برای چرخش فرمان مجاز است و نمره منفی ندارد؛ عجله کردن و برخورد با مخروط باعث ردی فوری است."
  },
  {
    id: "three_second_stop",
    title: "4. The 3-Second 'Feel The Stop' Rule (قانون توقف کامل ۳ ثانیه)",
    title_fa: "قانون توقف کامل ۳ ثانیه‌ای پشت خط ایست",
    desc: "Complete cessation of inertia. The car's weight must settle backward. Look Left, Look Right, Look Left again before creeping forward.",
    desc_fa: "توقف کامل مکانیکی طوری که سنگینی ماشین به عقب برگردد. چک چپ، راست و مجدد چپ قبل از حرکت.",
    psychology_tip: "Say out loud: 'Stop line secured, pedestrian scan clear, moving with confidence.' Vocalizing prevents anxiety freeze.",
    psychology_tip_fa: "بلند بگویید: «خط ایست رعایت شد، عابر پیاده نبود، حرکت ایمن». بیان کلامی مانع از قفل شدن ذهن در اثر استرس می‌شود."
  },
  {
    id: "automatic_fails",
    title: "5. MVA Instant Disqualifications (خطاهای ردی فوری آزمون)",
    title_fa: "مواردی که در همان لحظه باعث رد شدن فوری در MVA می‌شوند",
    desc: "1) Striking a curb, cone, or object. 2) Moving without seatbelt. 3) Running or rolling a stop sign or red light. 4) Speeding. 5) Failure to yield. 6) Examiner having to verbally or physically intervene.",
    desc_fa: "۱) برخورد لاستیک به جدول یا مخروط. ۲) حرکت بدون کمربند. ۳) رد کردن یا توقف ناقص تابلوی ایست. ۴) سرعت غیرمجاز. ۵) عدم رعایت حق تقدم. ۶) مداخله کلامی یا فیزیکی ممتحن.",
    psychology_tip: "Remember Sam's Driving School dual-control vehicles give you the muscle memory so you never panic. At Sam's, instructors never yell!",
    psychology_tip_fa: "خودروهای دو پداله و آموزش روان‌شناختی سام باعث می‌شود این رفتارها به صورت ناخودآگاه در شما نهادینه شود."
  }
];

export const CURATED_CONCEPTS: SocialMediaContentPackage[] = [
  {
    concept_id: "mva_3sec_stop_rule",
    concept_title_en: "The #1 Reason 68% of Maryland Teens Fail the MVA Test: The Rolling Stop",
    concept_title_fa: "دلیل شماره یک رد شدن ۶۸٪ نوجوانان در امتحان MVA مریلند: استاپ ناقص!",
    category: "mva_test",
    target_audience: "teenagers",
    tiktok: {
      hook_en: "POV: You thought you stopped at the Rockville MVA, but the examiner just closed their iPad... 💀",
      hook_fa: "وقتی فکر کردی پشت تابلوی ایست وایسادی ولی ممتحن MVA آیپدش رو بست و گفت رد شدی! 💀",
      on_screen_text_en: [
        "Why 68% of teens fail their MVA test in Montgomery County",
        "The 'Rolling Stop' trap",
        "How to do the 3-Second Physics Stop"
      ],
      on_screen_text_fa: [
        "چرا ۶۸٪ بچه‌ها در آزمون شهر مریلند رد میشن؟",
        "تله استاپ ناقص (Rolling Stop)",
        "تکنیک توقف ۳ ثانیه‌ای با احساس تکانه معکوس"
      ],
      script_en: "Listen up Rockville and Gaithersburg drivers! The MVA examiner isn't just looking at the stop sign; they are feeling the car's suspension. If your bumper doesn't settle completely backward, that is classified as a 'rolling stop'—an instant automatic failure. Here is Sam's Psychology Hack: stop behind the white line, say out loud 'One Mississippi, Two Mississippi, Three Mississippi', look Left, Right, Left, and only then creep forward for visibility. Save this before your test day!",
      script_fa: "بچه‌های راکویل و گیترزبرگ گوش کنید! ممتحن MVA فقط به تابلوی Stop نگاه نمیکنه، اونا حس تعلیق ماشین رو می‌سنجند. اگه عقب ماشین بعد از ترمز تکان برگشتی نخوره، رولینگ استاپ محسوب میشه و همون لحظه تست تمومه! فرمول آموزشگاه سام: پشت خط سفید کامل بایستید، با صدای بلند بشمارید یک، دو، سه؛ نگاه چپ، راست، چپ و بعد با آرامش حرکت کنید. حتما ذخیره‌ش کنید!",
      sound_recommendation: "Subtle heart-beat sound transition to relaxing lo-fi driving beat",
      visual_pacing: "Fast jump cuts: Examiner hand holding clipboard -> Student eyes widening -> Slow-motion zoom on car tires reaching 0 mph behind line.",
      hashtags: ["#MDDrivingTest", "#RockvilleMVA", "#GaithersburgMVA", "#SamsDrivingSchool", "#DriversEd", "#TeenDriverMD"]
    },
    instagram_reels: {
      hook_en: "Stop anxiety from ruining your Maryland Driver's License test on Rockville Pike.",
      hook_fa: "اجازه ندهید اضطراب، امتحان گواهینامه رانندگی شما را در مریلند خراب کند.",
      visual_aesthetic: "Crisp, aesthetic interior cockpit shot of dual-brake vehicle on Rockville Pike with gentle morning sunlight.",
      script_en: "Driving test anxiety is real, especially when you are afraid of failing in front of your peers or parents. At Sam's Driving School, our founder Sam uses her psychology background to teach you the 'Physiological Sigh' at red lights and stop signs. Double inhale through the nose, long exhale. When your heart rate drops, your peripheral vision expands by 40%, helping you spot pedestrians and stop signs effortlessly.",
      script_fa: "استرس آزمون شهر کاملا طبیعیه، مخصوصا ترسی که از رد شدن جلوی خانواده یا دوستان داریم. در آموزشگاه رانندگی سام، با تکنیک‌های روان‌شناسی کنترل استرس مثل «تکنیک تنفس فیزیولوژیک» یاد می‌گیرید چطور تپش قلب رو در چند ثانیه پایین بیارید تا دید محیطی شما ۴۰٪ بازتر بشه و تمام تابلوها رو بدون استرس ببینید.",
      caption_en: "Did you know that rolling through a stop sign is an instant fail in Maryland? 🛑 Here's how to master the 3-second stop rule with zero test-day jitters. 🚗✨ Call 301-279-0000 or visit samdrivingschool.org to practice in our dual-brake cars!",
      caption_fa: "آیا می‌دانستید توقف ناقص پشت تابلوی استاپ باعث ردی فوری در آزمون مریلند است؟ 🛑 با تکنیک ۳ ثانیه‌ای و روش‌های علمی غلبه بر استرس با رانندگی بدون داد و فریاد مربیان مجرب سام همراه شوید. 🚗✨ برای رزرو جلسات با ما در تماس باشید.",
      call_to_action_en: "Save this reel for your test day checklist & share with a student at RMHS or Wootton!",
      call_to_action_fa: "این ریلز را برای روز امتحانتان ذخیره کنید و برای دوستانتان بفرستید!",
      hashtags: ["#RockvilleMD", "#MarylandDrivingSchool", "#DriversLicense", "#DrivingAnxiety", "#MVARoadTest"]
    },
    youtube_shorts: {
      title_en: "How to PASS the Maryland MVA Stop Sign Test (Examiner Secret)",
      title_fa: "راز قبولی در تابلوی استاپ امتحان شهر مریلند (ترفند ممتحن MVA)",
      retention_hook_en: "If you do this ONE mistake at the Gaithersburg MVA, your test ends in 30 seconds.",
      retention_hook_fa: "اگر این یک اشتباه کوچک را در MVA انجام دهید، امتحانتان در همان ۳۰ ثانیه اول رد می‌شود!",
      step_by_step_en: [
        "1. Stop fully behind the solid white stop line (not past it).",
        "2. Feel the vehicle weight shift backward (zero mph).",
        "3. Count 3 full seconds while performing head-turn scans (Left, Right, Left).",
        "4. Creep forward gently only if sightlines are blocked by hedges or parked cars."
      ],
      step_by_step_fa: [
        "۱. توقف کامل پشت خط ممتد سفید (نه جلوتر از آن).",
        "۲. احساس برگشت وزن خودرو به عقب (سرعت دقیقا صفر).",
        "۳. شمردن ۳ ثانیه کامل همزمان با چرخش سر به چپ، راست و چپ.",
        "۴. خزیدن آرام به جلو در صورت وجود مانع دید مانند درخت یا ماشین پارک شده."
      ],
      script_en: "Most driving schools teach you to brake, but they don't teach you that Maryland MVA examiners listen for the brake pad silence. Stop behind the line, 3 full seconds, look over both shoulders. Practice with certified female and multilingual instructors at Sam's Driving School Rockville!",
      script_fa: "خیلی از آموزشگاه‌ها فقط ترمز گرفتن رو میگن، اما نمی‌گن ممتحن منتظر شنیدن ایست کامل موتور و سیستم تعلیقه. در آموزشگاه سام در راکویل مریلند، پشت فرمان ماشین‌های مجهز به ترمز دوگانه با آرامش کامل تمرین کنید!",
      pinned_comment_en: "Taking your test at Gaithersburg, White Oak, or Glen Burnie? Book our MVA Car Rental with 45-min warm-up at samdrivingschool.org!",
      pinned_comment_fa: "آزمون در گیترزبرگ، وایت اوک یا گلن برنی دارید؟ پکیج اجاره ماشین به همراه ۴۵ دقیقه تمرین قبل از آزمون را در samdrivingschool.org رزرو کنید!"
    },
    facebook: {
      headline_en: "Parents: The Hidden Trap That Causes Maryland Teens to Fail Their Road Test",
      headline_fa: "والدین محترم: تله پنهانی که باعث رد شدن نوجوانان در آزمون رانندگی مریلند می‌شود",
      body_en: "As parents, we spend dozens of hours practicing with our teens, but Montgomery County MVA testing centers have strict, zero-tolerance technical rubrics. The #1 disqualifier is the 'rolling stop'—when a driver slows to 2 mph without a complete 3-second cessation of movement behind the white stop line. At Sam's Driving School on 751 Rockville Pike, our founder Sam holds a degree in Psychology and structures our 36-hour Drivers Ed and Behind-the-Wheel lessons around cognitive muscle memory and anxiety elimination. Our students practice in modern, dual-brake equipped vehicles in a supportive, zero-yelling atmosphere.",
      body_fa: "به عنوان والدین، ساعت‌ها با فرزندانمان تمرین می‌کنیم، اما ممتحنان MVA در مریلند قوانین بسیار سخت‌گیرانه‌ای دارند. بزرگترین دلیل ردی، توقف ناقص است. در آموزشگاه رانندگی سام واقع در ۷۵۱ Rockville Pike، موسس ما سام با داشتن مدرک تخصصی روان‌شناسی و خودروهای مجهز به سیستم ترمز دوبل، محیطی سرشار از آرامش و بدون داد و فریاد فراهم کرده تا فرزند شما با اعتماد به نفس در بار اول قبول شود.",
      local_trust_hook_en: "Conveniently located at 751 Rockville Pike with free pickup & drop-off from Rockville Metro Station. Voted Best of 2025 in Rockville, MD!",
      local_trust_hook_fa: "دارای سرویس رفت و آمد رایگان از ایستگاه مترو راکویل و منتخب برترین آموزشگاه سال ۲۰۲۵ در راکویل مریلند!",
      cta_en: "Enroll in our next 10-day interactive Zoom Drivers Ed or book Behind-the-Wheel packages at samdrivingschool.org or call (301) 279-0000.",
      cta_fa: "برای ثبت‌نام دوره جامع آنلاین ۳۶ ساعته یا جلسات عملی با تخفیف ویژه به samdrivingschool.org مراجعه کنید یا با شماره (301) 279-0000 تماس بگیرید."
    },
    image_prompts: {
      midjourney_v6_en: "High-end cinematic photography of a modern dual-brake training sedan stopped cleanly behind a crisp white road line at a suburban Maryland intersection, golden hour light illuminating the stop sign, autumn trees of Montgomery County in background, sharp focus, 35mm lens, f/1.8, editorial automotive aesthetic, photorealistic, no motion blur --ar 9:16 --v 6.1 --style raw",
      midjourney_v6_fa: "پرامپت میدجورنی: عکاسی سینمایی تبلیغاتی از خودروی آموزش رانندگی مجهز به ترمز کمکی، متوقف پشت خط سفید ممتد تابلوی ایست در خیابانی با برگ‌های پاییزی مریلند، نور خورشید عصرگاهی، لنز ۳۵ میلی‌متر، عمق میدان واقعی با نسبت تصویر ۹:۱۶ عمودی.",
      flux_pro_en: "hyper-realistic shot inside a dual-control driving school car on Rockville Pike MD, calm female instructor with warm smile observing teen driver holding steering wheel at 9 and 3 position, dashboard in crisp focus, Maryland scenery through windshield, natural soft lighting, photorealistic 8k",
      dalle3_en: "A clear view of a student driver stopped safely at a red stop sign in a suburban Maryland neighborhood, calm female instructor pointing at the clear intersection, dual-brake pedal clearly visible on the passenger side floor, modern vehicle, daylight, high quality photography.",
      composition_details_en: "Low angle cockpit perspective showcasing both driver hands on wheel, stop line visible through front windshield, and passenger-side dual brake pedal subtly visible.",
      composition_details_fa: "زاویه دید از داخل کابین که هم فرمان و دست‌های راننده را نشان می‌دهد و هم خط ایست و پدال ترمز کمکی مربی در کف خودرو.",
      recommended_aspect_ratio: "9:16 (Vertical Reels / TikTok)"
    },
    video_prompts: {
      runway_gen3_en: "Slow cinematic dolly in from behind the driver's head inside a modern driving school car. Front windshield shows Rockville Pike Maryland street approaching a red stop sign. The car glides to a silky smooth complete stop. Water droplets or crisp sunny flare. Instructor's hand gives a reassuring thumbs up. Camera stays smooth and steady.",
      runway_gen3_fa: "پرامپت ویدیویی Runway Gen-3: حرکت نرم دالی دوربین از پشت سر راننده به سمت شیشه جلو، نزدیک شدن به تابلوی ایست در راکویل مریلند، توقف کاملا نرم و استقرار وزن ماشین، لبخند و تایید مربی با دست در کادری بسیار حرفه‌ای و بدون لرزش.",
      sora_kling_en: "Cinematic drone tracking shot lowering down towards a white training sedan at Gaithersburg MVA closed test track, showing the car stopping perfectly 12 inches behind the stop bar, wheels fully locking to 0 mph, clear Montgomery County suburban landscape.",
      camera_movement_en: "Smooth dolly-in, slight upward pan to center the stop sign through the windshield",
      camera_movement_fa: "حرکت دالی به جلو با زاویه ملایم رو به بالا برای نشان دادن تابلوی استاپ از شیشه جلو",
      sound_fx_en: "Soft blinker tick-tick, quiet brake pad engagement, peaceful exhale sound effect",
      sound_fx_fa: "صدای تیک‌تیک آرام راهنما، صدای درگیر شدن ملایم لنت ترمز و صدای بازدم آرامش‌بخش",
      motion_intensity: "Subtle, smooth, premium cinematic 24fps"
    },
    mva_law_notes: {
      applicable_states: ["Maryland", "Virginia", "Washington D.C."],
      md_specific_rule: "Maryland Transportation Article § 21-707: Drivers must stop at the stop line before entering the crosswalk or intersection. Full cessation of movement is required.",
      md_specific_rule_fa: "قانون حمل و نقل مریلند ماده ۲۱-۷۰۷: راننده موظف است قبل از خط ایست و ورود به گذرگاه عابر پیاده توقف کامل نماید.",
      tristate_comparison: "While Maryland and Virginia permit Right Turn on Red after a complete stop (unless signed otherwise), Washington D.C. has enacted a default ban on right turns on red at signalized intersections.",
      tristate_comparison_fa: "در حالی که در مریلند و ویرجینیا پس از توقف کامل ۳ ثانیه‌ای گردش به راست در چراغ قرمز مجاز است (مگر تابلو منع کرده باشد)، در شهر واشنگتن دی‌سی طبق قوانین جدید گردش به راست در چراغ قرمز به صورت پیش‌فرض ممنوع است.",
      mva_test_pass_tip: "At the White Oak or Gaithersburg MVA, do not just stop; hold your foot firmly on the brake pedal for 3 seconds while visibly rotating your head left, right, and left again.",
      mva_test_pass_tip_fa: "در شعبه آزمون MVA گیترزبرگ یا وایت اوک، پایتان را ۳ ثانیه کامل روی ترمز نگه دارید و سرتان را به صورت واضح به چپ، راست و مجدد چپ بچرخانید.",
      psychological_calm_tip: "Sam's Psychology Tip: Anchor your hands at 9 and 3 o'clock. Gently flex and release your fingers to prevent white-knuckle grip anxiety.",
      psychological_calm_tip_fa: "نکته روان‌شناسی سام: انگشتان دست را روی فرمان به آرامی باز و بسته کنید تا از انقباض عضلانی ناشی از استرس جلوگیری شود."
    }
  },
  {
    concept_id: "mva_straight_backing_curb",
    concept_title_en: "Mastering the 50-Foot MVA Straight-Line Backing Test Without Touching the Curb",
    concept_title_fa: "تسلط بر دنده عقب ۵۰ فوت در آزمون MVA مریلند بدون برخورد با جدول",
    category: "mva_test",
    target_audience: "both",
    tiktok: {
      hook_en: "If your tire touches this curb at the Gaithersburg MVA, you fail instantly. Here's the cheat code:",
      hook_fa: "اگه لاستیک ماشین حتی یک میلی‌متر به این جدول بخوره بلافاصله رد میشی! اینم فرمول مخفی:",
      on_screen_text_en: [
        "MVA 50-Foot Backing Test",
        "The 12-inch curb rule",
        "Where to look (Backup camera trap!)"
      ],
      on_screen_text_fa: [
        "تست ۵۰ فوت دنده عقب MVA",
        "قانون فاصله ۳۰ سانتی‌متری از جدول",
        "تله نگاه کردن به دوربین دنده عقب!"
      ],
      script_en: "At the Maryland MVA, you must back up straight for 50 feet between 6 and 12 inches from the curb. Rookie mistake: staring solely at the backup camera screen. MVA examiners can disqualify you if your head isn't physically turned over your right shoulder! Put your right arm over the passenger seat, look through the rear glass, feather your brake, and use tiny quarter-turn steering adjustments. Follow Sam's Driving School for more Rockville MVA test secrets!",
      script_fa: "در آزمون شهر مریلند، باید ۵۰ فوت دنده عقب مستقیم برید و فاصله‌تون بین ۱۵ تا ۳۰ سانت از جدول بمونه. بزرگترین اشتباه بچه‌ها: فقط به مانیتور دوربین دنده عقب زل زدن! ممتحن حتما باید ببینه نیم‌تنه‌تون چرخیده و از شیشه عقب نگاه می‌کنید. دست راست روی صندلی شاگرد، کنترل نرم با پدال ترمز و فرمان بسیار ریز. برای نکات بیشتر آموزشگاه سام در راکویل رو فالو کنید!",
      sound_recommendation: "Suspenseful ticking sound resolving into a satisfying success chime",
      visual_pacing: "Split-screen: Top showing student looking over shoulder, Bottom showing rear tire gliding 8 inches parallel to the yellow-painted MVA curb.",
      hashtags: ["#MVATestPrep", "#MarylandDriver", "#RockvilleMD", "#MontgomeryCounty", "#DrivingSchool"]
    },
    instagram_reels: {
      hook_en: "The exact reference point Maryland MVA examiners look for during straight-line backing.",
      hook_fa: "نقطه دید دقیقی که ممتحنان MVA مریلند در دنده عقب مستقیم چک می‌کنند.",
      visual_aesthetic: "Over-the-shoulder golden hour shot inside a clean training vehicle, showing perfect mirror alignment and rear window sightline.",
      script_en: "Why do so many students panic in reverse? Because steering feels inverted and your brain over-corrects. At Sam's Driving School, we teach the 'micro-nudge' technique. Instead of spinning the wheel, you adjust by just two inches. When you look back through the rear window, line up the middle of the back windshield with the curb edge. It locks your car in a straight line every single time.",
      script_fa: "چرا خیلی‌ها موقع دنده عقب هول میشن؟ چون چرخش فرمان برعکس حس میشه و راننده زیادی فرمان میده. در آموزشگاه رانندگی سام، تکنیک «حرکات میلی‌متری» رو یاد می‌گیرید. وسط شیشه عقب رو با لبه جدول میزان می‌کنید؛ ماشین دقیقا مثل خط کش مستقیم میره عقب بدون کوچکترین انحراف.",
      caption_en: "Scared of the 50-foot backing maneuver on the MVA closed course? 🚘 You aren't alone. In our dual-control cars, our certified instructors guide you patiently until it becomes second nature. Visit samdrivingschool.org to book your BTW lessons!",
      caption_fa: "از تست دنده عقب ۵۰ فوت MVA مریلند می‌ترسید؟ در خودروهای دو پداله آموزشگاه سام با مربیان خانم و مسلط به فارسی بدون هیچ استرسی تمرین کنید. رزرو در samdrivingschool.org",
      call_to_action_en: "Tap the link in bio to book our MVA Road Test Car Rental with a 45-min pre-test warm-up!",
      call_to_action_fa: "برای رزرو خودروی آزمون و تمرین ۴۵ دقیقه‌ای قبل تست، به لینک بیو مراجعه کنید!",
      hashtags: ["#RockvilleDrivingSchool", "#MarylandDMV", "#BehindTheWheel", "#CalmDriving"]
    },
    youtube_shorts: {
      title_en: "Pass Maryland MVA Straight Line Backing in 4 Steps (No Curb Hits)",
      title_fa: "قبولی در دنده عقب مستقیم آزمون MVA مریلند در ۴ مرحله ساده",
      retention_hook_en: "Examiners will FAIL you if you only look at your screen. Do this instead:",
      retention_hook_fa: "اگه فقط به مانیتور نگاه کنید ممتحن ردتون میکنه! این روش رو اجرا کنید:",
      step_by_step_en: [
        "1. Shift into Reverse with foot firmly on the brake pedal.",
        "2. Place right hand on passenger seat back; turn body 45 degrees.",
        "3. Glances: 80% out the rear window, 10% side mirror, 10% front scan.",
        "4. Release brake gently; do not press gas pedal; keep speed under 3 mph."
      ],
      step_by_step_fa: [
        "۱. در حالی که پا روی ترمز است دنده را در حالت R قرار دهید.",
        "۲. دست راست روی صندلی شاگرد و بدن ۴۵ درجه به عقب متمایل.",
        "۳. تقسیم نگاه: ۸۰٪ از شیشه عقب، ۱۰٪ آینه بغل، ۱۰٪ کنترل جلوی ماشین.",
        "۴. ترمز را به آرامی رها کنید، گاز ندهید؛ سرعت زیر ۳ مایل در ساعت."
      ],
      script_en: "Remember: hitting the curb is an instant failure. Drifting more than 12 inches away loses points. Keep your wheel centered and make tiny corrections. Sam's Driving School in Rockville offers specialized MVA mock test prep!",
      script_fa: "یادتون باشه برخورد با جدول یعنی ردی درجا! فاصله بیش از ۳۰ سانت هم کسر نمره داره. فرمان رو صاف نگه دارید و فقط تغییرات بسیار جزیی بدید. آموزشگاه رانندگی سام در راکویل متخصص آماده‌سازی آزمون MVA!",
      pinned_comment_en: "Need practice at Rockville or Gaithersburg MVA? Call Sam's Driving School at (301) 279-0000 or visit samdrivingschool.org.",
      pinned_comment_fa: "نیاز به تمرین در محوطه آزمون راکویل یا گیترزبرگ دارید؟ با آموزشگاه سام تماس بگیرید: 301-279-0000"
    },
    facebook: {
      headline_en: "Why Nervous Drivers Excel at Sam's Driving School in Rockville, MD",
      headline_fa: "چرا افراد مضطرب در آموزشگاه رانندگی سام در راکویل بهترین نتیجه را می‌گیرند؟",
      body_en: "Backing maneuvers like the MVA 50-foot straight-line test trigger high anxiety for new drivers and teens. When family members try to teach, tensions and yelling often make the panic worse. At Sam's Driving School (751 Rockville Pike), our leadership combines professional driving instruction with a degree in Psychology. We deconstruct anxiety into manageable physical steps, utilizing dual-brake vehicles so the student feels 100% safe. Whether you are a student at Richard Montgomery, Wootton, or Rockville High, or an adult seeking your Maryland license, our patient female and multilingual instructors provide a zero-judgment zone.",
      body_fa: "مانورهایی مثل دنده عقب ۵۰ فوت در محوطه MVA اغلب باعث استرس شدید هنرجویان می‌شود. وقتی اعضای خانواده اقدام به آموزش می‌کنند، فریاد زدن و تشنج اوضاع را بدتر می‌کند. در آموزشگاه رانندگی سام واقع در راکویل، مدیریت مجموعه با پیشینه دانشگاهی روان‌شناسی، آموزش را به صورت گام‌به‌گام و علمی ارائه می‌دهد. خودروهای مدرن با سیستم ترمز دوبل شاگرد و مربیان صبور و بدون داد و فریاد، آرامش کامل شما را تضمین می‌کنند.",
      local_trust_hook_en: "Voted Best of 2025 in Rockville. Free Rockville Metro pickup & drop-off available for all students.",
      local_trust_hook_fa: "برنده نشان برترین کسب‌وکار سال ۲۰۲۵ راکویل به همراه ترانسفر رایگان از مترو راکویل.",
      cta_en: "Explore our BTW packages and MVA test warm-up rentals at samdrivingschool.org.",
      cta_fa: "برای مشاهده پکیج‌ها و رزرو کلاس‌ها به samdrivingschool.org سر بزنید."
    },
    image_prompts: {
      midjourney_v6_en: "Side profile angle shot of a clean silver modern sedan backing up smoothly along a yellow curb in a driving test training facility, rear tire perfectly spaced 8 inches from curb, driver looking over their right shoulder through rear glass, sunny day in Montgomery County MD, ultra-sharp realistic automotive photography, 85mm f/2.0 --ar 9:16 --v 6.1",
      midjourney_v6_fa: "پرامپت میدجورنی: نمای زاویه کناری از خودروی آموزشی نقره‌ای رنگ در حال دنده عقب دقیق در فاصله ۲۰ سانتی‌متری جدول زرد در پیست تمرین MVA، راننده با سر چرخیده به سمت عقب، هوای آفتابی مریلند، لنز ۸۵ میلی‌متر با بوکه زیبا و کیفیت بی‌نظیر.",
      flux_pro_en: "close-up of car passenger footwell showing the dual-control instructor brake pedal installed, clean carpets, professional driving school branding, daylight, 8k resolution, crisp photorealism",
      dalle3_en: "A young driver looking back over their shoulder through the rear window of a training car while reversing parallel to a curb, calm instructor watching from passenger seat with dual controls, sunny outdoor setting.",
      composition_details_en: "Exterior side view with emphasis on the parallel distance between tire and curb, with driver head position visible through tinted glass.",
      composition_details_fa: "نمای بیرونی متمرکز بر فاصله موازی چرخ و جدول و حالت سر راننده از پشت شیشه.",
      recommended_aspect_ratio: "9:16 (Vertical)"
    },
    video_prompts: {
      runway_gen3_en: "Close camera track parallel to the rear wheel of a car reversing slowly along a curb. The tire rotates backward at 2 miles per hour in perfect alignment, never wavering or touching the concrete curb. Camera gently lifts to show the rear window with driver looking back.",
      runway_gen3_fa: "پرامپت Runway Gen-3: حرکت ردیابی آرام دوربین هم‌راستا با چرخ عقب خودرو هنگام حرکت دنده عقب با سرعت ۲ مایل در ساعت در امتداد جدول، بدون کوچکترین برخورد با بتن جدول، سپس تیلت ملایم به سمت شیشه عقب و سر راننده.",
      sora_kling_en: "High-angle drone shot looking directly down at a white driving school vehicle smoothly backing up 50 feet between marked yellow cones without touching any boundary lines on a pristine paved track.",
      camera_movement_en: "Low tracking slider moving backward at matched vehicle speed",
      camera_movement_fa: "حرکت ترکینگ رو به عقب همگام با سرعت حرکت خودرو",
      sound_fx_en: "Low tire roll on tarmac, reverse gear hum, quiet reassuring voice of female instructor",
      sound_fx_fa: "صدای نرم غلتش لاستیک روی آسفالت، زوزه ملایم دنده عقب، صدای آرامش‌بخش مربی زن",
      motion_intensity: "Smooth and measured"
    },
    mva_law_notes: {
      applicable_states: ["Maryland"],
      md_specific_rule: "Maryland MVA Skills Test Standard: Straight line backing requires driving backward for approximately 50 feet within a designated lane without hitting boundary cones or the curb.",
      md_specific_rule_fa: "معیار سنجش مهارت MVA مریلند: راننده باید ۵۰ فوت به صورت مستقیم در مسیر مشخص شده دنده عقب برود بدون آنکه با جدول یا مخروط‌ها برخورد کند.",
      tristate_comparison: "Virginia DMV tests parallel parking on the public road or DMV lot, while Maryland evaluates closed-course 2-point stall backing and 50-ft straight backing before entering street traffic.",
      tristate_comparison_fa: "در ویرجینیا اغلب پارک دوبل در خیابان تست می‌شود، در حالی که در مریلند ابتدا مانورهای محوطه بسته شامل دنده عقب ۵۰ فوت و پارک دو نقطه‌ای تست شده و در صورت قبولی وارد خیابان می‌شوید.",
      mva_test_pass_tip: "If the car starts drifting closer to the curb, turn the wheel SLIGHTLY away (to the left) by just one inch, then straighten immediately.",
      mva_test_pass_tip_fa: "اگر ماشین به سمت جدول متمایل شد، فرمان را تنها چند سانتی‌متر به سمت چپ بچرخانید و بلافاصله صاف کنید.",
      psychological_calm_tip: "Breath pacing: Inhale as you shift into Reverse, exhale fully as you release the brake. This anchors your body against sympathetic panic.",
      psychological_calm_tip_fa: "کنترل تنفس: هنگام جا زدن دنده عقب نفس عمیق بکشید و هنگام رها کردن ترمز بازدم کامل انجام دهید تا از لرزش پا جلوگیری شود."
    }
  },
  {
    concept_id: "tristate_laws_speed_cameras",
    concept_title_en: "Driving in MD vs DC vs VA: 3 Huge Traffic Law Differences That Catch Drivers Off Guard",
    concept_title_fa: "رانندگی در مریلند در برابر واشنگتن دی‌سی و ویرجینیا: ۳ تفاوت بزرگ در قوانین که باعث جریمه‌های سنگین می‌شود!",
    category: "tristate_laws",
    target_audience: "both",
    tiktok: {
      hook_en: "Crossing the bridge from Maryland into DC or Virginia? Watch out for these 3 instant ticket traps 🚨",
      hook_fa: "وقتی از مریلند وارد DC یا ویرجینیا میشی، این ۳ تا تفاوت قانون میتونه صدها دلار جریمه برات بسازه! 🚨",
      on_screen_text_en: [
        "MD vs DC vs VA Driving Rules",
        "1. Right Turn on Red",
        "2. Speed & Stop Sign Cameras",
        "3. Move Over Law expansions"
      ],
      on_screen_text_fa: [
        "تفاوت قوانین رانندگی مریلند، DC و ویرجینیا",
        "۱. گردش به راست در چراغ قرمز",
        "۲. دوربین‌های سرعت و تابلوی ایست",
        "۳. قانون تغییر خط برای خودروهای متوقف"
      ],
      script_en: "If you live in Montgomery County, you drive between Maryland, DC, and Virginia all the time. But did you know: 1) In DC, Right Turn on Red is now universally banned at signalized intersections unless a sign specifically says permitted! 2) Maryland expanded its Move Over law to require moving over for ANY stopped car with hazard lights, not just cops. 3) In Virginia, driving 20 mph over the limit or over 85 mph can be charged as criminal reckless driving! Learn defensive driving with Sam's Driving School in Rockville.",
      script_fa: "اگه در مانتگامری کانتی زندگی می‌کنید، مدام بین مریلند، دی‌سی و ویرجینیا در حال رانندگی هستید. اما آیا می‌دونستید: ۱) در واشنگتن دی‌سی، گردش به راست در چراغ قرمز عملا در تمام تقاطع‌ها ممنوع شده مگر تابلوی مخصوص اجازه داده باشه! ۲) در مریلند، قانون فاصله گرفتن (Move Over) علاوه بر ماشین‌های پلیس، شامل هر ماشینی که فلاشر زده هم میشه! ۳) در ویرجینیا، ۲۰ مایل بالاتر از سرعت مجاز یا رانندگی بالای ۸۵ مایل در ساعت جرم کیفری (Reckless Driving) محسوب میشه! آموزش تخصصی قوانین در آموزشگاه سام راکویل.",
      sound_recommendation: "Upbeat tech-style instrumental with snappy sound accents on every bullet point",
      visual_pacing: "Fast graphical comparison cards with state flags (MD, DC, VA) and clear red/green indicators.",
      hashtags: ["#MarylandDMV", "#DCDriving", "#VirginiaDMV", "#DMVTriState", "#TrafficLaws", "#SamsDrivingSchool"]
    },
    instagram_reels: {
      hook_en: "Don't get hit with a $150 DC camera ticket or a Maryland GLS penalty.",
      hook_fa: "مراقب جریمه ۱۵۰ دلاری دوربین‌های واشنگتن یا باطل شدن دوره گواهینامه مریلند باشید!",
      visual_aesthetic: "Sleek map transition showing the I-270 / I-495 Beltway corridor between Rockville, Bethesda, and DC with night traffic lights.",
      script_en: "Living in the DMV area means mastering three different sets of driving laws. In Maryland, provisional drivers under 18 have a strict midnight to 5:00 AM curfew, and any ticket resets your 18-month waiting period to zero. In DC, photo enforcement cameras catch stop sign rolls and speeders with zero tolerance. And in Virginia, radar detectors are strictly illegal. Our 36-hour Drivers Ed at Sam's Driving School covers the full tri-state reality so you drive protected wherever your commute takes you.",
      script_fa: "زندگی در منطقه DMV (واشنگتن، مریلند، ویرجینیا) یعنی باید به سه سری قانون مسلط باشید. در مریلند، نوجوانان دارای گواهینامه مشروط منع تردد از ۱۲ شب تا ۵ صبح دارند و هر جریمه دوره ۱۸ ماهه را صفر می‌کند. در دی‌سی دوربین‌های هوشمند کوچکترین حرکت در تابلوی استاپ را ثبت می‌کنند و در ویرجینیا دستگاه‌های رادار دتکتور کاملا غیرقانونی است. در آموزشگاه سام در راکویل این نکات را کامل فرا می‌گیرید.",
      caption_en: "Commuting across the Capital Beltway? 🚗 Here are the top 3 tri-state legal differences every teen and parent in Montgomery County must know. Save this guide and book your BTW lessons at samdrivingschool.org! 📍 751 Rockville Pike",
      caption_fa: "در منطقه واشنگتن، مریلند و ویرجینیا رانندگی می‌کنید؟ این ۳ تفاوت اصلی قوانین را حتما به خاطر بسپارید. برای اطلاعات دوره‌های آموزشگاه رانندگی سام به samdrivingschool.org سر بزنید.",
      call_to_action_en: "Save this post and share it with someone who drives on I-270 or I-495!",
      call_to_action_fa: "این پست را ذخیره کنید و برای کسانی که در اتوبان‌های مریلند و دی‌سی رانندگی می‌کنند بفرستید!",
      hashtags: ["#DMVTitans", "#MarylandLaw", "#TriStateDriving", "#RockvillePike", "#BethesdaMD"]
    },
    youtube_shorts: {
      title_en: "Maryland vs DC vs Virginia Driving Laws EXPLAINED in 60s",
      title_fa: "تفاوت قوانین رانندگی مریلند، دی‌سی و ویرجینیا در ۶۰ ثانیه",
      retention_hook_en: "Think driving laws are the same across the Potomac? Think again.",
      retention_hook_fa: "فکر می‌کنید قوانین رانندگی در مریلند و دی‌سی و ویرجینیا یکیه؟ اشتباه بزرگیه!",
      step_by_step_en: [
        "1. Right Turn on Red: Allowed in MD & VA with full stop; default BANNED in DC.",
        "2. Speed Thresholds: VA considers 20+ mph over reckless driving (misdemeanor).",
        "3. Maryland Move Over Law: Applies to ALL stopped vehicles with hazard flashers.",
        "4. Provisional Curfews: MD is 12am-5am; VA is 12am-4am; DC is 11pm-6am on weekdays."
      ],
      step_by_step_fa: [
        "۱. گردش به راست در قرمز: در مریلند و ویرجینیا با توقف کامل مجاز، در DC پیش‌فرض ممنوع.",
        "۲. سرعت: در ویرجینیا ۲۰ مایل بیش از حد مجاز جرم کیفری رانندگی خطرناک است.",
        "۳. قانون Move Over مریلند: شامل تمام خودروهای متوقف با چراغ فلاشر است.",
        "۴. منع تردد شبانه: در مریلند ۱۲ تا ۵ صبح، ویرجینیا ۱۲ تا ۴ صبح، DC از ۱۱ شب تا ۶ صبح."
      ],
      script_en: "Knowing the rules keeps your record clean and your insurance rates down. Sam's Driving School in Rockville offers MVA-certified 36-hour Drivers Ed on Zoom plus private Behind-the-Wheel lessons in dual-brake cars. Visit samdrivingschool.org!",
      script_fa: "دانستن این قوانین مانع جریمه‌های سنگین و افزایش نجومی بیمه ماشین شما میشه. آموزشگاه رانندگی سام در راکویل مریلند ارائه‌دهنده دوره‌های رسمی ۳۶ ساعته آنلاین در زوم و جلسات عملی در خیابان. مراجعه به samdrivingschool.org",
      pinned_comment_en: "Did you know Maryland provisional licenses have an 18-month clean record requirement? Check our courses at samdrivingschool.org!",
      pinned_comment_fa: "آیا می‌دانستید گواهینامه مشروط مریلند به ۱۸ ماه سابقه کاملا تمیز نیاز دارد؟ اطلاعات دوره‌ها در samdrivingschool.org"
    },
    facebook: {
      headline_en: "Tri-State Commuters Beware: Crucial Differences Between MD, DC, and VA Traffic Laws",
      headline_fa: "رانندگان شاغل در حوزه واشنگتن، مریلند و ویرجینیا: تفاوت‌های حیاتی قوانین رانندگی را بدانید",
      body_en: "For families in Montgomery County, our daily lives involve crossing state lines constantly—from Rockville down to Georgetown or across to Tysons Corner. However, traffic laws diverge dramatically between Maryland, the District of Columbia, and Virginia. DC has implemented widespread automated camera systems and banned right-turns-on-red at signalized intersections. Virginia enforces strict reckless driving penalties for speeds over 85 mph or 20 mph above the speed limit. And in Maryland, passing a stopped school bus or failing to give a lane of clearance to a hazard-flashing vehicle carries heavy fines and point penalties. At Sam's Driving School, we equip both teen learners and adult immigrants with deep defensive driving knowledge.",
      body_fa: "برای خانواده‌های ساکن مانتگامری کانتی، رفت و آمد روزمره میان مریلند، دی‌سی و ویرجینیا بسیار متداول است. اما عدم آگاهی از تفاوت‌های حقوقی مانند ممنوعیت گردش به راست در چراغ قرمز در DC، مجازات‌های سنگین سرعت در ویرجینیا و قانون فاصله با خودروهای متوقف در مریلند می‌تواند عواقب مالی و بیمه‌ای سنگینی به همراه داشته باشد. در آموزشگاه رانندگی سام در راکویل (۷۵۱ Rockville Pike)، با دوره‌های تخصصی آنلاین و عملی، رانندگی ایمن و تدافعی را به صورت ریشه‌ای فرا بگیرید.",
      local_trust_hook_en: "Located at 751 Rockville Pike, Rockville MD. Voted Best of 2025. Multilingual instruction in English, Spanish, and Farsi.",
      local_trust_hook_fa: "واقع در راکویل مریلند، با آموزش به زبان‌های انگلیسی، اسپانیایی و فارسی و متروی رایگان.",
      cta_en: "Register today for our upcoming 10-day evening Drivers Ed Zoom courses at samdrivingschool.org.",
      cta_fa: "همین امروز در دوره‌های آنلاین ۱۰ روزه عصرانه ما در samdrivingschool.org ثبت‌نام کنید."
    },
    image_prompts: {
      midjourney_v6_en: "Overhead cinematic aerial drone shot of the Capital Beltway intersection where Maryland, DC, and Virginia highways intertwine, stream of red taillights and white headlights, twilight moody cinematic blue hour lighting, sharp road markings, realistic 8k resolution --ar 16:9 --v 6.1",
      midjourney_v6_fa: "پرامپت میدجورنی: نمای هوایی سینمایی از تقاطع کمربندی کپیتال بلت‌وی و اتصال اتوبان‌های مریلند، دی‌سی و ویرجینیا، رد چراغ‌های خودروها در گرگ و میش غروب، خط‌کشی‌های دقیق بزرگراهی با کیفیت فوق‌العاده و نسبت تصویر ۱۶:۹.",
      flux_pro_en: "realistic modern driver perspective looking through windshield at a Washington DC intersection with a clear 'NO TURN ON RED' sign and traffic camera mounted on pole, rainy asphalt reflection, authentic detail, 8k",
      dalle3_en: "A modern dual-brake training car driving on a clean suburban highway in Rockville Maryland, passing near road signs pointing towards DC and Virginia, crisp daylight, high quality photograph.",
      composition_details_en: "Wide angle perspective showing road signs indicating Maryland Route 355 / Rockville Pike with clear lane markings and modern vehicles.",
      composition_details_fa: "نمای عریض از تابلوهای راهنمای مسیر مریلند و راکویل پایک همراه با خط‌کشی‌های شفاف و ماشین‌های مدرن.",
      recommended_aspect_ratio: "16:9 (Desktop / Facebook Banner / Shorts wide)"
    },
    video_prompts: {
      runway_gen3_en: "Cinematic drone time-lapse zooming along Rockville Pike at sunset, showing modern cars moving smoothly through traffic signals, switching between Maryland state signage and Rockville metro station, fluid motion, warm orange and cobalt blue aesthetic.",
      runway_gen3_fa: "پرامپت Runway Gen-3: تایم‌لپس هوایی سینمایی در امتداد راکویل پایک مریلند در هنگام غروب آفتاب، حرکت نرم خودروها در چراغ‌های راهنمایی و تابلوهای مسیر، نورهای گرم نارنجی و آبی کبالت با فریم ریت سینمایی.",
      sora_kling_en: "Smooth highway tracking shot beside a driving school car with 'Student Driver' decal, signaling smoothly and moving over one full lane to clear a roadside assistance vehicle on the shoulder.",
      camera_movement_en: "High-speed highway drone sweep with orbital turn around highway interchange",
      camera_movement_fa: "حرکت سویپ پرسرعت درون با چرخش مداری حول تقاطع بزرگراهی",
      sound_fx_en: "Ambient highway woosh, gentle turn signal click, calm professional narration voice",
      sound_fx_fa: "صدای باد و عبور آرام خودروها در اتوبان، صدای تیک راهنما و صدای راوی حرفه‌ای",
      motion_intensity: "Dynamic and fluid"
    },
    mva_law_notes: {
      applicable_states: ["Maryland", "Washington D.C.", "Virginia"],
      md_specific_rule: "Maryland Transportation Code § 21-405: Move Over law applies to ALL stationary vehicles displaying hazard warning lights, flares, or cones.",
      md_specific_rule_fa: "قانون مریلند ماده ۲۱-۴۰۵: الزام به تغییر خط برای تمام خودروهای متوقف دارای چراغ فلاشر یا علائم هشدار دهنده.",
      tristate_comparison: "Virginia enforces Reckless Driving as a Class 1 Criminal Misdemeanor for driving over 85 mph anywhere in the state, whereas MD treats most speeding as civil infractions unless accompanied by aggressive driving.",
      tristate_comparison_fa: "در ویرجینیا سرعت بالای ۸۵ مایل یک جرم کیفری درجه یک در سابقه فرد ثبت می‌شود، در حالی که در مریلند اکثر موارد سرعت تخلف رانندگی عادی است مگر آنکه همراه با رانندگی تهاجمی باشد.",
      mva_test_pass_tip: "On the MVA road portion, always maintain a 3-4 second following distance behind vehicles ahead, especially when traveling on MD-355 (Rockville Pike).",
      mva_test_pass_tip_fa: "در بخش شهری آزمون MVA، فاصله زمانی ۳ تا ۴ ثانیه‌ای با خودروی جلویی را همیشه حفظ کنید، به ویژه در خیابان‌های اصلی مثل راکویل پایک.",
      psychological_calm_tip: "Mental mapping: Before merging onto multi-lane roads, take a conscious deep breath. Tell yourself: 'Speed matches traffic, mirrors checked, smooth transition.'",
      psychological_calm_tip_fa: "تصویرسازی ذهنی: قبل از ورود به لاین‌های اتوبان، نفس عمیق بکشید و بگویید: «سرعت هماهنگ با ترافیک، آینه‌ها چک شد، ورود نرم و ایمن». استرس ناپدید خواهد شد."
    }
  }
];

export const MVA_GOTCHA_FAILS = [
  {
    rule_en: "Touching or Bumping Any Curb or Cone",
    rule_fa: "برخورد یا تماس لاستیک با هرگونه جدول یا مخروط",
    consequence: "Instant Disqualification (End of Test)",
    prevention_en: "Stop before you risk contact! You are allowed to stop, shift into drive, and correct your angle during 2-point turns without failing.",
    prevention_fa: "قبل از برخورد توقف کنید! در پارک دو نقطه‌ای توقف و اصلاح زاویه مجاز است، اما برخورد با جدول رد فوری دارد."
  },
  {
    rule_en: "Moving the Vehicle Before Fastening Seatbelt",
    rule_fa: "حرکت دادن خودرو قبل از بستن کمربند ایمنی",
    consequence: "Automatic Failure Before Leaving Parking Spot",
    prevention_en: "Seatbelt clicked first. Verify the examiner is also buckled before shifting into Reverse or Drive.",
    prevention_fa: "اولین کار بستن کمربند است. حتی چک کنید ممتحن هم کمربندش را بسته باشد سپس دنده را عوض کنید."
  },
  {
    rule_en: "Rolling Stop Behind Stop Line",
    rule_fa: "توقف ناقص (رولینگ استاپ) پشت خط ایست",
    consequence: "Instant Automatic Failure",
    prevention_en: "Feel the suspension settle backward. Count 3 seconds (1-Mississippi, 2-Mississippi, 3-Mississippi) behind the white line.",
    prevention_fa: "احساس استقرار عقب خودرو، توقف کامل ۳ ثانیه‌ای پشت خط سفید ممتد قبل از هرگونه خزیدن به جلو."
  },
  {
    rule_en: "Staring Only at the Backup Camera While Reversing",
    rule_fa: "زل زدن فقط به صفحه نمایش دوربین دنده عقب",
    consequence: "Severe Point Deduction / Automatic Failure for Unsafe Backing",
    prevention_en: "Turn your torso 45 degrees, place right hand on passenger seat, look through rear glass. Glances at camera only for 2 seconds max.",
    prevention_fa: "چرخاندن نیم‌تنه به عقب، نگاه مستقیم از شیشه عقب و نگاه به مانیتور فقط برای ۲ ثانیه کمکی."
  },
  {
    rule_en: "Failure to Check Blind Spot (Head Turn Over Shoulder)",
    rule_fa: "عدم چک کردن نقطه کور با چرخش سر از روی شانه",
    consequence: "Automatic Failure on Lane Change / Pull Out",
    prevention_en: "Chin to shoulder! Mirrors only show 60% of adjacent traffic. Blind spot head turn is mandatory for every pull-out and lane change.",
    prevention_fa: "چرخش چانه به سمت شانه! آینه‌ها نقطه کور را پوشش نمی‌دهند و چرخش سر قبل از هر خروج و تغییر لاین الزامی است."
  }
];

export const SAMS_PSYCHOLOGY_PROTOCOLS = [
  {
    name_en: "The Physiological Sigh (Dr. Andrew Huberman & Sam's Driving Method)",
    name_fa: "تنفس فیزیولوژیک برای تخلیه آنی اضطراب پشت فرمان",
    steps_en: "1) Two quick inhales through the nose (first deep, second topping off the lungs). 2) Long, slow, unforced exhale through the mouth for 6-8 seconds. Repeat 3 times before test begins.",
    steps_fa: "۱) دو دم سریع و پشت‌سرهم از بینی (دم اول عمیق، دم دوم تکمیلی). ۲) بازدم بسیار آرام و طولانی از دهان به مدت ۶ تا ۸ ثانیه. تکرار ۳ مرتبه قبل از شروع آزمون.",
    benefit_en: "Immediately offloads carbon dioxide and stimulates the vagus nerve, dropping heart rate within 20 seconds.",
    benefit_fa: "کاهش فوری ضربان قلب در ۲۰ ثانیه و تحریک عصب واگ برای بازیابی تمرکز کامل مغز."
  },
  {
    name_en: "Vocalized Confirmation (Cognitive De-freezing)",
    name_fa: "تایید کلامی مراحل رانندگی (رفع قفل شدن ذهن)",
    steps_en: "Narrate your driving maneuvers softly to yourself: 'Left mirror clear, rear mirror clear, blind spot checked, initiating turn.'",
    steps_fa: "مراحل را آرام با خود زمزمه کنید: «آینه چپ آزاد، آینه وسط چک شد، نقطه کور بررسی شد، گردش ایمن».",
    benefit_en: "Engages the prefrontal cortex and prevents the amygdala (fear center) from causing freeze responses under examiner observation.",
    benefit_fa: "درگیر نگه داشتن کورتکس جلوی مغز و مهار مرکز ترس (آمیگدال) در حین آزمون."
  },
  {
    name_en: "The Zero-Yelling Muscle Memory Reassurance",
    name_fa: "اطمینان‌بخشی با سیستم ترمز دوبل و محیط بدون داد و فریاد",
    steps_en: "Know that every Sam's Driving School vehicle features a state-certified dual-brake system. The instructor has full control to stop safely.",
    steps_fa: "تمامی خودروهای آموزشگاه سام دارای سیستم ترمز دوگانه استاندارد هستند؛ مربی در هر ثانیه تسلط کامل برای توقف ایمن دارد.",
    benefit_en: "Allows students to learn through calm positive reinforcement without fear of panic or yelling.",
    benefit_fa: "یادگیری بر پایه تشویق مثبت و آرامش کامل بدون ترس از اشتباه یا سرزنش."
  }
];

export type QuizQuestionCategory =
  | 'tristate_laws'
  | 'mva_maneuvers'
  | 'instant_fails'
  | 'psychology_anxiety'
  | 'emergency_defensive'
  | 'curriculum_services';

export interface MockQuizQuestion {
  id: string;
  question_en: string;
  question_fa: string;
  state_tag: 'Maryland MVA' | 'Washington D.C.' | 'Virginia DMV' | 'Tri-State Universal';
  category?: QuizQuestionCategory;
  category_label_en?: string;
  category_label_fa?: string;
  options_en: string[];
  options_fa: string[];
  correct_index: number;
  explain_why_en: string;
  explain_why_fa: string;
  statute_reference: string;
  instructor_tip: string;
}

export const MOCK_QUIZ_QUESTIONS: MockQuizQuestion[] = [
  {
    id: "q_provisional_reset",
    question_en: "Before a Maryland learner's permit holder may take the MVA road test, what driving-record condition must they meet?",
    question_fa: "قبل از اینکه دارنده پرمیت (گواهینامه موقت) مریلند بتواند در آزمون جاده MVA شرکت کند، باید چه شرط مربوط به سابقه رانندگی را داشته باشد؟",
    state_tag: "Maryland MVA",
    options_en: [
      "No requirement at all — any driving record is accepted.",
      "They must have gone a required minimum period with a clean record, free of moving violations, as set by the Graduated Licensing System (GLS).",
      "They must have at least one prior at-fault accident to prove real-world experience.",
      "A one-time $50 administrative fee with no record requirement."
    ],
    options_fa: [
      "هیچ شرطی لازم نیست — هر سابقه‌ای قابل قبول است.",
      "باید یک دوره حداقلی مشخص‌شده توسط سیستم گواهینامه مرحله‌ای (GLS) را بدون هیچ تخلف حرکتی، با سابقه پاک، طی کرده باشد.",
      "باید حداقل یک تصادف مقصرانه قبلی داشته باشد تا تجربه واقعی را ثابت کند.",
      "فقط یک بار پرداخت ۵۰ دلار هزینه اداری، بدون نیاز به شرط خاصی برای سابقه."
    ],
    correct_index: 1,
    explain_why_en: "Maryland's Graduated Licensing System requires new drivers to maintain a clean, violation-free record for a required minimum period before advancing to the next license stage. A moving violation can delay that progress. Exact current waiting-period lengths and reset rules should be confirmed directly with the MVA, since the dataset's earlier claim of an automatic '18-month reset to day zero' could not be verified against the official MVA classroom curriculum and has been removed pending confirmation.",
    explain_why_fa: "سیستم گواهینامه مرحله‌ای مریلند (GLS) الزام می‌کند که راننده تازه‌کار برای مدتی مشخص، سابقه کاملاً پاک و بدون تخلف داشته باشد تا به مرحله بعدی گواهینامه برسد. یک تخلف حرکتی می‌تواند این روند را به تاخیر بیندازد. طول دقیق این دوره‌ها و قوانین ریست باید مستقیماً از MVA تایید شود؛ ادعای قبلی «ریست خودکار ۱۸ ماهه به صفر» از کوریکولوم رسمی MVA قابل تایید نبود و تا تایید مجدد حذف شد.",
    statute_reference: "Maryland Graduated Licensing System (GLS) — verify exact section with current MD Transportation Code",
    instructor_tip: "Sam's Tip: Defensive driving habits in our dual-brake cars help protect your clean record so you progress through the GLS stages on schedule!"
  },
  {
    id: "q_move_over_expanded",
    question_en: "Under Maryland's 'Move Over' law (as taught in the official MVA driver education curriculum), which vehicles must drivers vacate a lane or slow down for?",
    question_fa: "طبق قانون Move Over مریلند (آن‌طور که در کوریکولوم رسمی آموزش رانندگی MVA تدریس می‌شود)، رانندگان باید لاین خود را برای چه خودروهایی خالی کنند یا سرعت را کاهش دهند؟",
    state_tag: "Maryland MVA",
    options_en: [
      "Stopped emergency and law-enforcement vehicles (police, fire/rescue, ambulance, utility-emergency) displaying active emergency lights.",
      "Only State Highway Administration snow plows.",
      "ALL stationary vehicles with any kind of hazard lights, including ordinary broken-down personal cars.",
      "Only vehicles stopped on the left-hand median of interstate highways."
    ],
    options_fa: [
      "خودروهای امدادی و انتظامی متوقف‌شده (پلیس، آتش‌نشانی، آمبولانس، خودروهای اضطراری تاسیسات) که چراغ اضطراری فعال دارند.",
      "تنها ماشین‌های برف‌روب اداره بزرگراه‌های ایالتی.",
      "تمامی خودروهای متوقف با هر نوع چراغ هشدار، حتی خودروهای شخصی خراب‌شده معمولی.",
      "تنها خودروهایی که در جدول سمت چپ اتوبان‌های بین ایالتی متوقف شده‌اند."
    ],
    correct_index: 0,
    explain_why_en: "Per the official Maryland MVA driver education curriculum (2019 edition), the Move Over law applies to stopped emergency/law-enforcement vehicles with active emergency lights; drivers must change lanes or reduce speed. An earlier version of this flashcard claimed the law had been 'expanded' to cover all stationary vehicles including ordinary broken-down cars — that broader claim could not be confirmed against the official curriculum and has been corrected. If Maryland law has since been expanded, verify the current scope directly with the MVA before republishing.",
    explain_why_fa: "طبق کوریکولوم رسمی آموزش رانندگی MVA مریلند (نسخه ۲۰۱۹)، قانون Move Over شامل خودروهای امدادی/انتظامی متوقف‌شده با چراغ اضطراری فعال است؛ راننده باید لاین را عوض کند یا سرعت را کم کند. نسخه قبلی این فلش‌کارت ادعا می‌کرد این قانون «گسترش‌یافته» و شامل همه خودروهای متوقف از جمله ماشین‌های شخصی خراب‌شده است — این ادعای گسترده‌تر از کوریکولوم رسمی قابل تایید نبود و اصلاح شد. اگر قانون مریلند از آن زمان گسترش یافته، قبل از انتشار مجدد حتماً با MVA تایید کنید.",
    statute_reference: "Maryland MVA Driver Education Curriculum (2019) — verify current statute scope with MVA directly",
    instructor_tip: "Test Gotcha: Failing to give clearance to a stopped police, fire, rescue, or utility-emergency vehicle during your MVA road test is penalized as an unsafe lane maneuver!"
  },
  {
    id: "q_dc_right_turn_red",
    question_en: "What is the primary rule regarding 'Right Turn on Red' at signalized intersections in Washington D.C.?",
    question_fa: "قانون اصلی در مورد گردش به راست در چراغ قرمز در تقاطع‌های دارای چراغ در واشنگتن دی‌سی (DC) چیست؟",
    state_tag: "Washington D.C.",
    options_en: [
      "It is always permitted at every intersection without stopping.",
      "It is default BANNED across signalized intersections in D.C. unless a sign explicitly authorizes it.",
      "It is permitted only between 12:00 AM and 6:00 AM on weekdays.",
      "It is permitted only for commercial delivery vans and buses."
    ],
    options_fa: [
      "در تمام تقاطع‌ها بدون نیاز به توقف همیشه مجاز است.",
      "به صورت پیش‌فرض در تمام تقاطع‌های دارای چراغ در DC ممنوع است، مگر اینکه تابلوی خاصی صراحتا اجازه داده باشد.",
      "فقط بین ساعت ۱۲ شب تا ۶ صبح در روزهای کاری هفته مجاز است.",
      "فقط برای ون‌های پخش بار تجاری و اتوبوس‌ها مجاز است."
    ],
    correct_index: 1,
    explain_why_en: "Washington D.C. enacted landmark pedestrian safety legislation creating a universal default ban on right turns on red at signalized intersections throughout the District of Columbia. While Maryland and Virginia permit right turns on red after a 3-second complete stop (unless signed otherwise), in DC you must presume right turn on red is prohibited.",
    explain_why_fa: "شهر واشنگتن دی‌سی قانون پیشگامانه‌ای برای ایمنی عابران پیاده تصویب کرد که گردش به راست در چراغ قرمز را در تمام تقاطع‌های دارای چراغ به صورت پیش‌فرض ممنوع می‌کند. برخلاف مریلند و ویرجینیا که بعد از توقف کامل ۳ ثانیه‌ای مجاز است، در DC باید فرض را بر ممنوعیت کامل بگذارید.",
    statute_reference: "DC Safer Streets Amendment Act / DCMR Title 18",
    instructor_tip: "Commuter Alert: Automated photo traffic cameras at D.C. intersections automatically issue $150 tickets for turning right on red!"
  },
  {
    id: "q_mva_backing_camera",
    question_en: "During the Maryland MVA 50-Foot Straight-Line Backing test, how are you required to look?",
    question_fa: "در آزمون دنده عقب ۵۰ فوت محوطه بسته MVA مریلند، چگونه باید به مسیر نگاه کنید؟",
    state_tag: "Maryland MVA",
    options_en: [
      "Look exclusively at the digital backup camera touchscreen display.",
      "Only check the driver's side wing mirror without moving your head.",
      "Physically turn your torso 45 degrees, place right hand on the passenger seat, and look directly through the rear windshield.",
      "Keep both hands on the horn and look out the open driver side window only."
    ],
    options_fa: [
      "منحصراً به صفحه نمایش لمسی دوربین دنده عقب خیره شوید.",
      "فقط آینه بغل سمت راننده را بدون چرخاندن سر کنترل کنید.",
      "نیم‌تنه را ۴۵ درجه بچرخانید، دست راست را روی پشتی صندلی شاگرد قرار دهید و مستقیما از شیشه عقب نگاه کنید.",
      "هر دو دست را روی بوق بگذارید و فقط از پنجره باز سمت راننده به بیرون نگاه کنید."
    ],
    correct_index: 2,
    explain_why_en: "MVA testing rubrics require applicants to demonstrate physical head and body turns while reversing. The backup camera is classified solely as a secondary aid. Staring only at the in-dash screen without looking over your right shoulder through the rear window can result in immediate failure for improper observation and unsafe vehicle control.",
    explain_why_fa: "دستورالعمل آزمون MVA الزام می‌کند که راننده نیم‌تنه و سر خود را فیزیکی بچرخاند. دوربین دنده عقب تنها یک ابزار کمکی ثانویه است. زل زدن به مانیتور بدون چرخاندن سر به سمت شیشه عقب باعث رد شدن به دلیل عدم تسلط و دید ناکافی می‌شود.",
    statute_reference: "Maryland MVA Driver Skills Test Scoring Guide (Section 2 - Backing)",
    instructor_tip: "Sam's Psychology Anchor: Anchor your right arm across the passenger headrest. Feather the brake pedal gently—let idle speed roll you backward at 2 mph."
  },
  {
    id: "q_school_bus_paved_median",
    question_en: "On a roadway with a paved continuous center left-turn lane (no physical grass or concrete barrier), who must stop when a school bus activates flashing red lights and extends its stop arm?",
    question_fa: "در خیابانی با لاین پیوسته گردش به چپ (بدون جدول بتنی یا فضای سبز وسط)، هنگام فعال شدن چراغ قرمز و تابلوی ایست اتوبوس مدرسه، کدام خودروها باید بایستند؟",
    state_tag: "Maryland MVA",
    options_en: [
      "Only the traffic directly behind the school bus; oncoming traffic may proceed normally.",
      "Both directions of traffic MUST stop at least 20 feet away from the bus.",
      "Only school buses travelling in the opposite direction must stop.",
      "No one needs to stop if the speed limit is 45 mph or higher."
    ],
    options_fa: [
      "فقط خودروهایی که مستقیما پشت سر اتوبوس حرکت می‌کنند؛ لاین مخالف می‌تواند عبور کند.",
      "خودروهای هر دو جهت رفت و برگشت موظفند حداقل ۲۰ فوت (۶ متر) قبل از اتوبوس توقف کامل نمایند.",
      "فقط اتوبوس‌های مدارس دیگر در مسیر مخالف باید بایستند.",
      "اگر سرعت مجاز ۴۵ مایل یا بیشتر باشد هیچ‌کس نیازی به توقف ندارد."
    ],
    correct_index: 1,
    explain_why_en: "Under Maryland Transportation Code § 21-706, a paved center turning lane is NOT a physical barrier. Only a physical median barrier (such as a raised concrete wall, guardrail, or grass island) exempts oncoming traffic. On undivided roads or roads with only painted turn lanes, ALL vehicles in BOTH directions must stop at least 20 feet away until the stop arm is retracted.",
    explain_why_fa: "طبق ماده ۲۱-۷۰۶ قوانین مریلند، لاین آسفالت گردش به چپ مانع فیزیکی محسوب نمی‌شود! تنها وجود جدول بتنی برجسته، گاردریل یا چمن وسط خیابان، خودروهای لاین مخالف را معاف می‌کند. در غیر این صورت هر دو جهت رفت و برگشت باید حداقل ۲۰ فوت قبل از اتوبوس متوقف شوند.",
    statute_reference: "MD Transportation Code § 21-706 - School Bus Safety (Fine up to $570 + 3 points)",
    instructor_tip: "Montgomery County Alert: School bus cameras in Rockville, Bethesda, and Silver Spring automatically ticket violators with a $250 civil citation!"
  },
  {
    id: "q_virginia_reckless_speed",
    question_en: "In Virginia, at what speed threshold does a speeding violation become classified as criminal 'Reckless Driving' (a Class 1 Misdemeanor)?",
    question_fa: "در ایالت ویرجینیا، با چه سرعتی تخلف سرعت تبدیل به جرم کیفری «رانندگی خطرناک» (Reckless Driving - جنحه درجه ۱) می‌شود؟",
    state_tag: "Virginia DMV",
    options_en: [
      "5 mph over the limit on residential streets.",
      "20 mph or more over the posted speed limit, OR exceeding 85 mph regardless of the posted limit.",
      "Only when driving over 110 mph on tollways.",
      "Any speed on Sunday mornings."
    ],
    options_fa: [
      "۵ مایل بالاتر از حد مجاز در خیابان‌های مسکونی.",
      "۲۰ مایل یا بیشتر بالاتر از سرعت مجاز تابلو، یا رانندگی بالای ۸۵ مایل در ساعت بدون توجه به تابلوی سرعت.",
      "تنها با رانندگی بالای ۱۱۰ مایل در عوارضی‌ها.",
      "هر سرعتی در صبح‌های یکشنبه."
    ],
    correct_index: 1,
    explain_why_en: "Virginia Code § 46.2-862 strictly dictates that driving 20 mph or more above the posted speed limit, or driving in excess of 85 mph regardless of the speed limit, is Class 1 Misdemeanor Reckless Driving. Unlike Maryland (where speeding is primarily a civil infraction), Virginia can punish this with up to 12 months in jail, a $2,500 fine, 6 license points, and a criminal record.",
    explain_why_fa: "قانون ویرجینیا ماده ۴۶.۲-۸۶۲ تعیین می‌کند که رانندگی ۲۰ مایل بالاتر از سرعت مجاز یا سرعت بالای ۸۵ مایل در ساعت یک جرم کیفری است. برخلاف مریلند، ویرجینیا می‌تواند تا ۱۲ ماه حبس، ۲۵۰۰ دلار جریمه و ۶ نمره منفی و ثبت در سابقه کیفری اعمال کند.",
    statute_reference: "VA Code § 46.2-862 - Reckless Driving by Speed",
    instructor_tip: "Tri-State Commuters: When crossing the American Legion Bridge from MD into VA, check your speedometer immediately!"
  },
  {
    id: "q_provisional_curfew_md",
    question_en: "What are the restricted driving hours (nighttime curfew) for a Maryland provisional license holder under age 18?",
    question_fa: "ساعات منع رانندگی در شب (منع تردد) برای دارندگان گواهینامه مشروط زیر ۱۸ سال در مریلند چه ساعاتی است؟",
    state_tag: "Maryland MVA",
    options_en: [
      "9:00 PM to 4:00 AM every night.",
      "12:00 AM (Midnight) to 5:00 AM, unless driving directly to/from work, official school activities, organized volunteer programs, or athletic training.",
      "Only during snowstorm emergencies.",
      "There is no nighttime curfew in Maryland."
    ],
    options_fa: [
      "۹ شب تا ۴ صبح در تمام شب‌ها.",
      "۱۲ نیمه‌شب تا ۵ صبح، مگر در مسیر مستقیم کار، فعالیت رسمی مدرسه، برنامه داوطلبانه سازمان‌یافته یا تمرین ورزشی.",
      "تنها در شرایط بحرانی برف و کولاک.",
      "در مریلند هیچ‌گونه منع تردد شبانه‌ای وجود ندارد."
    ],
    correct_index: 1,
    explain_why_en: "Per the official Maryland MVA driver education curriculum, provisional license holders under 18 years old may not drive between 12:00 AM (midnight) and 5:00 AM unless driving directly to/from work, official school activities, organized volunteer programs, or athletic training. (An earlier version of this flashcard added an 'accompanied by a licensed driver 21+' exception for the curfew specifically — that exception could not be confirmed in the official curriculum and was removed; confirm current law with the MVA before publishing.)",
    explain_why_fa: "طبق کوریکولوم رسمی آموزش رانندگی MVA مریلند، دارندگان گواهینامه مشروط زیر ۱۸ سال مجاز به رانندگی بین ۱۲ نیمه‌شب تا ۵ صبح نیستند مگر در مسیر مستقیم کار، فعالیت رسمی مدرسه، برنامه داوطلبانه سازمان‌یافته یا تمرین ورزشی. (نسخه قبلی این فلش‌کارت استثنای «همراهی فرد بالای ۲۱ سال» را برای این ساعت منع تردد اضافه کرده بود — این استثنا در کوریکولوم رسمی تایید نشد و حذف شد؛ قبل از انتشار از MVA تایید بگیرید.)",
    statute_reference: "Maryland MVA Driver Education Curriculum — verify exact statute section with current MD Transportation Code",
    instructor_tip: "High School Teens: Keep a printed work schedule or school extracurricular pass in your glove compartment if commuting home near midnight!"
  },
  {
    id: "q_curb_touch_disqualification",
    question_en: "What happens if your vehicle's tire contacts or climbs the yellow curb during the Gaithersburg or White Oak MVA closed-course maneuver test?",
    question_fa: "اگر لاستیک خودرو در حین مانورهای محوطه بسته MVA گیترزبرگ یا وایت اوک با جدول زرد برخورد کند، چه نتیجه‌ای دارد؟",
    state_tag: "Maryland MVA",
    options_en: [
      "A 2-point minor deduction, and the examiner asks you to try again.",
      "Instant, automatic disqualification (immediate test failure).",
      "The examiner ignores it as long as the engine does not stall.",
      "You receive a written warning on your learner's permit."
    ],
    options_fa: [
      "کسر ۲ نمره جزئی و ممتحن می‌خواهد دوباره تلاش کنید.",
      "ردی فوری و خودکار آزمون در همان لحظه (پایان تست).",
      "تا زمانی که موتور ماشین خاموش نشود ممتحن آن را نادیده می‌گیرد.",
      "یک اخطار کتبی روی برگه پرمیت دریافت می‌کنید."
    ],
    correct_index: 1,
    explain_why_en: "In the Maryland MVA Driver Skills Test, striking a curb, safety cone, or boundary marker is classified as an instant automatic failure. The examiner immediately terminates the test and directs the applicant to return to the testing bay. Touching a curb constitutes dangerous vehicle control under MVA testing rubrics.",
    explain_why_fa: "در آزمون مهارت‌های رانندگی MVA مریلند، هرگونه تماس یا سایش لاستیک با جدول، مخروط ایمنی یا خطوط مرزی خطای بحرانی محسوب شده و بلافاصله به منزله ردی کامل آزمون است. ممتحن در همان لحظه آزمون را متوقف می‌کند.",
    statute_reference: "Maryland MVA Driver Skills Test Manual - Critical Errors",
    instructor_tip: "Sam's Psychology Hack: If you feel close to a curb during a 2-point turn, STOP! Stopping, shifting to Drive, and adjusting your angle is NOT penalized. Hitting the curb is!"
  },
  {
    id: "q_md_under21_bac",
    question_en: "Under Maryland's 'Zero Tolerance' law, what is the maximum permissible Blood Alcohol Concentration (BAC) for a driver under age 21?",
    question_fa: "طبق قانون عدم تحمل (Zero Tolerance) مریلند، حداکثر غلظت مجاز الکل خون (BAC) برای رانندگان زیر ۲۱ سال چقدر است؟",
    state_tag: "Maryland MVA",
    options_en: [
      "0.08% BAC.",
      "0.05% BAC.",
      "Under 0.02% BAC (any measurable alcohol of 0.02% or higher triggers immediate license suspension).",
      "0.10% BAC on weekends."
    ],
    options_fa: [
      "۰.۰۸ درصد الکل خون.",
      "۰.۰۵ درصد الکل خون.",
      "زیر ۰.۰۲ درصد (هر مقدار قابل سنجش ۰.۰۲ یا بالاتر باعث تعلیق فوری گواهینامه می‌شود).",
      "۰.۱۰ درصد در تعطیلات آخر هفته."
    ],
    correct_index: 2,
    explain_why_en: "Maryland enforces an absolute Zero Tolerance law for underage drivers (§ 16-205.1). An alcohol concentration of 0.02% or more (which can result from a single sip of beer or certain cough syrups) is an automatic alcohol restriction violation resulting in immediate administrative suspension and ignition interlock requirements.",
    explain_why_fa: "مریلند قانون سخت‌گیرانه عدم تحمل برای افراد زیر ۲۱ سال دارد (ماده ۱۶-۲۰۵.۱). میزان الکل ۰.۰۲ یا بیشتر (که حتی می‌تواند ناشی از یک جرعه نوشیدنی یا شربت سرفه باشد) تخلف الکل تلقی شده و منجر به تعلیق فوری گواهینامه و نصب دستگاه قفل استارت الکل می‌شود.",
    statute_reference: "MD Transportation Code § 16-205.1 - Zero Tolerance Under 21",
    instructor_tip: "Official Course: Sam's Driving School offers the MVA-approved 3-hour Alcohol & Drug education program for $90 discounted at samdrivingschool.org."
  },
  {
    id: "q_md_permit_age_hours",
    question_en: "What is the minimum age to obtain a Maryland Learner's Permit, and how many supervised practice hours must be logged?",
    question_fa: "حداقل سن برای دریافت پرمیت (Learner's Permit) در مریلند چقدر است و چند ساعت تمرین باید در دفترچه ثبت شود؟",
    state_tag: "Maryland MVA",
    options_en: [
      "15 years old and 30 hours of practice.",
      "15 years, 9 months old and 60 total practice hours (with at least 10 night hours).",
      "16 years old and 40 practice hours.",
      "16 years, 6 months old and 100 practice hours."
    ],
    options_fa: [
      "۱۵ سال تمام و ۳۰ ساعت تمرین.",
      "۱۵ سال و ۹ ماه تمام، به همراه ۶۰ ساعت تمرین رانندگی (حداقل ۱۰ ساعت در شب).",
      "۱۶ سال تمام و ۴۰ ساعت تمرین.",
      "۱۶ سال و ۶ ماه تمام و ۱۰۰ ساعت تمرین."
    ],
    correct_index: 1,
    explain_why_en: "In Maryland, teens may take the written knowledge test for their Learner's Permit at age 15 years and 9 months. Before qualifying for the road test at age 16 years and 6 months (minimum 9-month permit holding period), they must log at least 60 hours of supervised driving with a licensed 21+ adult with 3+ years experience, including at least 10 hours during nighttime darkness.",
    explain_why_fa: "در مریلند، نوجوانان می‌توانند در سن ۱۵ سال و ۹ ماهگی در آزمون آیین‌نامه پرمیت شرکت کنند. قبل از شرکت در امتحان شهر در سن ۱۶ سال و ۶ ماهگی (حداقل ۹ ماه داشتن پرمیت)، باید ۶۰ ساعت تمرین با فرد ۲۱ سال به بالا (با حداقل ۳ سال سابقه گواهینامه) شامل حداقل ۱۰ ساعت رانندگی در شب را ثبت نمایند.",
    statute_reference: "MD Transportation Code § 16-105 - Learner's Instructional Permit Requirements",
    instructor_tip: "Sam's 36-Hour Drivers Ed: Combine 30 hours of interactive Zoom classes with 6 hours of BTW in Rockville to meet Maryland state requirements effortlessly!"
  },
  {
    id: "q_three_second_stop_physics",
    question_en: "At a STOP sign or red light right turn, where must your vehicle initially stop, and what indicates a true legal stop?",
    question_fa: "پشت تابلوی ایست (STOP) یا چراغ قرمز قبل از گردش به راست، خودرو باید ابتدا کجا بایستد و چه چیزی نشان‌دهنده توقف قانونی کامل است؟",
    state_tag: "Maryland MVA",
    options_en: [
      "Stop with your front tires inside the pedestrian crosswalk while slowly coasting.",
      "Stop completely behind the solid white stop line until vehicle inertia ceases and the car settles backward for 3 seconds.",
      "Slow down to 5 mph and honk the horn before driving through.",
      "Only stop if you see a police officer waiting at the corner."
    ],
    options_fa: [
      "با چرخ‌های جلو روی خط عابر پیاده بایستید و به آرامی حرکت کنید.",
      "توقف کامل ۱۰۰٪ پشت خط سفید ممتد طوری که تکانه خودرو متوقف شده و وزن ماشین ۳ ثانیه به عقب استقرار یابد.",
      "سرعت را به ۵ مایل کاهش داده و با بوق زدن عبور کنید.",
      "تنها در صورتی بایستید که ماشین پلیس در گوشه تقاطع دیده شود."
    ],
    correct_index: 1,
    explain_why_en: "Maryland law (§ 21-707) requires a complete stop behind the stop line or before entering the crosswalk. In testing, examiners watch for the suspension rebound—when the vehicle's momentum stops 100% and weight settles backward. Rolling past the line at even 1-2 mph is classified as an illegal rolling stop and an instant test failure.",
    explain_why_fa: "ماده ۲۱-۷۰۷ مریلند توقف کامل پشت خط ایست یا قبل از گذرگاه عابر را الزامی می‌داند. در امتحان شهر، ممتحن به استقرار تعلیق خودرو نگاه می‌کند؛ حتی عبور با سرعت ۱ تا ۲ مایل در ساعت رولینگ استاپ محسوب شده و باعث ردی درجا در آزمون می‌شود.",
    statute_reference: "MD Transportation Code § 21-707 - Stop Signs & Yield Signs",
    instructor_tip: "Sam's Psychology Vocalization: Stop, count 'One Mississippi, Two Mississippi, Three Mississippi', look Left, Right, Left, then creep forward!"
  },
  {
    id: "q_foreign_license_transfer",
    question_en: "What unique Maryland MVA requirement must individuals transferring a foreign or out-of-country driver's license complete before taking their road test?",
    question_fa: "افرادی که قصد دارند گواهینامه خارجی یا بین‌المللی خود را به گواهینامه مریلند تبدیل کنند، چه دوره الزامی را باید قبل از امتحان شهر بگذرانند؟",
    state_tag: "Maryland MVA",
    options_en: [
      "A 100-hour highway defensive driving seminar.",
      "The state-mandated 3-Hour Alcohol and Drug Education Program.",
      "An English-only vocabulary spelling test.",
      "A mechanical engine rebuild demonstration."
    ],
    options_fa: [
      "سمینار ۱۰۰ ساعته رانندگی تدافعی در اتوبان.",
      "دوره رسمی ۳ ساعته آموزش الکل و مواد مخدر (3-Hour Alcohol & Drug Education Program).",
      "آزمون دیکته واژگان تخصصی زبان انگلیسی.",
      "آزمون عملی باز و بسته کردن موتور خودرو."
    ],
    correct_index: 1,
    explain_why_en: "Maryland law requires all applicants who hold an out-of-country driver's license to complete the state-approved 3-Hour Alcohol & Drug Education Program before scheduling their MVA road skills test. Sam's Driving School in Rockville is fully certified to administer this course with discounted pricing of $90.",
    explain_why_fa: "قوانین مریلند دارندگان گواهینامه خارجی را ملزم می‌کند تا دوره رسمی ۳ ساعته آموزش الکل و مواد مخدر را قبل از آزمون شهر بگذرانند. آموزشگاه رانندگی سام در راکویل این دوره را با گواهی رسمی MVA و شهریه تخفیف‌دار ۹۰ دلار ارائه می‌دهد.",
    statute_reference: "COMAR 11.17.13 - Alcohol and Drug Education Requirements for Foreign Drivers",
    instructor_tip: "Sam's Service: Available in English, Spanish, and Farsi with prompt certificate transmission to the Maryland MVA database!"
  },
  {
    id: "q_roundabout_right_of_way",
    question_en: "When entering a multi-lane roundabout or traffic circle in Maryland, who has the absolute right-of-way, and which lane must you choose for a left turn?",
    question_fa: "هنگام ورود به میدان‌های چند لاینه (Roundabout) در مریلند، حق تقدم با چه کسی است و برای گردش به چپ باید کدام لاین را انتخاب کنید؟",
    state_tag: "Maryland MVA",
    options_en: [
      "Entering traffic has priority; vehicles already inside the circle must yield to newcomers.",
      "Vehicles already circulating inside the roundabout have the right-of-way; you must yield before entering, and choose the left/inside lane for a left turn or U-turn.",
      "The larger vehicle (truck or SUV) always has automatic right-of-way.",
      "You do not need to yield if you enter at a speed greater than 25 mph."
    ],
    options_fa: [
      "خودروهای در حال ورود اولویت دارند و ماشین‌های داخل میدان باید بایستند.",
      "خودروهایی که هم‌اکنون داخل دور میدان در حال حرکتند حق تقدم دارند؛ قبل از ورود باید توقف/ییلد کنید و برای گردش به چپ یا دور زدن کامل باید لاین چپ (داخلی) را انتخاب نمایید.",
      "خودروهای بزرگ‌تر مثل شاسی‌بلند و کامیون همیشه حق تقدم دارند.",
      "اگر با سرعت بالای ۲۵ مایل وارد شوید نیازی به رعایت حق تقدم نیست."
    ],
    correct_index: 1,
    explain_why_en: "Under MD Transportation Code § 21-405.1, traffic circulating inside the roundabout has right-of-way over entering traffic. Drivers must yield at the shark's teeth yield line. When turning left (3rd exit) or making a U-turn (4th exit), you must be in the left lane before entering and signal right when approaching your exit.",
    explain_why_fa: "طبق ماده ۲۱-۴۰۵.۱ مریلند، خودروهای داخل میدان نسبت به خودروهای ورودی حق تقدم مطلق دارند. راننده باید پشت خط دندانه‌کوسه‌ای توقف کرده و برای گردش به چپ وارد لاین چپ شود و هنگام خروج راهنمای راست بزند.",
    statute_reference: "MD Transp. Code § 21-405.1 - Roundabout Navigation & Yield Rules",
    instructor_tip: "Sam's Visual Anchor: Look left before entering! Never change lanes inside the roundabout. Smooth 15 mph circulation eliminates all panic."
  },
  {
    id: "q_four_way_stop_tiebreaker",
    question_en: "At a 4-way all-way STOP sign intersection, if two vehicles arrive, stop completely, and intend to proceed at the exact same split-second, who has the right-of-way?",
    question_fa: "در تقاطع‌های دارای ۴ تابلوی ایست (4-Way Stop)، اگر دو خودرو دقیقاً در یک ثانیه هم‌زمان توقف کامل کنند، حق تقدم عبور با کیست؟",
    state_tag: "Tri-State Universal",
    options_en: [
      "The driver intending to turn left always goes first.",
      "The driver on the RIGHT has the right-of-way (the vehicle on the left must yield).",
      "Whichever vehicle has a louder engine or flashes headlights first.",
      "The vehicle facing North has unconditional priority."
    ],
    options_fa: [
      "راننده‌ای که قصد گردش به چپ دارد اول می‌رود.",
      "راننده‌ای که در سمت راست قرار دارد حق تقدم دارد (خودروی سمت چپ باید به خودروی سمت راست راه بدهد).",
      "خودرویی که اول نور بالا بزند یا صدای موتورش بلندتر باشد.",
      "خودرویی که رو به شمال قرار گرفته است اولویت دارد."
    ],
    correct_index: 1,
    explain_why_en: "Under MD Transp. Code § 21-401, when two vehicles reach an uncontrolled or all-way stop intersection simultaneously, the vehicle on the left shall yield the right-of-way to the vehicle on the right. If opposite each other, straight-through traffic has priority over left-turning vehicles.",
    explain_why_fa: "طبق ماده ۲۱-۴۰۱ مریلند، در صورت ورود هم‌زمان، خودروی سمت چپ باید به خودروی سمت راست راه بدهد. در صورتی که روبروی هم باشند، راننده‌ای که مستقیم می‌رود نسبت به راننده گردش به چپ اولویت دارد.",
    statute_reference: "MD Transp. Code § 21-401 - Failure to Yield at All-Way Stop (Tiebreaker Rule)",
    instructor_tip: "Sam's Communication Rule: Make friendly eye contact with the other driver. Nod or gesture clearly—never assume they know the tiebreaker rule."
  },
  {
    id: "q_headlights_wipers_law",
    question_en: "What does Maryland state law mandate regarding vehicle headlights when operating windshield wipers due to rain, fog, or snow?",
    question_fa: "قانون ایالت مریلند در مورد روشن کردن چراغ‌های جلو هنگام استفاده از برف‌پاک‌کن در باران، مه یا برف چه دستوری می‌دهد؟",
    state_tag: "Maryland MVA",
    options_en: [
      "You only need headlights between sunset and sunrise; rain during daylight is exempt.",
      "Headlights must be fully turned ON whenever windshield wipers are in continuous or intermittent operation due to adverse weather.",
      "You only need hazard flashers; headlights are optional.",
      "Headlights are only required on toll highways."
    ],
    options_fa: [
      "چراغ‌ها فقط از غروب تا طلوع خورشید لازم است و باران روزانه معاف است.",
      "چراغ‌های جلو (سو پایین) باید همیشه در صورت کارکرد مداوم یا منقطع برف‌پاک‌کن کاملاً روشن باشند («Wipers On, Lights On»).",
      "فقط روشن کردن چراغ فلاشر کافی است و چراغ جلو اختیاری است.",
      "چراغ‌ها تنها در اتوبان‌های عوارضی الزامی هستند."
    ],
    correct_index: 1,
    explain_why_en: "Maryland Transportation Code § 22-201.2 strictly mandates 'Wipers On, Headlights On'. Daytime running lights (DRLs) are NOT sufficient because they do not illuminate rear taillights, creating a severe rear-end collision hazard on routes like I-270 and Rockville Pike.",
    explain_why_fa: "ماده ۲۲-۲۰۱.۲ مریلند قانون «برف‌پاک‌کن روشن، چراغ روشن» را الزامی کرده است. دی‌لایت‌های جلو کافی نیستند زیرا چراغ‌های عقب را روشن نمی‌کنند و در باران شدید خطر تصادف از پشت را افزایش می‌دهند.",
    statute_reference: "MD Transp. Code § 22-201.2 - Mandatory Headlights During Wiper Usage",
    instructor_tip: "Test Tip: On rainy test days, switch your headlight knob to full manual ON before shifting into drive. Never rely on automatic sensor delays!"
  },
  {
    id: "q_blind_spot_dutch_reach",
    question_en: "Why is a physical head-turn over your shoulder (chin-to-shoulder) mandatory during MVA lane changes, and what is the 'Dutch Reach' technique?",
    question_fa: "چرا چرخاندن فیزیکی سر روی شانه در تغییر خط آزمون MVA الزامی است و تکنیک 'Dutch Reach' چیست؟",
    state_tag: "Maryland MVA",
    options_en: [
      "It is only a tradition with no safety purpose.",
      "Side mirrors have blind spots of 3 to 10 feet where vehicles/bicycles vanish; 'Dutch Reach' means opening the door with the far hand to force a shoulder check.",
      "Looking at the digital blind spot mirror warning light replaces the need to turn your head.",
      "You only need to turn your head when changing lanes to the left."
    ],
    options_fa: [
      "فقط یک رسم قدیمی است و اثر ایمنی ندارد.",
      "آینه‌های بغل دارای نقاط کور ۱ تا ۳ متری هستند که خودرو یا دوچرخه در آن محو می‌شود؛ تکنیک Dutch Reach یعنی باز کردن درب با دست مخالف برای چرخش طبیعی سر.",
      "نگاه به چراغ سنسور هشدار نقطه کور آینه نیاز به چرخش سر را کاملاً برطرف می‌کند.",
      "تنها در تغییر لاین به سمت چپ نیاز به چرخاندن سر است."
    ],
    correct_index: 1,
    explain_why_en: "MVA skills examiners deduct critical points or fail applicants who rely solely on mirrors or blind-spot sensors. The Dutch Reach technique (using your right hand to open the driver door) forces your torso to pivot, immediately exposing approaching cyclists or vehicles before opening.",
    explain_why_fa: "ممتحنان MVA داوطلبانی را که فقط به آینه یا سنسورها تکیه می‌کنند رد می‌کنند. تکنیک Dutch Reach (استفاده از دست راست برای باز کردن درب راننده) بالاتنه را می‌چرخاند و مانع تصادف با دوچرخه‌سواران می‌شود.",
    statute_reference: "Maryland MVA Driver Skills Scoring Manual - Observation & Blind Spot Verification",
    instructor_tip: "Sam's Muscle Memory: 'Chin to Shoulder!' Touch your chin near your clavicle every time your turn signal clicks."
  },
  {
    id: "q_emergency_vehicle_pull_right",
    question_en: "When an emergency vehicle with active sirens and red or blue flashing lights approaches, what must you do immediately?",
    question_fa: "هنگام نزدیک شدن خودروی امدادی (پلیس، آمبولانس، آتش‌نشانی) با آژیر و چراغ گردان فعال، راننده موظف به انجام چه کاری است؟",
    state_tag: "Tri-State Universal",
    options_en: [
      "Speed up to stay ahead of the emergency vehicle.",
      "Immediately yield right-of-way, drive to a position parallel to and as close as possible to the RIGHT edge or curb of the roadway, and STOP until it passes.",
      "Stop dead in your current travel lane without pulling over.",
      "Turn on your hazard lights and continue driving at the posted speed limit."
    ],
    options_fa: [
      "گاز داده و سرعت را افزایش دهید تا جلوتر از ماشین امدادی بمانید.",
      "بلافاصله حق تقدم را رعایت کرده، خودرو را به منتهی‌الیه سمت راست جاده (کنار جدول راست) هدایت کرده و تا عبور کامل آن توقف کامل کنید.",
      "در همان خطی که هستید در وسط جاده ناگهان ترمز کنید و بایستید.",
      "چراغ فلاشر را روشن کرده و با همان سرعت تابلو به مسیر ادامه دهید."
    ],
    correct_index: 1,
    explain_why_en: "Under MD Transp. Code § 21-405, all drivers must immediately drive to the closest right edge or curb clear of any intersection, and remain stopped until the authorized emergency vehicle has passed. Stopping in the middle of the road or pulling to the left is illegal unless on a one-way street.",
    explain_why_fa: "طبق ماده ۲۱-۴۰۵ مریلند، کلیه خودروها باید بدون مسدود کردن تقاطع، خودرو را به منتهی‌الیه جدول سمت راست هدایت کرده و تا عبور خودروی امدادی متوقف بمانند.",
    statute_reference: "MD Transp. Code § 21-405 - Operation of Vehicles on Approach of Emergency Vehicles",
    instructor_tip: "Examiner Tip: Never panic or brake abruptly. Check rear-view mirror, signal right, steer smoothly to the curb, and place vehicle in Park or hold foot brake firmly."
  },
  {
    id: "q_following_distance_rockville",
    question_en: "What is the minimum safe following distance rule taught by Sam's Driving School under ideal dry conditions on Rockville Pike (MD-355)?",
    question_fa: "حداقل فاصله طولی ایمن با خودروی جلویی در شرایط ایده‌آل و آسفالت خشک در راکویل پایک طبق آموزش‌های سام چقدر است؟",
    state_tag: "Maryland MVA",
    options_en: [
      "1 car length for every 50 mph.",
      "At least 3 to 4 seconds behind the vehicle in front (increasing to 6 to 8 seconds in rain, snow, or fog).",
      "Exactly 5 feet at all speeds.",
      "Half a second if driving a vehicle with antilock brakes (ABS)."
    ],
    options_fa: [
      "یک طول ماشین به ازای هر ۵۰ مایل سرعت.",
      "حداقل فاصله زمانی ۳ تا ۴ ثانیه‌ای با خودروی جلویی (که در شرایط باران، برف یا مه به ۶ تا ۸ ثانیه افزایش می‌یابد).",
      "دقیقاً ۵ فوت در تمام سرعت‌ها.",
      "نیم ثانیه در صورت داشتن ترمز ضد قفل ABS."
    ],
    correct_index: 1,
    explain_why_en: "The Maryland Driver's Handbook explicitly mandates the 3-to-4 second following distance rule. Pick a fixed roadside object (such as a signpost). When the car ahead passes it, count 'One-thousand-one, One-thousand-two, One-thousand-three'. If you pass before finishing, you are tailgating.",
    explain_why_fa: "کتابچه رسمی MVA مریلند قانون فاصله زمانی ۳ تا ۴ ثانیه‌ای را الزامی می‌داند. در زمان عبور ماشین جلویی از یک تابلوی ثابت، ۳ ثانیه بشمارید؛ اگر زودتر رسیدید فاصله شما خطرناک و غیرمجاز است.",
    statute_reference: "MD Transp. Code § 21-310 - Following Too Closely (Tailgating Citation)",
    instructor_tip: "Anxiety Relief Hack: Creating a 4-second bubble ahead gives your brain 300% more reaction time, eliminating 90% of driving panic!"
  },
  {
    id: "q_provisional_passenger_restrictions",
    question_en: "Under Maryland GLS law, for the first 5 months of holding a Provisional Driver's License, who may ride as passengers without a supervising adult?",
    question_fa: "طبق قانون GLS مریلند، در ۵ ماه اول دریافت گواهینامه مشروط، چه کسانی می‌توانند بدون حضور سرپرست ۲۱ سال به عنوان سرنشین همراه نوجوان باشند؟",
    state_tag: "Maryland MVA",
    options_en: [
      "Any high school classmate or friend under age 18.",
      "Only immediate family members (parents, stepparents, siblings, children, spouse) unless accompanied by a licensed driver 21+.",
      "Up to 5 teenage passengers as long as all wear seatbelts.",
      "No passengers of any age are permitted under any circumstances."
    ],
    options_fa: [
      "هر کدام از همکلاسی‌ها یا دوستان زیر ۱۸ سال.",
      "تنها اعضای درجه یک خانواده (والدین، خواهر و برادر، فرزند، همسر)؛ مگر با حضور فرد دارای گواهینامه ۲۱ ساله با ۳ سال سابقه.",
      "تا ۵ سرنشین نوجوان به شرط بستن کمربند ایمنی.",
      "تحت هیچ شرایطی هیچ سرنشینی مجاز نیست."
    ],
    correct_index: 1,
    explain_why_en: "MD Transportation Code § 16-113(d)(2) dictates that provisional drivers under 18 may not carry unrelated passengers under 18 for the first 151 days (5 months) unless accompanied by a licensed driver at least 21 years old. A violation suspends the provisional license and resets the 18-month clock.",
    explain_why_fa: "ماده ۱۶-۱۱۳ مریلند مشخص می‌کند که رانندگان مشروط زیر ۱۸ سال در ۱۵۱ روز اول (۵ ماه) حق سوار کردن افراد غیر خانواده زیر ۱۸ سال را ندارند. تخلف از این قانون باعث تعلیق و صفر شدن دوره ۱۸ ماهه می‌شود.",
    statute_reference: "MD Transp. Code § 16-113(d)(2) - Provisional Passenger Restrictions",
    instructor_tip: "Parent Reassurance: This law drastically prevents peer-pressure distractions, keeping teen drivers focused during their most vulnerable driving months."
  },
  {
    id: "q_hands_free_cellphone_md",
    question_en: "What are the legal restrictions regarding cell phones and handheld electronic devices for drivers in Maryland?",
    question_fa: "محدودیت‌های قانونی در مورد استفاده از تلفن همراه و وسایل الکترونیکی در حین رانندگی در مریلند چیست؟",
    state_tag: "Maryland MVA",
    options_en: [
      "Texting is allowed at red lights; talking is allowed anywhere.",
      "Maryland completely bans handheld cell phone use while driving; for drivers under 18 or provisional holders, ALL cell phone use (including hands-free/Bluetooth) is strictly prohibited.",
      "Cell phones may be held in hand as long as speakerphone is used.",
      "There are no cell phone laws on local residential streets."
    ],
    options_fa: [
      "پیامک زدن پشت چراغ قرمز مجاز است و صحبت کردن در همه جا آزاد است.",
      "مریلند استفاده از موبایل در دست را برای همه رانندگان کاملاً ممنوع کرده؛ برای رانندگان زیر ۱۸ سال و دارندگان پرمیت و گواهینامه مشروط، هرگونه استفاده از موبایل حتی هندزفری بلوتوث ۱۰۰٪ ممنوع است.",
      "گرفتن گوشی در دست به شرط استفاده از اسپیکر مجاز است.",
      "در خیابان‌های فرعی مسکونی قانونی برای موبایل وجود ندارد."
    ],
    correct_index: 1,
    explain_why_en: "Under MD Transp. Code § 21-1124.1 & § 21-1124.2, Maryland enforces primary handheld cell phone bans. For learner's permit and provisional license holders, ANY wireless communication device usage (even hands-free voice commands) is illegal while driving, punishable by points and 90-day suspension.",
    explain_why_fa: "ماده ۲۱-۱۱۲۴ مریلند استفاده دستی از موبایل را برای همه رانندگان جرم می‌داند. برای دارندگان پرمیت و گواهینامه مشروط، حتی استفاده از هندزفری و بلوتوث نیز تخلف بحرانی بوده و ۹۰ روز تعلیق دارد.",
    statute_reference: "MD Transp. Code § 21-1124 - Cell Phone Prohibition for Novice Drivers",
    instructor_tip: "Sam's Glovebox Rule: Put your phone inside the glove compartment before starting the engine. Zero distraction equals zero anxiety and flawless focus!"
  },
  {
    id: "q_parallel_parking_curb_distance",
    question_en: "When parallel parking in Maryland, what is the maximum legal distance your vehicle's wheels can be from the curb, and what causes an immediate MVA failure?",
    question_fa: "در پارک دوبل (Parallel Parking) مریلند، حداکثر فاصله قانونی چرخ‌های خودرو تا جدول چقدر است و چه چیزی باعث ردی فوری در آزمون MVA می‌شود؟",
    state_tag: "Maryland MVA",
    options_en: [
      "Within 36 inches; touching the curb is ignored.",
      "Within 12 inches (1 foot) of the curb; touching, bumping, or climbing the curb is an instant failure.",
      "Within 24 inches as long as emergency hazards are flashing.",
      "Any distance is permitted as long as the engine is turned off."
    ],
    options_fa: [
      "تا ۳۶ اینچ (حدود ۱ متر)؛ تماس با جدول نادیده گرفته می‌شود.",
      "حداکثر ۱۲ اینچ (۳۰ سانتی‌متر) از جدول؛ هرگونه برخورد، سایش یا بالا رفتن از جدول باعث ردی فوری و خودکار است.",
      "تا ۲۴ اینچ به شرط روشن بودن چراغ‌های فلاشر.",
      "هر فاصله‌ای مجاز است به شرطی که موتور ماشین خاموش شود."
    ],
    correct_index: 1,
    explain_why_en: "Maryland Transportation Code § 21-1004 requires vehicles parked parallel to be within 12 inches of the right-hand curb or edge of roadway. In the Gaithersburg and White Oak MVA road skills tests, touching the curb or cones at any point during parallel parking results in immediate disqualification.",
    explain_why_fa: "ماده ۲۱-۱۰۰۴ مریلند الزام می‌کند که خودرو در پارک دوبل حداکثر ۱۲ اینچ (۳۰ سانتی‌متر) با جدول فاصله داشته باشد. در آزمون شهر MVA در گیترزبرگ و وایت اوک، هرگونه تماس با جدول یا مخروط‌ها منجر به ردی آنی در آزمون می‌گردد.",
    statute_reference: "MD Transp. Code § 21-1004 - Parallel Parking Distance to Curb",
    instructor_tip: "Sam's Visual Marker: Align your rear bumper with the adjacent car's bumper, turn wheel full lock at 45 degrees, and stop smoothly before ever touching the curb."
  },
  {
    id: "q_parking_distances_hydrant_crosswalk",
    question_en: "What are the legal Maryland parking distance minimums from a fire hydrant, a crosswalk, and a stop sign?",
    question_fa: "حداقل فواصل قانونی مجاز برای پارک خودرو از شیر آتش‌نشانی، گذرگاه عابر پیاده و تابلوی ایست در مریلند چقدر است؟",
    state_tag: "Maryland MVA",
    options_en: [
      "5 feet from hydrant, 10 feet from crosswalk, 15 feet from stop sign.",
      "15 feet from a fire hydrant, 20 feet from a crosswalk, and 30 feet from a stop sign or traffic control signal.",
      "50 feet from all public fixtures unconditionally.",
      "10 feet from hydrant, 10 feet from crosswalk, and 10 feet from stop sign."
    ],
    options_fa: [
      "۵ فوت از شیر آتش‌نشانی، ۱۰ فوت از خط عابر، ۱۵ فوت از تابلوی ایست.",
      "۱۵ فوت (۴.۵ متر) از شیر آتش‌نشانی، ۲۰ فوت (۶ متر) از خط عابر پیاده، و ۳۰ فوت (۹ متر) از تابلوی ایست یا چراغ راهنمایی.",
      "۵۰ فوت از تمام علائم شهری بدون استثنا.",
      "۱۰ فوت از شیر آتش‌نشانی، ۱۰ فوت از خط عابر و ۱۰ فوت از تابلوی ایست."
    ],
    correct_index: 1,
    explain_why_en: "Under MD Transp. Code § 21-1003, parking is strictly prohibited within 15 feet of a fire hydrant, within 20 feet of a crosswalk at an intersection, within 30 feet of any stop sign or traffic flashing signal, and within 50 feet of a railroad crossing. Violations carry heavy fines and vehicle towing in Montgomery County.",
    explain_why_fa: "طبق ماده ۲۱-۱۰۰۳ مریلند، پارک کردن در فواصل کمتر از ۱۵ فوت از شیر آتش‌نشانی، ۲۰ فوت از گذرگاه عابر، ۳۰ فوت از تابلوی ایست یا چراغ راهنمایی، و ۵۰ فوت از ریل قطار اکیداً ممنوع بوده و مشمول جریمه سنگین و حمل با جرثقیل در مانتگامری کانتی است.",
    statute_reference: "MD Transp. Code § 21-1003 - Prohibited Stopping, Standing, and Parking Distances",
    instructor_tip: "Memory Hack: 15-20-30-50! 15 for Hydrant (Water), 20 for Walk (Crosswalk), 30 for Stop sign, 50 for Railroad track."
  },
  {
    id: "q_hill_parking_wheels_direction",
    question_en: "When parking uphill on a street with a curb in Maryland, in which direction must you turn your front wheels?",
    question_fa: "هنگام پارک در سربالایی خیابانی که دارای جدول (Curb) است در مریلند، چرخ‌های جلو باید به کدام سمت چرخانده شوند؟",
    state_tag: "Tri-State Universal",
    options_en: [
      "Straight ahead parallel to the curb.",
      "Turn wheels sharply LEFT (away from the curb) so the back of the tire rests against the curb if brakes fail.",
      "Turn wheels sharply RIGHT (toward the curb).",
      "Direction does not matter as long as emergency brake is engaged."
    ],
    options_fa: [
      "مستقیم رو به جلو موازی با جدول.",
      "چرخ‌ها کاملاً به سمت چپ (دور از جدول) چرخانده شوند تا در صورت خلاص شدن، پشت لاستیک به لبه جدول تکیه کند.",
      "چرخ‌ها کاملاً به سمت راست (به طرف جدول) چرخانده شوند.",
      "جهت چرخ‌ها اهمیتی ندارد فقط ترمز دستی کشیده شود."
    ],
    correct_index: 1,
    explain_why_en: "Maryland handbook dictates: 'Uphill with curb = Turn wheels LEFT (Away from curb)'. If vehicle rolls backward, front wheels pivot into curb barrier. In all other scenarios (Downhill with curb, Uphill WITHOUT curb, Downhill WITHOUT curb), turn wheels RIGHT toward roadside edge.",
    explain_why_fa: "قانون مریلند تصریح می‌کند: سربالایی با جدول = چرخ‌ها به سمت چپ (دور از جدول). در این حالت در صورت حرکت خودرو، لبه عقب لاستیک به جدول گیر می‌کند. در بقیه تمام حالات (سرازیری با جدول یا بدون جدول)، چرخ‌ها باید به راست چرخیده شوند.",
    statute_reference: "MD Driver's Handbook - Parking on Hills & Incline Safety",
    instructor_tip: "UCLA Acronym: 'Up Curb, Left Always' (UCLA). In every other hill parking situation, turn wheels to the right!"
  },
  {
    id: "q_hydroplaning_prevention_recovery",
    question_en: "If your car starts hydroplaning at speeds over 35 mph on a wet road, what is the exact recovery procedure?",
    question_fa: "اگر خودرو در سرعت بالای ۳۵ مایل بر روی آسفالت خیس دچار پدیده هیدروپلنینگ (سر خوردن روی لایه آب) شود، اقدام صحیح و دقیق چیست؟",
    state_tag: "Maryland MVA",
    options_en: [
      "Slam hard on the brake pedal and pull the emergency parking brake.",
      "Gently ease your foot off the accelerator, keep the steering wheel straight, and do NOT slam on the brakes until tires regain traction.",
      "Turn the steering wheel rapidly back and forth to splash water away.",
      "Accelerate immediately to force water under tires to disperse."
    ],
    options_fa: [
      "ترمز را با تمام قدرت فشار داده و ترمز دستی را بکشید.",
      "به آرامی پا را از روی پدال گاز بردارید، فرمان را کاملاً مستقیم نگه دارید و هرگز ترمز ناگهانی نزنید تا چرخ‌ها دوباره با آسفالت درگیر شوند.",
      "فرمان را سریعاً به چپ و راست تکان دهید تا آب کنار برود.",
      "فوراً گاز دهید تا سرعت باعث خروج آب از زیر تایرها شود."
    ],
    correct_index: 1,
    explain_why_en: "Hydroplaning occurs when water creates a cushion between tires and road, destroying all traction. Slamming brakes or sudden steering inputs triggers violent spins and rollovers. Drivers must ease off the accelerator, maintain smooth straight steering, and allow natural deceleration to restore tire contact.",
    explain_why_fa: "هیدروپلنینگ زمانی رخ می‌دهد که لایه‌ای از آب بین لاستیک و آسفالت قرار گرفته و اصطکاک را صفر می‌کند. ترمز ناگهانی باعث چرخش مرگبار خودرو به دور خود می‌شود. راننده باید پا را از روی گاز برداشته، فرمان را مستقیم نگه دارد تا با کاهش سرعت چرخ‌ها دوباره با زمین تماس پیدا کنند.",
    statute_reference: "MD Driver Handbook - Wet Weather & Hydroplaning Dynamics",
    instructor_tip: "Sam's Calming Mantra: 'No Brake, No Jerk, Smooth Drift'. In Rockville heavy summer rainstorms on Route 355, drive 5-10 mph below the limit."
  },
  {
    id: "q_skid_fishtail_recovery",
    question_en: "If the rear of your vehicle begins skidding (fishtailing) to the right on an icy or slippery Rockville road, how must you steer?",
    question_fa: "اگر عقب خودرو در یک خیابان لغزنده یا یخ‌زده در راکویل به سمت راست سر بخورد (Fishtail)، چگونه باید فرمان را هدایت کنید؟",
    state_tag: "Maryland MVA",
    options_en: [
      "Steer sharply to the opposite direction (to the left) while applying full brake.",
      "Take your foot off pedals and steer gently in the direction of the skid (to the right) until the vehicle straightens.",
      "Hit the gas pedal to power through the turn.",
      "Put the car in neutral and turn off the ignition."
    ],
    options_fa: [
      "فرمان را به شدت به سمت مخالف (چپ) بچرخانید و محکم ترمز بگیرید.",
      "پا را از روی تمام پدال‌ها بردارید و فرمان را به آرامی در جهت سر خوردن عقب ماشین (به سمت راست) هدایت کنید تا خودرو تعادل یابد.",
      "گاز دهید تا خودرو با قدرت از پیچ عبور کند.",
      "دنده را خلاص کرده و سوئیچ خودرو را ببندید."
    ],
    correct_index: 1,
    explain_why_en: "When recovering from a skid, never brake abruptly because locked wheels lose all directional steering control. Release accelerator and steer smoothly in the direction you want the front of the vehicle to go (which matches the direction the rear is skidding). Overcorrecting causes secondary snap-skids.",
    explain_why_fa: "هنگام سر خوردن عقب خودرو، هرگز ترمز نزنید زیرا قفل شدن چرخ‌ها هدایت فرمان را ناممکن می‌کند. پا را از گاز برداشته و فرمان را آرام در همان جهت انحراف عقب بچرخانید تا چرخ‌های جلو در راستای حرکت قرار گیرند.",
    statute_reference: "Maryland MVA Driving Manual - Skids & Loss of Traction Recovery",
    instructor_tip: "Instructor Reassurance: In our dual-control training vehicles, we coach you on smooth skid corrections so you feel calm and in total control on snow or rain."
  },
  {
    id: "q_speed_limits_maryland",
    question_en: "What are the standard Maryland statutory speed limits in school zones, residential districts, divided highways, and interstate freeways?",
    question_fa: "حدود مجاز قانونی سرعت در مریلند در مناطق مدارس، خیابان‌های مسکونی، بزرگراه‌های چندبانده و اتوبان‌های بین ایالتی چقدر است؟",
    state_tag: "Maryland MVA",
    options_en: [
      "School: 10 mph; Residential: 15 mph; Divided: 40 mph; Interstate: 50 mph.",
      "School: 20-25 mph; Residential: 25-30 mph; Divided Highways: 55 mph; Interstate Freeways: 65-70 mph (unless posted otherwise).",
      "55 mph across all zones unconditionally.",
      "Residential: 45 mph; School: 35 mph; Interstate: 85 mph."
    ],
    options_fa: [
      "مدارس: ۱۰ مایل؛ مسکونی: ۱۵ مایل؛ بزرگراه: ۴۰ مایل؛ اتوبان: ۵۰ مایل.",
      "مدارس: ۲۰ تا ۲۵ مایل؛ مسکونی: ۲۵ تا ۳۰ مایل؛ بزرگراه‌های مجزا: ۵۵ مایل؛ اتوبان‌های بین ایالتی: ۶۵ تا ۷۰ مایل (مگر تابلو خلاف آن را مشخص کند).",
      "۵۵ مایل در تمام مناطق بدون استثنا.",
      "مسکونی: ۴۵ مایل؛ مدارس: ۳۵ مایل؛ اتوبان: ۸۵ مایل."
    ],
    correct_index: 1,
    explain_why_en: "Under MD Transp. Code § 21-801.1, statutory maximum limits apply unless otherwise posted: 20-25 mph in school zones (strictly enforced by automated cameras), 25-30 mph in residential districts, 50-55 mph on divided non-interstate highways, and up to 65-70 mph on designated rural interstates.",
    explain_why_fa: "طبق ماده ۲۱-۸۰۱.۱ مریلند، حداکثر سرعت قانونی در صورت نبود تابلو شامل ۲۰-۲۵ مایل در محدوده مدارس (تحت نظارت دوربین‌های خودکار)، ۲۵-۳۰ مایل در محله‌های مسکونی، ۵۵ مایل در بزرگراه‌های تفکیک‌شده و تا ۶۵-۷۰ مایل در اتوبان‌های بین ایالتی است.",
    statute_reference: "MD Transp. Code § 21-801.1 - Maximum Speed Limits",
    instructor_tip: "School Zone Gotcha: Montgomery County school zone cameras operate with zero leniency—always maintain 20 mph when school beacon lights are flashing!"
  },
  {
    id: "q_implied_consent_breathalyzer",
    question_en: "Under Maryland's 'Implied Consent' law, what is the mandatory penalty if a driver arrested on suspicion of DUI refuses to submit to a chemical breathalyzer test?",
    question_fa: "طبق قانون 'رضایت ضمنی' (Implied Consent) مریلند، اگر راننده‌ای که به ظن رانندگی تحت تاثیر الکل بازداشت شده از تست الکل تنفسی خودداری کند، چه مجازاتی دارد؟",
    state_tag: "Maryland MVA",
    options_en: [
      "A simple $25 parking fine with no license action.",
      "Automatic mandatory 270-day driver's license suspension for a first offense (2 years for second offense).",
      "Immediate vehicle forfeiture without trial.",
      "Nothing happens if the driver has an out-of-state license."
    ],
    options_fa: [
      "فقط یک جریمه نقدی ۲۵ دلاری بدون هیچ تاثیری بر گواهینامه.",
      "تعلیق اجباری و خودکار گواهینامه به مدت ۲۷۰ روز (۹ ماه) برای بار اول و ۲ سال برای بار دوم.",
      "توقیف و مصادره فوری خودرو بدون تشکیل دادگاه.",
      "اگر راننده گواهینامه ایالت دیگری داشته باشد هیچ اتفاقی نمی‌افتد."
    ],
    correct_index: 1,
    explain_why_en: "Under MD Transp. Code § 16-205.1, by driving on Maryland roads, drivers give implied consent to chemical alcohol testing. Refusal triggers an immediate administrative suspension of 270 days for a 1st offense (or mandatory 1-year Ignition Interlock participation) regardless of criminal court verdict.",
    explain_why_fa: "طبق ماده ۱۶-۲۰۵.۱ مریلند، هر فردی با رانندگی در جاده‌های مریلند رضایت ضمنی خود را برای انجام تست الکل اعلام کرده است. امتناع از تست باعث تعلیق اداری فوری ۲۷۰ روزه گواهینامه در بار اول یا الزام به ۱ سال استفاده از قفل الکل اینترلاک می‌شود.",
    statute_reference: "MD Transp. Code § 16-205.1 - Implied Consent Chemical Test Refusal",
    instructor_tip: "Educational Course: Sam's Driving School provides the official MVA 3-Hour Alcohol and Drug Education certification needed for legal compliance."
  },
  {
    id: "q_flashing_traffic_signals",
    question_en: "What is the exact legal difference between a Flashing Red light and a Flashing Yellow light at a Maryland intersection?",
    question_fa: "تفاوت حقوقی دقیق بین چراغ قرمز چشمک‌زن و چراغ زرد چشمک‌زن در تقاطع‌های مریلند چیست؟",
    state_tag: "Maryland MVA",
    options_en: [
      "Both mean you must speed up to clear the intersection quickly.",
      "Flashing Red = Complete stop required (treat identical to a Stop sign); Flashing Yellow = Slow down, exercise extreme caution, but do not stop unless necessary.",
      "Both require a mandatory 3-minute waiting period.",
      "Flashing Yellow requires a full stop; Flashing Red requires only yielding."
    ],
    options_fa: [
      "هر دو به معنی گاز دادن و تخلیه سریع تقاطع هستند.",
      "قرمز چشمک‌زن = توقف ۱۰۰٪ کامل (مانند تابلوی ایست) و سپس حرکت پس از بررسی راه؛ زرد چشمک‌زن = کاهش سرعت و عبور با احتیاط بدون نیاز به توقف مگر در صورت خطر.",
      "هر دو مستلزم ۳ دقیقه توقف اجباری هستند.",
      "زرد چشمک‌زن به معنی توقف کامل و قرمز چشمک‌زن فقط به معنی رعایت حق تقدم است."
    ],
    correct_index: 1,
    explain_why_en: "Maryland Transp. Code § 21-204 states: A flashing red signal requires drivers to stop completely at the stop line, yield to all cross traffic and pedestrians, and proceed only when clear. A flashing yellow signal instructs drivers to proceed through with caution without a mandatory stop.",
    explain_why_fa: "ماده ۲۱-۲۰۴ مریلند تصریح می‌کند: چراغ قرمز چشمک‌زن حکم تابلوی ایست را دارد و توقف کامل ۱۰۰٪ پشت خط سفید الزامی است. چراغ زرد چشمک‌زن به معنی احتیاط است و نیازی به توقف کامل ندارد مگر برای جلوگیری از برخورد.",
    statute_reference: "MD Transp. Code § 21-204 - Flashing Traffic Signals",
    instructor_tip: "MVA Trap: Rolling through a flashing red light without a complete 3-second stop is graded as running a stop sign—an automatic failure!"
  },
  {
    id: "q_high_beam_headlights_dimming",
    question_en: "At what distances must you legally dim your vehicle's high beam headlights when approaching an oncoming vehicle and when following behind another vehicle?",
    question_fa: "هنگام نزدیک شدن به خودروی روبرو و هنگام حرکت در پشت سر خودروی دیگر در شب، از چه فاصله‌ای موظف به تغییر نور بالا به نور پایین هستید؟",
    state_tag: "Maryland MVA",
    options_en: [
      "50 feet oncoming, 25 feet following.",
      "Within 500 feet of an oncoming vehicle, and within 300 feet when following behind another vehicle.",
      "1,000 feet in all situations.",
      "High beams are never allowed in Maryland under any circumstances."
    ],
    options_fa: [
      "۵۰ فوت از خودروی روبرو و ۲۵ فوت از خودروی پشت سر.",
      "حداقل از ۵۰۰ فوت (۱۵۰ متر) قبل از خودروی روبرو، و از ۳۰۰ فوت (۹۰ متر) هنگام حرکت در پشت سر خودروی دیگر.",
      "۱۰۰۰ فوت در تمام حالات.",
      "نور بالا در مریلند تحت هیچ شرایطی مجاز نیست."
    ],
    correct_index: 1,
    explain_why_en: "Under MD Transp. Code § 22-223, drivers must dim high beams to low beams whenever approaching an oncoming vehicle within 500 feet, or when following within 300 feet to the rear of another vehicle to prevent blinding glare in their mirrors.",
    explain_why_fa: "طبق ماده ۲۲-۲۲۳ مریلند، راننده موظف است نور بالا را حداقل از فاصله ۵۰۰ فوتی خودروی روبرو و ۳۰۰ فوتی خودروی جلویی به نور پایین تغییر دهد تا از کوری موقت و تابش شدید در آینه‌ها جلوگیری شود.",
    statute_reference: "MD Transp. Code § 22-223 - Multiple-Beam Road-Lighting Equipment & Dimming",
    instructor_tip: "Night Glare Tip: If an oncoming car forgets to dim their high beams, look toward the solid white fog line on the right edge of the road to protect your night vision."
  },
  {
    id: "q_three_point_turn_procedure",
    question_en: "During the MVA Three-Point Turn (K-Turn) maneuver, what is the mandatory sequence of actions to pass without penalty?",
    question_fa: "در مانور دور سه فرمان (Three-Point Turn / K-Turn) آزمون MVA، توالی صحیح و الزامی اقدامات برای قبولی بدون کسر نمره چیست؟",
    state_tag: "Maryland MVA",
    options_en: [
      "Accelerate quickly across the street without signaling or looking.",
      "1) Signal right & pull to curb. 2) Signal left, 360-degree traffic check. 3) Turn sharp left across road. 4) Shift to Reverse, look over right shoulder, back toward right curb. 5) Shift to Drive, check traffic, proceed forward.",
      "Perform a full U-turn in one continuous motion over the sidewalk.",
      "Reverse the entire length of the street without turning the wheels."
    ],
    options_fa: [
      "بدون راهنما یا نگاه به اطراف، سریعاً در عرض خیابان گاز دهید.",
      "۱) راهنمای راست و توقف کنار جدول. ۲) راهنمای چپ و بررسی ۳۶۰ درجه ترافیک. ۳) حرکت به منتهی‌الیه چپ. ۴) دنده عقب، نگاه فیزیکی از شیشه عقب و چرخش فرمان به راست. ۵) دنده D و ادامه مسیر.",
      "دور زدن یک‌باره از روی پیاده‌رو بدون توقف.",
      "دنده عقب رفتن در تمام طول خیابان بدون چرخاندن فرمان."
    ],
    correct_index: 1,
    explain_why_en: "The Three-Point Turn evaluates observation, signaling, spatial judgment, and vehicle control on narrow roadways. Failing to signal, failing to turn your head before reversing, or striking the curb during any of the three points causes failure.",
    explain_why_fa: "دور سه فرمان تسلط راننده در خیابان‌های باریک را می‌سنجد. عدم زدن راهنما در هر مرحله، نگاه نکردن مستقیم به عقب در حین دنده عقب یا تماس لاستیک با جدول در هر یک از ۳ مرحله باعث ردی آزمون می‌شود.",
    statute_reference: "Maryland MVA Driver Skills Test Guide - Section 3: Turning Maneuvers",
    instructor_tip: "Sam's Psychology Breathing: Pause and breathe at each gear shift (D to R, R to D). Moving smoothly at 2 mph gives you 100% control!"
  },
  {
    id: "q_railroad_crossing_safety",
    question_en: "When approaching a railroad crossing with flashing red signals or descending gates, what is the legal stopping distance in Maryland?",
    question_fa: "هنگام نزدیک شدن به تقاطع راه‌آهن با چراغ‌های چشمک‌زن قرمز یا پایین آمدن گیت، حداقل و حداکثر فاصله قانونی توقف در مریلند چقدر است؟",
    state_tag: "Tri-State Universal",
    options_en: [
      "Stop 1 foot from the nearest track.",
      "Stop between 15 feet and 50 feet from the nearest rail, and do NOT proceed around or under gates.",
      "Drive across quickly before the gate fully closes.",
      "Stop 200 feet away on the shoulder of the road."
    ],
    options_fa: [
      "در فاصله ۱ فوتی از نزدیک‌ترین ریل بایستید.",
      "بین ۱۵ تا ۵۰ فوت (۴.۵ تا ۱۵ متر) از نزدیک‌ترین ریل توقف کامل کنید و هرگز از زیر یا کنار گیت‌ها عبور نکنید.",
      "سریعاً گاز دهید تا قبل از بسته شدن کامل گیت رد شوید.",
      "در فاصله ۲۰۰ فوتی در شانه خاکی توقف کنید."
    ],
    correct_index: 1,
    explain_why_en: "Under MD Transp. Code § 21-701, when warning signals indicate an approaching train, drivers must stop between 15 and 50 feet from the nearest rail. Driving around closed crossing gates is a severe moving violation punishable by heavy fines, license suspension, and lethal risk.",
    explain_why_fa: "طبق ماده ۲۱-۷۰۱ مریلند، هنگام فعال شدن علائم عبور قطار، توقف در فاصله ۱۵ تا ۵۰ فوت از نزدیک‌ترین ریل الزامی است. عبور از کنار یا زیر گیت‌های بسته تخلف بسیار سنگین با خطر جانی، جریمه و تعلیق گواهینامه است.",
    statute_reference: "MD Transp. Code § 21-701 - Obedience to Railroad Signal Devices",
    instructor_tip: "Golden Rule: Always expect a train on any track at any time in either direction. Never stop with any part of your car over the tracks in traffic!"
  },
  {
    id: "q_mva_pretrip_vehicle_inspection",
    question_en: "Before the MVA road examiner enters the vehicle at Gaithersburg or White Oak, what vehicle inspection must be passed, or the test is canceled?",
    question_fa: "قبل از سوار شدن ممتحن MVA در مراکز گیترزبرگ یا وایت اوک، خودروی شما باید چه بازرسی ایمنی را پاس کند وگرنه آزمون بلافاصله لغو می‌شود؟",
    state_tag: "Maryland MVA",
    options_en: [
      "Only the stereo sound system volume.",
      "Operational brake lights (including third middle brake light), turn signals, horn, mirrors, tire tread, clean windshield (no cracks), valid registration & insurance card.",
      "Only the brand new paint color.",
      "The car must have luxury leather seats."
    ],
    options_fa: [
      "فقط میزان صدای سیستم صوتی ماشین.",
      "چراغ‌های ترمز (از جمله چراغ سوم وسط)، راهنماها، بوق، آینه‌ها، عاج لاستیک‌ها، شیشه بدون ترک در دید راننده، کارت رجیستریشن معتبر و بیمه‌نامه معتبر مریلند.",
      "فقط رنگ بدنه بدون خط و خش.",
      "خودرو حتماً باید روکش چرم لوکس داشته باشد."
    ],
    correct_index: 1,
    explain_why_en: "Maryland MVA requires all vehicles used for the skills test to be fully roadworthy. If a single brake light bulb or turn signal is out, tires are bald, or insurance paperwork is missing, the test is instantly canceled and your appointment is lost.",
    explain_why_fa: "MVA مریلند الزام می‌کند خودروی آزمون کاملاً استاندارد باشد. در صورت سوختن حتی یک لامپ ترمز یا راهنما، ساییدگی لاستیک یا نبود مدارک بیمه و رجیستریشن، آزمون فوراً لغو شده و نوبت داوطلب از دست می‌رود.",
    statute_reference: "Maryland MVA Skills Test Checklist - Vehicle Safety Requirements",
    instructor_tip: "Sam's Service: Rent our certified dual-control vehicle for your MVA test with a 45-minute pre-test warm-up ($140) to guarantee 100% vehicle compliance!"
  },
  {
    id: "q_sams_36hr_program_curriculum",
    question_en: "What are the exact state requirements to complete the Maryland 36-Hour Driver's Education Program at Sam's Driving School?",
    question_fa: "شرایط و الزامات رسمی ایالت مریلند برای تکمیل موفقیت‌آمیز دوره ۳۶ ساعته آموزش رانندگی در آموزشگاه سام چیست؟",
    state_tag: "Maryland MVA",
    category: "curriculum_services",
    category_label_en: "36-Hour Drivers Ed & Programs",
    category_label_fa: "دوره ۳۶ ساعته و خدمات آموزشگاه",
    options_en: [
      "15 hours of video watching only with no driving.",
      "30 hours of classroom instruction + 6 hours of individual Behind-the-Wheel (BTW) training, as mandated by the Maryland Graduated Licensing System (GLS).",
      "36 hours of parking lot driving with no classroom.",
      "Only taking a 10-minute online quiz."
    ],
    options_fa: [
      "فقط ۱۵ ساعت تماشای ویدیو بدون رانندگی عملی.",
      "۳۰ ساعت آموزش کلاسی + ۶ ساعت آموزش عملی فردی پشت فرمان (BTW)، طبق الزام سیستم گواهینامه مرحله‌ای (GLS) مریلند.",
      "۳۶ ساعت رانندگی در پارکینگ بدون هیچ کلاس تئوری.",
      "تنها شرکت در یک آزمون اینترنتی ۱۰ دقیقه‌ای."
    ],
    correct_index: 1,
    explain_why_en: "Per the official Maryland MVA driver education curriculum preface, the Graduated Licensing System (GLS) mandates a minimum of 30 hours of classroom instruction plus a minimum of 6 hours of individual behind-the-wheel instruction before a first noncommercial license. Sam's Driving School delivers this 30+6 structure. (An earlier version of this flashcard added a specific '80% passing grade' and a '10-day evening Zoom' format — those details could not be confirmed in the official curriculum and have been removed; confirm current exam-passing requirements and course scheduling format directly with the MVA/COMAR before publishing.)",
    explain_why_fa: "طبق مقدمه کوریکولوم رسمی آموزش رانندگی MVA مریلند، سیستم گواهینامه مرحله‌ای (GLS) حداقل ۳۰ ساعت آموزش کلاسی و حداقل ۶ ساعت آموزش عملی فردی پشت فرمان را قبل از دریافت اولین گواهینامه غیرتجاری الزامی می‌کند. آموزشگاه سام همین ساختار ۳۰+۶ را اجرا می‌کند. (نسخه قبلی این فلش‌کارت عدد «نمره قبولی ۸۰٪» و فرمت «۱۰ روز کلاس عصرانه زوم» را اضافه کرده بود — این جزئیات در کوریکولوم رسمی تایید نشد و حذف شد؛ الزامات دقیق نمره قبولی و فرمت دوره را از MVA/COMAR قبل از انتشار تایید کنید.)",
    statute_reference: "Maryland GLS — 30hr classroom + 6hr BTW per curriculum Preface; verify exact COMAR citation and passing-grade requirement with MVA",
    instructor_tip: "Sam's Scheduling: Finish your 10-day Zoom course first; your BTW lessons are scheduled smoothly immediately after to lock in muscle memory!"
  },
  {
    id: "q_mva_road_test_warmup_rental",
    question_en: "Why does booking Sam's MVA Road Test Car Rental with the 45-minute pre-test warm-up ($140) dramatically boost first-time pass rates at Gaithersburg & White Oak?",
    question_fa: "چرا اجاره خودروی تایید شده آموزشگاه سام به همراه ۴۵ دقیقه تمرین قبل از آزمون ($140) در شعب گیترزبرگ و وایت اوک درصد قبولی بار اول را به شدت بالا می‌برد؟",
    state_tag: "Maryland MVA",
    category: "curriculum_services",
    category_label_en: "36-Hour Drivers Ed & Programs",
    category_label_fa: "دوره ۳۶ ساعته و خدمات آموزشگاه",
    options_en: [
      "It allows you to skip the backing maneuver test entirely.",
      "You rehearse the 50-ft straight backing and 2-point stall maneuvers in the exact certified car minutes before testing, perform anxiety-reduction breathing, and guarantee 100% pre-trip inspection compliance.",
      "The examiner gives you automatic bonus points for having a school decal.",
      "You do not need to bring your learner's permit."
    ],
    options_fa: [
      "به شما اجازه می‌دهد مانور دنده عقب را کلاً انجام ندهید.",
      "شما دقیقاً دقایقی قبل از تست مانورهای دنده عقب ۵۰ فوت و پارک دو نقطه‌ای را در همان خودرو مرور می‌کنید، تنفس ضد استرس را تمرین کرده و قبولی ۱۰۰٪ بازرسی اولیه فنی خودرو را تضمین می‌نمایید.",
      "ممتحن به خاطر برچسب آموزشگاه به صورت خودکار نمره ارفاقی می‌دهد.",
      "نیازی به همراه داشتن کارت پرمیت در روز تست نخواهید داشت."
    ],
    correct_index: 1,
    explain_why_en: "Over 50% of test failures occur due to vehicle inspection paperwork/light rejections or nervous mistakes during the first 3 minutes of maneuvers. The 45-minute warm-up primes your spatial judgment for the testing cones, calms sympathetic nervous system jitters, and provides a 100% MVA-approved dual-control vehicle.",
    explain_why_fa: "بیش از ۵۰٪ مردودی‌های آزمون به دلیل نقص فنی چراغ‌های خودروی شخصی یا استرس شدید در ۳ دقیقه اول مانورهاست. ۴۵ دقیقه تمرین قبل از تست در آموزشگاه سام تمرکز فضایی شما را روی مخروط‌ها تنظیم کرده، استرس را خنثی ساخته و خودرویی کاملاً استاندارد و تایید شده MVA در اختیارتان می‌گذارد.",
    statute_reference: "Maryland MVA Driver Skills Test Testing Protocols",
    instructor_tip: "Warm-Up Advantage: Practicing adjacent to the actual MVA bays right before the examiner calls your name transforms anxiety into rock-solid confidence!"
  },
  {
    id: "q_psychology_physiological_sigh",
    question_en: "How does Sam's 'Physiological Sigh' breathing protocol rapidly eliminate driving test panic and tachycardia behind the wheel?",
    question_fa: "تکنیک 'تنفس فیزیولوژیک' آموزشگاه سام چگونه تپش قلب و وحشت ناشی از استرس امتحان رانندگی را در چند ثانیه از بین می‌برد؟",
    state_tag: "Maryland MVA",
    category: "psychology_anxiety",
    category_label_en: "Sam's Psychology & Anxiety Relief",
    category_label_fa: "روان‌شناسی آرامش و غلبه بر اضطراب سام",
    options_en: [
      "By holding your breath for 60 seconds until you feel dizzy.",
      "By taking two rapid inhales through the nose (deep inhale + quick top-off) followed by a long, slow 6-8 second exhale through the mouth, stimulating the vagus nerve to drop heart rate within 20 seconds.",
      "By breathing into a brown paper bag while pressing the accelerator.",
      "By hyperventilating rapidly before shifting into Drive."
    ],
    options_fa: [
      "با حبس کردن نفس به مدت ۶۰ ثانیه تا احساس سرگیجه دست دهد.",
      "با دو دم سریع و پشت‌سرهم از بینی (دم اول عمیق + دم دوم تکمیلی) و یک بازدم بسیار آرام و طولانی ۶ تا ۸ ثانیه‌ای از دهان، که عصب واگ را تحریک کرده و ضربان قلب را ظرف ۲۰ ثانیه پایین می‌آورد.",
      "با تنفس در پاکت کاغذی در حین گاز دادن.",
      "با تنفس‌های تند و پشت‌سرهم قبل از گذاشتن دنده روی D."
    ],
    correct_index: 1,
    explain_why_en: "Developed in neuroscience and taught by Sam (B.S. in Psychology), the Physiological Sigh is the fastest autonomous nervous system reset known. It reinflates collapsed lung alveoli, rapidly offloads CO2, and triggers the parasympathetic vagal brake, lowering heart rate and expanding peripheral vision by 40%.",
    explain_why_fa: "تکنیک تنفس فیزیولوژیک که توسط سام (کارشناس روان‌شناسی) آموزش داده می‌شود، سریع‌ترین روش بازنشانی سیستم عصبی خودمختار است. این تنفس با تخلیه سریع دی‌اکسید کربن و تحریک عصب واگ، تپش قلب را پایین آورده و دید محیطی راننده را تا ۴۰٪ گسترش می‌دهد.",
    statute_reference: "Behavioral Neuroscience of Driver Performance & Somatic Regulation",
    instructor_tip: "Pre-Test Ritual: Do 3 physiological sighs while sitting in the parking spot before turning the key. Your brain will switch instantly from panic to laser focus!"
  },
  {
    id: "q_psychology_vocalized_confirmation",
    question_en: "What is the cognitive benefit of 'Vocalized Confirmation' (narrating your driving maneuvers aloud) during the MVA road exam?",
    question_fa: "فایده شناختی 'تایید کلامی' (بلند زمزمه کردن مراحل رانندگی) در حین آزمون عملی شهر MVA چیست؟",
    state_tag: "Maryland MVA",
    category: "psychology_anxiety",
    category_label_en: "Sam's Psychology & Anxiety Relief",
    category_label_fa: "روان‌شناسی آرامش و غلبه بر اضطراب سام",
    options_en: [
      "It confuses the examiner into grading faster.",
      "It activates the prefrontal cortex and suppresses the amygdala, preventing panic-induced freezing while proving total situational awareness to the examiner.",
      "It replaces the legal requirement to use your turn signals.",
      "It is strictly forbidden by MVA examiners and leads to immediate disqualification."
    ],
    options_fa: [
      "باعث سردرگمی ممتحن و عجله او در نمره‌دهی می‌شود.",
      "کورتکس جلوی مغز را فعال نگه داشته و مرکز ترس (آمیگدال) را مهار می‌کند، از قفل شدن ذهن در اثر استرس جلوگیری کرده و تسلط کامل شما را به ممتحن اثبات می‌نماید.",
      "نیاز قانونی به زدن چراغ راهنما را از بین می‌برد.",
      "توسط ممتحنان اکیداً ممنوع بوده و باعث ردی درجا می‌شود."
    ],
    correct_index: 1,
    explain_why_en: "Anxiety causes the amygdala to trigger a freeze response, causing students to forget simple steps like checking blind spots. Vocalizing actions softly ('Stop line secured, pedestrian scan clear, signaling right') keeps the rational prefrontal cortex engaged and reassures the examiner of your active vigilance.",
    explain_why_fa: "استرس شدید باعث قفل شدن آمیگدال مغز می‌شود که نتیجه آن فراموش کردن کارهای ساده مثل نقطه کور است. با زمزمه آرام مراحل («خط ایست رعایت شد، عابر پیاده نبود، راهنمای راست»)، بخش منطقی مغز بیدار مانده و به ممتحن هوشیاری کامل شما اثبات می‌شود.",
    statute_reference: "Cognitive Behavioral Anxiety Intervention in Motor Task Execution",
    instructor_tip: "Sam's Whisper Formula: Speak your checks softly: 'Mirror check clear, chin to shoulder, smooth turn.' Examiners love hearing confident, disciplined drivers!"
  },
  {
    id: "q_seatbelt_instant_disqualification",
    question_en: "Under Maryland MVA testing rules, at what exact moment does failing to buckle your seatbelt result in instant test disqualification?",
    question_fa: "طبق قوانین آزمون MVA مریلند، نبستن کمربند ایمنی در چه لحظه‌ای باعث رد شدن آنی و لغو آزمون می‌شود؟",
    state_tag: "Maryland MVA",
    category: "instant_fails",
    category_label_en: "Instant Fails & Examiner Gotchas",
    category_label_fa: "خطاهای ردی فوری و تله‌های ممتحن",
    options_en: [
      "Only if you drive onto an interstate highway without it.",
      "Moving the vehicle even one inch (releasing parking brake or shifting into gear and moving) before your seatbelt is clicked securely into the buckle.",
      "Only if you exceed 25 mph.",
      "The examiner will always give three verbal warnings before deducting points."
    ],
    options_fa: [
      "تنها در صورتی که وارد اتوبان‌های بین ایالتی شوید.",
      "حرکت دادن خودرو حتی به اندازه ۲ سانتی‌متر (خلاص کردن ترمز دستی یا جا زدن دنده و حرکت) قبل از آنکه سگک کمربند ایمنی کلیک خورده و بسته شده باشد.",
      "تنها در صورتی که سرعت از ۲۵ مایل فراتر رود.",
      "ممتحن همیشه قبل از کسر نمره ۳ بار تذکر شفاهی می‌دهد."
    ],
    correct_index: 1,
    explain_why_en: "MD Transportation Code § 22-412.3 and MVA skills scoring rubrics dictate that moving the vehicle before fastening the seatbelt is a critical safety violation. The examiner will immediately terminate the test before you even leave the starting parking stall.",
    explain_why_fa: "ماده ۲۲-۴۱۲.۳ مریلند و کتابچه آزمون MVA تاکید دارند که حرکت دادن خودرو قبل از بستن کمربند خطای بحرانی است. ممتحن در همان لحظه آزمون را متوقف کرده و برگه ردی را صادر می‌کند حتی قبل از آنکه از جای پارک خارج شوید.",
    statute_reference: "MD Transp. Code § 22-412.3 & MVA Road Test Instant Disqualification Rules",
    instructor_tip: "Sam's Golden Habit: 1) Sit down. 2) Seatbelt CLICK. 3) Adjust mirrors. 4) Verify examiner is buckled. Never touch the gear shifter until the belt is fastened!"
  },
  {
    id: "q_tristate_supervised_hours_comparison",
    question_en: "How do mandatory supervised practice driving hours compare across Maryland, Virginia, and Washington D.C. for novice drivers?",
    question_fa: "ساعات تمرین اجباری ثبت شده در دفترچه راهنما برای رانندگان تازه‌کار در مریلند، ویرجینیا و دی‌سی چه تفاوتی با یکدیگر دارند؟",
    state_tag: "Tri-State Universal",
    category: "tristate_laws",
    category_label_en: "Tri-State & State Traffic Laws",
    category_label_fa: "قوانین مریلند، دی‌سی و ویرجینیا",
    options_en: [
      "All three jurisdictions require exactly 20 hours.",
      "Maryland requires 60 hours for drivers under 25 (min. 10 night) or 14 hours for drivers 25+; Virginia requires 45 hours (min. 15 night); Washington D.C. requires 40 hours (min. 10 night) — verify VA/DC figures with those states' official sources.",
      "Virginia requires 100 hours; Maryland requires 20 hours; D.C. requires no log book.",
      "Night driving hours are completely optional in all three states."
    ],
    options_fa: [
      "هر سه حوزه دقیقاً به ۲۰ ساعت تمرین نیاز دارند.",
      "مریلند به ۶۰ ساعت (حداقل ۱۰ ساعت در شب) برای زیر ۲۵ سال، یا ۱۴ ساعت برای ۲۵ سال و بالاتر؛ ویرجینیا به ۴۵ ساعت (حداقل ۱۵ ساعت در شب)؛ و واشنگتن دی‌سی به ۴۰ ساعت (حداقل ۱۰ ساعت در شب) نیاز دارد — اعداد ویرجینیا و دی‌سی را از منابع رسمی همان ایالت‌ها تایید کنید.",
      "ویرجینیا ۱۰۰ ساعت، مریلند ۲۰ ساعت و دی‌سی نیازی به ثبت ساعات ندارد.",
      "ساعات رانندگی در شب در هر سه ایالت کاملاً اختیاری است."
    ],
    correct_index: 1,
    explain_why_en: "Per the official Maryland MVA driver education curriculum, Maryland requires 60 total supervised practice hours (at least 10 at night) for drivers under 25 — but only 14 hours for drivers 25 and older. (An earlier version of this flashcard presented 60 hours as universal; the age condition is confirmed directly in the MVA curriculum and has been added.) Virginia's 45-hour and D.C.'s 40-hour figures are outside the scope of the Maryland curriculum and should be verified with each jurisdiction's own official source before publishing.",
    explain_why_fa: "طبق کوریکولوم رسمی آموزش رانندگی MVA مریلند، ۶۰ ساعت تمرین نظارت‌شده (حداقل ۱۰ ساعت در شب) فقط برای رانندگان زیر ۲۵ سال الزامی است — برای ۲۵ سال به بالا فقط ۱۴ ساعت لازم است. (نسخه قبلی این فلش‌کارت عدد ۶۰ ساعت را به‌صورت عمومی ارائه می‌داد؛ این شرط سنی مستقیماً در کوریکولوم MVA تایید شده و اضافه شد.) اعداد ویرجینیا (۴۵ ساعت) و دی‌سی (۴۰ ساعت) خارج از محدوده کوریکولوم مریلند هستند و باید از منبع رسمی همان ایالت تایید بشن.",
    statute_reference: "Maryland MVA Driver Education Curriculum — VA/DC figures unverified, confirm with VA DMV and DC DMV directly",
    instructor_tip: "Log Tip: Keep a clean log book. At Sam's Driving School, our instructors sign off on your official hours during each Behind-the-Wheel lesson!"
  },
  {
    id: "q_tristate_curfew_comparison",
    question_en: "What are the nighttime driving curfew restrictions for provisional drivers under 18 across Maryland, Virginia, and Washington D.C.?",
    question_fa: "محدودیت‌های ساعات منع تردد در شب برای رانندگان دارای گواهینامه مشروط زیر ۱۸ سال در مریلند، ویرجینیا و دی‌سی چیست؟",
    state_tag: "Tri-State Universal",
    category: "tristate_laws",
    category_label_en: "Tri-State & State Traffic Laws",
    category_label_fa: "قوانین مریلند، دی‌سی و ویرجینیا",
    options_en: [
      "Curfews start at 8:00 PM everywhere.",
      "Maryland: 12:00 AM – 5:00 AM; Virginia: 12:00 AM – 4:00 AM; Washington D.C.: 11:00 PM – 6:00 AM (Sun-Thu) & 12:01 AM – 6:00 AM (Fri-Sat).",
      "No curfews exist in the DMV area.",
      "Curfew applies only during summer vacations."
    ],
    options_fa: [
      "منع تردد در همه جا از ساعت ۸ شب آغاز می‌شود.",
      "مریلند: ۱۲ نیمه‌شب تا ۵ صبح؛ ویرجینیا: ۱۲ نیمه‌شب تا ۴ صبح؛ واشنگتن دی‌سی: ۱۱ شب تا ۶ صبح (یکشنبه تا پنج‌شنبه) و ۱۲:۰۱ شب تا ۶ صبح (جمعه و شنبه).",
      "هیچ منع رفت و آمدی در منطقه واشنگتن بزرگ وجود ندارد.",
      "منع تردد فقط مخصوص تعطیلات تابستان است."
    ],
    correct_index: 1,
    explain_why_en: "Each DMV jurisdiction sets specific nighttime curfews to protect young drivers. Maryland enforces 12am-5am; Virginia enforces 12am-4am; and D.C. enforces an earlier 11pm curfew on school nights (Sunday through Thursday). Violations risk provisional license suspension and reset of waiting periods.",
    explain_why_fa: "هر یک از سه ایالت ساعات منع تردد خاصی دارند: مریلند از ۱۲ شب تا ۵ صبح، ویرجینیا از ۱۲ شب تا ۴ صبح، و دی‌سی در شب‌های کاری مدرسه (یکشنبه تا پنج‌شنبه) از ساعت ۱۱ شب تا ۶ صبح منع تردد دارد. تخلف باعث تعلیق و صفر شدن دوره مشروط می‌شود.",
    statute_reference: "Tri-State GLS Curfew Comparison Matrix",
    instructor_tip: "School Commute Pass: If driving home from high school sports or a part-time job near curfew, carry a signed school/employer letter in your glove box!"
  },
  {
    id: "q_alcohol_drug_foreign_license_transfer",
    question_en: "Who is legally required to complete Maryland's 3-Hour Alcohol and Drug Education Program under COMAR 11.17.13?",
    question_fa: "طبق آیین‌نامه COMAR 11.17.13 مریلند، چه کسانی موظف به گذراندن دوره ۳ ساعته آموزش الکل و مواد مخدر هستند؟",
    state_tag: "Maryland MVA",
    category: "curriculum_services",
    category_label_en: "36-Hour Drivers Ed & Programs",
    category_label_fa: "دوره ۳۶ ساعته و خدمات آموزشگاه",
    options_en: [
      "Only commercial semi-truck drivers.",
      "All individuals holding an out-of-country driver's license seeking to convert or obtain a Maryland driver's license.",
      "Only drivers who have accumulated 12 moving violation points.",
      "Anyone purchasing a new car in Montgomery County."
    ],
    options_fa: [
      "فقط رانندگان کامیون‌های سنگین تجاری.",
      "تمامی افرادی که دارای گواهینامه رانندگی از کشور دیگری (بین‌المللی یا خارجی) هستند و قصد دارند گواهینامه مریلند دریافت کنند.",
      "تنها رانندگانی که ۱۲ نمره منفی در سابقه دارند.",
      "هر کسی که در مانتگامری کانتی خودروی صفر کیلومتر می‌خرد."
    ],
    correct_index: 1,
    explain_why_en: "COMAR 11.17.13 mandates that all out-of-country license holders must complete the 3-Hour Alcohol & Drug Education Program before scheduling their MVA road test. Sam's Driving School is state-certified to offer this course in English, Spanish, and Farsi for $90 with direct electronic certification to MVA.",
    explain_why_fa: "طبق مقررات رسمی COMAR 11.17.13 مریلند، کلیه دارندگان گواهینامه خارجی باید دوره رسمی ۳ ساعته الکل و مواد مخدر را قبل از آزمون شهر بگذرانند. آموزشگاه رانندگی سام این دوره را با شهریه تخفیف‌دار ۹۰ دلار به زبان‌های انگلیسی، اسپانیایی و فارسی ارائه کرده و گواهی را آنلاین به MVA ارسال می‌کند.",
    statute_reference: "COMAR 11.17.13 - Alcohol and Drug Education Requirements for Foreign Drivers",
    instructor_tip: "Fast Certification: Complete the 3-hour course at Sam's Driving School (751 Rockville Pike) in one afternoon and schedule your road test immediately!"
  },
  {
    id: "q_rockville_metro_service_area",
    question_en: "What specialized student accessibility service is provided by Sam's Driving School for Rockville and Montgomery County high schools?",
    question_fa: "آموزشگاه رانندگی سام چه خدمات رفت و آمد ویژه‌ای برای دانش‌آموزان دبیرستان‌های راکویل و مانتگامری کانتی ارائه می‌دهد؟",
    state_tag: "Maryland MVA",
    category: "curriculum_services",
    category_label_en: "36-Hour Drivers Ed & Programs",
    category_label_fa: "دوره ۳۶ ساعته و خدمات آموزشگاه",
    options_en: [
      "Helicopter transport to the Gaithersburg MVA center.",
      "Free pickup and drop-off from the Rockville Metro Station (Red Line) and doorstep pickup for Behind-the-Wheel lessons across local high schools (RMHS, Wootton, Rockville, Walter Johnson, Churchill).",
      "Only remote video calls with no actual in-car driving.",
      "Mandatory carpooling with 10 random students."
    ],
    options_fa: [
      "سرویس هلیکوپتر اختصاصی تا شعبه آزمون MVA.",
      "سرویس رفت و برگشت کاملاً رایگان از ایستگاه متروی راکویل (خط قرمز Red Line) و سوار و پیاده کردن دانش‌آموزان دبیرستان‌های محلی (ریچارد مونتگومری، ووتون، راکویل های، والتر جانسون و چرچیل).",
      "فقط جلسات ویدیویی بدون رانندگی واقعی در خیابان.",
      "هم‌سفری اجباری با ۱۰ دانش‌آموز ناشناس."
    ],
    correct_index: 1,
    explain_why_en: "Sam's Driving School is centrally located at 751 Rockville Pike and provides free student pickup and drop-off at the Rockville Metro Station (Red Line), making it easy for students from Richard Montgomery, Wootton, Rockville High, Walter Johnson, and Churchill to attend BTW lessons without burdening parents.",
    explain_why_fa: "آموزشگاه رانندگی سام در ۷۵۱ Rockville Pike سرویس رایگان سوار و پیاده کردن در ایستگاه متروی راکویل (Red Line) ارائه می‌دهد تا دانش‌آموزان مدارس منطقه شامل ریچارد مونتگومری، ووتون، راکویل، والتر جانسون و چرچیل به راحتی و بدون نیاز به زحمت والدین در کلاس‌های عملی رانندگی شرکت کنند.",
    statute_reference: "Sam's Driving School Community Accessibility & Student Safety Charter",
    instructor_tip: "Transit Ease: Just take the Red Line to Rockville Station; our dual-brake training car and instructor will be waiting at the Kiss & Ride pickup curb!"
  },
  {
    id: "q_two_point_stall_parking_pivot",
    question_en: "During the MVA Reverse Two-Point Turn (stall parking into a 90-degree bay), what is the key maneuver technique taught by Sam?",
    question_fa: "در مانور پارک دو نقطه‌ای دنده عقب (Two-Point Turn / Stall Parking) آزمون MVA، تکنیک کلیدی آموزش داده شده توسط سام چیست؟",
    state_tag: "Maryland MVA",
    category: "mva_maneuvers",
    category_label_en: "MVA Road Test Maneuvers",
    category_label_fa: "مانورهای عملی آزمون و پیست MVA",
    options_en: [
      "Reverse at 20 mph while staring only at the dashboard screen.",
      "Align the vehicle's rear passenger wheel with the stall pivot cone, stop completely if needed, turn the wheel lock-to-lock, and reverse smoothly at 1-2 mph centered between boundaries.",
      "Turn the wheel randomly until the car fits.",
      "Pull in forward and ignore the reverse requirement."
    ],
    options_fa: [
      "با سرعت ۲۰ مایل دنده عقب بروید و فقط به مانیتور داشبورد نگاه کنید.",
      "چرخ عقب سمت شاگرد را با مخروط یا خط لبه باکس پارک تراز کنید، در صورت نیاز کاملاً توقف کنید و فرمان را تا انتها بچرخانید، سپس با سرعت آرام ۱ تا ۲ مایل بین خطوط مستقر شوید.",
      "فرمان را بی‌هدف بچرخانید تا خودرو به هر شکلی جا شود.",
      "رو به جلو وارد پارک شوید و الزام دنده عقب را نادیده بگیرید."
    ],
    correct_index: 1,
    explain_why_en: "The MVA 2-point turn tests your spatial understanding of vehicle pivot geometry. The vehicle rotates around its rear inside wheel. Pausing completely to turn the steering wheel lock-to-lock is 100% permitted and incurs zero deductions; rushing and touching a boundary cone or curb causes instant test failure.",
    explain_why_fa: "آزمون پارک دو نقطه‌ای تسلط شما بر محور چرخش خودرو را می‌سنجد. توقف کامل خودرو برای چرخاندن فرمان از یک انتها به انتهای دیگر ۱۰۰٪ مجاز است و هیچ نمره منفی ندارد؛ اما عجله کردن و برخورد با مخروط یا لبه جدول باعث ردی آنی در آزمون می‌شود.",
    statute_reference: "Maryland MVA Driver Skills Test Guide - Closed Course Two-Point Maneuvers",
    instructor_tip: "Sam's Anchor: Stop completely! Turn the wheel all the way while stopped, then creep in with foot hovering over the brake. Smooth and steady passes every time!"
  },
  {
    id: "q_straight_line_backing_curb_distance",
    question_en: "In the Maryland MVA 50-Foot Straight-Line Backing test, what is the exact legal distance tolerance from the curb?",
    question_fa: "در آزمون دنده عقب ۵۰ فوت مستقیم MVA مریلند، بازه فاصله قانونی و مجاز از جدول چقدر است؟",
    state_tag: "Maryland MVA",
    category: "mva_maneuvers",
    category_label_en: "MVA Road Test Maneuvers",
    category_label_fa: "مانورهای عملی آزمون و پیست MVA",
    options_en: [
      "Within 3 to 5 feet of the curb.",
      "Maintain between 6 and 12 inches from the curb along the entire 50 feet without touching or climbing the curb.",
      "Right wheel must touch the curb continuously to guide the car.",
      "Distance does not matter as long as the car moves backward."
    ],
    options_fa: [
      "در فاصله ۳ تا ۵ فوتی (۱ تا ۱.۵ متری) از جدول.",
      "حفظ فاصله بین ۶ تا ۱۲ اینچ (۱۵ تا ۳۰ سانتی‌متر) در تمام طول ۵۰ فوت، بدون هیچ‌گونه تماس یا سایش لاستیک با جدول.",
      "لاستیک سمت راست باید پیوسته به جدول بمالد تا مسیر هدایت شود.",
      "فاصله اهمیتی ندارد فقط خودرو رو به عقب حرکت کند."
    ],
    correct_index: 1,
    explain_why_en: "MVA testing rubrics require applicants to reverse smoothly for approximately 50 feet parallel to the curb, maintaining a distance of 6 to 12 inches. Touching or climbing the curb is an instant failure; drifting farther than 12-18 inches results in heavy point deductions.",
    explain_why_fa: "دستورالعمل MVA تصریح می‌کند که راننده باید ۵۰ فوت موازی جدول با حفظ فاصله ۱۵ تا ۳۰ سانتی‌متر دنده عقب برود. تماس با جدول ردی آنی دارد و فاصله گرفتن بیش از ۱۲ اینچ کسر نمره سنگین ایجاد می‌کند.",
    statute_reference: "Maryland MVA Skills Test Scoring Rubric - Straight-Line Backing",
    instructor_tip: "Feather the Brake: Keep right arm over passenger seat. If the curb gets closer, steer 1 inch to the left, then immediately straighten. Tiny adjustments keep you straight!"
  },
  {
    id: "q_move_over_penalty_accident",
    question_en: "Under Maryland's Move Over Law, what enhanced penalty applies if a driver fails to move over or slow down and causes an accident?",
    question_fa: "طبق قانون Move Over مریلند، اگر راننده‌ای خط را خالی نکند و باعث بروز تصادف با خودروی متوقف شود، چه مجازات تشدید یافته‌ای دارد؟",
    state_tag: "Maryland MVA",
    category: "tristate_laws",
    category_label_en: "Tri-State & State Traffic Laws",
    category_label_fa: "قوانین مریلند، دی‌سی و ویرجینیا",
    options_en: [
      "A $20 parking ticket.",
      "A fine of $750 and 3 license points assessed against the driver's record.",
      "Automatic vehicle impoundment for 10 years.",
      "No additional penalty beyond standard insurance claims."
    ],
    options_fa: [
      "یک قبض جریمه پارک ۲۰ دلاری.",
      "جریمه نقدی ۷۵۰ دلاری به همراه ثبت ۳ نمره منفی در سابقه رانندگی.",
      "توقیف خودکار خودرو به مدت ۱۰ سال.",
      "هیچ مجازاتی فراتر از خسارت بیمه نخواهد بود."
    ],
    correct_index: 1,
    explain_why_en: "While standard failure to move over or slow down carries a $110 fine and 1 point, MD Transportation Code § 21-405(e) specifies that contributing to a crash involving an emergency or hazard-flashing stationary vehicle elevates the penalty to a $750 fine and 3 points.",
    explain_why_fa: "در حالت عادی جریمه عدم تغییر خط ۱۱۰ دلار و ۱ نمره منفی است، اما طبق ماده ۲۱-۴۰۵ مریلند اگر این تخلف منجر به تصادف با خودروی متوقف امدادی یا دارای فلاشر شود، جریمه به ۷۵۰ دلار و ۳ نمره منفی سنگین افزایش می‌یابد.",
    statute_reference: "MD Transp. Code § 21-405(e) - Enhanced Sanctions for Crash Involvement",
    instructor_tip: "Scan Ahead: When you see flashing yellow, blue, or hazard lights half a mile ahead on I-270, check your mirror, signal left, and move over early."
  },
  {
    id: "q_dual_brake_safety_instruction",
    question_en: "How does Sam's dual-brake, dual-control vehicle fleet ensure a zero-yelling, anxiety-free learning environment for nervous students?",
    question_fa: "ناوگان خودروهای مجهز به سیستم ترمز دوبل آموزشگاه سام چگونه محیطی کاملاً بدون داد و فریاد و بدون استرس برای هنرجویان ایجاد می‌کند؟",
    state_tag: "Maryland MVA",
    category: "curriculum_services",
    category_label_en: "36-Hour Drivers Ed & Programs",
    category_label_fa: "دوره ۳۶ ساعته و خدمات آموزشگاه",
    options_en: [
      "The car is driven remotely by an artificial intelligence computer.",
      "The instructor has an independent secondary brake pedal and dual mirrors, enabling instant, gentle vehicle control so instructors never need to yell or panic.",
      "The student is not allowed to touch the pedals.",
      "The car cannot travel faster than 10 mph."
    ],
    options_fa: [
      "خودرو توسط هوش مصنوعی از راه دور کنترل می‌شود.",
      "مربی دارای پدال ترمز کمکی مجزا و آینه‌های دوبل است که امکان توقف نرم و ایمن در هر ثانیه را فراهم می‌کند؛ بنابراین مربی نیازی به فریاد زدن یا استرس ندارد.",
      "دانش‌آموز اجازه دست زدن به پدال‌ها را ندارد.",
      "خودرو نمی‌تواند سریع‌تر از ۱۰ مایل حرکت کند."
    ],
    correct_index: 1,
    explain_why_en: "Sam's Driving School's philosophy centers on psychological safety. With dual-brake instructor controls, the instructor possesses 100% mechanical intervention authority at all times. This eliminates instructor anxiety, ensuring feedback is calm, encouraging, and focused on building confidence.",
    explain_why_fa: "فلسفه آموزشگاه سام بر پایه امنیت روانی است. با سیستم ترمز دوگانه، مربی تسلط ۱۰۰٪ بر توقف خودرو دارد و هرگز نیازی به ترس یا فریاد زدن ندارد. این ساختار به هنرجو اجازه می‌دهد با آرامش کامل و بدون ترس از اشتباه، مهارت‌های رانندگی را یاد بگیرد.",
    statute_reference: "Maryland MVA Commercial Driving School Vehicle Equipment Safety Standards",
    instructor_tip: "Peace of Mind: Knowing your certified instructor has a functioning brake gives you the freedom to breathe, learn, and master driving smoothly!"
  },
  {
    id: "q_pedestrian_crosswalk_stop_and_creep",
    question_en: "At an intersection with a stop sign, crosswalk, and obstructed cross-traffic view (blind corner), what is the mandatory 2-step stopping procedure?",
    question_fa: "در یک تقاطع دارای تابلوی ایست، خط عابر پیاده و دید محدود به خیابان اصلی، توالی الزامی ۲ مرحله‌ای توقف در آزمون MVA چیست؟",
    state_tag: "Maryland MVA",
    category: "mva_maneuvers",
    category_label_en: "MVA Road Test Maneuvers",
    category_label_fa: "مانورهای عملی آزمون و پیست MVA",
    options_en: [
      "Roll through the crosswalk directly into the street without stopping first.",
      "Step 1: Complete 3-second stop behind the stop bar/crosswalk. Step 2: Once crosswalk is clear of pedestrians, creep forward past the obstruction and stop a second time to scan traffic before proceeding.",
      "Honk twice and accelerate through without stopping.",
      "Only stop if a vehicle is already crossing your path."
    ],
    options_fa: [
      "بدون هیچ توقفی از روی خط عابر عبور کرده و وارد خیابان شوید.",
      "مرحله ۱: توقف کامل ۳ ثانیه‌ای پشت خط ایست/گذرگاه عابر. مرحله ۲: پس از اطمینان از نبود عابر پیاده، به آرامی به جلو بخزید و بار دوم بایستید تا دید کامل به ترافیک پیدا کنید.",
      "دو بار بوق بزنید و بدون توقف با سرعت رد شوید.",
      "تنها در صورتی بایستید که خودرویی در همان لحظه در حال عبور باشد."
    ],
    correct_index: 1,
    explain_why_en: "MD Transp. Code § 21-707 requires an initial complete stop behind the stop line or crosswalk. If buildings or parked cars block your view of cross-traffic, examiners require a complete first stop, followed by a slow, cautious creep forward and a second observation pause before turning.",
    explain_why_fa: "طبق ماده ۲۱-۷۰۷ مریلند، توقف کامل اولیه پشت خط سفید ممتد الزامی است. اگر دید به دلیل درخت یا خودروهای پارک شده کور باشد، ابتدا باید پشت خط بایستید، سپس به آرامی جلو بخزید و برای بار دوم توقف کرده و ترافیک را چک کنید.",
    statute_reference: "MD Transp. Code § 21-707 - Multi-Stage Intersection Observation",
    instructor_tip: "Two-Stop Rule: Never roll through step 1! Rolling into the crosswalk before stopping is graded as running a stop sign—an automatic failure."
  }
];


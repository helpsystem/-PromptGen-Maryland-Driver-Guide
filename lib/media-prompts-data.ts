export interface EducationalMediaPromptPackage {
  id: string;
  title_en: string;
  title_fa: string;
  category: 'mva_skills' | 'anxiety_psychology' | 'tristate_laws' | 'dual_brake_safety';
  concept_summary_en: string;
  concept_summary_fa: string;
  camera_angle: string;
  lens_optics: string;
  lighting_mood: string;
  aspect_ratio: string;

  photo_prompts: {
    midjourney_v6: {
      prompt_en: string;
      prompt_fa: string;
      technical_parameters: string;
      lighting_and_atmosphere: string;
      composition_and_framing: string;
    };
    flux_pro: {
      prompt_en: string;
      prompt_fa: string;
    };
    dalle3: {
      prompt_en: string;
    };
  };

  video_prompts: {
    runway_gen3: {
      prompt_en: string;
      prompt_fa: string;
      camera_motion_command: string;
      sound_design_sfx_en: string;
      sound_design_sfx_fa: string;
    };
    sora_kling: {
      prompt_en: string;
      prompt_fa: string;
    };
  };

  pedagogical_visual_notes: {
    teaching_goal_en: string;
    teaching_goal_fa: string;
    mva_test_correlation_en: string;
    mva_test_correlation_fa: string;
    psychological_calm_anchor_en: string;
    psychological_calm_anchor_fa: string;
  };
}

export const CAMERA_ANGLES = [
  { id: 'cockpit_pov', name_en: 'Cockpit Driver POV (داخل کابین از دید راننده)', desc_fa: 'دید مستقیم راننده به فرمان، آینه‌ها و جاده جلو' },
  { id: 'over_the_shoulder_dual_brake', name_en: 'Over-the-Shoulder Dual Brake (زاویه از روی شانه با پدال کمکی)', desc_fa: 'دید از پشت صندلی که هم فرمان راننده و هم پدال ترمز مربی در کف را نشان می‌دهد' },
  { id: 'side_tracking_curb', name_en: 'Side Profile Parallel to Curb (نمای کناری امتداد جدول)', desc_fa: 'نمای بیرونی موازی جدول زرد MVA برای نمایش فاصله ۱۵ تا ۳۰ سانتی‌متری لاستیک' },
  { id: 'drone_overhead_mva', name_en: 'Overhead Drone Course View (دید هوایی پیست آزمون MVA)', desc_fa: 'دید عمودی به محوطه بسته آزمون گیترزبرگ یا وایت اوک و خطوط پارک' },
  { id: 'calm_instructor_student', name_en: 'Warm Instructor-Student Dialogue (پرتره صمیمی مربی و هنرجو)', desc_fa: 'نمای دو نفره داخل خودرو با لبخند مربی خانم و آرامش هنرجو بدون استرس' },
  { id: 'dashboard_highway_night', name_en: 'Windshield Rainy Highway Merging (ورود به اتوبان در باران/شب)', desc_fa: 'دید از روی داشبورد در حال ورود ایمن به اتوبان I-270 مریلند با خطوط نور' }
];

export const LENS_OPTICS = [
  { id: '35mm_f18', name_en: '35mm f/1.8 Documentary Prime (لنز ۳۵ میلی‌متر طبیعی مستند)', desc_fa: 'دید وسیع، طبیعی و بدون اعوجاج مناسب فضای داخل خودرو' },
  { id: '85mm_f14', name_en: '85mm f/1.4 Portrait Bokeh (لنز ۸۵ میلی‌متر با بوکه سینمایی)', desc_fa: 'عمق میدان کم، پس‌زمینه محو و تمرکز فوق‌العاده روی چهره آرام یا دست روی فرمان' },
  { id: '24mm_wide', name_en: '24mm Ultra-Sharp Automotive Interior (لنز ۲۴ میلی‌متر واید کابین)', desc_fa: 'نمایش همزمان کل کابین، داشبورد، خط ایست و آینه‌ها در یک فریم' },
  { id: '50mm_f12', name_en: '50mm f/1.2 Cinematic Eye (لنز ۵۰ میلی‌متر چشم انسان)', desc_fa: 'واقع‌گرایی مطلق و احساس حضور فیزیکی در صحنه' }
];

export const LIGHTING_MOODS = [
  { id: 'golden_hour_rockville', name_en: 'Golden Hour Sunset on Rockville Pike (غروب طلایی راکویل پایک)', desc_fa: 'نور گرم طلایی پاییزی مریلند با بازتاب‌های نرم روی بدنه خودرو' },
  { id: 'crisp_morning_mva', name_en: 'Crisp Morning Test Day Daylight (نور شفاف صبحگاهی روز امتحان MVA)', desc_fa: 'نور طبیعی شفاف و شارپ مناسب نمایش دقیق خط‌کشی‌ها و تابلوها' },
  { id: 'blue_hour_twilight', name_en: 'Cinematic Blue Hour Twilight (گرگ و میش سینمایی بلو آور)', desc_fa: 'ترکیب آسمان آبی تیره و نورهای گرم چراغ خودروها در ساعت منع تردد شبانه' },
  { id: 'rainy_asphalt_moody', name_en: 'Rainy Asphalt Reflections (آسفالت خیس با بازتاب چراغ‌های ترافیک)', desc_fa: 'حس تدافعی رانندگی در هوای بارانی و فاصله طولی با خودروهای متوقف' }
];

export const PRESET_MEDIA_PACKAGES: EducationalMediaPromptPackage[] = [
  {
    id: 'prompt_mva_straight_backing',
    title_en: '50-Foot MVA Straight-Line Backing: The Yellow Curb Masterclass',
    title_fa: 'پرامپت آموزش دنده عقب ۵۰ فوت MVA مریلند: تسلط بر جدول زرد',
    category: 'mva_skills',
    concept_summary_en: 'Visual training prompt demonstrating proper body rotation out the rear window while backing parallel to a yellow curb at 2 mph.',
    concept_summary_fa: 'پرامپت تصویر و ویدیوی آموزشی نحوه چرخش سر به سمت شیشه عقب و حرکت میلی‌متری موازی جدول زرد در پیست MVA گیترزبرگ.',
    camera_angle: 'side_tracking_curb',
    lens_optics: '85mm_f14',
    lighting_mood: 'crisp_morning_mva',
    aspect_ratio: '9:16',
    photo_prompts: {
      midjourney_v6: {
        prompt_en: 'High-end automotive editorial photography of a modern dual-control training sedan reversing smoothly along a crisp yellow-painted curb at an MVA closed-course test facility in Maryland. The rear passenger tire maintains a precise 8-inch gap from the concrete curb without touching. Through the tinted rear glass, the student driver has their body turned 45 degrees, right arm resting on the passenger headrest, looking directly through the rear window. Morning crisp sunlight, suburban Montgomery County backdrop, razor-sharp focus on the tire and curb, authentic pavement textures, 85mm f/1.4 lens, photorealistic 8k --ar 9:16 --v 6.1 --style raw',
        prompt_fa: 'عکاسی تبلیغاتی با لنز ۸۵ میلی‌متر: خودروی آموزشی مجهز به ترمز دوگانه در حال حرکت دنده عقب با سرعت ۲ مایل در امتداد جدول زرد در پیست MVA مریلند. فاصله لاستیک عقب دقیقا ۲۰ سانتی‌متر تا جدول است. از شیشه عقب راننده دیده می‌شود که نیم‌تنه‌اش ۴۵ درجه چرخیده و دست راستش روی صندلی شاگرد است. نور شفاف صبحگاهی بدون کوچکترین لرزش.',
        technical_parameters: '--ar 9:16 --v 6.1 --style raw --stylize 250 (Camera: Sony A7R V, 85mm f/1.4 GM)',
        lighting_and_atmosphere: 'Crisp morning daylight (8:30 AM), sharp shadows defining the 8-inch space between tire and curb.',
        composition_and_framing: 'Vertical 9:16 composition leading the eye from the curb in the lower third up to the driver head rotation in the upper third.'
      },
      flux_pro: {
        prompt_en: 'ultra realistic side profile photo of student driver backing a training car along a curb, perfect 8 inch distance, driver visibly looking back through rear glass, passenger side dual-control brake decal visible, Montgomery County Maryland driving school, 8k resolution, crisp natural lighting',
        prompt_fa: 'عکس فوق‌العاده واقع‌گرایانه زاویه کناری از دنده عقب خودرو در امتداد جدول با فاصله ۲۰ سانت و نگاه فیزیکی راننده به شیشه عقب.'
      },
      dalle3: {
        prompt_en: 'A clear daylight photo of a modern training car reversing parallel to a yellow curb on a Maryland driving test track, the rear tire is 8 inches from the curb without scraping, driver looking over their right shoulder.'
      }
    },
    video_prompts: {
      runway_gen3: {
        prompt_en: 'Low-angle tracking shot moving slowly backward alongside the rear tire of a white training sedan on a driving test course. The tire rotates in reverse at a steady 2 mph, smoothly maintaining an exact 8-inch parallel line from a yellow concrete curb. Camera gently pans upward to the rear window showing the calm student driver looking back over their right shoulder. Gentle golden morning light, buttery smooth gimbal motion 24fps.',
        prompt_fa: 'حرکت نرم دوربین در زاویه پایین (Low-angle tracking) رو به عقب همگام با چرخ عقب خودرو هنگام حرکت دنده عقب با سرعت ۲ مایل در ساعت. فاصله ثابت ۲۰ سانتی‌متری با جدول زرد حفظ می‌شود و دوربین به نرمی به سمت شیشه عقب و نگاه آرام راننده متمایل می‌شود.',
        camera_motion_command: 'Low tracking backward slider at matched 2 mph speed with gentle upward tilt at the end',
        sound_design_sfx_en: 'Low mechanical reverse gear hum, soft tire tread rolling on asphalt, distant peaceful songbird, quiet reassuring female instructor breath',
        sound_design_sfx_fa: 'صدای ملایم زوزه دنده عقب، غلتش نرم لاستیک روی آسفالت و صدای تنفس آرام مربی زن'
      },
      sora_kling: {
        prompt_en: 'Cinematic drone tracking shot lowering towards a dual-control driving car reversing 50 feet along a marked yellow curb at Gaithersburg Maryland MVA testing grounds, zero deviation, perfectly parallel line, photorealistic cinematic movement 4k.',
        prompt_fa: 'نمای سینمایی درون از بالا که فرود می‌آید روی خودروی دو پداله در حال دنده عقب ۵۰ فوت در پیست گیترزبرگ مریلند بدون کوچکترین انحراف.'
      }
    },
    pedagogical_visual_notes: {
      teaching_goal_en: 'Teaches students to maintain an 8-12 inch cushion from the curb and emphasizes the critical MVA requirement to physically look out the rear window.',
      teaching_goal_fa: 'آموزش بصری فاصله استاندارد از جدول و تاکید بر الزام حیاتی نگاه فیزیکی از شیشه عقب به جای زل زدن به دوربین دنده عقب.',
      mva_test_correlation_en: 'Directly addresses the MVA closed-course 50-ft backing maneuver where hitting the curb causes instant disqualification.',
      mva_test_correlation_fa: 'ارتباط مستقیم با آزمون مهارت‌های محوطه بسته MVA که در آن برخورد با جدول باعث ردی فوری است.',
      psychological_calm_anchor_en: 'Feathering the brake pedal slowly builds muscle relaxation and prevents panic over-steering.',
      psychological_calm_anchor_fa: 'کنترل نرم ترمز مانع از چرخش‌های عصبی و ناگهانی فرمان در اثر استرس می‌شود.'
    }
  },
  {
    id: 'prompt_3sec_stop_rule',
    title_en: 'The 3-Second Physics Stop: Complete Cessation Behind the White Bar',
    title_fa: 'پرامپت قانون ایست ۳ ثانیه‌ای: استقرار فیزیکی کامل پشت خط سفید',
    category: 'mva_skills',
    concept_summary_en: 'Visual prompt demonstrating vehicle suspension rebound at a red octagonal STOP sign in Rockville, MD, eliminating rolling stops.',
    concept_summary_fa: 'پرامپت نمایش توقف کامل خودرو، برگشت کمک‌فنرها به عقب و رعایت دقیق خط ممتد سفید در راکویل مریلند.',
    camera_angle: 'cockpit_pov',
    lens_optics: '35mm_f18',
    lighting_mood: 'golden_hour_rockville',
    aspect_ratio: '9:16',
    photo_prompts: {
      midjourney_v6: {
        prompt_en: 'First-person cockpit POV shot from the driver seat of a dual-control driving school sedan stopped cleanly behind a solid white stop line at a Rockville Maryland suburban intersection. In the foreground, hands rest lightly at the 9 and 3 position on the leather steering wheel. Through the front windshield, a bright red hexagonal STOP sign is bathed in golden hour sunset light, surrounded by fall foliage of Montgomery County. On the passenger side floor, the instructor dual brake pedal is subtly visible. 35mm lens, f/1.8 aperture, cinematic warm glow, authentic documentary realism, zero motion blur --ar 9:16 --v 6.1 --style raw',
        prompt_fa: 'نمای اول شخص POV از داخل کابین خودروی آموزشی سام متوقف شده پشت خط سفید ممتد تابلوی ایست در راکویل مریلند. دست‌ها در حالت ۹ و ۳ روی فرمان چرمی، تابلوی قرمز ایست در نور غروب طلایی پاییز، و پدال ترمز کمکی مربی در کف سمت شاگرد. لنز ۳۵ میلی‌متر با جلوه سینمایی گرم.',
        technical_parameters: '--ar 9:16 --v 6.1 --style raw --stylize 200 (Camera: Sony FX3, 35mm f/1.8)',
        lighting_and_atmosphere: 'Rich golden hour sunset (5:45 PM), amber flares casting warm tones on the dashboard and stop sign.',
        composition_and_framing: 'POV cockpit framing: hands on wheel in lower third, stop line visible on asphalt, STOP sign in upper right quadrant.'
      },
      flux_pro: {
        prompt_en: 'photorealistic cockpit view inside student driver car at a stop sign on Rockville Pike, front bumper 12 inches behind the thick white line, calm student hands on wheel, dual-brake pedal on right floor, sunset lighting, 8k',
        prompt_fa: 'نمای فوتورئال داخل کابین در تابلوی ایست راکویل پایک، سپر ماشین ۳۰ سانت پشت خط سفید ممتد با نور غروب آفتاب.'
      },
      dalle3: {
        prompt_en: 'A driver viewpoint from inside a modern car stopped at a red stop sign in a suburban Maryland neighborhood during golden hour, hands on steering wheel, clear white stop line visible on road.'
      }
    },
    video_prompts: {
      runway_gen3: {
        prompt_en: 'Cinematic interior cockpit shot. The camera slowly pushes forward from between the two front seats toward the front windshield as the car glides to a silky smooth complete stop behind a thick white road line. As the car reaches zero mph, a subtle gentle rebound of the suspension settles the car backward. The student’s relaxed hands hold the wheel at 9 and 3. Through the windshield, a red stop sign glows in evening sunlight. Instructor hands a warm nod of approval.',
        prompt_fa: 'حرکت نرم دوربین به جلو از میان دو صندلی جلو به سمت شیشه، توقف نرم و کامل خودرو پشت خط سفید، تکانه برگشتی کمک‌فنرها پس از صفر شدن سرعت، دست‌های آسوده روی فرمان و تایید مربی با سر در نور گرم غروب.',
        camera_motion_command: 'Slow forward dolly-in through the center console, settling when vehicle stops',
        sound_design_sfx_en: 'Quiet deceleration tire hum, soft friction of brake pads gripping, complete silence, double inhale breath sound effect, gentle indicator click',
        sound_design_sfx_fa: 'صدای کاهش نرم سرعت، تماس بی‌صدای لنت ترمز، سکوت کامل، صدای تنفس عمیق و تیک نرم راهنما'
      },
      sora_kling: {
        prompt_en: 'Exterior side view of a white sedan approaching a stop line on Rockville Pike Maryland, stopping with complete cessation of motion 12 inches before the crosswalk, suspension settling gracefully, golden hour lighting.',
        prompt_fa: 'نمای بیرونی کناری از توقف کامل خودرو در راکویل پایک مریلند دقیقا ۳۰ سانت قبل از گذرگاه عابر در نور طلایی عصر.'
      }
    },
    pedagogical_visual_notes: {
      teaching_goal_en: 'Eliminates the "rolling stop" failure trap by showing the exact physical sensation of zero mph behind the solid line.',
      teaching_goal_fa: 'حذف تله رولینگ استاپ با نمایش تصویری توقف کامل مکانیکی و تکانه معکوس خودرو قبل از خط ایست.',
      mva_test_correlation_en: 'Rolling past the stop sign is the #1 instant failure at the Gaithersburg and White Oak MVA test centers.',
      mva_test_correlation_fa: 'توقف ناقص عامل شماره یک رد شدن فوری در شعب MVA گیترزبرگ و وایت اوک مریلند است.',
      psychological_calm_anchor_en: 'The 3-second pause provides a built-in window for the physiological sigh, lowering heart rate before scanning.',
      psychological_calm_anchor_fa: 'مکث ۳ ثانیه‌ای فرصتی طلایی برای تنفس فیزیولوژیک سام و کاهش تپش قلب قبل از کنترل ترافیک است.'
    }
  },
  {
    id: 'prompt_anxiety_relief_psychology',
    title_en: 'Driving Anxiety Relief: Psychology-Led Calm & Zero-Yelling at Sam’s Driving School',
    title_fa: 'پرامپت رفع اضطراب رانندگی: متد روان‌شناسی و آموزش بدون داد و فریاد سام',
    category: 'anxiety_psychology',
    concept_summary_en: 'Visual prompt depicting a calm female instructor using psychological grounding techniques with an anxious teen driver at 751 Rockville Pike.',
    concept_summary_fa: 'پرامپت تصویر و ویدیوی رابطه آرامش‌بخش مربی خانم و هنرجوی نوجوان با تکنیک تنفس فیزیولوژیک و خودروی دو پداله در راکویل.',
    camera_angle: 'calm_instructor_student',
    lens_optics: '50mm_f12',
    lighting_mood: 'crisp_morning_mva',
    aspect_ratio: '9:16',
    photo_prompts: {
      midjourney_v6: {
        prompt_en: 'Heartwarming, empathetic cinematic portrait inside a modern training vehicle outside 751 Rockville Pike, Rockville MD. A certified female driving instructor with a warm, encouraging smile gently coaches a teenage girl who was previously anxious. The teen’s shoulders visibly relax as she practices the physiological sigh breath. On the passenger side floor, the professional dual-control brake pedal is visible, conveying total safety and peace of mind. Soft morning daylight filtering through the side windows, natural skin tones, 50mm f/1.2 lens, emotional depth, authentic non-stock aesthetic, photorealistic --ar 9:16 --v 6.1 --style raw',
        prompt_fa: 'پرتره سینمایی احساسی و گرم داخل خودروی آموزشی در راکویل مریلند: مربی خانم با لبخندی دلگرم‌کننده در حال آموزش تکنیک تنفس آرامش‌بخش به دختر نوجوان. شانه هنرجو در حالت آرامش قرار گرفته و پدال ترمز کمکی مربی در کف خودرو حس امنیت کامل را القا می‌کند. لنز ۵۰ میلی‌متر با نور ملایم صبحگاهی.',
        technical_parameters: '--ar 9:16 --v 6.1 --style raw (Camera: Canon EOS R5, 50mm f/1.2 L USM)',
        lighting_and_atmosphere: 'Soft diffused natural window daylight with gentle warmth on facial expressions.',
        composition_and_framing: 'Medium two-shot inside car interior, capturing instructor eye contact and student relaxed grip on steering wheel.'
      },
      flux_pro: {
        prompt_en: 'realistic shot inside a dual-control car in Rockville MD, supportive female instructor with psychology background coaching a nervous teen driver, friendly atmosphere, zero yelling, dual-brake clearly installed, 8k resolution',
        prompt_fa: 'تصویر واقعی از مربی زن صبور در حال آموزش به هنرجوی مضطرب در خودروی دو پداله در راکویل بدون داد و فریاد.'
      },
      dalle3: {
        prompt_en: 'A friendly female driving instructor in the passenger seat calmly smiling and guiding a nervous student driver in a modern car, dual control brake pedal visible on the passenger floor, bright morning daylight.'
      }
    },
    video_prompts: {
      runway_gen3: {
        prompt_en: 'Medium two-shot inside a training car parked on Rockville Pike. The nervous teen girl takes a conscious double inhale through her nose, followed by a long relaxing exhale as her shoulders drop. The calm female instructor in the passenger seat smiles warmly and gives a reassuring touch on the student’s shoulder, saying supportive words. Camera slowly pans around to show the dual-brake pedal in the passenger footwell. Peaceful sunlight shines across the dashboard.',
        prompt_fa: 'نمای دو نفره داخل خودرو در راکویل پایک: هنرجوی نوجوان دو دم سریع از بینی و یک بازدم طولانی و عمیق انجام می‌دهد و شانه‌هایش شل می‌شود. مربی خانم با لبخند گرم به شانه او دست می‌زند و تشویقش می‌کند. چرخش آرام دوربین به سمت پدال ترمز کمکی مربی.',
        camera_motion_command: 'Gentle handheld orbital pan from student’s face to instructor smile, then settling on dual brake',
        sound_design_sfx_en: 'Soft audible double inhale through nose, gentle peaceful exhale, calm female voice murmuring "You’ve got this", quiet seatbelt fabric rustle',
        sound_design_sfx_fa: 'صدای دم دوگانه از بینی، بازدم آرام، صدای مربی: «عالی پیش میری» و صدای ملایم پارچه کمربند'
      },
      sora_kling: {
        prompt_en: 'Slow motion 24fps inside a driving school sedan, showing a teen driver releasing tension in their fingers on the steering wheel, instructor offering calm encouragement, sunny Rockville MD backdrop.',
        prompt_fa: 'اسلوموشن ۲۴ فریم داخل خودرو، باز شدن انقباض انگشتان راننده روی فرمان با تشویق آرام مربی در هوای آفتابی راکویل.'
      }
    },
    pedagogical_visual_notes: {
      teaching_goal_en: 'Visually communicates that driving education does not have to involve screaming parents, building deep psychological road confidence.',
      teaching_goal_fa: 'نمایش بصری اینکه آموزش رانندگی نباید با داد و فریاد همراه باشد، بلکه با روش‌های علمی روان‌شناسی آرامش ساخته می‌شود.',
      mva_test_correlation_en: 'Reduces test-day heart rate spikes that cause applicants to freeze on turn signals or mirror checks.',
      mva_test_correlation_fa: 'جلوگیری از قفل شدن ذهن در اثر تپش قلب در حضور ممتحن MVA.',
      psychological_calm_anchor_en: 'Bilateral hand flex and physiological sigh directly down-regulate the sympathetic nervous system.',
      psychological_calm_anchor_fa: 'تنفس فیزیولوژیک و باز و بسته کردن انگشتان روی فرمان سیستم عصبی سمپاتیک را مهار می‌کند.'
    }
  },
  {
    id: 'prompt_dual_control_parent_safety',
    title_en: 'Dual-Control Brake Security: The Ultimate Peace of Mind for Montgomery County Parents',
    title_fa: 'پرامپت امنیت ترمز دوگانه مربی: آرامش خاطر مطلق برای والدین در مانتگامری کانتی',
    category: 'dual_brake_safety',
    concept_summary_en: 'Visual prompt highlighting the precision-engineered passenger dual-brake system used by Sam’s Driving School to protect student drivers.',
    concept_summary_fa: 'پرامپت نمایش سیستم ترمز کمکی مربی در خودروهای آموزشگاه سام و حس اطمینان والدین دانش‌آموزان دبیرستان‌های محلی.',
    camera_angle: 'over_the_shoulder_dual_brake',
    lens_optics: '24mm_wide',
    lighting_mood: 'crisp_morning_mva',
    aspect_ratio: '16:9',
    photo_prompts: {
      midjourney_v6: {
        prompt_en: 'Cinematic wide-angle interior view of a modern dual-control driver education vehicle. The camera angle looks from the back seat over the passenger side, showcasing the certified mechanical dual-brake pedal mounted on the instructor footwell floor, linked to the vehicle braking system. Through the windshield, a clear sunny day on Maryland Route 355 (Rockville Pike) is visible with orderly traffic. The instructor foot rests lightly near the pedal, ready for instantaneous intervention. Professional driving school aesthetic, ultra-clean vehicle, 24mm f/2.8 lens, commercial automotive quality --ar 16:9 --v 6.1 --style raw',
        prompt_fa: 'نمای سینمایی زاویه باز از صندلی عقب خودروی آموزشی که پدال ترمز کمکی استاندارد مربی را در کف سمت شاگرد نشان می‌دهد. از شیشه جلو خیابان آفتابی راکویل پایک مریلند با ترافیک منظم دیده می‌شود. پای مربی آماده مداخله ایمن است. لنز ۲۴ میلی‌متر با کیفیت تبلیغاتی فوق‌العاده ۱۶:۹.',
        technical_parameters: '--ar 16:9 --v 6.1 --style raw (Camera: Hasselblad X2D, 24mm)',
        lighting_and_atmosphere: 'Crisp morning automotive commercial daylight with high dynamic range inside cockpit and outside street.',
        composition_and_framing: 'Diagonal line leading from the dual brake pedal in the lower foreground to the calm student hands on the wheel and the road ahead.'
      },
      flux_pro: {
        prompt_en: 'commercial photograph showing passenger-side dual brake pedal inside a driving school car in Maryland, instructor ready to assist, student driving safely, 8k, ultra-realistic',
        prompt_fa: 'عکاسی تبلیغاتی تجاری از پدال ترمز کمکی مربی در خودروی آموزشگاه رانندگی در مریلند.'
      },
      dalle3: {
        prompt_en: 'A high quality interior view of a driving instructor car with a secondary brake pedal installed on the passenger floor, instructor watching road calmly.'
      }
    },
    video_prompts: {
      runway_gen3: {
        prompt_en: 'Smooth dynamic dolly shot beginning in the passenger footwell focusing on the stainless-steel dual-brake pedal. The camera smoothly glides up and pivots toward the windshield, revealing a high school student driving smoothly along Rockville Pike MD, with the calm female instructor offering guidance. Warm golden sunlight reflects off the dashboard.',
        prompt_fa: 'حرکت نرم دالی دوربین که از روی پدال ترمز کمکی مربی در کف خودرو شروع شده و به سمت بالا اوج می‌گیرد تا دانش‌آموز دبیرستانی را در حال رانندگی آرام در راکویل پایک نشان دهد.',
        camera_motion_command: 'Smooth vertical jib move from pedal to eye level, then slow push forward',
        sound_design_sfx_en: 'Subtle metallic brake link click, quiet air conditioning breeze, smooth engine acceleration purr, indicator ticking',
        sound_design_sfx_fa: 'صدای کلیک مکانیکی ملایم ترمز، نسیم آرام کولر، صدای نرم موتور و تیک راهنما'
      },
      sora_kling: {
        prompt_en: 'Cinematic tracking shot looking through passenger window as driving instructor lightly steps on dual brake pedal to demonstrate smooth stopping power, Rockville MD.',
        prompt_fa: 'حرکت ترکینگ از پنجره شاگرد هنگام لمس آرام پدال ترمز کمکی توسط مربی برای نشان دادن توقف نرم.'
      }
    },
    pedagogical_visual_notes: {
      teaching_goal_en: 'Provides visual proof to parents that their teenager will never be in an uncontrolled or dangerous road situation during lessons.',
      teaching_goal_fa: 'اثبات تصویری برای والدین که فرزندشان در جلسات آموزشی هیچ‌گاه در شرایط خارج از کنترل قرار نخواهد گرفت.',
      mva_test_correlation_en: 'Familiarizes students with the exact car setup used in the MVA road test rental warm-up package.',
      mva_test_correlation_fa: 'آشنایی کامل هنرجو با خودرویی که دقیقا در پکیج اجاره روز آزمون MVA استفاده می‌شود.',
      psychological_calm_anchor_en: 'Knowing the instructor has a brake pedal eliminates 80% of subconscious panic in beginner drivers.',
      psychological_calm_anchor_fa: 'آگاهی از وجود ترمز کمکی مربی، ۸۰ درصد از ترس ناخودآگاه راننده تازه‌کار را خنثی می‌کند.'
    }
  },
  {
    id: 'prompt_tristate_beltway_move_over',
    title_en: 'Tri-State Move Over Law: Capital Beltway & I-270 Clearance Protocol',
    title_fa: 'پرامپت قانون تغییر خط Move Over در اتوبان‌های I-270 و کمربندی واشنگتن',
    category: 'tristate_laws',
    concept_summary_en: 'Visual prompt demonstrating defensive lane clearance for stationary hazard vehicles on the Maryland/DC/Virginia highway corridors.',
    concept_summary_fa: 'پرامپت آموزشی نحوه راهنما زدن و تغییر لاین ایمن هنگام مواجهه با خودروهای دارای فلاشر در شانه اتوبان‌های مریلند.',
    camera_angle: 'dashboard_highway_night',
    lens_optics: '35mm_f18',
    lighting_mood: 'blue_hour_twilight',
    aspect_ratio: '16:9',
    photo_prompts: {
      midjourney_v6: {
        prompt_en: 'Cinematic dusk highway photography from the dashboard of a student driver vehicle traveling on I-270 near Rockville Maryland. Ahead on the right shoulder, a stationary roadside utility truck displays flashing amber warning lights. The training sedan signals left with its blinker on, moving safely one full lane over into the center lane with plenty of clearance. Twilight blue hour sky, streams of red taillights, sharp highway signs pointing to Rockville and Washington D.C., 35mm f/1.8 lens, realistic light trails, cinematic color grading --ar 16:9 --v 6.1 --style raw',
        prompt_fa: 'عکاسی سینمایی غروب اتوبان از روی داشبورد در بزرگراه I-270 راکویل مریلند: در شانه سمت راست یک خودروی امدادی با چراغ‌های زرد چشمک‌زن ایستاده و خودروی آموزش رانندگی با زدن راهنمای چپ یک خط فاصله ایمن می‌گیرد. آسمان گرگ و میش، رد نور چراغ‌ها و تابلوهای راکویل و واشنگتن دی‌سی با لنز ۳۵ میلی‌متر.',
        technical_parameters: '--ar 16:9 --v 6.1 --style raw (Camera: Sony A1, 35mm f/1.8)',
        lighting_and_atmosphere: 'Twilight blue hour with contrast between amber hazard flashes and cool deep blue evening sky.',
        composition_and_framing: 'Dynamic perspective showing lane change trajectory, clear hazard vehicle on shoulder, and rear-view mirror reflection.'
      },
      flux_pro: {
        prompt_en: 'highway driving shot at twilight on I-270 Maryland showing student driver changing lanes to obey the move over law for flashing hazard vehicle on shoulder, realistic 8k',
        prompt_fa: 'عکس رانندگی در اتوبان I-270 مریلند در حال تغییر خط طبق قانون Move Over با کیفیت ۸k.'
      },
      dalle3: {
        prompt_en: 'A car smoothly changing lanes on a multi-lane highway in Maryland to give space to a utility vehicle with flashing lights stopped on the shoulder, dusk lighting.'
      }
    },
    video_prompts: {
      runway_gen3: {
        prompt_en: 'Forward-facing cinematic tracking shot mounted on the windshield of a training car driving along a multi-lane Maryland highway at twilight. On the right shoulder ahead, an assistance vehicle has flashing amber hazard lights. The training car smoothly signals left, checks blind spot, and transitions one full lane to the left, providing safe distance. Motion blur on pavement, sharp focus on roadside warning lights, fluid highway camera flow.',
        prompt_fa: 'حرکت روان دوربین متصل به شیشه جلوی خودرو در اتوبان مریلند در گرگ و میش عصر: نزدیک شدن به خودروی دارای فلاشر در شانه راه، راهنمای چپ، کنترل نقطه کور و تغییر خط بسیار نرم به لاین وسط.',
        camera_motion_command: 'Forward highway motion at 55 mph with smooth lateral slide during lane change',
        sound_design_sfx_en: 'Highway wind woosh, rhythmic turn signal tick-tick-tick, rumble strip distant hum, smooth acceleration sound',
        sound_design_sfx_fa: 'صدای باد اتوبان، ریتم تیک‌تیک راهنما و شتاب نرم خودرو'
      },
      sora_kling: {
        prompt_en: 'Aerial drone shot tracking a student driver car on I-270 Maryland smoothly vacating the right lane for a disabled vehicle on the shoulder, perfect lane transition.',
        prompt_fa: 'نمای درون هوایی از تغییر خط ایمن خودروی آموزش رانندگی در اتوبان I-270 مریلند برای خودروی متوقف در شانه راه.'
      }
    },
    pedagogical_visual_notes: {
      teaching_goal_en: 'Educates drivers on Maryland’s expanded Move Over Law which applies to ALL stationary vehicles displaying hazard lights, not just police.',
      teaching_goal_fa: 'آموزش قانون جدید مریلند که تغییر خط را برای تمام خودروهای دارای فلاشر الزامی کرده است.',
      mva_test_correlation_en: 'Failing to give clearance to stopped vehicles on multi-lane test routes results in immediate deduction for reckless maneuver.',
      mva_test_correlation_fa: 'عدم رعایت فاصله با خودروهای متوقف در مسیر آزمون جاده‌ای باعث کسر نمره شدید برای مانور ناایمن می‌شود.',
      psychological_calm_anchor_en: 'Scanning ahead 15 seconds eliminates last-second panic jerks and swerves on high-speed highways.',
      psychological_calm_anchor_fa: 'دید دوردست ۱۵ ثانیه‌ای مانع از ترمز ناگهانی و چرخش عصبی فرمان در سرعت‌های بالا می‌شود.'
    }
  },
  {
    id: 'prompt_mva_2point_stall_turn',
    title_en: 'Reverse Two-Point Stall Turn: Gaithersburg MVA Closed Track Mastery',
    title_fa: 'پرامپت پارک دو نقطه‌ای دنده عقب در پیست بسته MVA گیترزبرگ',
    category: 'mva_skills',
    concept_summary_en: 'Visual training prompt breaking down the exact pivot points and wheel alignment needed to reverse into an MVA parking stall without touching cones.',
    concept_summary_fa: 'پرامپت آموزش نقطه چرخش فرمان و استقرار خودرو در باکس پارک عمودی دنده عقب در آزمون MVA بدون برخورد با مخروط‌ها.',
    camera_angle: 'drone_overhead_mva',
    lens_optics: '35mm_f18',
    lighting_mood: 'crisp_morning_mva',
    aspect_ratio: '9:16',
    photo_prompts: {
      midjourney_v6: {
        prompt_en: 'High-angle overhead drone shot looking down at the Gaithersburg Maryland MVA closed-course maneuver pad. A silver training sedan is executing a reverse two-point turn into a marked 90-degree parking bay flanked by orange cones. The front wheels are turned smoothly, and the vehicle is positioned exactly centered between the lines with 2 feet of clearance on both sides. Crisp white painted lines, black asphalt, clear sunny morning, sharp contrast, automotive architectural framing, 35mm lens equivalent from above, realistic 8k --ar 9:16 --v 6.1 --style raw',
        prompt_fa: 'نمای هوایی دید پرنده از پیست بسته MVA گیترزبرگ مریلند: خودروی آموزشی نقره‌ای رنگ در حال اجرای پارک عمودی دو نقطه‌ای دنده عقب بین دو خط و مخروط‌های نارنجی. چرخ‌های جلو در زاویه گردش، ماشین کاملا در مرکز خطوط با فاصله مساوی از طرفین در نور شفاف صبحگاهی.',
        technical_parameters: '--ar 9:16 --v 6.1 --style raw (Camera: Hasselblad aerial drone 100MP)',
        lighting_and_atmosphere: 'Direct morning sun creating crisp defined vehicle shadow showing exact stall alignment.',
        composition_and_framing: 'Geometric top-down composition emphasizing the parallel stall lines and cone boundaries.'
      },
      flux_pro: {
        prompt_en: 'overhead drone view of student driver reversing into parking stall at Maryland MVA test track, centered between cones, clear lines, high detail 8k',
        prompt_fa: 'دید هوایی درون از پارک دنده عقب خودرو در باکس MVA مریلند با جزئیات کامل.'
      },
      dalle3: {
        prompt_en: 'An overhead drone view of a training car backing up into a 90 degree parking space marked with cones on a test track in Maryland, perfectly centered.'
      }
    },
    video_prompts: {
      runway_gen3: {
        prompt_en: 'Cinematic high-angle drone shot smoothly descending toward a training sedan executing a reverse 2-point turn at a driving test course. The car stops past the stall, shifts into reverse, and turns smoothly backwards on an arc, straightening out perfectly inside the marked bay without touching any cones. Smooth deceleration and parking brake engagement.',
        prompt_fa: 'حرکت فرود نرم درون از زاویه بالا به سمت خودرو در حال اجرای پارک دو نقطه‌ای دنده عقب، توقف بعد از باکس، دنده عقب و چرخش قوسی نرم و صاف شدن کامل ماشین درون خطوط بدون تماس با مخروط‌ها.',
        camera_motion_command: 'High angle crane descend with slight forward tilt tracking vehicle pivot',
        sound_design_sfx_en: 'Tire scrub on textured asphalt, soft power steering pump hum, parking brake ratcheting click, calm instructor voice saying "Straighten your wheel"',
        sound_design_sfx_fa: 'صدای چرخش لاستیک روی آسفالت، زوزه ملایم پمپ هیدرولیک فرمان، صدای کشیدن ترمز دستی و کلام مربی: «فرمان را صاف کن»'
      },
      sora_kling: {
        prompt_en: 'Bird’s-eye perspective tracking a student reversing into a narrow parking stall with orange cones, perfect execution without hesitation, sunny Maryland.',
        prompt_fa: 'نمای عمودی چشم پرنده از پارک دنده عقب دقیق هنرجو در باکس مخروطی بدون کوچکترین مکث یا خطا.'
      }
    },
    pedagogical_visual_notes: {
      teaching_goal_en: 'Teaches students the exact pivot reference point (when the rear bumper aligns with the first cone) before turning the wheel.',
      teaching_goal_fa: 'آموزش نقطه عطف راننده (تراز شدن چرخ عقب یا سپر با مخروط اول) قبل از قفل کردن فرمان.',
      mva_test_correlation_en: 'One of the two core closed-course maneuvers at Maryland MVA before candidates are permitted on public roads.',
      mva_test_correlation_fa: 'یکی از دو مانور اصلی پیست بسته MVA مریلند قبل از صدور مجوز ورود به خیابان.',
      psychological_calm_anchor_en: 'Reminding students that stopping to adjust wheel angle is allowed; rushing causes cone hits.',
      psychological_calm_anchor_fa: 'یادآوری اینکه ایستادن برای چرخاندن فرمان هیچ نمره منفی ندارد؛ عجله باعث برخورد با مخروط می‌شود.'
    }
  }
];

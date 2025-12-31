import { Activity, ChefHat, Facebook, Heart, Instagram, Linkedin, Mail, MessageCircle, ShoppingCart, Smartphone, Twitter, Utensils } from "lucide-react";
import { Question } from "../interface/ProfileInterface";

// basic info
 export const getBasicQuestions = (language: 'ar' | 'en'): Question[] => [
  
    {
      id: 1,
      title: language === 'ar' ? ' صورة ملفك الشخصي' : ' Your Profile Picture',
      description:
        language === 'ar' ? 'اختر صورة واضحة تعبر عنك' : 'Choose a clear photo that represents you',
      field: 'profilePicture',
      type: 'profilePicture',
    },
    {
      id: 2,
      title: language === 'ar' ? ' صورة الغلاف' : ' Cover Photo',
      description:
        language === 'ar'
          ? 'أضف صورة غلاف مميزة لصفحتك'
          : 'Add a stunning cover photo for your profile',
      field: 'coverPhoto',
      type: 'coverPhoto',
    },
    {
      id: 3,
      title: language === 'ar' ? ' تاريخ ميلادك' : ' Your Birthday',
      description: language === 'ar' ? 'نحب أن نحتفل معك!' : "We'd love to celebrate with you!",
      field: 'dob',
      type: 'date',
    },
    {
      id: 4,
      title: language === 'ar' ? 'النوع' : 'Gender',
      description:
        language === 'ar' ? 'كيف تحب أن نخاطبك؟' : 'How would you like us to address you?',
      field: 'gender',
      type: 'select',
      options: [
        { value: 'male', label: language === 'ar' ? 'ذكر' : 'Male' },
        { value: 'female', label: language === 'ar' ? 'أنثى' : 'Female' },
        { value: 'other', label: language === 'ar' ? 'آخر' : 'Other' },
      ],
    },
    {
      id: 5,
      title: language === 'ar' ? 'عنوانك' : 'Your Address',
      description: language === 'ar' ? 'رقم الشارع والمنزل' : 'Street number and name',
      field: 'location.streetAddress',
      type: 'text',
      placeholder: language === 'ar' ? '123 شارع الملك' : '123 Main Street',
    },
    {
      id: 6,
      title: language === 'ar' ? 'المدينة' : 'City',
      description: language === 'ar' ? 'في أي مدينة تعيش؟' : 'Which city do you live in?',
      field: 'location.city',
      type: 'text',
      placeholder: language === 'ar' ? 'الرياض' : 'New York',
    },
    {
      id: 7,
      title: language === 'ar' ? ' الرمز البريدي' : ' ZIP Code',
      description: language === 'ar' ? 'الرمز البريدي لمنطقتك' : 'Postal code for your area',
      field: 'location.zip',
      type: 'text',
      placeholder: language === 'ar' ? '12345' : '10001',
    },
    {
      id: 8,
      title: language === 'ar' ? ' الدولة' : ' Country',
      description: language === 'ar' ? 'في أي دولة؟' : 'Which country?',
      field: 'location.country',
      type: 'text',
      placeholder: language === 'ar' ? 'السعودية' : 'United States',
    },
    {
      id: 9,
      title: language === 'ar' ? ' نبذة عنك' : ' About You',
      description:
        language === 'ar'
          ? 'أخبرنا قصتك... ما الذي يجعلك مميزاً؟'
          : 'Tell us your story... What makes you special?',
      field: 'bio',
      type: 'textarea',
      placeholder:
        language === 'ar'
          ? 'أنا شخص شغوف بالطعام الصحي...'
          : "I'm passionate about healthy food...",
    },
    {
      id: 10,
      title: language === 'ar' ? ' موقعك الإلكتروني' : ' Your Website',
      description: language === 'ar' ? 'اختياري - هل لديك موقع؟' : 'Optional - Have a website?',
      field: 'website',
      type: 'text',
      placeholder: 'https://yourwebsite.com',
    },
  ];

//  socail media 
  export const socialPlatforms = [
    {
      name: 'instagram',
      icon: Instagram,
      color: 'from-purple-500 to-pink-500',
      placeholder: '@username or https://instagram.com/username',
      titleAr: 'انستقرام',
      titleEn: 'Instagram',
      descAr: 'شارك حساب الانستقرام الخاص بك',
      descEn: 'Share your Instagram profile',
    },
    {
      name: 'twitter',
      icon: Twitter,
      color: 'from-blue-400 to-blue-600',
      placeholder: '@username or https://twitter.com/username',
      titleAr: 'تويتر (X)',
      titleEn: 'Twitter (X)',
      descAr: 'تواصل معنا على تويتر',
      descEn: 'Connect with us on Twitter',
    },
    {
      name: 'facebook',
      icon: Facebook,
      color: 'from-blue-600 to-blue-800',
      placeholder: 'https://facebook.com/username',
      titleAr: 'فيسبوك',
      titleEn: 'Facebook',
      descAr: 'أضف صفحة الفيسبوك الخاصة بك',
      descEn: 'Add your Facebook page',
    },
    {
      name: 'linkedin',
      icon: Linkedin,
      color: 'from-blue-700 to-blue-900',
      placeholder: 'https://linkedin.com/in/username',
      titleAr: 'لينكد إن',
      titleEn: 'LinkedIn',
      descAr: 'ربط ملفك المهني',
      descEn: 'Link your professional profile',
    },
  ];

//   preferanc
 export const notificationQuestions = [
    {
      name: 'marketplaceNotifications',
      icon: ShoppingCart,
      titleAr: 'هل تريد معرفة آخر العروض في السوق؟',
      titleEn: 'Want to know about the latest marketplace deals?',
      descAr: 'سنخبرك بالمنتجات الجديدة والعروض الخاصة',
      descEn: "We'll notify you about new products and special offers",
    },
    {
      name: 'recipeUpdates',
      icon: MessageCircle,
      titleAr: 'هل تحب أن نشاركك وصفات جديدة؟',
      titleEn: 'Would you like us to share new recipes with you?',
      descAr: 'سنرسل لك أحدث الوصفات المناسبة لك',
      descEn: "We'll send you the latest recipes tailored for you",
    },
    {
      name: 'promotionalEmails',
      icon: Mail,
      titleAr: 'هل أنت مهتم بعروضنا الترويجية؟',
      titleEn: 'Interested in our promotional offers?',
      descAr: 'احصل على خصومات حصرية عبر البريد الإلكتروني',
      descEn: 'Get exclusive discounts via email',
    },
    {
      name: 'pushNotifications',
      icon: Smartphone,
      titleAr: 'هل تريد تلقي إشعارات التطبيق؟',
      titleEn: 'Want to receive push notifications?',
      descAr: 'ابق على اطلاع بكل ما هو جديد',
      descEn: 'Stay updated with everything new',
    },
  ];


//   health 
 export const getHealthsections =(language: 'ar' | 'en')=> [
    {
      id: 'basic',
      icon: Activity,
      color: 'from-blue-500 to-blue-600',
      titleAr: 'المعلومات الأساسية',
      titleEn: 'Basic Information',
      descAr: 'دعنا نبدأ بالأساسيات',
      descEn: "Let's start with the basics",
      fields: [
        {
          name: 'healthProfile.basic.height',
          labelAr: 'كم طولك؟ (سم)',
          labelEn: "What's your height? (cm)",
          type: 'number',
          placeholder: '170',
        },
        {
          name: 'healthProfile.basic.weight',
          labelAr: 'كم وزنك؟ (كجم)',
          labelEn: "What's your weight? (kg)",
          type: 'number',
          placeholder: '70',
        },
      ],
    },
    {
      id: 'dietary',
      icon: Utensils,
      color: 'from-green-500 to-green-600',
      titleAr: 'التفضيلات الغذائية',
      titleEn: 'Dietary Preferences',
      descAr: 'أخبرنا عن ذوقك في الطعام',
      descEn: 'Tell us about your food preferences',
      fields: [
        {
          name: 'dietPreferences.dietType',
          labelAr: 'ما نوع نظامك الغذائي؟',
          labelEn: "What's your diet type?",
          type: 'text',
          placeholder: language === 'ar' ? 'نباتي، حلال، كيتو...' : 'Vegetarian, Halal, Keto...',
        },
        {
          name: 'dietPreferences.allergies',
          labelAr: 'هل لديك أي حساسية؟',
          labelEn: 'Do you have any allergies?',
          type: 'tags',
          placeholder: language === 'ar' ? 'الفول السوداني، البيض...' : 'Peanuts, Eggs...',
        },
        {
          name: 'dietPreferences.favouriteIngredients',
          labelAr: 'ما هي مكوناتك المفضلة؟',
          labelEn: 'What are your favorite ingredients?',
          type: 'tags',
          placeholder: language === 'ar' ? 'دجاج، أرز، خضروات...' : 'Chicken, Rice, Vegetables...',
        },
      ],
    },
    {
      id: 'cooking',
      icon: ChefHat,
      color: 'from-orange-500 to-orange-600',
      titleAr: 'أسلوب الطبخ',
      titleEn: 'Cooking Style',
      descAr: 'كيف تحب أن تطبخ؟',
      descEn: 'How do you like to cook?',
      fields: [
        {
          name: 'cookingContext.skillLevel',
          labelAr: 'ما مستوى مهارتك في الطبخ؟',
          labelEn: "What's your cooking skill level?",
          type: 'select',
          options: [
            { value: 'Beginner', label: language === 'ar' ? 'مبتدئ' : 'Beginner' },
            { value: 'Intermediate', label: language === 'ar' ? 'متوسط' : 'Intermediate' },
            { value: 'Advanced', label: language === 'ar' ? 'متقدم' : 'Advanced' },
          ],
        },
        {
          name: 'cookingContext.timeAvailable',
          labelAr: 'كم من الوقت لديك للطبخ عادة؟',
          labelEn: 'How much time do you usually have for cooking?',
          type: 'number',
          placeholder: language === 'ar' ? '30 دقيقة' : '30 minutes',
        },
        {
          name: 'cookingContext.appliances',
          labelAr: 'ما هي الأجهزة المتوفرة لديك؟',
          labelEn: 'What appliances do you have?',
          type: 'tags',
          placeholder: language === 'ar' ? 'فرن، قلاية هوائية...' : 'Oven, Air fryer...',
        },
      ],
    },
    {
      id: 'health',
      icon: Heart,
      color: 'from-red-500 to-red-600',
      titleAr: 'الحالة الصحية',
      titleEn: 'Health Conditions',
      descAr: 'هل هناك أي شيء يجب أن نعرفه؟',
      descEn: 'Is there anything we should know?',
      fields: [
        {
          name: 'healthProfile.healthCondition.conditions',
          labelAr: 'هل لديك أي حالات صحية؟',
          labelEn: 'Do you have any health conditions?',
          type: 'tags',
          placeholder: language === 'ar' ? 'سكري، ضغط...' : 'Diabetes, Hypertension...',
        },
        {
          name: 'healthProfile.healthCondition.doctorsAdvice',
          labelAr: 'هل لديك أي توصيات من الطبيب؟',
          labelEn: "Any doctor's recommendations?",
          type: 'textarea',
          placeholder: language === 'ar' ? 'اكتب هنا...' : 'Type here...',
        },
      ],
    },
  ];
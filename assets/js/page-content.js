/**
 * Page body content — EN + AR (Modern Standard Arabic).
 * Merged into window.SOHAILA_I18N. Load AFTER translations.js and BEFORE i18n.js.
 *
 * Key map:
 *   shared.*               Strings reused across pages (role, tagline, philosophy, expertise, impact, why, CTA, footer)
 *   pages.<page>.*         Page-specific body copy (home, about, expertise, portfolio, results, testimonials, contact)
 *   portfolioCategories.*  Category label / meta text, keyed by category id (matches translations.portfolio keys)
 *   portfolioRoles.*       Client role / description translations, keyed by the English description
 *
 * Notes:
 *   - Keys ending in "Html" contain inline HTML (<strong>, <br />) — use with data-i18n-html.
 *   - shared.taglineB keeps a leading space so inline spans render correctly (" Driving Growth.").
 *   - "{n}" / "{page}" in caption/alt patterns are placeholders to be replaced at runtime.
 */
(function () {
  /* ------------------------------------------------------------------
   * SHARED — English
   * ------------------------------------------------------------------ */
  const sharedEn = {
    brandName: "SOHAILA HALIM",
    roleTitle: "Brand, Marketing & Business Growth Strategist",
    taglineA: "Building Brands. Shaping Strategies.",
    taglineB: " Driving Growth.",
    taglineFull: "Building Brands. Shaping Strategies. Driving Growth.",

    credibilityEyebrow: "Credibility",
    expertiseEyebrow: "Expertise",

    statsTitle: "Years of Experience and Projects",
    yearsLabel: "Years of Experience",
    projectsLabel: "Projects Across Multiple Industries",

    philosophyTitle: "My Strategic Philosophy",
    philosophyLead: "Strategy Before Execution. Value Before Visibility. Growth Beyond Campaigns.",
    philosophyDescShort:
      "My approach is built around four principles: Business First; Positioning Creates Advantage; Products Drive Revenue; Strategy Must Translate Into Action.",

    expertiseTitle: "Strategic Expertise",
    expertiseLead: "From Strategy to Sustainable Business Growth.",
    expertiseAreas: {
      brand: {
        title: "Brand Strategy & Positioning",
        text: "Brand Development · Market Positioning · Brand Identity Direction · Rebranding · Personal Branding",
      },
      marketing: {
        title: "Marketing Strategy & Market Development",
        text: "Market Research · Competitive Analysis · Marketing Planning · Go-to-Market Strategy · Market Expansion",
      },
      growth: {
        title: "Business Growth & Development",
        text: "Business Model Development · Growth Strategy · Revenue Optimization · Business Expansion · Strategic Advisory",
      },
      product: {
        title: "Product & Offer Development",
        text: "Product Strategy · Offer Architecture · Pricing Strategy · Product Portfolio Development · High-Ticket Offers",
      },
      digital: {
        title: "Digital Marketing & Creative Strategy",
        text: "Digital Marketing Strategy · Paid Media Strategy · Content Strategy · Creative Direction · Integrated Campaigns",
      },
      funnels: {
        title: "Sales Funnels & Customer Acquisition",
        text: "Customer Journey Strategy · Lead Generation · Sales Funnel Development · Conversion Optimization · CRM & Retention",
      },
    },

    impactTitle: "Beyond Marketing. Focused on Business Impact.",
    impactDesc:
      "My work connects brand strategy, product development, marketing, and commercial growth to help businesses:",
    impactCards: {
      positions: {
        title: "Build Stronger Market Positions",
        text: "Establish clear differentiation and a competitive brand presence.",
      },
      offers: {
        title: "Develop More Valuable Products & Offers",
        text: "Create market-relevant offerings and new revenue opportunities.",
      },
      customers: {
        title: "Acquire & Convert the Right Customers",
        text: "Build effective customer acquisition strategies and conversion journeys.",
      },
      growth: {
        title: "Unlock Business Growth Opportunities",
        text: "Identify opportunities for expansion, revenue development, and long-term growth.",
      },
    },

    whyTitle: "Why Work With Me",
    whyLead: "Strategic Thinking. Commercial Understanding. Measurable Impact.",
    whyCards: {
      mindset: {
        title: "Business-First Mindset",
        text: "Strategies built around business objectives, not marketing activities alone.",
      },
      crossIndustry: {
        title: "Cross-Industry Expertise",
        text: "Experience across diverse business models, industries, and regional markets.",
      },
      integrated: {
        title: "Integrated Strategic Perspective",
        text: "Connecting branding, consumer psychology, product development, and marketing.",
      },
      leadership: {
        title: "Strategy-to-Execution Leadership",
        text: "Turning business opportunities into actionable plans and measurable outcomes.",
      },
    },

    ctaTitle: "Let's Build What's Next.",
    ctaLead: "Your Next Stage of Growth Starts with the Right Strategy.",

    footerBrandTitle: "Brand, Marketing & Business Growth Strategist",
    footerTagline: "Building Brands. Shaping Strategies. Driving Growth.",
    footerCredit: "SOHAILA HALIM Branding Portfolio 2026",
    brandStrategistShort: "Brand Strategist",
  };

  /* ------------------------------------------------------------------
   * SHARED — Arabic
   * ------------------------------------------------------------------ */
  const sharedAr = {
    brandName: "SOHAILA HALIM",
    roleTitle: "خبيرة استراتيجيات العلامة التجارية والتسويق ونمو الأعمال",
    taglineA: "بناء العلامات التجارية. صياغة الاستراتيجيات.",
    taglineB: " قيادة النمو.",
    taglineFull: "بناء العلامات التجارية. صياغة الاستراتيجيات. قيادة النمو.",

    credibilityEyebrow: "المصداقية",
    expertiseEyebrow: "الخبرات",

    statsTitle: "سنوات الخبرة والمشاريع",
    yearsLabel: "سنوات من الخبرة",
    projectsLabel: "مشروع في قطاعات متعددة",

    philosophyTitle: "فلسفتي الاستراتيجية",
    philosophyLead: "الاستراتيجية قبل التنفيذ. القيمة قبل الظهور. نموٌّ يتجاوز الحملات.",
    philosophyDescShort:
      "يرتكز نهجي على أربعة مبادئ: الأعمال أولاً؛ التموضع يصنع الميزة؛ المنتجات تقود الإيرادات؛ والاستراتيجية يجب أن تتحول إلى فعل.",

    expertiseTitle: "الخبرات الاستراتيجية",
    expertiseLead: "من الاستراتيجية إلى نمو مستدام للأعمال.",
    expertiseAreas: {
      brand: {
        title: "استراتيجية العلامة التجارية والتموضع",
        text: "تطوير العلامة التجارية · التموضع في السوق · توجيه الهوية البصرية للعلامة · إعادة بناء العلامة التجارية · العلامة الشخصية",
      },
      marketing: {
        title: "استراتيجية التسويق وتطوير الأسواق",
        text: "أبحاث السوق · تحليل المنافسين · التخطيط التسويقي · استراتيجية دخول السوق · التوسع في الأسواق",
      },
      growth: {
        title: "نمو الأعمال وتطويرها",
        text: "تطوير نماذج الأعمال · استراتيجية النمو · تحسين الإيرادات · توسيع الأعمال · الاستشارات الاستراتيجية",
      },
      product: {
        title: "تطوير المنتجات والعروض",
        text: "استراتيجية المنتج · هندسة العروض · استراتيجية التسعير · تطوير محفظة المنتجات · العروض عالية القيمة",
      },
      digital: {
        title: "التسويق الرقمي والاستراتيجية الإبداعية",
        text: "استراتيجية التسويق الرقمي · استراتيجية الإعلانات المدفوعة · استراتيجية المحتوى · التوجيه الإبداعي · الحملات المتكاملة",
      },
      funnels: {
        title: "قمع المبيعات واكتساب العملاء",
        text: "استراتيجية رحلة العميل · توليد العملاء المحتملين · بناء قمع المبيعات · تحسين معدل التحويل · إدارة علاقات العملاء (CRM) والاحتفاظ بهم",
      },
    },

    impactTitle: "ما وراء التسويق. تركيزٌ على الأثر في الأعمال.",
    impactDesc:
      "يربط عملي بين استراتيجية العلامة التجارية وتطوير المنتجات والتسويق والنمو التجاري لمساعدة الشركات على:",
    impactCards: {
      positions: {
        title: "بناء مراكز أقوى في السوق",
        text: "ترسيخ تميّز واضح وحضور تنافسي للعلامة التجارية.",
      },
      offers: {
        title: "تطوير منتجات وعروض أكثر قيمة",
        text: "ابتكار عروض ملائمة للسوق وفرص إيرادات جديدة.",
      },
      customers: {
        title: "اكتساب العملاء المناسبين وتحويلهم",
        text: "بناء استراتيجيات فعّالة لاكتساب العملاء ورحلات تحويل ناجحة.",
      },
      growth: {
        title: "إطلاق فرص نمو الأعمال",
        text: "تحديد فرص التوسع وتنمية الإيرادات والنمو طويل الأجل.",
      },
    },

    whyTitle: "لماذا تعمل معي",
    whyLead: "تفكير استراتيجي. فهم تجاري. أثر قابل للقياس.",
    whyCards: {
      mindset: {
        title: "عقلية الأعمال أولاً",
        text: "استراتيجيات مبنية على أهداف الأعمال، لا على الأنشطة التسويقية وحدها.",
      },
      crossIndustry: {
        title: "خبرة متعددة القطاعات",
        text: "خبرة عبر نماذج أعمال وقطاعات وأسواق إقليمية متنوعة.",
      },
      integrated: {
        title: "رؤية استراتيجية متكاملة",
        text: "الربط بين بناء العلامة التجارية وسيكولوجية المستهلك وتطوير المنتجات والتسويق.",
      },
      leadership: {
        title: "قيادة من الاستراتيجية إلى التنفيذ",
        text: "تحويل فرص الأعمال إلى خطط قابلة للتنفيذ ونتائج قابلة للقياس.",
      },
    },

    ctaTitle: "لنبنِ معاً ما هو قادم.",
    ctaLead: "تبدأ مرحلة نموك القادمة باستراتيجية صحيحة.",

    footerBrandTitle: "خبيرة استراتيجيات العلامة التجارية والتسويق ونمو الأعمال",
    footerTagline: "بناء العلامات التجارية. صياغة الاستراتيجيات. قيادة النمو.",
    footerCredit: "SOHAILA HALIM — ملف أعمال العلامات التجارية 2026",
    brandStrategistShort: "خبيرة استراتيجيات العلامة التجارية",
  };

  /* ------------------------------------------------------------------
   * PAGES — English
   * ------------------------------------------------------------------ */
  const pagesEn = {
    home: {
      docTitle: "Sohaila Halim — Brand, Marketing & Business Growth Strategist",
      metaDescription:
        "Sohaila Halim — Brand, Marketing & Business Growth Strategist. Building Brands. Shaping Strategies. Driving Growth.",
      hero: {
        name: "SOHAILA HALIM",
        title: sharedEn.roleTitle,
        taglineA: sharedEn.taglineA,
        taglineB: sharedEn.taglineB,
        services:
          "Brand Strategy · Marketing Strategy · Business Growth · Product & Offer Development",
        imageAlt: "Sohaila Halim portrait composition",
      },
      credibility: {
        eyebrow: sharedEn.credibilityEyebrow,
        title: sharedEn.statsTitle,
        yearsLabel: sharedEn.yearsLabel,
        projectsLabel: sharedEn.projectsLabel,
      },
      philosophy: {
        eyebrow: sharedEn.expertiseEyebrow,
        title: sharedEn.philosophyTitle,
        lead: sharedEn.philosophyLead,
        desc: sharedEn.philosophyDescShort,
      },
      expertise: {
        title: sharedEn.expertiseTitle,
        lead: sharedEn.expertiseLead,
        areas: sharedEn.expertiseAreas,
      },
      impact: {
        title: sharedEn.impactTitle,
        desc: sharedEn.impactDesc,
        cards: sharedEn.impactCards,
      },
      portfolio: {
        title: "CLIENT PORTFOLIO",
        lead: "Strategic Partnerships Across Personal Brands & Businesses.",
      },
      results: {
        title: "Selected Success Stories",
        stats: {
          roasIslam: "ROAS — Dr. Islam Mohamed",
          bookingsKarim: "Monthly Bookings — Karim Sayed",
          revenueVabilla: "Monthly Revenue — Vabilla",
          roasVabilla: "ROAS — Vabilla",
        },
      },
      why: {
        title: sharedEn.whyTitle,
        lead: sharedEn.whyLead,
        cards: sharedEn.whyCards,
      },
      cta: {
        title: sharedEn.ctaTitle,
        lead: sharedEn.ctaLead,
      },
    },

    about: {
      docTitle: "About Me — Sohaila Halim",
      metaDescription:
        "About Sohaila Halim — Brand, Marketing & Business Growth Strategist with 12+ years of experience and 600+ projects.",
      eyebrow: "About",
      title: "About Me",
      navAria: "About sections",
      nav: {
        introduction: "Introduction",
        experience: "Experience",
        credentials: "Credentials",
        education: "Education",
        professionalExperience: "Professional Experience",
        coreExpertise: "Core Expertise",
        whereWeWork: "Where We Work",
        why: "Why Work With Me",
      },
      introduction: {
        title: "Professional Introduction",
        p1: "I'm Sohaila Halim, a Brand, Marketing & Business Growth Strategist with over 12 years of experience helping businesses, entrepreneurs, and personal brands turn ideas into market opportunities and strategic direction into measurable business outcomes.",
        p2: "Throughout my career, I've contributed to more than 600 projects across diverse industries and markets, working with startups, established businesses, industry experts, and high-ticket service providers.",
        p3: "My expertise extends beyond traditional branding and marketing. I specialize in developing brand strategies, identifying growth opportunities, structuring products and offers, and building integrated marketing systems aligned with business objectives.",
        p4: "From establishing a brand's competitive position to developing customer acquisition strategies, optimizing sales funnels, and supporting business expansion, I approach every project with a combination of strategic thinking, commercial understanding, and creative problem-solving.",
        p5: "I believe effective marketing begins long before the first campaign. It begins with understanding the business, identifying the right opportunities, and making strategic decisions that create lasting value.",
        imageAlt: "Sohaila Halim professional portrait from portfolio",
      },
      experience: {
        title: sharedEn.statsTitle,
        yearsLabel: sharedEn.yearsLabel,
        projectsLabel: sharedEn.projectsLabel,
      },
      credentials: {
        title: "Professional Background & Credentials",
        p1: "My professional background combines over 12 years of hands-on industry experience with academic education and specialized training in marketing, business strategy, consumer behavior, and project management.",
        p2: "This multidisciplinary foundation enables me to approach business challenges from both strategic and operational perspectives, connecting market insights, consumer psychology, business objectives, and structured execution.",
      },
      education: {
        title: "Education & Professional Qualifications",
        items: {
          mba: "Master of Business Administration (MBA) – Marketing Uppsala University, Sweden",
          neuromarketing: "Neuromarketing Specialization Harvard University, USA",
          pmp: "Project Management Professional (PMP) – Project Management Training ESLSCA University, Egypt",
          diploma: "Professional Marketing Diploma - The American University in Cairo (AUC)",
          google: "Google Certified Marketing Professional - Google",
        },
      },
      professionalExperience: {
        title: "Professional Experience",
        role: {
          title: "Former Media Consultant at Facebook",
          text: "Professional experience in digital marketing, advertising strategy, and performance-driven marketing solutions.",
        },
      },
      coreExpertise: {
        title: "Core Areas of Expertise",
        items: {
          brandStrategy: "Brand Strategy & Competitive Positioning",
          strategicMarketing: "Strategic Marketing & Business Growth",
          consumerPsychology: "Consumer Psychology & Neuromarketing",
          productDevelopment: "Product Development & Offer Architecture",
          highTicket: "High-Ticket Business & Revenue Strategy",
          ecommerce: "E-commerce & Digital Growth",
          projectManagement: "Strategic Project Planning & Management",
          creativeStrategy: "Creative Strategy & Marketing Communications",
          marketingLeadership: "Marketing Leadership & Strategic Advisory",
        },
      },
      whereWeWork: {
        title: "Where We Work",
        lead: "Over the past 12 years, our work has crossed borders and reached clients across the Arab world and beyond.",
        text: "We've proudly delivered branding, marketing, and content solutions to businesses and entrepreneurs in multiple countries, adapting strategies to local markets, cultures, and audience behaviors.",
        subtitle: "Multi-Market Experience",
        markets: {
          libya: "Libya",
          egypt: "Egypt",
          jordan: "Jordan",
          saudi: "Saudi Arabia",
          kuwait: "Kuwait",
          qatar: "Qatar",
          uae: "UAE",
          oman: "Oman",
        },
        mapAlt:
          "Multi-market experience map showing Libya, Egypt, Jordan, Saudi Arabia, Kuwait, Qatar, UAE, and Oman",
      },
      why: {
        title: sharedEn.whyTitle,
        lead: sharedEn.whyLead,
        cards: sharedEn.whyCards,
      },
    },

    expertise: {
      docTitle: "Expertise — Sohaila Halim",
      metaDescription:
        "Strategic philosophy, audiences, expertise areas, business impact, specialized expertise, and strategic approach.",
      eyebrow: sharedEn.expertiseEyebrow,
      title: sharedEn.expertiseTitle,
      lead: sharedEn.expertiseLead,
      navAria: "Expertise sections",
      nav: {
        philosophy: "Philosophy",
        whoIWorkWith: "Who I Work With",
        expertise: "Expertise",
        businessImpact: "Business Impact",
        specialized: "Specialized",
        approach: "Approach",
      },
      philosophy: {
        title: sharedEn.philosophyTitle,
        lead: sharedEn.philosophyLead,
        intro: "My approach is built around four principles:",
        p1: "I believe that successful brands are not built through visibility alone, and sustainable business growth cannot depend on marketing campaigns in isolation.",
        p2: "Real growth requires alignment between the business model, brand positioning, product value, customer needs, and marketing execution.",
        quote:
          "My focus is not simply on helping brands become more visible, but on helping businesses become more competitive, commercially relevant, and positioned for long-term growth.",
        principles: {
          businessFirst: {
            title: "Business First",
            text: "Every strategy begins with understanding the business model, commercial objectives, market dynamics, and growth challenges.",
          },
          positioning: {
            title: "Positioning Creates Advantage",
            text: "A strong competitive position helps brands communicate their value, attract the right customers, and compete beyond price.",
          },
          products: {
            title: "Products Drive Revenue",
            text: "Marketing can create demand, but sustainable revenue depends on relevant products, compelling offers, and well-designed customer journeys.",
          },
          strategy: {
            title: "Strategy Must Translate Into Action",
            text: "A strategy creates value when it guides decisions, aligns teams, and connects execution with measurable business objectives.",
          },
        },
      },
      whoIWorkWith: {
        title: "Who I Work With",
        lead: "Different Business Models. Different Challenges. One Strategic Mindset.",
        desc: "I work with businesses, entrepreneurs, and industry experts at different stages of growth, developing strategies tailored to their commercial objectives, market realities, and customer behaviors.",
        tabsAria: "Business audiences",
        audiences: {
          highTicket: {
            title: "High-Ticket & Knowledge-Based Businesses",
            text: "For coaching, consulting, education, and premium service businesses looking to develop valuable offers, build customer acquisition systems, and improve sales conversion.",
          },
          ecommerce: {
            title: "E-commerce & Consumer Brands",
            text: "For product-based businesses seeking stronger market positioning, more effective marketing strategies, optimized customer journeys, and sustainable revenue growth.",
          },
          personal: {
            title: "Personal Brands & Industry Experts",
            text: "For coaches, consultants, executives, entrepreneurs, and professionals seeking to establish authority, develop their positioning, and monetize their expertise.",
          },
          b2b: {
            title: "B2B & Service-Based Businesses",
            text: "For professional service providers and B2B companies seeking to differentiate their offerings, attract qualified customers, and support business development.",
          },
          startups: {
            title: "Startups & Emerging Ventures",
            text: "For founders transforming business ideas into market-ready brands, products, and scalable business models.",
          },
          corporate: {
            title: "Established Businesses & Corporate Brands",
            text: "For organizations looking to strengthen their competitive position, enter new markets, develop new revenue opportunities, or improve marketing effectiveness.",
          },
        },
      },
      strategicExpertise: {
        title: sharedEn.expertiseTitle,
        lead: sharedEn.expertiseLead,
        desc: "I help businesses and personal brands strengthen their market position, develop competitive offerings, and build marketing strategies that drive measurable business growth.",
        tabsAria: "Strategic expertise categories",
        areas: sharedEn.expertiseAreas,
      },
      businessImpact: {
        title: sharedEn.impactTitle,
        desc: sharedEn.impactDesc,
        cards: sharedEn.impactCards,
      },
      specialized: {
        title: "Specialized Business Expertise",
        lead: "Different Business Models. Tailored Growth Strategies.",
        desc: "I develop tailored brand, marketing, and growth strategies aligned with each business model, its market dynamics, and commercial objectives.",
        items: {
          personal: {
            title: "01. Personal Brands & Industry Experts",
            leadHtml: "<strong>Build Authority. Establish Influence. Monetize Expertise.</strong>",
            text: "Strategic personal branding for entrepreneurs, executives, coaches, and consultants seeking stronger market positioning, professional authority, and commercial opportunities.",
          },
          highTicket: {
            title: "02. High-Ticket Coaching & Consulting Businesses",
            leadHtml: "<strong>Develop Premium Offers. Optimize Conversion. Scale Revenue.</strong>",
            text: "High-ticket offer development, product ecosystems, acquisition funnels, and conversion strategies designed for premium coaching, consulting, and knowledge-based businesses.",
          },
          ecommerce: {
            title: "03. E-commerce & Consumer Brands",
            leadHtml: "<strong>Strengthen Positioning. Acquire Customers. Drive Sales.</strong>",
            text: "Brand development, product positioning, customer acquisition, conversion optimization, and retention strategies for e-commerce and consumer product businesses.",
          },
          corporate: {
            title: "04. Corporate, B2B & Service-Based Businesses",
            leadHtml: "<strong>Create Competitive Advantage. Expand Markets. Accelerate Growth.</strong>",
            text: "Strategic marketing, business development, market expansion, and differentiated positioning for established companies, emerging ventures, and professional service providers.",
          },
        },
      },
      approach: {
        title: "My Strategic Approach",
        lead: "From Business Challenges to Measurable Growth.",
        desc: "I combine business intelligence, strategic thinking, and creative execution to turn complex challenges into actionable growth opportunities.",
        line: "MY APPROACH: Business-Driven. Customer-Centric. Results-Focused.",
        steps: {
          discover: {
            title: "DISCOVER & DIAGNOSE",
            text: "Understand the business model, market dynamics, customer behavior, and key growth challenges.",
          },
          define: {
            title: "DEFINE & POSITION",
            text: "Identify competitive advantages, strategic priorities, target segments, and market opportunities.",
          },
          develop: {
            title: "DEVELOP & PLAN",
            text: "Build integrated brand, product, and marketing strategies with clear objectives, actionable roadmaps, and measurable KPIs.",
          },
          lead: {
            title: "LEAD & EXECUTE",
            text: "Translate strategy into coordinated action through creative direction, cross-functional collaboration, and implementation oversight.",
          },
          measure: {
            title: "MEASURE & OPTIMIZE",
            text: "Evaluate performance, identify improvement opportunities, and refine strategies to support sustainable growth.",
          },
        },
      },
    },

    portfolio: {
      docTitle: "Client Portfolio — Sohaila Halim",
      metaDescription:
        "Client portfolio across personal brands, corporate brands, care & beauty, healthcare, real estate, government, and startups.",
      eyebrow: "Portfolio",
      title: "CLIENT PORTFOLIO",
      lead: "Strategic Partnerships Across Personal Brands & Businesses.",
      filterAria: "Portfolio filters",
      personal: {
        title: "Personal Brands & High-Ticket Businesses",
        taglineHtml:
          "<strong>Building Authority. Monetizing Expertise. Scaling High-Value Businesses.</strong>",
        text: "Strategic partnerships with coaches, consultants, doctors, content creators, public figures, and industry experts to develop powerful personal brands, build scalable business models, and drive revenue through strategic positioning, premium offers, and performance-driven acquisition funnels.",
        coreHtml:
          "<strong>Core Expertise:</strong> Personal Branding · High-Ticket Business Scaling · Offer Development · Paid Sales Funnels · Revenue Growth",
      },
      corporate: {
        title: "Corporate Brands & Business Growth",
        taglineHtml:
          "<strong>Building Competitive Brands. Developing Markets. Driving Business Growth.</strong>",
        text: "Strategic collaborations with startups, established companies, and commercial organizations across diverse industries, focusing on brand development, market positioning, product strategy, integrated marketing, and sustainable business growth.",
        coreHtml:
          "<strong>Core Expertise:</strong> Brand Development · Marketing Strategy · Product Positioning · Customer Acquisition · Market Expansion",
      },
      clickNote:
        "Click on the image to be redirected to the page. (Where a verified Instagram link exists.)",
    },

    results: {
      docTitle: "Case Studies & Results — Sohaila Halim",
      metaDescription:
        "Selected success stories, medical clinic growth, e-commerce results, and original results evidence screenshots.",
      eyebrow: "Results",
      title: "Case Studies & Results",
      lead: "Selected Success Stories",
      navAria: "Results sections",
      nav: {
        highTicket: "High-Ticket",
        medical: "Medical",
        ecommerce: "E-commerce",
        evidence: "Evidence Gallery",
      },
      highTicket: {
        title: "High-Ticket Business Scaling — Success Stories",
        subtitle: "Low-Ticket Funnels · Paid Acquisition · High-Ticket Offers",
        columns: {
          client: "Client",
          lowTicketPrice: "Low-Ticket Price",
          roas: "ROAS",
          highTicketOffer: "High-Ticket Offer",
          unitsSold: "Units Sold",
        },
      },
      medical: {
        title: "Medical Personal Branding & Clinic Growth",
        subtitle: "Patient Acquisition · Clinic Bookings · Social Media Conversion",
        columns: {
          client: "Client",
          monthlyBookings: "Monthly Bookings",
          inquiryToBookingRate: "Inquiry-to-Booking Rate",
          monthlyClinicVisits: "Monthly Clinic Visits",
        },
      },
      ecommerce: {
        title: "E-commerce & Consumer Brand Growth",
        subtitle: "Online Revenue · Monthly Orders · Return on Ad Spend",
        columns: {
          brand: "Brand",
          monthlyRevenue: "Monthly Revenue",
          monthlyOrders: "Monthly Orders",
          roas: "ROAS",
        },
      },
      evidence: {
        title: "Results Evidence Gallery",
        desc: "Original results screenshots from the portfolio (pages 16–18). Click to enlarge.",
        captionPattern: "Results evidence {n}",
        altPattern: "Results evidence screenshot {n} from original portfolio",
      },
    },

    testimonials: {
      docTitle: "Testimonials — Sohaila Halim",
      metaDescription: "Original client testimonial screenshots from Sohaila Halim's portfolio.",
      eyebrow: "Testimonials",
      title: "Testimonials",
      desc: "Original testimonial screenshots preserved from the portfolio (pages 19–25). No transcript text has been invented. Click any image to enlarge.",
      captionPattern: "Testimonial {n}",
      altPattern: "Original testimonial screenshot {n} (portfolio page {page})",
    },

    contact: {
      docTitle: "Contact — Sohaila Halim",
      metaDescription:
        "Contact Sohaila Halim — Let's Build What's Next. Email, phone, and LinkedIn.",
      title: sharedEn.ctaTitle,
      lead: sharedEn.ctaLead,
      desc: "Whether you're building a brand, developing a new offer, entering a new market, or scaling an established business, let's explore how strategic thinking can unlock your next growth opportunity.",
      sectionTitle: "Let's Discuss Your Business Growth.",
      identityHtml:
        "<strong>Sohaila Halim</strong><br />Brand, Marketing &amp; Business Growth Strategist",
      emailLabel: "Email",
      phoneLabel: "Phone",
      linkedinLabel: "LinkedIn",
      imageAlt: "Sohaila Halim",
    },
  };

  /* ------------------------------------------------------------------
   * PAGES — Arabic
   * ------------------------------------------------------------------ */
  const pagesAr = {
    home: {
      docTitle: "Sohaila Halim — خبيرة استراتيجيات العلامة التجارية والتسويق ونمو الأعمال",
      metaDescription:
        "Sohaila Halim — خبيرة استراتيجيات العلامة التجارية والتسويق ونمو الأعمال. بناء العلامات التجارية. صياغة الاستراتيجيات. قيادة النمو.",
      hero: {
        name: "SOHAILA HALIM",
        title: sharedAr.roleTitle,
        taglineA: sharedAr.taglineA,
        taglineB: sharedAr.taglineB,
        services:
          "استراتيجية العلامة التجارية · استراتيجية التسويق · نمو الأعمال · تطوير المنتجات والعروض",
        imageAlt: "تكوين صورة شخصية لـ Sohaila Halim",
      },
      credibility: {
        eyebrow: sharedAr.credibilityEyebrow,
        title: sharedAr.statsTitle,
        yearsLabel: sharedAr.yearsLabel,
        projectsLabel: sharedAr.projectsLabel,
      },
      philosophy: {
        eyebrow: sharedAr.expertiseEyebrow,
        title: sharedAr.philosophyTitle,
        lead: sharedAr.philosophyLead,
        desc: sharedAr.philosophyDescShort,
      },
      expertise: {
        title: sharedAr.expertiseTitle,
        lead: sharedAr.expertiseLead,
        areas: sharedAr.expertiseAreas,
      },
      impact: {
        title: sharedAr.impactTitle,
        desc: sharedAr.impactDesc,
        cards: sharedAr.impactCards,
      },
      portfolio: {
        title: "محفظة العملاء",
        lead: "شراكات استراتيجية مع العلامات الشخصية والشركات.",
      },
      results: {
        title: "قصص نجاح مختارة",
        stats: {
          roasIslam: "ROAS — Dr. Islam Mohamed",
          bookingsKarim: "الحجوزات الشهرية — Karim Sayed",
          revenueVabilla: "الإيرادات الشهرية — Vabilla",
          roasVabilla: "ROAS — Vabilla",
        },
      },
      why: {
        title: sharedAr.whyTitle,
        lead: sharedAr.whyLead,
        cards: sharedAr.whyCards,
      },
      cta: {
        title: sharedAr.ctaTitle,
        lead: sharedAr.ctaLead,
      },
    },

    about: {
      docTitle: "نبذة عنّي — Sohaila Halim",
      metaDescription:
        "نبذة عن Sohaila Halim — خبيرة استراتيجيات العلامة التجارية والتسويق ونمو الأعمال بخبرة تتجاوز 12 عاماً وأكثر من 600 مشروع.",
      eyebrow: "عنّي",
      title: "نبذة عنّي",
      navAria: "أقسام صفحة عنّي",
      nav: {
        introduction: "المقدمة",
        experience: "الخبرة",
        credentials: "المؤهلات",
        education: "التعليم",
        professionalExperience: "الخبرة المهنية",
        coreExpertise: "مجالات الخبرة الأساسية",
        whereWeWork: "أين نعمل",
        why: "لماذا تعمل معي",
      },
      introduction: {
        title: "مقدمة مهنية",
        p1: "أنا Sohaila Halim، خبيرة استراتيجيات العلامة التجارية والتسويق ونمو الأعمال، بخبرة تتجاوز 12 عاماً في مساعدة الشركات ورواد الأعمال والعلامات الشخصية على تحويل الأفكار إلى فرص سوقية، وتحويل التوجّه الاستراتيجي إلى نتائج أعمال قابلة للقياس.",
        p2: "على مدار مسيرتي المهنية، ساهمتُ في أكثر من 600 مشروع في قطاعات وأسواق متنوعة، وعملتُ مع شركات ناشئة وأعمال راسخة وخبراء في مجالاتهم ومقدّمي خدمات عالية القيمة.",
        p3: "تمتد خبرتي إلى ما هو أبعد من العلامات التجارية والتسويق التقليديين؛ فأنا متخصصة في وضع استراتيجيات العلامة التجارية، وتحديد فرص النمو، وهيكلة المنتجات والعروض، وبناء منظومات تسويقية متكاملة تتواءم مع أهداف الأعمال.",
        p4: "بدءاً من ترسيخ الموقع التنافسي للعلامة التجارية، مروراً بوضع استراتيجيات اكتساب العملاء وتحسين قمع المبيعات، وصولاً إلى دعم توسّع الأعمال، أتناول كل مشروع بمزيج من التفكير الاستراتيجي والفهم التجاري وحل المشكلات بإبداع.",
        p5: "أؤمن بأن التسويق الفعّال يبدأ قبل إطلاق الحملة الأولى بوقت طويل؛ يبدأ بفهم العمل، وتحديد الفرص المناسبة، واتخاذ قرارات استراتيجية تصنع قيمة دائمة.",
        imageAlt: "صورة شخصية مهنية لـ Sohaila Halim من ملف الأعمال",
      },
      experience: {
        title: sharedAr.statsTitle,
        yearsLabel: sharedAr.yearsLabel,
        projectsLabel: sharedAr.projectsLabel,
      },
      credentials: {
        title: "الخلفية المهنية والمؤهلات",
        p1: "تجمع خلفيتي المهنية بين أكثر من 12 عاماً من الخبرة العملية في القطاع والتعليم الأكاديمي والتدريب المتخصص في التسويق واستراتيجية الأعمال وسلوك المستهلك وإدارة المشاريع.",
        p2: "يمكّنني هذا الأساس متعدد التخصصات من تناول تحديات الأعمال من منظورَين استراتيجي وتشغيلي، بالربط بين رؤى السوق وسيكولوجية المستهلك وأهداف الأعمال والتنفيذ المنظّم.",
      },
      education: {
        title: "التعليم والمؤهلات المهنية",
        items: {
          mba: "ماجستير إدارة الأعمال (MBA) – تخصص التسويق، جامعة Uppsala، السويد",
          neuromarketing: "تخصص التسويق العصبي (Neuromarketing)، جامعة Harvard، الولايات المتحدة الأمريكية",
          pmp: "محترف إدارة المشاريع (PMP) – تدريب في إدارة المشاريع، جامعة ESLSCA، مصر",
          diploma: "دبلوم التسويق المهني – الجامعة الأمريكية بالقاهرة (AUC)",
          google: "شهادة محترف تسويق معتمد من Google – Google",
        },
      },
      professionalExperience: {
        title: "الخبرة المهنية",
        role: {
          title: "مستشارة إعلامية سابقة في Facebook",
          text: "خبرة مهنية في التسويق الرقمي واستراتيجية الإعلانات وحلول التسويق القائمة على الأداء.",
        },
      },
      coreExpertise: {
        title: "مجالات الخبرة الأساسية",
        items: {
          brandStrategy: "استراتيجية العلامة التجارية والتموضع التنافسي",
          strategicMarketing: "التسويق الاستراتيجي ونمو الأعمال",
          consumerPsychology: "سيكولوجية المستهلك والتسويق العصبي",
          productDevelopment: "تطوير المنتجات وهندسة العروض",
          highTicket: "استراتيجية الأعمال والإيرادات عالية القيمة",
          ecommerce: "التجارة الإلكترونية والنمو الرقمي",
          projectManagement: "التخطيط وإدارة المشاريع الاستراتيجية",
          creativeStrategy: "الاستراتيجية الإبداعية والاتصال التسويقي",
          marketingLeadership: "القيادة التسويقية والاستشارات الاستراتيجية",
        },
      },
      whereWeWork: {
        title: "أين نعمل",
        lead: "على مدار 12 عاماً، تجاوز عملنا الحدود ووصل إلى عملاء في أنحاء العالم العربي وخارجه.",
        text: "قدّمنا بكل فخر حلولاً في العلامات التجارية والتسويق والمحتوى لشركات ورواد أعمال في عدة دول، مع تكييف الاستراتيجيات بما يتناسب مع الأسواق المحلية والثقافات وسلوك الجمهور.",
        subtitle: "خبرة متعددة الأسواق",
        markets: {
          libya: "ليبيا",
          egypt: "مصر",
          jordan: "الأردن",
          saudi: "المملكة العربية السعودية",
          kuwait: "الكويت",
          qatar: "قطر",
          uae: "الإمارات العربية المتحدة (UAE)",
          oman: "سلطنة عُمان",
        },
        mapAlt:
          "خريطة الخبرة متعددة الأسواق توضح ليبيا ومصر والأردن والمملكة العربية السعودية والكويت وقطر والإمارات العربية المتحدة (UAE) وسلطنة عُمان",
      },
      why: {
        title: sharedAr.whyTitle,
        lead: sharedAr.whyLead,
        cards: sharedAr.whyCards,
      },
    },

    expertise: {
      docTitle: "الخبرات — Sohaila Halim",
      metaDescription:
        "الفلسفة الاستراتيجية، والفئات التي أعمل معها، ومجالات الخبرة، والأثر في الأعمال، والخبرات المتخصصة، والمنهج الاستراتيجي.",
      eyebrow: sharedAr.expertiseEyebrow,
      title: sharedAr.expertiseTitle,
      lead: sharedAr.expertiseLead,
      navAria: "أقسام صفحة الخبرات",
      nav: {
        philosophy: "الفلسفة",
        whoIWorkWith: "مع من أعمل",
        expertise: "الخبرات",
        businessImpact: "الأثر في الأعمال",
        specialized: "التخصصات",
        approach: "المنهج",
      },
      philosophy: {
        title: sharedAr.philosophyTitle,
        lead: sharedAr.philosophyLead,
        intro: "يرتكز نهجي على أربعة مبادئ:",
        p1: "أؤمن بأن العلامات التجارية الناجحة لا تُبنى بالظهور وحده، وبأن النمو المستدام للأعمال لا يمكن أن يعتمد على الحملات التسويقية بمعزل عن غيرها.",
        p2: "يتطلب النمو الحقيقي مواءمة بين نموذج الأعمال وتموضع العلامة التجارية وقيمة المنتج واحتياجات العملاء والتنفيذ التسويقي.",
        quote:
          "لا يقتصر تركيزي على مساعدة العلامات التجارية على زيادة ظهورها، بل على مساعدة الشركات لتصبح أكثر قدرة على المنافسة وأكثر صلة بالسوق من الناحية التجارية، ومهيّأة للنمو طويل الأجل.",
        principles: {
          businessFirst: {
            title: "الأعمال أولاً",
            text: "تبدأ كل استراتيجية بفهم نموذج الأعمال والأهداف التجارية وديناميكيات السوق وتحديات النمو.",
          },
          positioning: {
            title: "التموضع يصنع الميزة",
            text: "يساعد الموقع التنافسي القوي العلامات التجارية على إيصال قيمتها وجذب العملاء المناسبين والمنافسة بما يتجاوز السعر.",
          },
          products: {
            title: "المنتجات تقود الإيرادات",
            text: "يستطيع التسويق خلق الطلب، لكن الإيرادات المستدامة تعتمد على منتجات ملائمة وعروض مقنعة ورحلات عملاء مصمّمة بإتقان.",
          },
          strategy: {
            title: "الاستراتيجية يجب أن تتحول إلى فعل",
            text: "تصنع الاستراتيجية قيمة حين توجّه القرارات، وتوحّد الفرق، وتربط التنفيذ بأهداف أعمال قابلة للقياس.",
          },
        },
      },
      whoIWorkWith: {
        title: "مع من أعمل",
        lead: "نماذج أعمال مختلفة. تحديات مختلفة. عقلية استراتيجية واحدة.",
        desc: "أعمل مع الشركات ورواد الأعمال وخبراء المجالات في مراحل نمو مختلفة، وأضع استراتيجيات مصمّمة وفق أهدافهم التجارية وواقع أسواقهم وسلوك عملائهم.",
        tabsAria: "فئات الأعمال",
        audiences: {
          highTicket: {
            title: "الأعمال عالية القيمة والقائمة على المعرفة",
            text: "لأعمال التدريب والاستشارات والتعليم والخدمات المتميزة التي تسعى إلى تطوير عروض ذات قيمة، وبناء منظومات لاكتساب العملاء، وتحسين معدلات التحويل في المبيعات.",
          },
          ecommerce: {
            title: "التجارة الإلكترونية وعلامات المستهلك",
            text: "للأعمال القائمة على المنتجات التي تسعى إلى تموضع أقوى في السوق، واستراتيجيات تسويق أكثر فاعلية، ورحلات عملاء محسّنة، ونمو مستدام في الإيرادات.",
          },
          personal: {
            title: "العلامات الشخصية وخبراء المجالات",
            text: "للمدربين والمستشارين والمديرين التنفيذيين ورواد الأعمال والمهنيين الساعين إلى ترسيخ مكانتهم المرجعية، وتطوير تموضعهم، وتحقيق دخل من خبراتهم.",
          },
          b2b: {
            title: "أعمال B2B والأعمال القائمة على الخدمات",
            text: "لمقدّمي الخدمات المهنية وشركات B2B الساعين إلى تمييز عروضهم، وجذب عملاء مؤهلين، ودعم تطوير الأعمال.",
          },
          startups: {
            title: "الشركات الناشئة والمشاريع الصاعدة",
            text: "للمؤسسين الذين يحوّلون أفكار أعمالهم إلى علامات تجارية ومنتجات ونماذج أعمال قابلة للتوسع وجاهزة للسوق.",
          },
          corporate: {
            title: "الشركات الراسخة والعلامات المؤسسية",
            text: "للمؤسسات الساعية إلى تعزيز موقعها التنافسي، أو دخول أسواق جديدة، أو تطوير فرص إيرادات جديدة، أو تحسين فاعلية التسويق.",
          },
        },
      },
      strategicExpertise: {
        title: sharedAr.expertiseTitle,
        lead: sharedAr.expertiseLead,
        desc: "أساعد الشركات والعلامات الشخصية على تعزيز مكانتها في السوق، وتطوير عروض تنافسية، وبناء استراتيجيات تسويق تقود نمواً قابلاً للقياس في الأعمال.",
        tabsAria: "فئات الخبرة الاستراتيجية",
        areas: sharedAr.expertiseAreas,
      },
      businessImpact: {
        title: sharedAr.impactTitle,
        desc: sharedAr.impactDesc,
        cards: sharedAr.impactCards,
      },
      specialized: {
        title: "الخبرات المتخصصة في الأعمال",
        lead: "نماذج أعمال مختلفة. استراتيجيات نمو مصمّمة خصيصاً.",
        desc: "أضع استراتيجيات للعلامة التجارية والتسويق والنمو مصمّمة خصيصاً بما يتواءم مع كل نموذج أعمال وديناميكيات سوقه وأهدافه التجارية.",
        items: {
          personal: {
            title: "01. العلامات الشخصية وخبراء المجالات",
            leadHtml: "<strong>ابنِ المكانة المرجعية. رسّخ التأثير. حقّق دخلاً من خبرتك.</strong>",
            text: "علامة شخصية استراتيجية لرواد الأعمال والمديرين التنفيذيين والمدربين والمستشارين الساعين إلى تموضع أقوى في السوق ومكانة مهنية مرجعية وفرص تجارية.",
          },
          highTicket: {
            title: "02. أعمال التدريب والاستشارات عالية القيمة",
            leadHtml: "<strong>طوّر عروضاً متميزة. حسّن التحويل. نمِّ الإيرادات.</strong>",
            text: "تطوير العروض عالية القيمة، ومنظومات المنتجات، وقمع الاكتساب، واستراتيجيات التحويل المصمّمة لأعمال التدريب والاستشارات والمعرفة المتميزة.",
          },
          ecommerce: {
            title: "03. التجارة الإلكترونية وعلامات المستهلك",
            leadHtml: "<strong>عزّز التموضع. اكتسب العملاء. ارفع المبيعات.</strong>",
            text: "تطوير العلامة التجارية، وتموضع المنتج، واكتساب العملاء، وتحسين التحويل، واستراتيجيات الاحتفاظ بالعملاء لأعمال التجارة الإلكترونية ومنتجات المستهلك.",
          },
          corporate: {
            title: "04. الشركات المؤسسية وأعمال B2B والأعمال القائمة على الخدمات",
            leadHtml: "<strong>اصنع ميزة تنافسية. وسّع الأسواق. سرّع النمو.</strong>",
            text: "تسويق استراتيجي، وتطوير أعمال، وتوسّع في الأسواق، وتموضع متمايز للشركات الراسخة والمشاريع الصاعدة ومقدّمي الخدمات المهنية.",
          },
        },
      },
      approach: {
        title: "منهجي الاستراتيجي",
        lead: "من تحديات الأعمال إلى نمو قابل للقياس.",
        desc: "أجمع بين ذكاء الأعمال والتفكير الاستراتيجي والتنفيذ الإبداعي لتحويل التحديات المعقدة إلى فرص نمو قابلة للتطبيق.",
        line: "منهجي: قائم على الأعمال. محوره العميل. موجَّه نحو النتائج.",
        steps: {
          discover: {
            title: "الاكتشاف والتشخيص",
            text: "فهم نموذج الأعمال وديناميكيات السوق وسلوك العملاء وأبرز تحديات النمو.",
          },
          define: {
            title: "التحديد والتموضع",
            text: "تحديد المزايا التنافسية والأولويات الاستراتيجية والشرائح المستهدفة وفرص السوق.",
          },
          develop: {
            title: "التطوير والتخطيط",
            text: "بناء استراتيجيات متكاملة للعلامة التجارية والمنتج والتسويق بأهداف واضحة وخرائط طريق قابلة للتنفيذ ومؤشرات أداء (KPIs) قابلة للقياس.",
          },
          lead: {
            title: "القيادة والتنفيذ",
            text: "ترجمة الاستراتيجية إلى عمل منسّق من خلال التوجيه الإبداعي والتعاون بين الوظائف والإشراف على التنفيذ.",
          },
          measure: {
            title: "القياس والتحسين",
            text: "تقييم الأداء وتحديد فرص التحسين وصقل الاستراتيجيات لدعم نمو مستدام.",
          },
        },
      },
    },

    portfolio: {
      docTitle: "محفظة العملاء — Sohaila Halim",
      metaDescription:
        "محفظة العملاء عبر العلامات الشخصية والعلامات المؤسسية والعناية والجمال والرعاية الصحية والعقارات والجهات الحكومية والشركات الناشئة.",
      eyebrow: "المحفظة",
      title: "محفظة العملاء",
      lead: "شراكات استراتيجية مع العلامات الشخصية والشركات.",
      filterAria: "مرشحات المحفظة",
      personal: {
        title: "العلامات الشخصية والأعمال عالية القيمة",
        taglineHtml:
          "<strong>بناء المكانة المرجعية. تحقيق الدخل من الخبرة. توسيع الأعمال عالية القيمة.</strong>",
        text: "شراكات استراتيجية مع المدربين والمستشارين والأطباء وصنّاع المحتوى والشخصيات العامة وخبراء المجالات لتطوير علامات شخصية قوية، وبناء نماذج أعمال قابلة للتوسع، وتحقيق الإيرادات عبر التموضع الاستراتيجي والعروض المتميزة وقمع الاكتساب القائم على الأداء.",
        coreHtml:
          "<strong>الخبرات الأساسية:</strong> العلامة الشخصية · توسيع الأعمال عالية القيمة · تطوير العروض · قمع المبيعات المدفوعة · نمو الإيرادات",
      },
      corporate: {
        title: "العلامات المؤسسية ونمو الأعمال",
        taglineHtml:
          "<strong>بناء علامات تنافسية. تطوير الأسواق. قيادة نمو الأعمال.</strong>",
        text: "تعاون استراتيجي مع الشركات الناشئة والشركات الراسخة والمؤسسات التجارية في قطاعات متنوعة، مع التركيز على تطوير العلامة التجارية والتموضع في السوق واستراتيجية المنتج والتسويق المتكامل ونمو الأعمال المستدام.",
        coreHtml:
          "<strong>الخبرات الأساسية:</strong> تطوير العلامة التجارية · استراتيجية التسويق · تموضع المنتج · اكتساب العملاء · التوسع في الأسواق",
      },
      clickNote:
        "انقر على الصورة للانتقال إلى الصفحة. (حيثما يتوفر رابط Instagram موثّق.)",
    },

    results: {
      docTitle: "دراسات الحالة والنتائج — Sohaila Halim",
      metaDescription:
        "قصص نجاح مختارة، ونمو العيادات الطبية، ونتائج التجارة الإلكترونية، ولقطات شاشة أصلية تثبت النتائج.",
      eyebrow: "النتائج",
      title: "دراسات الحالة والنتائج",
      lead: "قصص نجاح مختارة",
      navAria: "أقسام صفحة النتائج",
      nav: {
        highTicket: "الأعمال عالية القيمة",
        medical: "القطاع الطبي",
        ecommerce: "التجارة الإلكترونية",
        evidence: "معرض الأدلة",
      },
      highTicket: {
        title: "توسيع الأعمال عالية القيمة — قصص نجاح",
        subtitle: "قمع المبيعات منخفضة السعر · الاكتساب المدفوع · العروض عالية القيمة",
        columns: {
          client: "العميل",
          lowTicketPrice: "سعر العرض منخفض القيمة",
          roas: "ROAS",
          highTicketOffer: "العرض عالي القيمة",
          unitsSold: "الوحدات المباعة",
        },
      },
      medical: {
        title: "العلامة الشخصية الطبية ونمو العيادات",
        subtitle: "اكتساب المرضى · حجوزات العيادة · التحويل عبر وسائل التواصل الاجتماعي",
        columns: {
          client: "العميل",
          monthlyBookings: "الحجوزات الشهرية",
          inquiryToBookingRate: "معدل التحويل من الاستفسار إلى الحجز",
          monthlyClinicVisits: "زيارات العيادة الشهرية",
        },
      },
      ecommerce: {
        title: "التجارة الإلكترونية ونمو علامات المستهلك",
        subtitle: "الإيرادات عبر الإنترنت · الطلبات الشهرية · العائد على الإنفاق الإعلاني",
        columns: {
          brand: "العلامة التجارية",
          monthlyRevenue: "الإيرادات الشهرية",
          monthlyOrders: "الطلبات الشهرية",
          roas: "ROAS",
        },
      },
      evidence: {
        title: "معرض أدلة النتائج",
        desc: "لقطات شاشة أصلية للنتائج من ملف الأعمال (الصفحات 16–18). انقر للتكبير.",
        captionPattern: "دليل النتائج {n}",
        altPattern: "لقطة شاشة لدليل النتائج {n} من ملف الأعمال الأصلي",
      },
    },

    testimonials: {
      docTitle: "الشهادات — Sohaila Halim",
      metaDescription: "لقطات شاشة أصلية لشهادات العملاء من ملف أعمال Sohaila Halim.",
      eyebrow: "الشهادات",
      title: "الشهادات",
      desc: "لقطات شاشة أصلية للشهادات محفوظة من ملف الأعمال (الصفحات 19–25). لم تتم إضافة أي نصوص مختلقة. انقر على أي صورة للتكبير.",
      captionPattern: "شهادة {n}",
      altPattern: "لقطة شاشة أصلية لشهادة {n} (صفحة {page} من ملف الأعمال)",
    },

    contact: {
      docTitle: "تواصل — Sohaila Halim",
      metaDescription:
        "تواصل مع Sohaila Halim — لنبنِ معاً ما هو قادم. البريد الإلكتروني والهاتف وLinkedIn.",
      title: sharedAr.ctaTitle,
      lead: sharedAr.ctaLead,
      desc: "سواء كنتَ تبني علامة تجارية، أو تطوّر عرضاً جديداً، أو تدخل سوقاً جديدة، أو توسّع عملاً راسخاً، دعنا نستكشف كيف يمكن للتفكير الاستراتيجي أن يفتح لك فرصة نموك القادمة.",
      sectionTitle: "لنناقش نمو أعمالك.",
      identityHtml:
        "<strong>Sohaila Halim</strong><br />خبيرة استراتيجيات العلامة التجارية والتسويق ونمو الأعمال",
      emailLabel: "البريد الإلكتروني",
      phoneLabel: "الهاتف",
      linkedinLabel: "LinkedIn",
      imageAlt: "Sohaila Halim",
    },
  };

  /* ------------------------------------------------------------------
   * Portfolio category text (client.meta when description === category label)
   * Keys match translations.portfolio.*
   * ------------------------------------------------------------------ */
  const portfolioCategoriesEn = {
    all: "All Clients",
    personal: "Personal Brands & High-Ticket Businesses",
    corporate: "Corporate Brands",
    "care-beauty": "Care & Beauty Brands",
    healthcare: "Healthcare & Medical Institutions",
    "real-estate": "Real Estate, Construction & Engineering Services",
    government: "Government Entities & Digital Platforms",
    startups: "Startups",
  };

  const portfolioCategoriesAr = {
    all: "كل العملاء",
    personal: "العلامات الشخصية والأعمال عالية القيمة",
    corporate: "العلامات المؤسسية",
    "care-beauty": "علامات العناية والجمال",
    healthcare: "الرعاية الصحية والمؤسسات الطبية",
    "real-estate": "العقارات والإنشاءات والخدمات الهندسية",
    government: "الجهات الحكومية والمنصات الرقمية",
    startups: "الشركات الناشئة",
  };

  /* ------------------------------------------------------------------
   * Portfolio roles — keyed by the English description string.
   * Descriptions already in Arabic are intentionally not listed (keep as-is).
   * ------------------------------------------------------------------ */
  const portfolioRolesAr = {
    "Nutrition expert": "خبيرة تغذية",
    "Cosmetic Dentist": "طبيب أسنان تجميلي",
    "PT & Nutrition Coach": "مدرب لياقة بدنية وتغذية",
    "Life coach": "مدربة حياة",
    "Public Speaking & Leadership coach": "مدربة الإلقاء والقيادة",
    Nutritionist: "أخصائية تغذية",
    "Life Transformation Mentor": "مرشدة التحول الحياتي",
    "Learning Disabilities Specialist": "أخصائية صعوبات التعلّم",
    Entrepreneur: "رائد أعمال",
    "Consultant of Hepatology": "استشاري أمراض الكبد",
    "MD, MRCP, ESEGH": "MD, MRCP, ESEGH",
    "Plastic Surgeon": "جرّاح تجميل",
    "Facial and body sculpting": "نحت الوجه والجسم",
    "Taj Design": "Taj Design",
    "Interior Design Studio": "استوديو تصميم داخلي",
    Contractor: "مقاول",
    "Start-ups": "الشركات الناشئة",
    Startups: "الشركات الناشئة",
  };

  // English: identity map so switching back to EN never leaves Arabic text behind.
  const portfolioRolesEn = Object.keys(portfolioRolesAr).reduce(function (acc, key) {
    acc[key] = key;
    return acc;
  }, {});
  portfolioRolesEn["Start-ups"] = "Startups";

  /* ------------------------------------------------------------------
   * Deep merge (plain objects only; arrays and primitives are replaced)
   * ------------------------------------------------------------------ */
  function isPlainObject(value) {
    return value !== null && typeof value === "object" && !Array.isArray(value);
  }

  function deepMerge(target, source) {
    const out = isPlainObject(target) ? Object.assign({}, target) : {};
    if (!isPlainObject(source)) return out;
    Object.keys(source).forEach(function (key) {
      const incoming = source[key];
      if (isPlainObject(incoming)) {
        out[key] = deepMerge(isPlainObject(out[key]) ? out[key] : {}, incoming);
      } else {
        out[key] = incoming;
      }
    });
    return out;
  }

  window.SOHAILA_I18N = window.SOHAILA_I18N || { en: {}, ar: {} };
  window.SOHAILA_I18N.en = deepMerge(window.SOHAILA_I18N.en, {
    pages: pagesEn,
    shared: sharedEn,
    portfolioCategories: portfolioCategoriesEn,
    portfolioRoles: portfolioRolesEn,
  });
  window.SOHAILA_I18N.ar = deepMerge(window.SOHAILA_I18N.ar, {
    pages: pagesAr,
    shared: sharedAr,
    portfolioCategories: portfolioCategoriesAr,
    portfolioRoles: portfolioRolesAr,
  });
})();

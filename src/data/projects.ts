export const projects = [
  {
    id: 1,
    title: "Coder's Hub",
    description: "An online community for Coder's Club (from my engineering college) where students can learn the latest technologies required for placements.",
    tags: ["React", "Node.js", "Supabase", "Project Management", "Tailwind CSS"],
    images: [
      "https://res.cloudinary.com/ds2uw5gcw/image/upload/v1744603161/portfolio/900da580-289e-431d-8dbb-072565d4b5e6.png",
      "https://res.cloudinary.com/ds2uw5gcw/image/upload/v1744606961/portfolio/d8167fba-15ea-4d8d-94f0-23d7ddf5792e.png",
      "https://res.cloudinary.com/ds2uw5gcw/image/upload/v1744606990/portfolio/3d64d4cc-5864-47f3-ac06-d7425e10420b.png"
    ],
    demoUrl: "https://codersclub.apsit.edu.in",
    note: "This project is part of the official website of my college and cannot be shared publicly.",
    problem: "Engineering students needed a centralized platform to access placement-focused learning resources and stay updated with the latest technology requirements in the industry.",
    solution: "Created a comprehensive online community platform that combines learning resources, real-time updates, and collaborative features specifically tailored for engineering students preparing for placements.",
    role: "Led the full-stack development and project management, implementing key features like resource management, user authentication, and real-time updates using Supabase.",
    stack: [
      { name: "React"},
      { name: "Node.js"},
      { name: "Supabase"},
      { name: "Tailwind CSS" }
    ],
    challenges: [
      "Implementing real-time updates and notifications for multiple users",
      "Creating an efficient resource management system",
      "Ensuring scalability to handle growing user base",
      "Maintaining data security for student information"
    ],
    outcomes: [
      "Successfully deployed platform serving entire engineering college",
      "Improved resource accessibility for placement preparation",
      "Enhanced collaboration between students and faculty",
      "Streamlined communication for placement updates"
    ]
  },
  {
    id: 2,
    title: "FOMO",
    description: "Fraud Observation & Monitoring Operations (FOMO) is a system that actively observes, monitors, and flags suspicious or fraudulent activities in real-time, ensuring secure e-commerce transactions and account integrity.",
    tags: ["Django", "AWS RDS", "Gemini", "Docker", "Frontend"],
    images: [
      "https://res.cloudinary.com/ds2uw5gcw/image/upload/v1744606936/portfolio/b885cdba-f848-4025-a7b2-aa88f3490575.png",
      "https://res.cloudinary.com/ds2uw5gcw/image/upload/v1744606875/portfolio/0e137690-dfbf-4551-b276-43c2ecc3004d.png",
      "https://res.cloudinary.com/ds2uw5gcw/image/upload/v1745068689/know%20me/projects/ba1151f1-f74e-49b1-acc5-47c0e48f94fe.png",
      "https://res.cloudinary.com/ds2uw5gcw/image/upload/v1745068649/know%20me/projects/394b07e8-d414-45a7-ba2d-e5e231b04542.png"
    ],
    note: "This project is not hosted due to scalability issues.",
    codeUrl: "https://github.com/abhi2k4/fraudguard",
    problem: "E-commerce platforms face significant challenges in detecting and preventing fraudulent activities in real-time, leading to financial losses and security breaches.",
    solution: "Developed an AI-powered fraud detection system that monitors transactions in real-time, using machine learning algorithms to identify suspicious patterns and flag potential fraud cases.",
    role: "Developed the backend architecture using Django and the overall frontend using React and Tailwind.",
    stack: [
      { name: "Django"},
      { name: "AWS RDS" },
      { name: "Docker"},
      { name: "Gemini" }
    ],
    challenges: [
      "Implementing real-time monitoring without impacting system performance",
      "Developing accurate fraud detection algorithms",
      "Managing large-scale data processing",
      "Ensuring system scalability with Docker"
    ],
    outcomes: [
      "Successfully detected and prevented fraudulent transactions in testing",
      "Reduced false positive rates through AI optimization",
      "Implemented scalable architecture for future growth",
      "Created comprehensive documentation for system maintenance"
    ]
  },
  // {
  //   id: 3,
  //   title: "SMILE CRM",
  //   description: "Smart Marketing Intelligence & Local Engagement (SMILE) is a solution designed to enhance customer relationship management through deep user segmentation tailored for the Indian market.",
  //   tags: ["NextJS", "Node.js", "Gemini", "Tailwind CSS", "Frontend"],
  //   images: [
  //     "https://res.cloudinary.com/ds2uw5gcw/image/upload/v1745056387/know%20me/projects/37e2bc22-8536-4542-a09d-4de350e571e1.png",
  //     "https://res.cloudinary.com/ds2uw5gcw/image/upload/v1745056455/know%20me/projects/d3b1c0ca-b8ec-44c8-9c3f-f786494e32c3.png",
  //     "https://res.cloudinary.com/ds2uw5gcw/image/upload/v1745056507/know%20me/projects/68844bbf-edcf-4e62-a378-53cf92ce033e.png",
  //     "https://res.cloudinary.com/ds2uw5gcw/image/upload/v1745056535/know%20me/projects/805ba0d7-46aa-4bf2-b56b-cc4b0e2ed367.png"
  //   ],
  //   note: "The code will be available soon.",
  //   demoUrl: "https://smilecrm.vercel.app/",
  //   problem: "Businesses struggle to effectively segment and engage with customers in the Indian market due to unique cultural and regional differences.",
  //   solution: "Created a sophisticated CRM system with AI-powered user segmentation and localized engagement strategies, specifically designed for the Indian market context.",
  //   role: "Led frontend development using NextJS and implemented AI features with Gemini for smart customer segmentation and analysis.",
  //   stack: [
  //     { name: "NextJS",},
  //     { name: "Node.js",},
  //     { name: "Gemini",},
  //     { name: "Tailwind CSS",  }
  //   ],
  //   challenges: [
  //     "Implementing complex user segmentation algorithms",
  //     "Creating an intuitive interface for data visualization",
  //     "Handling diverse data sets for Indian market analysis",
  //     "Optimizing performance for large customer databases"
  //   ],
  //   outcomes: [
  //     "Successfully launched demo version with positive user feedback",
  //     "Implemented AI-driven customer insights system",
  //     "Created responsive and user-friendly interface",
  //     "Developed scalable architecture for future enhancements"
  //   ]
  // },
  // {
  //   id: 4,
  //   title: "PRISM - Personalized Risk Intelligence Scoring Model",
  //   demoUrl: "https://prism-assist.vercel.app/",
  //   description: "A GenAI-powered risk assessment agent designed to evaluate the financial and operational risk of individuals or companies based on structured input data, providing explainable risk levels with clear reasoning.",
  //   tags: ["FastAPI", "Streamlit", "Gemini", "Risk Assessment", "AI", "Financial Technology"],
  //   images: [
  //     "https://res.cloudinary.com/ds2uw5gcw/image/upload/v1752217660/know%20me/projects/49df9f9f-b126-4b3e-bf88-ac8e58428df4.png",
  //     "https://res.cloudinary.com/ds2uw5gcw/image/upload/v1752217797/know%20me/projects/e83be380-3ad6-482d-aaf7-d2a2beb640ee.png",
  //     "https://res.cloudinary.com/ds2uw5gcw/image/upload/v1752217857/know%20me/projects/4ee5e266-5258-4ae3-99ec-ada9a7bafd5b.png",
  //     "https://res.cloudinary.com/ds2uw5gcw/image/upload/v1752217906/know%20me/projects/f4d6bf63-c0cd-4626-982e-33eddd95dff0.png"
  //   ],
  //   note: "This project demonstrates real-time explainable AI for financial risk assessment.",
  //   // Add codeUrl and demoUrl when available
  //   problem: "Banks, insurers, and financial institutions need smarter, faster, and more transparent risk assessment tools that can provide explainable reasoning without relying on pre-trained models or manual analysis.",
  //   solution: "Developed PRISM, a GenAI-powered risk assessment agent that uses Gemini 1.5 Flash to evaluate financial and operational risks in real-time, providing clear risk levels (High/Medium/Low) with human-like narrative explanations.",
  //   role: "Full-stack development including FastAPI backend, Streamlit frontend, and integration with Gemini AI for intelligent risk scoring and explanation generation.",
  //   stack: [
  //     { name: "FastAPI" },
  //     { name: "Streamlit" },
  //     { name: "Gemini 1.5 Flash" },
  //     { name: "Python" }
  //   ],
  //   challenges: [
  //     "Implementing real-time explainable AI reasoning for risk assessment",
  //     "Designing structured data input format for comprehensive risk evaluation",
  //     "Optimizing prompt engineering for consistent and accurate risk scoring",
  //     "Creating intuitive UI for complex financial data input and visualization"
  //   ],
  //   outcomes: [
  //     "Successfully deployed real-time risk assessment system",
  //     "Achieved high-speed, low-latency risk scoring with Gemini Flash",
  //     "Created explainable AI system with human-like reasoning capabilities",
  //     "Developed API and UI interfaces for easy integration and usage",
  //     "Established foundation for multimodal and fraud prediction features"
  //   ]
  // }
  ,
  {
    id: 3,
    title: "Artisy - Preserving Indian Artistry",
    description: "Artisy is an Indian art marketplace focused on preserving Indian heritage and empowering artisans. It integrates Razorpay for payments and Delhivery for shipping to provide a seamless buying and selling experience.",
    tags: ["NextJS", "Razorpay", "Delhivery", "E-commerce", "Tailwind CSS"],
    images: [
      "https://res.cloudinary.com/ds2uw5gcw/image/upload/v1768740565/know%20me/projects/PHOTO-2026-01-18-18-17-25_sekgc5.jpg",
      "https://res.cloudinary.com/ds2uw5gcw/image/upload/v1768740625/know%20me/projects/PHOTO-2026-01-18-18-18-07_bn4jc4.jpg",
      "https://res.cloudinary.com/ds2uw5gcw/image/upload/v1768740705/know%20me/projects/PHOTO-2026-01-18-18-21-07_pcwbhd.jpg",
      "https://res.cloudinary.com/ds2uw5gcw/image/upload/v1768741236/know%20me/projects/PHOTO-2026-01-18-18-29-20_opzsem.jpg"
    ],
    demoUrl: "https://artisy.in",
    problem: "Many traditional artisans struggle to access broader markets and require reliable payment and shipping infrastructure to sell their craft at scale.",
    solution: "Built a marketplace that allows artisans to list and sell their work, accept payments via Razorpay, and ship orders using Delhivery, with features for seller onboarding, order management, and secure checkout.",
    role: "Full-stack development: UI/UX, serverless function (Vercel), payment gateway integration (Razorpay), logistics integration (Delhivery), and order flow implementation.",
    stack: [
      { name: "ReactJS" },
      { name: "Node.js" },
      { name: "SupaBase" },
      { name: "Razorpay" },
      { name: "Delhivery" },
      { name: "Tailwind CSS" }
    ],
    challenges: [
      "Integrating Razorpay for secure payments and seller settlements",
      "Implementing Delhivery API for shipping, label generation and tracking",
      "Designing seller onboarding with product moderation",
      "Ensuring a seamless checkout and order lifecycle across the platform"
    ],
    outcomes: [
      "Launched a live marketplace at artisy.in with a seamless checkout and shipping flow",
      "Enabled artisans to reach customers nationwide with simplified order management",
      "Reduced payment friction by integrating Razorpay and automated shipping via Delhivery"
    ]
  },
  {
    id: 4,
    title: "OverSightAI - Enterprise AI & Data Governance",
    description: "OverSightAI is a centralized control plane that gives enterprises real-time visibility and governance over how AI agents consume organizational data. It automates risk-scoring, trust evaluation, and policy compliance across agent interactions.",
    tags: ["DataHub", "Keycloak", "Langfuse", "AI Governance", "Open Source"],
    images: ["https://res.cloudinary.com/ds2uw5gcw/image/upload/v1773596803/know%20me/projects/PHOTO-2026-03-15-23-16-07_zoonym.jpg"],
    demoUrl: "https://oversightai.in",
    problem: "Organizations deploying AI agents have no centralized way to monitor, audit, or enforce governance policies over how those agents access and use sensitive organizational data — creating compliance and trust risks.",
    solution: "Built a governance control plane on top of open-source tools (DataHub, Keycloak, Langfuse) that continuously monitors AI agent activity, auto-evaluates risk and trust scores, enforces RBAC policies, and maintains a full audit trail — reducing manual governance overhead for low-risk events entirely.",
    role: "Full-stack development: system architecture, open-source tool integration (DataHub, Keycloak, Langfuse), RBAC implementation, risk-scoring engine, and governance dashboard UI.",
    stack: [
      { name: "DataHub" },
      { name: "Keycloak" },
      { name: "Langfuse" },
      { name: "Python" },
      { name: "React" },
      { name: "FastAPI" }
    ],
    challenges: [
      "Integrating DataHub, Keycloak, and Langfuse into a unified control plane with consistent data models",
      "Designing an automated risk-scoring system that classifies agent interactions without human triage for low-risk events",
      "Implementing RBAC with Keycloak across multiple AI agent contexts",
      "Building a real-time audit trail that captures governance events without impacting agent performance"
    ],
    outcomes: [
      "Launched a live governance platform at oversightai.in serving enterprise AI compliance use cases",
      "Automated risk classification for agent interactions, eliminating manual review for low-risk events",
      "Delivered a centralized audit trail and RBAC system giving teams full visibility into AI data consumption"
    ]
  },

  {
    id: 5,
    title: "Chalo Kisaan - Agritourism Platform for Indian Farmers",
    description: "Chalo Kisaan is a Progressive Web App that empowers small-scale Indian farmers to establish and scale agritourism businesses. Built end-to-end on AWS infrastructure, it connects rural farmers with urban tourists through seamless discovery, booking, and dashboard management.",
    tags: ["FastAPI", "React Router", "AWS", "PWA", "Tailwind CSS"],
    images: ["https://res.cloudinary.com/ds2uw5gcw/image/upload/v1773596711/know%20me/projects/PHOTO-2026-03-15-23-14-13_m1nef0.jpg"],
    demoUrl: "https://chalokisaan.in",
    problem: "Small-scale Indian farmers lack the digital infrastructure and market access needed to monetize their land and culture through agritourism — a high-potential but underserved segment.",
    solution: "Built a full-stack PWA hosted on AWS (EC2, S3, RDS, CloudFront, Bedrock) that allows farmers to list experiences, manage bookings, and track revenue through responsive dashboards — with offline support critical for low-connectivity rural areas.",
    role: "Full-stack development: UI/UX design, FastAPI backend, AWS infrastructure setup (EC2, S3, RDS, CloudFront, Bedrock), PWA configuration, and dashboard implementation.",
    stack: [
      { name: "FastAPI" },
      { name: "ReactJS" },
      { name: "AWS EC2" },
      { name: "AWS S3" },
      { name: "AWS RDS" },
      { name: "CloudFront" },
      { name: "AWS Bedrock" },
      { name: "AWS Amplify" },
      { name: "Tailwind CSS" }
    ],
    challenges: [
      "Architecting a multi-service AWS infrastructure (EC2, S3, RDS, CloudFront, Bedrock) for a production PWA",
      "Achieving Lighthouse PWA score of 90+ with offline access for rural users on low-connectivity networks",
      "Designing intuitive farmer-facing dashboards for users with limited digital literacy",
      "Integrating FastAPI backend with React Router for seamless SPA navigation and API data flow"
    ],
    outcomes: [
      "Launched a live platform at chalokisaan.in fully hosted on AWS with zero-downtime deployments via Elastic Beanstalk",
      "Achieved Lighthouse PWA score of 90+, enabling offline access and home-screen install for rural farmers",
      "Empowered farmers to independently list, manage, and monetize agritourism experiences nationwide"
    ]
  }
];
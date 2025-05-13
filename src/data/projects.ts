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
  {
    id: 3,
    title: "SMILE CRM",
    description: "Smart Marketing Intelligence & Local Engagement (SMILE) is a solution designed to enhance customer relationship management through deep user segmentation tailored for the Indian market.",
    tags: ["NextJS", "Node.js", "Gemini", "Tailwind CSS", "Frontend"],
    images: [
      "https://res.cloudinary.com/ds2uw5gcw/image/upload/v1745056387/know%20me/projects/37e2bc22-8536-4542-a09d-4de350e571e1.png",
      "https://res.cloudinary.com/ds2uw5gcw/image/upload/v1745056455/know%20me/projects/d3b1c0ca-b8ec-44c8-9c3f-f786494e32c3.png",
      "https://res.cloudinary.com/ds2uw5gcw/image/upload/v1745056507/know%20me/projects/68844bbf-edcf-4e62-a378-53cf92ce033e.png",
      "https://res.cloudinary.com/ds2uw5gcw/image/upload/v1745056535/know%20me/projects/805ba0d7-46aa-4bf2-b56b-cc4b0e2ed367.png"
    ],
    note: "The code will be available soon.",
    demoUrl: "https://smilecrm.vercel.app/",
    problem: "Businesses struggle to effectively segment and engage with customers in the Indian market due to unique cultural and regional differences.",
    solution: "Created a sophisticated CRM system with AI-powered user segmentation and localized engagement strategies, specifically designed for the Indian market context.",
    role: "Led frontend development using NextJS and implemented AI features with Gemini for smart customer segmentation and analysis.",
    stack: [
      { name: "NextJS",},
      { name: "Node.js",},
      { name: "Gemini",},
      { name: "Tailwind CSS",  }
    ],
    challenges: [
      "Implementing complex user segmentation algorithms",
      "Creating an intuitive interface for data visualization",
      "Handling diverse data sets for Indian market analysis",
      "Optimizing performance for large customer databases"
    ],
    outcomes: [
      "Successfully launched demo version with positive user feedback",
      "Implemented AI-driven customer insights system",
      "Created responsive and user-friendly interface",
      "Developed scalable architecture for future enhancements"
    ]
  }
];
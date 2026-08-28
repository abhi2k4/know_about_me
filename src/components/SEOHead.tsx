import { useEffect } from "react";
import { useLocation } from "react-router-dom";

interface PageSEOConfig {
  title: string;
  description: string;
  keywords: string;
  canonical: string;
  robots: string;
  ogType: string;
}

const BASE_URL = "https://abhishekthormothe.in";
const DEFAULT_IMAGE = "https://res.cloudinary.com/ds2uw5gcw/image/upload/v1742846815/ac_adyejq.png";
const PROFILE_IMAGE = "https://res.cloudinary.com/ds2uw5gcw/image/upload/v1742794389/Profile_pwfnrf.png";

export const SEOHead = () => {
  const location = useLocation();
  const pathname = location.pathname;

  useEffect(() => {
    // 1. Resolve Route-specific SEO configuration
    let config: PageSEOConfig = {
      title: "Abhishek Thormothe — Full Stack Engineer & Architect",
      description:
        "Abhishek Thormothe — Full Stack Engineer crafting scalable web architectures, distributed data systems, and applied AI applications with React, TypeScript, Node.js, and Python.",
      keywords:
        "Abhishek Thormothe, software engineer, full stack developer, react developer, node.js, typescript, system architect, Mumbai, frontend engineer, backend developer, portfolio, AI engineer",
      canonical: `${BASE_URL}/`,
      robots: "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1",
      ogType: "website",
    };

    if (pathname === "/projects") {
      config = {
        title: "Projects & Engineering Work | Abhishek Thormothe",
        description:
          "Explore featured full-stack projects, distributed systems, AI tools, and open-source software built by Abhishek Thormothe.",
        keywords:
          "Abhishek Thormothe projects, Coder's Hub, FOMO fraud detection, full stack portfolio, react applications, django systems, software architecture",
        canonical: `${BASE_URL}/projects`,
        robots: "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1",
        ogType: "website",
      };
    } else if (pathname === "/journey") {
      config = {
        title: "Engineering Journey & Career Milestones | Abhishek Thormothe",
        description:
          "Timeline of career milestones, software engineering internships, hackathons, certifications, and leadership roles of Abhishek Thormothe.",
        keywords:
          "Abhishek Thormothe career, software developer journey, engineering milestones, hackathon winner, internships, APSIT Mumbai",
        canonical: `${BASE_URL}/journey`,
        robots: "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1",
        ogType: "profile",
      };
    } else if (pathname === "/resume") {
      config = {
        title: "Resume & Curriculum Vitae | Abhishek Thormothe — Full Stack Engineer",
        description:
          "View and download the professional resume of Abhishek Thormothe, Full Stack Engineer & Architect specializing in React, Node.js, TypeScript, and Distributed Systems.",
        keywords:
          "Abhishek Thormothe resume, software engineer CV, full stack developer resume, download resume, technical skills, engineering experience",
        canonical: `${BASE_URL}/resume`,
        robots: "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1",
        ogType: "website",
      };
    } else if (pathname === "/arena") {
      config = {
        title: "Arena Dashboard | Abhishek Thormothe",
        description: "Admin portal and content manager for Abhishek Thormothe.",
        keywords: "arena, admin",
        canonical: `${BASE_URL}/arena`,
        robots: "noindex, nofollow",
        ogType: "website",
      };
    } else if (pathname !== "/") {
      config = {
        title: "Page Not Found | Abhishek Thormothe",
        description: "The requested page does not exist on Abhishek Thormothe's portfolio.",
        keywords: "404 not found",
        canonical: `${BASE_URL}${pathname}`,
        robots: "noindex, follow",
        ogType: "website",
      };
    }

    // 2. Update Document Title
    document.title = config.title;

    // 3. Helper to create or update meta tags
    const updateMeta = (attr: "name" | "property", key: string, content: string) => {
      let tag = document.querySelector(`meta[${attr}="${key}"]`);
      if (!tag) {
        tag = document.createElement("meta");
        tag.setAttribute(attr, key);
        document.head.appendChild(tag);
      }
      tag.setAttribute("content", content);
    };

    // Primary Meta
    updateMeta("name", "title", config.title);
    updateMeta("name", "description", config.description);
    updateMeta("name", "keywords", config.keywords);
    updateMeta("name", "robots", config.robots);

    // Open Graph
    updateMeta("property", "og:title", config.title);
    updateMeta("property", "og:description", config.description);
    updateMeta("property", "og:url", config.canonical);
    updateMeta("property", "og:type", config.ogType);
    updateMeta("property", "og:image", DEFAULT_IMAGE);
    updateMeta("property", "og:site_name", "Abhishek Thormothe Portfolio");
    updateMeta("property", "og:locale", "en_US");

    // Twitter Card
    updateMeta("name", "twitter:title", config.title);
    updateMeta("name", "twitter:description", config.description);
    updateMeta("name", "twitter:url", config.canonical);
    updateMeta("name", "twitter:image", DEFAULT_IMAGE);
    updateMeta("name", "twitter:card", "summary_large_image");
    updateMeta("name", "twitter:site", "@amt_official04");
    updateMeta("name", "twitter:creator", "@amt_official04");

    // Canonical link
    let canonicalLink = document.querySelector('link[rel="canonical"]');
    if (!canonicalLink) {
      canonicalLink = document.createElement("link");
      canonicalLink.setAttribute("rel", "canonical");
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.setAttribute("href", config.canonical);

    // 4. Structured Data (JSON-LD) Schemas
    const schemas: object[] = [];

    // Core Person Schema (Authoritative Entity)
    const personSchema = {
      "@context": "https://schema.org",
      "@type": "Person",
      "@id": `${BASE_URL}/#person`,
      name: "Abhishek Thormothe",
      alternateName: ["Abhishek", "abhi2k4", "amt_official04"],
      givenName: "Abhishek",
      familyName: "Thormothe",
      gender: "Male",
      url: `${BASE_URL}/`,
      image: PROFILE_IMAGE,
      jobTitle: "Full Stack Engineer & Architect",
      worksFor: {
        "@type": "Organization",
        name: "Software Engineering",
      },
      alumniOf: {
        "@type": "EducationalOrganization",
        name: "A. P. Shah Institute of Technology, University of Mumbai",
      },
      email: "mailto:thormothe.abhishek@gmail.com",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Mumbai",
        addressRegion: "Maharashtra",
        addressCountry: "IN",
      },
      sameAs: [
        "https://github.com/abhi2k4",
        "https://linkedin.com/in/thormotheabhishek",
        "https://x.com/amt_official04",
      ],
      knowsAbout: [
        "Full Stack Development",
        "System Architecture",
        "React",
        "TypeScript",
        "JavaScript",
        "Node.js",
        "Express.js",
        "Next.js",
        "Python",
        "Django",
        "FastAPI",
        "Tailwind CSS",
        "PostgreSQL",
        "MySQL",
        "MongoDB",
        "Supabase",
        "Firebase",
        "Docker",
        "AWS",
        "Data Engineering",
        "Applied AI & Machine Learning",
      ],
      description:
        "Abhishek Thormothe is a Full Stack Engineer and Architect specializing in scalable web systems, modern frontend engineering, distributed backends, and applied AI.",
    };
    schemas.push(personSchema);

    // WebSite Schema
    const webSiteSchema = {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "@id": `${BASE_URL}/#website`,
      url: `${BASE_URL}/`,
      name: "Abhishek Thormothe Portfolio",
      headline: "Abhishek Thormothe — Full Stack Engineer & Architect",
      description:
        "Official portfolio of Abhishek Thormothe. Explore scalable web architectures, engineering timeline, and full-stack projects.",
      inLanguage: "en-US",
      publisher: {
        "@id": `${BASE_URL}/#person`,
      },
    };
    schemas.push(webSiteSchema);

    // ProfilePage Schema for Homepage
    if (pathname === "/") {
      schemas.push({
        "@context": "https://schema.org",
        "@type": "ProfilePage",
        "@id": `${BASE_URL}/#profilepage`,
        url: `${BASE_URL}/`,
        name: "Abhishek Thormothe — Engineering Profile",
        mainEntity: {
          "@id": `${BASE_URL}/#person`,
        },
      });

      // Featured Project ItemList Schema
      schemas.push({
        "@context": "https://schema.org",
        "@type": "ItemList",
        name: "Featured Software Projects",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            item: {
              "@type": "SoftwareSourceCode",
              name: "Coder's Hub",
              description:
                "Community platform for engineering students with real-time updates and placement resources.",
              programmingLanguage: ["React", "Node.js", "Supabase", "Tailwind CSS"],
              url: "https://codersclub.apsit.edu.in",
              author: {
                "@id": `${BASE_URL}/#person`,
              },
            },
          },
          {
            "@type": "ListItem",
            position: 2,
            item: {
              "@type": "SoftwareSourceCode",
              name: "FOMO (Fraud Observation & Monitoring Operations)",
              description:
                "Real-time fraud observation, monitoring, and anomaly detection system for transactions using AI.",
              programmingLanguage: ["Django", "AWS RDS", "Docker", "Python"],
              codeRepository: "https://github.com/abhi2k4/fraudguard",
              author: {
                "@id": `${BASE_URL}/#person`,
              },
            },
          },
        ],
      });
    }

    // Projects Page Collection Schema
    if (pathname === "/projects") {
      schemas.push({
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        name: "Projects & Engineering Portfolio",
        url: `${BASE_URL}/projects`,
        description:
          "Comprehensive catalog of full stack web applications, AI tools, and systems architected by Abhishek Thormothe.",
        mainEntity: {
          "@type": "ItemList",
          name: "Abhishek Thormothe Projects",
        },
      });

      // Breadcrumb Schema
      schemas.push({
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: `${BASE_URL}/`,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Projects",
            item: `${BASE_URL}/projects`,
          },
        ],
      });
    }

    // Journey Page Breadcrumb Schema
    if (pathname === "/journey") {
      schemas.push({
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: `${BASE_URL}/`,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Journey & Milestones",
            item: `${BASE_URL}/journey`,
          },
        ],
      });
    }

    // Resume Page Schema
    if (pathname === "/resume") {
      schemas.push({
        "@context": "https://schema.org",
        "@type": "DigitalDocument",
        name: "Abhishek Thormothe Resume",
        url: `${BASE_URL}/resume`,
        author: {
          "@id": `${BASE_URL}/#person`,
        },
      });

      schemas.push({
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: `${BASE_URL}/`,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: "Resume",
            item: `${BASE_URL}/resume`,
          },
        ],
      });
    }

    // Inject JSON-LD Script
    const scriptId = "seo-json-ld";
    let scriptTag = document.getElementById(scriptId) as HTMLScriptElement | null;
    if (!scriptTag) {
      scriptTag = document.createElement("script");
      scriptTag.id = scriptId;
      scriptTag.type = "application/ld+json";
      document.head.appendChild(scriptTag);
    }
    scriptTag.textContent = JSON.stringify(schemas);

    return () => {
      // Cleanup is handled gracefully by next effect execution
    };
  }, [pathname]);

  return null;
};

export default SEOHead;

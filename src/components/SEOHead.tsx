import { useEffect } from 'react';

export const SEOHead = () => {
  useEffect(() => {
    // Add structured data for schema.org
    const schemaData = {
      "@context": "https://schema.org",
      "@type": "Person",
      "name": "Abhishek Thormothe",
      "title": "Full Stack Developer",
      "url": "https://abhishekthormothe.me/",
      "sameAs": [
        "https://github.com/abhi2k4",
        "https://linkedin.com/in/thormotheabhishek",
        "https://x.com/amt_official04"
      ],
      "jobTitle": "Full Stack Developer",
      "worksFor": {
        "@type": "Organization",
        "name": "Freelance"
      },
      "image": "https://res.cloudinary.com/ds2uw5gcw/image/upload/v1742794389/Profile_pwfnrf.png",
      "email": "thormothe.abhishek@gmail.com",
      "address": {
        "@type": "PostalAddress",
        "addressLocality": "Mumbai",
        "addressRegion": "Maharashtra",
        "addressCountry": "India"
      },
      "knowsAbout": [
        "React",
        "TypeScript",
        "JavaScript",
        "Node.js",
        "Express",
        "Django",
        "Flask",
        "MySQL",
        "Firebase",
        "Supabase",
        "Tailwind CSS",
        "Web Development",
        "UI/UX Design",
        "Full Stack Development"
      ]
    };

    const script = document.createElement('script');
    script.type = 'application/ld+json';
    script.textContent = JSON.stringify(schemaData);
    document.head.appendChild(script);

    // Add organization schema
    const orgSchema = {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "name": "Abhishek Thormothe's Portfolio",
      "url": "https://abhishekthormothe.me/",
      "description": "Portfolio of Abhishek Thormothe, a Full Stack Developer specializing in modern web technologies"
    };

    const orgScript = document.createElement('script');
    orgScript.type = 'application/ld+json';
    orgScript.textContent = JSON.stringify(orgSchema);
    document.head.appendChild(orgScript);

    return () => {
      if (script.parentNode) script.parentNode.removeChild(script);
      if (orgScript.parentNode) orgScript.parentNode.removeChild(orgScript);
    };
  }, []);

  return null;
};

export default SEOHead;

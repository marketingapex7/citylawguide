export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "City Law Guide",
    url: "https://citylawguide.com",
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "City Law Guide",
    url: "https://citylawguide.com",
    inLanguage: "en-US",
  };
}
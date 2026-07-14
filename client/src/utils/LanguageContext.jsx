import React, { createContext, useContext, useState, useEffect } from 'react';

const LanguageContext = createContext();

export const useLanguage = () => useContext(LanguageContext);

const translations = {
  en: {
    // Navigation
    'Home': 'Home',
    'About': 'About',
    'Services': 'Services',
    'Contact': 'Contact',
    'Menu': 'Menu',
    'Close': 'Close',
    'Socials': 'Socials',
    'WhatsApp': 'WhatsApp',
    'Direct Call': 'Direct Call',
    'Email Desk': 'Email Desk',

    // Hero
    'Nissi Constructions': 'Nissi Constructions',
    'We build spaces that endure.': 'We build spaces that endure.',
    'Premium residential and commercial developments engineered with absolute structural integrity, financial transparency, and RERA certified standards.': 'Premium residential and commercial developments engineered with absolute structural integrity, financial transparency, and RERA certified standards.',
    'Book Free Consultation': 'Book Free Consultation',
    'Explore Services': 'Explore Services',

    // About
    'Corporate Profile': 'Corporate Profile',
    'Building Landmarks with Structural Integrity': 'Building Landmarks with Structural Integrity',
    'Nissi Constructions was established with a singular focus: to close the trust gap in the private residential sector. Over the years, we have scaled our operations from private custom homes to multi-story commercial properties and gated villa societies.': 'Nissi Constructions was established with a singular focus: to close the trust gap in the private residential sector. Over the years, we have scaled our operations from private custom homes to multi-story commercial properties and gated villa societies.',
    'We employ dedicated structural engineers, luxury architects, modular carpenters, and plumbing consultants to execute tasks without outsourcing to sub-standard contractors.': 'We employ dedicated structural engineers, luxury architects, modular carpenters, and plumbing consultants to execute tasks without outsourcing to sub-standard contractors.',
    'RERA Certified': 'RERA Certified',
    'ISO 9001:2015': 'ISO 9001:2015',
    'Our Mission': 'Our Mission',
    'To design and engineer structures of superior quality and safety, ensuring absolute pricing transparency and delivering luxury spaces that elevate our clients\' lifestyle.': 'To design and engineer structures of superior quality and safety, ensuring absolute pricing transparency and delivering luxury spaces that elevate our clients\' lifestyle.',
    'Our Vision': 'Our Vision',
    'To become India\'s most trusted luxury builder brand, recognized for sustainable engineering, Vastu design, and zero-defect handover completions.': 'To become India\'s most trusted luxury builder brand, recognized for sustainable engineering, Vastu design, and zero-defect handover completions.',
    'Foundations': 'Foundations',
    'Our Core Values': 'Our Core Values',
    'Principles dictating every foundation block we excavate and every brick we lay.': 'Principles dictating every foundation block we excavate and every brick we lay.',
    'The principles that dictate every foundation block we excavate and every brick we lay.': 'The principles that dictate every foundation block we excavate and every brick we lay.',

    // Core Values Details
    'Uncompromising Quality': 'Uncompromising Quality',
    'From concrete grades to premium teak woods, we select only RERA-approved grade materials.': 'From concrete grades to premium teak woods, we select only RERA-approved grade materials.',
    'Absolute Transparency': 'Absolute Transparency',
    'Absolue Transparency': 'Absolute Transparency',
    'No hidden bills. We share live digital spreadsheets detailing procurement and contractor payouts.': 'No hidden bills. We share live digital spreadsheets detailing procurement and contractor payouts.',
    'Vastu Excellence': 'Vastu Excellence',
    'Our architectural design templates are 100% compliant with ancient Vastu science standards.': 'Our architectural design templates are 100% compliant with ancient Vastu science standards.',
    'Luxury Innovation': 'Luxury Innovation',
    'Specialists in modern architectural profiles, glass facades, and automated home smart rigs.': 'Specialists in modern architectural profiles, glass facades, and automated home smart rigs.',

    // Services
    'Expertise Directory': 'Expertise Directory',
    'Our Construction Services': 'Our Construction Services',
    'Hover over any service name below to view builder expertise, benefits, and details.': 'Hover over any service name below to view builder expertise, benefits, and details.',
    'Tap any service name below to view workflow details and book consultations.': 'Tap any service name below to view workflow details and book consultations.',
    'Direct Support:': 'Direct Support:',
    'Book Call': 'Book Call',
    'Chat via WhatsApp': 'Chat via WhatsApp',
    'Key Benefits & Standards': 'Key Benefits & Standards',
    'Execution Workflow': 'Execution Workflow',
    'Request Consultation': 'Request Consultation',
    'Request Callback': 'Request Callback',
    'Inquire for Service': 'Inquire for Service',
    'Confirming a callback session for:': 'Confirming a callback session for:',
    'Submitting Details...': 'Submitting Details...',
    'Close Window': 'Close Window',
    'Consultation Request Placed': 'Consultation Request Placed',
    'Our project desk engineer will reach out to you shortly.': 'Our project desk engineer will reach out to you shortly.',

    // Contact
    'Get In Touch': 'Get In Touch',
    'Contact Nissi Constructions Desk': 'Contact Nissi Constructions Desk',
    'Contact Nissi Constructions desk': 'Contact Nissi Constructions desk',
    'Book a site assessment visit, request a blueprint estimate, or ask questions.': 'Book a site assessment visit, request a blueprint estimate, or ask questions.',
    'Book a site assessment visit, request a blueprint estimate, or ask questions about land purchases.': 'Book a site assessment visit, request a blueprint estimate, or ask questions about land purchases.',
    'Head Office Information': 'Head Office Information',
    'Our design and estimation desk is headquartered in Hyderabad, Telangana. We welcome visits by prospective plot owners and commercial buyers.': 'Our design and estimation desk is headquartered in Hyderabad, Telangana. We welcome visits by prospective plot owners and commercial buyers.',
    'Office Address': 'Office Address',
    'Jagathgirigutta, Hyderabad, Telangana - 500037': 'Jagathgirigutta, Hyderabad, Telangana - 500037',
    'Direct Hotlines': 'Direct Hotlines',
    'SalesDesk': 'SalesDesk',
    'Support Line': 'Support Line',
    'Working Desk Hours': 'Working Desk Hours',
    'Monday - Saturday: 09:00 AM - 07:00 PM': 'Monday - Saturday: 09:00 AM - 07:00 PM',
    'Sunday: Closed': 'Sunday: Closed',
    'Send Electronic Message': 'Send Electronic Message',
    'Full Name': 'Full Name',
    'Email Address': 'Email Address',
    'Phone Number': 'Phone Number',
    'Inquiry Area': 'Inquiry Area',
    'General Inquiry / Greeting': 'General Inquiry / Greeting',
    'Residential Construction': 'Residential Construction',
    'Villa Cost Estimate': 'Villa Cost Estimate',
    'Commercial Complex': 'Commercial Complex',
    'Career/Job application': 'Career/Job application',
    'Career / Job vacancy': 'Career / Job vacancy',
    'Property Selling / Ownership': 'Property Selling / Ownership',
    'Listing my property': 'Listing my property',
    'Message Details': 'Message Details',
    'Describe your site details, Vastu preferences, plot size, budget specs...': 'Describe your site details, Vastu preferences, plot size, budget specs...',
    'Tell us about your plot dimension, area specs, budget, or general questions...': 'Tell us about your plot dimension, area specs, budget, or general questions...',
    'Send Message': 'Send Message',
    'Sending message...': 'Sending message...',
    'Sending Message...': 'Sending Message...',
    'Submit Message': 'Submit Message',
    'Message Submitted!': 'Message Submitted!',
    'We will reach out as soon as possible.': 'We will reach out as soon as possible.',
    'Open Google Maps Navigation': 'Open Google Maps Navigation',
    'Visakhapatnam, Andhra Pradesh, India. Located right opposite the Central Bank plaza.': 'Visakhapatnam, Andhra Pradesh, India. Located right opposite the Central Bank plaza.',
    'VIP Road, MVP Colony': 'VIP Road, MVP Colony',

    // About Page Extras
    'A forward-thinking construction and property marketplace firm redefining luxury building standards in India.': 'A forward-thinking construction and property marketplace firm redefining luxury building standards in India.',
    'Workflows': 'Workflows',
    'Our Construction Process': 'Our Construction Process',
    'How we guide your dream project from initial plot sketches to ready key handovers.': 'How we guide your dream project from initial plot sketches to ready key handovers.',
    'Executives': 'Executives',
    'Leadership Team': 'Leadership Team',
    'Dedicated engineering and design professionals commanding Nissi Constructions projects.': 'Dedicated engineering and design professionals commanding Nissi Constructions projects.',
    'Managing Director & Chief Engineer': 'Managing Director & Chief Engineer',
    'Over 15 years directing residential duplex and steel high-rise constructions.': 'Over 15 years directing residential duplex and steel high-rise constructions.',
    'Principal Architect & Interior Lead': 'Principal Architect & Interior Lead',
    'Specialist in glassmorphic layouts, sustainable lighting design, and Vastu rules.': 'Specialist in glassmorphic layouts, sustainable lighting design, and Vastu rules.',

    // Footer
    'Building dreams, elevating lifestyle': 'Building dreams, elevating lifestyle',
    'Premium construction & real estate since 2019': 'Premium construction & real estate since 2019',
    'Villa Construction': 'Villa Construction',
    'Commercial Projects': 'Commercial Projects',
    'Home Renovations': 'Home Renovations',
    'Architectural Planning': 'Architectural Planning',
    'Resources': 'Resources',
    'About Us': 'About Us',
    'Blog': 'Blog',
    'Success Stories': 'Success Stories',
    'Support': 'Support',
    'Customer Portal': 'Customer Portal',
    'FAQ': 'FAQ',
    'Privacy Policy': 'Privacy Policy',

    // Dynamic Services translations
    'Contractor': 'Contractor',
    'Accessory building construction': 'Accessory building construction',
    'Bathroom remodelling': 'Bathroom remodelling',
    'Drywall installation': 'Drywall installation',
    'Drywall repair': 'Drywall repair',
    'Exterior painting': 'Exterior painting',
    'Floor fitting': 'Floor fitting',
    'Flooring': 'Flooring',
    'Flooring repair': 'Flooring repair',
    'Foundation pouring': 'Foundation pouring',
    'General construction': 'General construction',
    'Home addition construction': 'Home addition construction',
    'Home building': 'Home building',
    'Home renovations': 'Home renovations',
    'Interior decorating': 'Interior decorating',
    'Interior structural repairs': 'Interior structural repairs',
    'Kitchen remodelling': 'Kitchen remodelling',
    'Plumbing services': 'Plumbing services',
    'Remodelling': 'Remodelling',
    'Roof installation': 'Roof installation',
    'Roof repair': 'Roof repair',
    'Tile work installation': 'Tile work installation',
    'Tile work replacement': 'Tile work replacement',
    'Waterproofing': 'Waterproofing'
  }
};

export const LanguageProvider = ({ children }) => {
  const language = 'en';

  const toggleLanguage = () => {
    // Telugu removed, always English
  };

  const t = (key) => {
    return translations['en']?.[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage: () => {}, toggleLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

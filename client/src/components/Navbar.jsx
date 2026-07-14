import React from 'react';
import StaggeredMenu from './StaggeredMenu';

const Navbar = () => {
  const menuItems = [
    { label: 'Home', ariaLabel: 'Go to home page', link: '#home' },
    { label: 'About', ariaLabel: 'Learn about us', link: '#about' },
    { label: 'Services', ariaLabel: 'View our services', link: '#services' },
    { label: 'Contact', ariaLabel: 'Get in touch', link: '#contact' }
  ];

  const socialItems = [
    { label: 'WhatsApp', link: 'https://wa.me/917601078843' },
    { label: 'Direct Call', link: 'tel:+918790420585' },
    { label: 'Email Desk', link: 'mailto:nissixconstructions@gmail.com' }
  ];

  return (
    <StaggeredMenu
      position="right"
      items={menuItems}
      socialItems={socialItems}
      displaySocials={true}
      displayItemNumbering={true}
      menuButtonColor="var(--white)"
      openMenuButtonColor="var(--white)"
      changeMenuColorOnOpen={false}
      colors={['var(--secondary-dark)', 'var(--card-glass)']}
      accentColor="var(--accent-gold)"
      isFixed={true}
    />
  );
};

export default Navbar;

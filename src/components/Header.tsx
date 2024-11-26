import React, { useState } from 'react';
import styles from './Header.module.css';
import { FaGithub, FaLinkedin, FaFacebookMessenger, FaBars, FaMoon, FaSun } from 'react-icons/fa';
import { SiGmail } from 'react-icons/si';
import { FaPaperclip } from 'react-icons/fa';

// Define the props interface for the Header component
interface HeaderProps {
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

const Header: React.FC<HeaderProps> = ({ isDarkMode, toggleDarkMode }) => {
  const [menuOpen, setMenuOpen] = useState(false); // State to toggle mobile menu

  return (
    <header className={`${styles.header} ${isDarkMode ? styles.dark : ''}`}>
      {/* Left Section: Logo */}
      <div className={styles.leftSection}>
        <img src="/GM.png" alt="Logo" />
        <span className={styles.logo}>gmangali.</span>
      </div>

      {/* Right Section: Social Media + Button */}
      <div className={styles.rightSection}>
      <button onClick={toggleDarkMode} className={styles.darkModeButton}>
      {isDarkMode ? <FaSun size={18} /> : <FaMoon size={18} />}
        </button>
        {/* Social Media Links */}
        <ul className={styles.socialLinks}>
          <li>
            <a
              href="https://github.com/yourprofile"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaGithub />
            </a>
          </li>
          <li>
            <a
              href="https://linkedin.com/in/yourprofile"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaLinkedin />
            </a>
          </li>
          <li>
            <a
              href="mailto:yourname@gmail.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <SiGmail />
            </a>
          </li>
          <li>
            <a
              href="mailto:yourname@gmail.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FaFacebookMessenger />
            </a>
          </li>
        </ul>

        {/* "Download CV" Button */}
        
<a
  href="https://raw.githubusercontent.com/gericoaron/storage/main/FINAL_CV_11%3A19%3A24.pdf"
  download="gmangali_cv.pdf"
  className={styles.downloadButton}
>
  <FaPaperclip style={{ marginRight: '8px' }} />
  <span>Download CV</span>
</a>


        {/* Dark Mode Toggle */}

        {/* Hamburger Menu for Mobile */}
        <button
          className={styles.hamburgerButton}
          onClick={() => setMenuOpen((prev) => !prev)}
        >
          <FaBars />
        </button>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className={styles.mobileMenu}>
            <ul className={styles.mobileSocialLinks}>
              <li>
                <a
                  href="https://github.com/yourprofile"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaGithub />
                </a>
              </li>
              <li>
                <a
                  href="https://linkedin.com/in/yourprofile"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaLinkedin />
                </a>
              </li>
              <li>
                <a
                  href="mailto:yourname@gmail.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <SiGmail />
                </a>
              </li>
              <li>
                <a
                  href="mailto:yourname@gmail.com"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <FaFacebookMessenger />
                </a>
              </li>
            </ul>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;

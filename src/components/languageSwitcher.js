import React, { useState } from 'react';
import { useI18next } from 'gatsby-plugin-react-i18next';
import styled from 'styled-components';
import { IconGlobe } from '@components/icons';

const StyledLanguageSwitcher = styled.div`
  display: flex;
  align-items: center;
  margin-left: 15px;
  position: relative;

  .dropdown {
    position: relative;
  }

  .dropdown-toggle {
    ${({ theme }) => theme.mixins.smallButton};
    padding: 8px 12px;
    font-size: var(--fz-md);
    background-color: transparent;
    border: 1px solid var(--green);
    color: var(--green);
    cursor: pointer;
    transition: var(--transition);
    display: flex;
    align-items: center;
    justify-content: center;

    &:hover,
    &:focus {
      background-color: var(--green-tint);
    }
  }

  .dropdown-menu {
    position: absolute;
    top: calc(100% + 8px);
    right: 0;
    background-color: var(--light-navy);
    border: 1px solid var(--green);
    border-radius: var(--border-radius);
    padding: 8px;
    min-width: 100px;
    display: flex;
    flex-direction: column;
    gap: 4px;
    box-shadow: 0 10px 30px -15px var(--navy-shadow);
    z-index: 1000;
    opacity: 1;
    transform: translateY(0);
    transition: opacity 0.3s ease, transform 0.3s ease;

    &.entering,
    &.entered {
      opacity: 1;
      transform: translateY(0);
    }

    &.exiting,
    &.exited {
      opacity: 0;
      transform: translateY(-10px);
    }
  }

  button {
    ${({ theme }) => theme.mixins.smallButton};
    padding: 8px 12px;
    font-size: var(--fz-xs);
    background-color: transparent;
    border: 1px solid var(--lightest-navy);
    color: var(--slate);
    cursor: pointer;
    transition: var(--transition);
    text-align: center;
    width: 100%;

    &:hover,
    &:focus {
      background-color: var(--green-tint);
      color: var(--green);
      border-color: var(--green);
    }

    &.active {
      background-color: var(--green);
      color: var(--navy);
      border-color: var(--green);
    }
  }
`;

const LanguageSwitcher = () => {
  const { languages, changeLanguage, language } = useI18next();
  const [isOpen, setIsOpen] = useState(false);

  const getLanguageName = lng => {
    const names = {
      en: 'English',
      uz: 'Uzbek',
      ko: 'Korean',
    };
    return names[lng] || lng;
  };

  return (
    <StyledLanguageSwitcher>
      <div className="dropdown">
        <button className="dropdown-toggle" onClick={() => setIsOpen(!isOpen)}>
          <IconGlobe />
        </button>

        {isOpen && (
          <div className="dropdown-menu">
            {languages.map(lng => (
              <button
                key={lng}
                onClick={() => {
                  changeLanguage(lng);
                  setIsOpen(false);
                }}
                className={language === lng ? 'active' : ''}
                aria-label={`Switch to ${getLanguageName(lng)}`}>
                {lng.toUpperCase()}
              </button>
            ))}
          </div>
        )}
      </div>
    </StyledLanguageSwitcher>
  );
};

export default LanguageSwitcher;

import React from 'react';
import { useI18next } from 'gatsby-plugin-react-i18next';
import styled from 'styled-components';

const StyledLanguageSwitcher = styled.div`
  display: flex;
  align-items: center;
  margin-left: 15px;

  button {
    ${({ theme }) => theme.mixins.smallButton};
    padding: 8px 12px;
    font-size: var(--fz-xs);
    background-color: transparent;
    border: 1px solid var(--green);
    color: var(--green);
    cursor: pointer;
    transition: var(--transition);

    &:hover,
    &:focus {
      background-color: var(--green-tint);
    }

    &.active {
      background-color: var(--green);
      color: var(--navy);
    }

    &:not(:last-child) {
      margin-right: 5px;
    }
  }
`;

const LanguageSwitcher = () => {
  const { languages, changeLanguage, language } = useI18next();

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
      {languages.map(lng => (
        <button
          key={lng}
          onClick={() => changeLanguage(lng)}
          className={language === lng ? 'active' : ''}
          aria-label={`Switch to ${getLanguageName(lng)}`}>
          {lng.toUpperCase()}
        </button>
      ))}
    </StyledLanguageSwitcher>
  );
};

export default LanguageSwitcher;

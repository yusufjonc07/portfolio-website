import React from 'react';
import { useI18next } from 'gatsby-plugin-react-i18next';
import styled from 'styled-components';

const StyledLanguageSwitcher = styled.div`
  display: flex;
  gap: 10px;

  button {
    background: none;
    border: 1px solid var(--green);
    color: var(--green);
    padding: 5px 15px;
    cursor: pointer;
    border-radius: 4px;
    font-family: var(--font-mono);
    font-size: var(--fz-xs);

    &.active {
      background: var(--green-tint);
    }

    &:hover {
      background: var(--green-tint);
    }
  }
`;

const LanguageSwitcher = () => {
  const { languages, changeLanguage, language } = useI18next();

  return (
    <StyledLanguageSwitcher>
      {languages.map(lng => (
        <button
          key={lng}
          onClick={() => changeLanguage(lng)}
          className={language === lng ? 'active' : ''}>
          {lng.toUpperCase()}
        </button>
      ))}
    </StyledLanguageSwitcher>
  );
};

export default LanguageSwitcher;

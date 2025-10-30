import React from 'react';
import styled from 'styled-components';

const StyledBanner = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background-color: var(--green);
  color: var(--navy);
  padding: 12px 20px;
  text-align: center;
  font-family: var(--font-mono);
  font-size: var(--fz-sm);
  font-weight: 600;
  z-index: 11;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);

  @media (max-width: 768px) {
    font-size: var(--fz-xs);
    padding: 10px 15px;
  }

  .banner-content {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 15px;

    @media (max-width: 600px) {
      flex-direction: column;
      gap: 5px;
    }
  }

  .emoji {
    font-size: 18px;

    @media (max-width: 768px) {
      font-size: 16px;
    }
  }
`;

const Banner = () => {
  return (
    <StyledBanner>
      <div className="banner-content">
        <span>
          <span className="emoji">🎓</span> Gachon University CS Student (GPA 4.42/4.5)
        </span>
        <span>|</span>
        <span>
          <span className="emoji">💼</span> Available for Part-time & Internships in Seoul
        </span>
      </div>
    </StyledBanner>
  );
};

export default Banner;

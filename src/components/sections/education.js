import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { srConfig } from '@config';
import sr from '@utils/sr';
import { usePrefersReducedMotion } from '@hooks';

const StyledEducationSection = styled.section`
  max-width: 700px;

  .inner {
    display: block;
  }
`;

const StyledEducationCard = styled.div`
  background-color: var(--light-navy);
  border-radius: var(--border-radius);
  padding: 30px;
  transition: var(--transition);

  &:hover {
    transform: translateY(-5px);
  }

  h3 {
    margin-bottom: 5px;
    font-size: var(--fz-xxl);
    font-weight: 500;
    line-height: 1.3;

    .school {
      color: var(--green);
    }
  }

  .degree {
    color: var(--light-slate);
    font-size: var(--fz-lg);
    margin-bottom: 15px;
  }

  .details {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    margin-bottom: 15px;
    font-family: var(--font-mono);
    font-size: var(--fz-sm);
    color: var(--slate);

    @media (max-width: 480px) {
      flex-direction: column;
      gap: 5px;
    }
  }

  .detail-item {
    display: flex;
    align-items: center;
    gap: 8px;

    .label {
      color: var(--green);
      font-weight: 600;
    }
  }

  .gpa {
    margin-top: 10px;
    padding: 10px 15px;
    background-color: var(--navy);
    border-left: 3px solid var(--green);
    border-radius: 4px;

    .gpa-label {
      color: var(--green);
      font-family: var(--font-mono);
      font-size: var(--fz-xs);
      font-weight: 600;
      margin-right: 10px;
    }

    .gpa-value {
      color: var(--lightest-slate);
      font-size: var(--fz-xl);
      font-weight: 600;
    }
  }
`;

const Education = () => {
  const revealContainer = useRef(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    sr.reveal(revealContainer.current, srConfig());
  }, []);

  return (
    <StyledEducationSection id="education" ref={revealContainer}>
      <h2 className="numbered-heading">Education</h2>

      <div className="inner">
        <StyledEducationCard>
          <h3>
            <span className="school">Gachon University</span>
          </h3>
          <div className="degree">B.Sc. in Computer Engineering (IT Convergence)</div>

          <div className="details">
            <div className="detail-item">
              <span className="label">Duration:</span>
              <span>September 2024 - July 2028</span>
            </div>
            <div className="detail-item">
              <span className="label">Location:</span>
              <span>Seongnam-si, South Korea</span>
            </div>
          </div>

          <div className="gpa">
            <span className="gpa-label">GPA:</span>
            <span className="gpa-value">4.42 / 4.5</span>
          </div>
        </StyledEducationCard>
      </div>
    </StyledEducationSection>
  );
};

export default Education;

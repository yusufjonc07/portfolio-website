import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { srConfig } from '@config';
import sr from '@utils/sr';
import { usePrefersReducedMotion } from '@hooks';

const StyledCertificatesSection = styled.section`
  max-width: 700px;

  .inner {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    grid-gap: 20px;

    @media (max-width: 768px) {
      grid-template-columns: 1fr;
    }
  }
`;

const StyledCertificateCard = styled.div`
  background-color: var(--light-navy);
  border-radius: var(--border-radius);
  padding: 25px;
  transition: var(--transition);

  &:hover {
    transform: translateY(-5px);
  }

  .cert-header {
    display: flex;
    align-items: center;
    margin-bottom: 15px;

    .icon {
      color: var(--green);
      font-size: 24px;
      margin-right: 10px;
    }
  }

  h3 {
    margin: 0 0 10px;
    font-size: var(--fz-xl);
    font-weight: 600;
    color: var(--lightest-slate);
  }

  .issuer {
    color: var(--green);
    font-family: var(--font-mono);
    font-size: var(--fz-sm);
    margin-bottom: 5px;
  }

  .date {
    color: var(--slate);
    font-family: var(--font-mono);
    font-size: var(--fz-xs);
    margin-bottom: 10px;
  }

  .details {
    color: var(--light-slate);
    font-size: var(--fz-sm);
    margin-top: 10px;
  }
`;

const Certificates = () => {
  const revealContainer = useRef(null);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    sr.reveal(revealContainer.current, srConfig());
  }, []);

  const certificates = [
    {
      name: 'The MERN Fullstack Guide',
      issuer: 'Udemy',
      date: 'November 2024',
      details: 'MongoDB, Express.js, React, Node.js',
    },
    {
      name: 'IELTS English Proficiency',
      issuer: 'IDP IELTS',
      date: 'April 2024',
      details: 'Overall Band: 6.5/9',
    },
  ];

  return (
    <StyledCertificatesSection id="certificates" ref={revealContainer}>
      <h2 className="numbered-heading">Certificates</h2>

      <div className="inner">
        {certificates.map((cert, i) => (
          <StyledCertificateCard key={i}>
            <div className="cert-header">
              <span className="icon">📜</span>
            </div>
            <h3>{cert.name}</h3>
            <div className="issuer">{cert.issuer}</div>
            <div className="date">{cert.date}</div>
            {cert.details && <div className="details">{cert.details}</div>}
          </StyledCertificateCard>
        ))}
      </div>
    </StyledCertificatesSection>
  );
};

export default Certificates;

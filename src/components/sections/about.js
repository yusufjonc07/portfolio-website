import React, { useEffect, useRef, useState } from 'react';
import { StaticImage } from 'gatsby-plugin-image';
import styled, { keyframes } from 'styled-components';
import { srConfig } from '@config';
import sr from '@utils/sr';
import { usePrefersReducedMotion } from '@hooks';
import { useTranslation } from 'gatsby-plugin-react-i18next';

// ─── Animations ────────────────────────────────────────────────────────────────

const shimmer = keyframes`
  0%   { background-position: -200% center; }
  100% { background-position:  200% center; }
`;

const floatUp = keyframes`
  from { opacity: 0; transform: translateY(10px); }
  to   { opacity: 1; transform: translateY(0);     }
`;

// ─── Skill categories ─────────────────────────────────────────────────────────

const SKILL_GROUPS = [
  {
    label: 'Backend',
    icon: '⬡',
    skills: ['PHP:Yii2', 'Python:FastAPI', 'Node:Express.js'],
  },
  {
    label: 'Frontend',
    icon: '◈',
    skills: ['JS | Vue.js | jQuery', 'TS | React.js', 'CSS3 | Bootstrap | Tailwind'],
  },
  {
    label: 'Databases',
    icon: '◉',
    skills: ['MySQL', 'PostgreSQL', 'MongoDB', 'SQL'],
  },
  {
    label: 'Depoloyment',
    icon: '◎',
    skills: ['Docker', 'Linux/Ubuntu', 'Apache/Nginx', 'Github'],
  },
  {
    label: 'ML & DL',
    icon: '◉',
    skills: ['NumPy', 'pandas', 'scikit-learn', 'pytorch', 'opencv'],
  },
];
// ...existing code...
// ─── Styled Components ─────────────────────────────────────────────────────────

const StyledAboutSection = styled.section`
  max-width: 960px;

  .inner {
    display: grid;
    grid-template-columns: 3fr 2fr;
    grid-gap: 60px;
    align-items: start;

    @media (max-width: 768px) {
      display: block;
    }
  }
`;

const StyledText = styled.div`
  p {
    color: var(--light-slate);
    line-height: 1.8;

    a {
      color: var(--green);
      text-decoration: none;
      border-bottom: 1px solid transparent;
      transition: border-color var(--transition);

      &:hover {
        border-color: var(--green);
      }
    }
  }

  /* ── Section divider ── */
  .skills-header {
    display: flex;
    align-items: center;
    gap: 12px;
    margin: 36px 0 20px;

    .skills-title {
      font-family: var(--font-mono);
      font-size: var(--fz-xs);
      color: var(--green);
      letter-spacing: 0.1em;
      text-transform: uppercase;
      white-space: nowrap;
    }

    .skills-line {
      flex: 1;
      height: 1px;
      background: linear-gradient(90deg, rgba(100, 255, 218, 0.3) 0%, transparent 100%);
    }
  }

  /* ── Skill groups ── */
  .skill-groups {
    display: flex;
    flex-direction: column;
    gap: 18px;
  }

  .skill-group {
    .group-label {
      display: flex;
      align-items: center;
      gap: 7px;
      margin-bottom: 8px;

      .group-icon {
        color: var(--green);
        font-size: 10px;
        line-height: 1;
      }

      .group-name {
        font-family: var(--font-mono);
        font-size: 10px;
        color: var(--slate);
        letter-spacing: 0.1em;
        text-transform: uppercase;
      }
    }

    .skill-pills {
      display: flex;
      flex-wrap: wrap;
      gap: 7px;
    }
  }

  /* ── Individual pill ── */
  .skill-pill {
    position: relative;
    font-family: var(--font-mono);
    font-size: 11px;
    color: var(--light-slate);
    background: rgba(100, 255, 218, 0.04);
    border: 1px solid rgba(100, 255, 218, 0.12);
    border-radius: 4px;
    padding: 4px 10px;
    cursor: default;
    transition: color 0.2s ease, background 0.2s ease, border-color 0.2s ease, transform 0.2s ease;
    animation: ${floatUp} 0.4s ease both;

    &:hover {
      color: var(--green);
      background: rgba(100, 255, 218, 0.08);
      border-color: rgba(100, 255, 218, 0.35);
      transform: translateY(-2px);
    }

    /* shimmer sweep on hover */
    &::after {
      content: '';
      position: absolute;
      inset: 0;
      border-radius: 4px;
      background: linear-gradient(
        105deg,
        transparent 40%,
        rgba(100, 255, 218, 0.08) 50%,
        transparent 60%
      );
      background-size: 200% 100%;
      opacity: 0;
      transition: opacity 0.2s;
    }
    &:hover::after {
      opacity: 1;
      animation: ${shimmer} 0.6s ease forwards;
    }
  }
`;

const StyledPic = styled.div`
  position: relative;
  max-width: 300px;

  @media (max-width: 768px) {
    margin: 50px auto 0;
    width: 70%;
  }

  /* ── Floating badge ── */
  .pic-badge {
    position: absolute;
    bottom: -16px;
    left: -16px;
    z-index: 10;
    background: var(--navy);
    border: 1px solid rgba(100, 255, 218, 0.2);
    border-radius: 8px;
    padding: 10px 16px;
    display: flex;
    flex-direction: column;
    gap: 2px;

    .badge-num {
      font-family: var(--font-mono);
      font-size: 20px;
      font-weight: 700;
      color: var(--green);
      line-height: 1;
    }
    .badge-label {
      font-family: var(--font-mono);
      font-size: 9px;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      color: var(--slate);
    }
  }

  .wrapper {
    ${({ theme }) => theme.mixins.boxShadow};
    display: block;
    position: relative;
    width: 100%;
    border-radius: var(--border-radius);
    background-color: #ccc;

    &:hover,
    &:focus {
      outline: 0;
      transform: translate(-4px, -4px);

      &:after {
        transform: translate(8px, 8px);
      }

      .img {
        filter: none;
        mix-blend-mode: normal;
      }
    }

    .img {
      position: relative;
      border-radius: var(--border-radius);
      mix-blend-mode: multiply;
      filter: grayscale(100%) contrast(1);
      transition: var(--transition);
    }

    &:before,
    &:after {
      content: '';
      display: block;
      position: absolute;
      width: 100%;
      height: 100%;
      border-radius: var(--border-radius);
      transition: var(--transition);
    }

    &:before {
      top: 0;
      left: 0;
      background-color: var(--navy);
      mix-blend-mode: screen;
    }

    &:after {
      border: 2px solid var(--green);
      top: 14px;
      left: 14px;
      z-index: -1;
    }
  }
`;

// ─── Component ─────────────────────────────────────────────────────────────────

const About = () => {
  const { t } = useTranslation();
  const revealContainer = useRef(null);
  const prefersReducedMotion = usePrefersReducedMotion();
  const [yearsOfExperience, setYearsOfExperience] = useState(0);
  const [activeGroup, setActiveGroup] = useState('default');

  useEffect(() => {
    if (prefersReducedMotion) {return;}
    sr.reveal(revealContainer.current, srConfig());
    setYearsOfExperience(new Date().getFullYear() - 2022);
  }, []);

  return (
    <StyledAboutSection id="about" ref={revealContainer}>
      <h2 className="numbered-heading">{t('about.title')}</h2>

      <div className="inner">
        {/* ── Left: text + skills ─────────────────────────────────────────── */}
        <StyledText>
          <div>
            <p>
              {t('about.paragraph1.start')}{' '}
              <a href="https://www.gachon.ac.kr">{t('about.paragraph1.university')}</a>{' '}
              {t('about.paragraph1.end')}
            </p>
            <p>{t('about.paragraph2')}</p>
            <p>
              {t('about.paragraph3.start')} <a href="#projects">{t('about.paragraph3.link')}</a>{' '}
              {t('about.paragraph3.end')}
            </p>
            <p>{t('about.paragraph4')}</p>
            <p>{t('about.techIntro')}</p>
          </div>

          {/* Skills section */}
          <div className="skills-header">
            <span className="skills-title">Tech Stack</span>
            <div className="skills-line" />
          </div>

          <div className="skill-groups">
            {SKILL_GROUPS.map((group, gi) => (
              <div
                className={`skill-group${activeGroup === gi ? ' active' : ''}`}
                key={group.label}
                onMouseEnter={() => setActiveGroup(gi)}
                onMouseLeave={() => setActiveGroup(null)}>
                <div className="group-label">
                  <span className="group-icon">{group.icon}</span>
                  <span className="group-name">{group.label}</span>
                </div>
                <div className="skill-pills">
                  {group.skills.map((skill, si) => (
                    <span
                      key={skill}
                      className="skill-pill"
                      style={{ animationDelay: `${si * 40}ms` }}>
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </StyledText>

        {/* ── Right: photo ─────────────────────────────────────────────────── */}
        <StyledPic>
          <div className="wrapper">
            <StaticImage
              className="img"
              src="../../images/me.png"
              width={500}
              quality={95}
              formats={['AUTO', 'WEBP', 'AVIF']}
              alt="Headshot"
            />
          </div>

          {/* Floating experience badge */}
          <div className="pic-badge">
            <span className="badge-num">{yearsOfExperience}+</span>
            <span className="badge-label">
              Years of
              <br />
              Experience
            </span>
          </div>
        </StyledPic>
      </div>
    </StyledAboutSection>
  );
};

export default About;

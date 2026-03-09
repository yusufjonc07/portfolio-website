import React, { useState, useEffect } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import styled, { keyframes } from 'styled-components';
import { navDelay, loaderDelay } from '@utils';
import { usePrefersReducedMotion } from '@hooks';
import { useTranslation } from 'gatsby-plugin-react-i18next';

// ─── Animations ────────────────────────────────────────────────────────────────

const blink = keyframes`
  0%, 100% { opacity: 1; }
  50%       { opacity: 0; }
`;

const pulse = keyframes`
  0%, 100% { transform: scale(1);   opacity: 1;   }
  50%       { transform: scale(1.5); opacity: 0.6; }
`;

const ripple = keyframes`
  0%   { transform: scale(0.95); opacity: 0.6; }
  100% { transform: scale(1.6);  opacity: 0;   }
`;

// ─── Styled Components ─────────────────────────────────────────────────────────

const StyledHeroSection = styled.section`
  ${({ theme }) => theme.mixins.flexCenter};
  flex-direction: column;
  align-items: flex-start;
  min-height: 100vh;
  height: 100vh;
  padding: 0;
  position: relative;
  overflow: hidden;

  @media (max-height: 700px) and (min-width: 700px), (max-width: 360px) {
    height: auto;
    padding-top: var(--nav-height);
  }

  /* ── Availability badge ── */
  .availability-badge {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    background: rgba(100, 255, 218, 0.06);
    border: 1px solid rgba(100, 255, 218, 0.18);
    border-radius: 100px;
    padding: 5px 14px;
    margin-bottom: 28px;

    .dot-wrap {
      position: relative;
      width: 8px;
      height: 8px;
    }
    .dot {
      position: absolute;
      inset: 0;
      background: var(--green);
      border-radius: 50%;
      animation: ${pulse} 2s ease-in-out infinite;
    }
    .dot-ring {
      position: absolute;
      inset: -2px;
      border: 1.5px solid var(--green);
      border-radius: 50%;
      animation: ${ripple} 2s ease-in-out infinite;
    }
    span {
      font-family: var(--font-mono);
      font-size: var(--fz-xxs);
      color: var(--green);
      letter-spacing: 0.08em;
      text-transform: uppercase;
    }
  }

  /* ── Greeting ── */
  h1 {
    margin: 0 0 8px 4px;
    color: var(--green);
    font-family: var(--font-mono);
    font-size: clamp(var(--fz-sm), 5vw, var(--fz-md));
    font-weight: 400;

    @media (max-width: 480px) {
      margin: 0 0 16px 2px;
    }
  }

  /* ── Name ── */
  h2 {
    .name-outline {
      -webkit-text-stroke: 1.5px var(--green);
      color: transparent;
    }
  }

  /* ── Role row ── */
  .role-row {
    display: flex;
    align-items: center;
    gap: 10px;
    margin-top: 6px;

    .role-prefix {
      color: var(--slate);
      font-family: var(--font-mono);
      font-size: clamp(var(--fz-md), 2vw, var(--fz-lg));
      line-height: 1;
    }

    .role-typed {
      color: var(--green);
      font-family: var(--font-mono);
      font-size: clamp(var(--fz-md), 2vw, var(--fz-lg));
      line-height: 1;
      min-width: 220px;

      .cursor {
        display: inline-block;
        width: 2px;
        height: 1em;
        background: var(--green);
        margin-left: 2px;
        vertical-align: middle;
        animation: ${blink} 1s step-end infinite;
      }
    }
  }

  /* ── Description ── */
  p {
    margin: 20px 0 0;
    max-width: 540px;

    small {
      border-left: 2px solid rgba(100, 255, 218, 0.3);
      padding-left: 18px;
      display: block;
      font-style: italic;
      color: var(--light-slate);
      line-height: 1.75;
    }
  }

  /* ── CTA row ── */
  .cta-row {
    display: flex;
    align-items: center;
    gap: 16px;
    margin-top: 50px;
    flex-wrap: wrap;
  }

  .email-link {
    ${({ theme }) => theme.mixins.bigButton};
  }

  .secondary-link {
    font-family: var(--font-mono);
    font-size: var(--fz-xs);
    color: var(--slate);
    text-decoration: none;
    letter-spacing: 0.04em;
    border-bottom: 1px solid transparent;
    padding-bottom: 2px;
    transition: color var(--transition), border-color var(--transition);

    &:hover {
      color: var(--green);
      border-color: var(--green);
    }
  }

  /* ── Stats (right side) ── */
  .stats-col {
    position: absolute;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
    display: flex;
    flex-direction: column;
    gap: 28px;

    @media (max-width: 768px) {
      display: none;
    }

    .stat {
      text-align: right;

      .stat-num {
        font-family: var(--font-mono);
        font-size: clamp(28px, 3vw, 38px);
        font-weight: 700;
        color: var(--lightest-slate);
        line-height: 1;
      }
      .stat-label {
        font-family: var(--font-mono);
        font-size: var(--fz-xxs);
        color: var(--slate);
        letter-spacing: 0.08em;
        text-transform: uppercase;
        margin-top: 4px;
      }
      .stat-line {
        width: 28px;
        height: 2px;
        background: rgba(100, 255, 218, 0.35);
        margin-left: auto;
        margin-top: 8px;
      }
    }
  }
`;

// ─── Typewriter hook ───────────────────────────────────────────────────────────

const ROLES = ['Software Engineer', 'ML Engineer', 'Full-Stack Developer', 'AI Builder'];
function useTypewriter(words, speed = 80, pause = 1800) {
  const [display, setDisplay] = useState('');
  const [wordIdx, setWordIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const word = words[wordIdx % words.length];
    let timeout;

    if (!deleting && charIdx <= word.length) {
      setDisplay(word.slice(0, charIdx));
      timeout = setTimeout(() => setCharIdx(c => c + 1), speed);
    } else if (!deleting && charIdx > word.length) {
      timeout = setTimeout(() => setDeleting(true), pause);
    } else if (deleting && charIdx >= 0) {
      setDisplay(word.slice(0, charIdx));
      timeout = setTimeout(() => setCharIdx(c => c - 1), speed / 2);
    } else {
      setDeleting(false);
      setWordIdx(w => (w + 1) % words.length);
      timeout = setTimeout(() => setCharIdx(1), speed);
    }

    return () => clearTimeout(timeout);
  }, [charIdx, deleting, wordIdx, words, speed, pause]);

  return display;
}
// ─── Component ─────────────────────────────────────────────────────────────────

const Hero = () => {
  const [yearsOfExperience, setYearsOfExperience] = useState(0);
  const STATS = [
    { num: `${yearsOfExperience  }+`, label: 'Years Exp.' },
    { num: '20+', label: 'Projects' },
    { num: '15+', label: 'ML Models' },
  ];
  const [isMounted, setIsMounted] = useState(false);
  const prefersReducedMotion = usePrefersReducedMotion();
  const { t } = useTranslation();
  const role = useTypewriter(ROLES);

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }
    const timeout = setTimeout(() => setIsMounted(true), navDelay);
    setYearsOfExperience(new Date().getFullYear() - 2022);

    return () => clearTimeout(timeout);
  }, []);

  // ── Hero items ──────────────────────────────────────────────────────────────

  const zero = (
    <div className="availability-badge">
      <div className="dot-wrap">
        <div className="dot" />
        <div className="dot-ring" />
      </div>
      <span>Available for new projects</span>
    </div>
  );

  const one = <h1>{t('hero.greeting')}</h1>;

  const two = (
    <h2 className="big-heading">
      {/* First word solid, last word outlined — adjust split to taste */}
      {t('hero.name')
        .split(' ')
        .map((word, i, arr) =>
          i < arr.length - 1 ? (
            <span key={i}>{word} </span>
          ) : (
            <span key={i} className="name-outline">
              {word}
            </span>
          ),
        )}
    </h2>
  );

  const three = (
    <div className="role-row">
      <span className="role-prefix">I'm a</span>
      <span className="role-typed">
        {isMounted ? role : ROLES[0]}
        <span className="cursor" />
      </span>
    </div>
  );

  const four = (
    <p>
      <small>{t('hero.description')}</small>
    </p>
  );

  const five = (
    <div className="cta-row">
      <a className="email-link" href="#contact">
        {t('hero.cta')}
      </a>
      <a className="secondary-link" href="#projects">
        View My Work
      </a>
    </div>
  );

  const items = [zero, one, two, three, four, five];

  return (
    <StyledHeroSection>
      {prefersReducedMotion ? (
        <>
          {items.map((item, i) => (
            <div key={i}>{item}</div>
          ))}
        </>
      ) : (
        <TransitionGroup component={null}>
          {isMounted &&
            items.map((item, i) => (
              <CSSTransition key={i} classNames="fadeup" timeout={loaderDelay}>
                <div style={{ transitionDelay: `${i + 1}00ms` }}>{item}</div>
              </CSSTransition>
            ))}
        </TransitionGroup>
      )}

      {/* Stats — decorative, always visible once mounted */}
      {isMounted && (
        <div className="stats-col">
          {STATS.map(s => (
            <div className="stat" key={s.label}>
              <div className="stat-num">{s.num}</div>
              <div className="stat-label">{s.label}</div>
              <div className="stat-line" />
            </div>
          ))}
        </div>
      )}
    </StyledHeroSection>
  );
};

export default Hero;

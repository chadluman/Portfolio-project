'use client';

import { usePathname } from 'next/navigation';
import { useEffect } from 'react';

const AnimeEffects = () => {
  const pathname = usePathname();

  useEffect(() => {
    let cancelled = false;
    let cleanup: (() => void) | undefined;

    const setupAnimations = async () => {
      const prefersReducedMotion = window.matchMedia(
        '(prefers-reduced-motion: reduce)',
      ).matches;

      if (prefersReducedMotion) {
        document
          .querySelectorAll<HTMLElement>('[data-anime-reveal]')
          .forEach((element) => {
            element.style.opacity = '1';
            element.style.transform = 'none';

            element
              .querySelectorAll<HTMLElement>('[data-anime-child]')
              .forEach((child) => {
                child.style.opacity = '1';
                child.style.transform = 'none';
              });
          });
        return;
      }

      const { animate, stagger } = await import('animejs');

      if (cancelled) return;

      const revealElements = Array.from(
        document.querySelectorAll<HTMLElement>('[data-anime-reveal]'),
      );

      revealElements.forEach((element) => {
        const children =
          element.querySelectorAll<HTMLElement>('[data-anime-child]');

        if (children.length) {
          element.style.opacity = '1';
          element.style.transform = 'none';

          children.forEach((child) => {
            child.style.opacity = '0';
            child.style.transform = 'translateY(24px)';
          });
          return;
        }

        element.style.opacity = '0';
        element.style.transform = 'translateY(24px)';
      });

      const revealElement = (element: HTMLElement) => {
        const children =
          element.querySelectorAll<HTMLElement>('[data-anime-child]');

        if (children.length) {
          element.style.opacity = '1';
          element.style.transform = 'none';

          animate(children, {
            opacity: [0, 1],
            y: [24, 0],
            duration: 700,
            delay: stagger(80),
            ease: 'outCubic',
          });
        } else {
          animate(element, {
            opacity: [0, 1],
            y: [24, 0],
            duration: 700,
            ease: 'outCubic',
          });
        }
      };

      const isInViewport = (element: HTMLElement) => {
        const rect = element.getBoundingClientRect();
        return rect.top < window.innerHeight * 0.92 && rect.bottom > 0;
      };

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;

            const element = entry.target as HTMLElement;
            revealElement(element);
            observer.unobserve(element);
          });
        },
        {
          threshold: 0.18,
          rootMargin: '0px 0px -8% 0px',
        },
      );

      revealElements.forEach((element) => observer.observe(element));

      requestAnimationFrame(() => {
        revealElements.forEach((element) => {
          if (!isInViewport(element)) return;

          revealElement(element);
          observer.unobserve(element);
        });
      });

      const viewportFallback = window.setTimeout(() => {
        revealElements.forEach((element) => {
          if (!isInViewport(element)) return;

          element.style.opacity = '1';
          element.style.transform = 'none';
          element
            .querySelectorAll<HTMLElement>('[data-anime-child]')
            .forEach((child) => {
              child.style.opacity = '1';
              child.style.transform = 'none';
            });

          observer.unobserve(element);
        });
      }, 1400);

      const buttons = Array.from(
        document.querySelectorAll<HTMLElement>('[data-anime-button]'),
      );

      const cards = Array.from(
        document.querySelectorAll<HTMLElement>('[data-anime-card]'),
      );

      const enterButton = (event: Event) => {
        animate(event.currentTarget as HTMLElement, {
          y: -3,
          scale: 1.035,
          duration: 260,
          ease: 'outCubic',
        });
      };

      const leaveButton = (event: Event) => {
        animate(event.currentTarget as HTMLElement, {
          y: 0,
          scale: 1,
          duration: 320,
          ease: 'outCubic',
        });
      };

      const enterCard = (event: Event) => {
        animate(event.currentTarget as HTMLElement, {
          y: -8,
          scale: 1.01,
          duration: 360,
          ease: 'outCubic',
        });
      };

      const leaveCard = (event: Event) => {
        animate(event.currentTarget as HTMLElement, {
          y: 0,
          scale: 1,
          duration: 420,
          ease: 'outCubic',
        });
      };

      buttons.forEach((button) => {
        button.addEventListener('mouseenter', enterButton);
        button.addEventListener('mouseleave', leaveButton);
        button.addEventListener('focus', enterButton);
        button.addEventListener('blur', leaveButton);
      });

      cards.forEach((card) => {
        card.addEventListener('mouseenter', enterCard);
        card.addEventListener('mouseleave', leaveCard);
        card.addEventListener('focusin', enterCard);
        card.addEventListener('focusout', leaveCard);
      });

      cleanup = () => {
        observer.disconnect();
        window.clearTimeout(viewportFallback);

        buttons.forEach((button) => {
          button.removeEventListener('mouseenter', enterButton);
          button.removeEventListener('mouseleave', leaveButton);
          button.removeEventListener('focus', enterButton);
          button.removeEventListener('blur', leaveButton);
        });

        cards.forEach((card) => {
          card.removeEventListener('mouseenter', enterCard);
          card.removeEventListener('mouseleave', leaveCard);
          card.removeEventListener('focusin', enterCard);
          card.removeEventListener('focusout', leaveCard);
        });
      };
    };

    setupAnimations();

    return () => {
      cancelled = true;
      cleanup?.();
    };
  }, [pathname]);

  return null;
};

export default AnimeEffects;

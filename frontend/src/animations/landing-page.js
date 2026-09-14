import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

function landingPageAnimation() {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
        gsap.set(
            [
                '#landing-subheading', '#landing-cta',
                '#concept-0', '#concept-1', '#concept-2', '#concept-3', '#concept-4',
                '#product-card', '#product-map',
                '#cta-heading', '#cta-subtext', '#cta-button', '#landing-scroll-indicator',
            ],
            { opacity: 1, y: 0 }
        );
        // Skip SS entirely — show Safe Sweden as the final state
        gsap.set('#heading-group', { opacity: 0 });
        gsap.set('#landing-subheading-2', { opacity: 1 });
        return;
    }

    // ── Hero sequence ────────────────────────────────────────────
    const heroTl = gsap.timeline({ defaults: { ease: 'power2.out' } });

    heroTl
        // Phase 1: heading group fades in (SS with strikethrough)
        .fromTo('#heading-group',
            { opacity: 0, y: 40 },
            { opacity: 1, y: 0, duration: 0.9 }
        )
        .fromTo('#landing-subheading',
            { opacity: 0, y: 30 },
            { opacity: 1, y: 0, duration: 0.7 },
            '-=0.2'
        )
        .fromTo('#landing-cta',
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.6 },
            '-=0.1'
        )
        // Phase 2: group slides left + strikethrough erases from center
        .to('#heading-group', { x: -100, duration: 0.9, ease: 'power2.inOut' }, '+=0.5')
        .to('#strikethrough-line', { scaleX: 0, duration: 0.7, ease: 'power2.inOut' }, '<')
        // Phase 3: right S breaks away to the right (net positive offset relative to group)
        .to('#ss-right', { x: 160, duration: 0.9, ease: 'power2.inOut' }, '<')
        // Phase 4: group fades out; Safe Sweden fades in
        .to('#heading-group', { opacity: 0, duration: 0.4, ease: 'power2.out' })
        .to('#landing-subheading-2', { opacity: 1, duration: 0.6, ease: 'power2.out' }, '<')
        .fromTo('#landing-scroll-indicator',
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.6 },
            '-=0.1'
        );

    // ── Journey — scroll-driven, tied to scroll position ─────────
    const journeyTl = gsap.timeline({
        scrollTrigger: {
            trigger: '#journey-section',
            start: 'top top',
            end: 'bottom bottom',
            scrub: 1.5,
        },
    });

    for (let i = 0; i < 5; i++) {
        journeyTl.fromTo(
            `#concept-${i}`,
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 1, ease: 'power2.out' },
            i * 1.2
        );
    }

    // ── Product section — fade in on enter ───────────────────────
    gsap.fromTo('#product-card',
        { opacity: 0, y: 40 },
        {
            opacity: 1, y: 0, duration: 0.9, ease: 'power2.out',
            scrollTrigger: {
                trigger: '#product-card',
                start: 'top 80%',
                toggleActions: 'play none none none',
            },
        }
    );

    gsap.fromTo('#product-map',
        { opacity: 0, y: 40 },
        {
            opacity: 1, y: 0, duration: 0.9, ease: 'power2.out', delay: 0.15,
            scrollTrigger: {
                trigger: '#product-map',
                start: 'top 80%',
                toggleActions: 'play none none none',
            },
        }
    );

    // ── Final CTA — staggered reveal ─────────────────────────────
    const ctaTl = gsap.timeline({
        scrollTrigger: {
            trigger: '#cta-heading',
            start: 'top 80%',
            toggleActions: 'play none none none',
        },
        defaults: { ease: 'power2.out' },
    });

    ctaTl
        .fromTo('#cta-heading',
            { opacity: 0, y: 30 },
            { opacity: 1, y: 0, duration: 0.8 }
        )
        .fromTo('#cta-subtext',
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.6 },
            '-=0.3'
        )
        .fromTo('#cta-button',
            { opacity: 0, y: 20 },
            { opacity: 1, y: 0, duration: 0.6 },
            '-=0.2'
        );
}

export default landingPageAnimation;
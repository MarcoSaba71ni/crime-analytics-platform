import gsap from 'gsap';

// Called once internally after the heading animation completes — initial reveal only
function animateAuthReveal() {
    const tl = gsap.timeline({ defaults: { ease: 'power2.out' } });
    tl
        .fromTo('#auth-selection',    { opacity: 0, y: -20 }, { opacity: 1, y: 0, duration: 0.5 })
        .fromTo('#auth-forms',        { opacity: 0, y: -20 }, { opacity: 1, y: 0, duration: 0.5 }, '-=0.2')
        .fromTo('#strikethrough-logo', { opacity: 0 },         { opacity: 1, duration: 0.4 });
}

// Full heading sequence — phases 1-4 only, triggers reveal via onComplete
export function animateAuthPage() {
    const tl = gsap.timeline({
        defaults: { ease: 'power2.out' },
        onComplete: animateAuthReveal,
    });

    tl
        .fromTo('#heading-group',
            { opacity: 0, y: 40, x: 0 },
            { opacity: 1, y: 0, duration: 0.9 }
        )
        .to('#heading-group',      { x: -100, duration: 0.9, ease: 'power2.inOut' }, '+=0.5')
        .to('#strikethrough-line', { scaleX: 0, duration: 0.7, ease: 'power2.inOut' }, '<')
        .to('#ss-right', { x: 160,  duration: 0.9, ease: 'power2.inOut' }, '<')
        .to('#ss-left',  { x: -160, duration: 0.9, ease: 'power2.inOut' }, '<')
        .to('#heading-group', { opacity: 0, duration: 0.4 });

    return tl;
}

// Tab-switch animation — heading flash, then form slides in
export function animateAuthForms() {
    const tl = gsap.timeline({ defaults: { ease: 'power2.out' } });

    tl
        .fromTo('#auth-forms',    { opacity: 0, y: -20 }, { opacity: 1, y: 0, duration: 0.4 })
        .fromTo('#strikethrough-logo', { opacity: 0}, { opacity: 1, duration: 0.4 });

    return tl;
}

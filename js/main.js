/**
 * Cue Central - Marketing Site Interactivity
 * SaaS Church Music & Worship Orchestration Platform
 * Taligent Inc
 */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Navbar Scroll Effect
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 20) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
    }

    // 2. Mobile Menu Toggle
    const mobileToggle = document.querySelector('.mobile-toggle');
    const mobileDrawer = document.querySelector('.mobile-drawer');
    if (mobileToggle && mobileDrawer) {
        mobileToggle.addEventListener('click', () => {
            mobileDrawer.classList.toggle('open');
            const isOpen = mobileDrawer.classList.contains('open');
            mobileToggle.setAttribute('aria-expanded', isOpen);
            mobileToggle.innerHTML = isOpen 
                ? '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 6L6 18M6 6l12 12"/></svg>'
                : '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 6h16M4 12h16M4 18h16"/></svg>';
        });
    }

    // 3. Interactive Hero Cockpit Timeline
    const timelineItems = document.querySelectorAll('.timeline-item');
    const stageSongTitle = document.querySelector('.stage-song-title');
    const stageSongDetails = document.querySelector('.stage-song-details');
    const prompterStanza = document.querySelector('.prompter-stanza');
    const prompterCue = document.querySelector('.prompter-cue-line');

    const songData = {
        'prelude': {
            title: 'Prelude: And Can It Be',
            details: '<span>Organ & Piano</span> • <span>Key of G</span> • <span>4/4 Time</span>',
            stanza: 'Amazing love! How can it be,<br>That Thou, my God, shouldst die for me?',
            cue: 'Modulation into Final Stanza in 8 measures'
        },
        'hymn1': {
            title: 'Hymn #242: Crown Him with Many Crowns',
            details: '<span>Congregational</span> • <span>Key of D</span> • <span>Hymnal p. 242</span>',
            stanza: 'Crown Him with many crowns,<br>The Lamb upon His throne;<br>Hark! How the heav\'nly anthem drowns<br>All music but its own!',
            cue: 'Brass Interlude after Verse 2 • Organ Forte'
        },
        'choir': {
            title: 'Choir Anthem: Worthy Is The Lamb',
            details: '<span>Chancel Choir & Strings</span> • <span>Key of F#m / A</span> • <span>Box #412</span>',
            stanza: 'Blessing and honor, glory and power be unto Him,<br>Be unto Him that sitteth upon the throne forever!',
            cue: 'Cue Soprano Entrance on Measure 48 • Accelerando'
        },
        'special': {
            title: 'Special: It Is Well With My Soul',
            details: '<span>Vocal Trio (Spillman, Miller, Vance)</span> • <span>Key of C</span>',
            stanza: 'Though Satan should buffet, though trials should come,<br>Let this blest assurance control:<br>That Christ has regarded my helpless estate...',
            cue: 'Mic 2 & 3 Unmute • Lower Stage Wash'
        },
        'closing': {
            title: 'Hymn #318: Blessed Assurance',
            details: '<span>Invitation / Closing</span> • <span>Key of D</span> • <span>Stanzas 1 & 3</span>',
            stanza: 'Blessed assurance, Jesus is mine!<br>Oh, what a foretaste of glory divine!<br>Heir of salvation, purchase of God...',
            cue: 'Gentle Piano Arpeggio beneath Pastoral Closing'
        }
    };

    timelineItems.forEach(item => {
        item.addEventListener('click', () => {
            timelineItems.forEach(i => i.classList.remove('active'));
            item.classList.add('active');

            const id = item.getAttribute('data-song-id');
            const data = songData[id];
            if (data && stageSongTitle && prompterStanza) {
                stageSongTitle.textContent = data.title;
                stageSongDetails.innerHTML = data.details;
                prompterStanza.innerHTML = data.stanza;
                if (prompterCue) prompterCue.textContent = data.cue;
            }
        });
    });

    // 4. Role Switcher Tabs
    const roleTabs = document.querySelectorAll('.role-tab-btn');
    const roleContentTitle = document.getElementById('role-content-title');
    const roleContentDesc = document.getElementById('role-content-desc');
    const roleContentList = document.getElementById('role-content-list');

    const roleInfo = {
        'directors': {
            title: 'Built by Music Pastors for Effortless Sunday Execution',
            desc: 'Save 4+ hours every week. Eliminate text message chains, misplaced paper binders, and chaotic pre-service rehearsals with an all-in-one worship orchestration console.',
            features: [
                'Drag-and-drop service timeline builder with automatic timing recalculation',
                'Hymnody Intelligence tracks recent usage and dusty hymns to prevent song fatigue',
                'Instant master schedule distribution with one-click push notifications and email digests',
                'Choir library catalog with box & folder numbers, physical shelf tracking, and choral voicings'
            ]
        },
        'accompanists': {
            title: 'Digital Sheet Music Stand with Instant Annotations',
            desc: 'Accompanists and orchestra members get zero-latency access to PDF sheet music on iPad or tablet, synced directly to the service cue sequence.',
            features: [
                'Full-screen PDF music viewer optimized for Bluetooth page-turner foot pedals',
                'Prelude and offertory queue with exact running timings and key pairings',
                'Direct transposition notes and chord charts right on the music stand',
                'Offline capability so connectivity drops never interrupt the service'
            ]
        },
        'choirs': {
            title: 'Rehearsal Portal with Practice Tracks in Every Pocket',
            desc: 'Empower your choir members to arrive on Sunday fully prepared. Each singer gets a personalized mobile portal with their specific voice part and sheet music.',
            features: [
                'Mobile-friendly Progressive Web App (PWA) with zero App Store friction',
                'Rehearsal MP3 practice tracks divided by Soprano, Alto, Tenor, and Bass parts',
                'One-tap attendance check-in and blackout date / absence submission',
                'High-contrast stage cue cards readable from anywhere in the choir loft'
            ]
        },
        'media': {
            title: 'Live Confidence Prompter for the Sound & AV Booth',
            desc: 'Keep stage singers, audio engineers, and projection teams in lockstep. The live prompter displays real-time lyrics, song keys, and pastoral cues.',
            features: [
                'Dedicated stage prompter output with dark/high-contrast display modes',
                'Audio mixer notes (soloist mic assignments, mute cues, instrument specials)',
                'Live countdown timer and pastor pulpit pacing sync',
                'Real-time updates: when the director pivots mid-service, all stage monitors reflect it instantly'
            ]
        }
    };

    roleTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            roleTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');

            const key = tab.getAttribute('data-role');
            const data = roleInfo[key];
            if (data && roleContentTitle) {
                roleContentTitle.textContent = data.title;
                roleContentDesc.textContent = data.desc;
                roleContentList.innerHTML = data.features.map(f => `
                    <li>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg>
                        <span>${f}</span>
                    </li>
                `).join('');
            }
        });
    });

    // 5. Billing Frequency Toggle (Monthly vs Annual)
    const billingSwitch = document.querySelector('.billing-switch');
    const pricePro = document.getElementById('price-pro');
    const priceUnlimited = document.getElementById('price-unlimited');
    const periodPro = document.getElementById('period-pro');
    const periodUnlimited = document.getElementById('period-unlimited');

    if (billingSwitch) {
        billingSwitch.addEventListener('click', () => {
            billingSwitch.classList.toggle('annual');
            const isAnnual = billingSwitch.classList.contains('annual');
            
            if (isAnnual) {
                if (pricePro) pricePro.textContent = '24';
                if (priceUnlimited) priceUnlimited.textContent = '49';
                if (periodPro) periodPro.textContent = '/mo (billed $288/yr)';
                if (periodUnlimited) periodUnlimited.textContent = '/mo (billed $588/yr)';
            } else {
                if (pricePro) pricePro.textContent = '29';
                if (priceUnlimited) priceUnlimited.textContent = '59';
                if (periodPro) periodPro.textContent = '/mo';
                if (periodUnlimited) periodUnlimited.textContent = '/mo';
            }
        });
    }

    // 6. FAQ Accordion
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        if (question) {
            question.addEventListener('click', () => {
                const isActive = item.classList.contains('active');
                faqItems.forEach(i => i.classList.remove('active'));
                if (!isActive) {
                    item.classList.add('active');
                }
            });
        }
    });

    // 7. Contact Form Demo Handler
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            submitBtn.disabled = true;
            submitBtn.innerHTML = '<span>Sending Message...</span>';

            setTimeout(() => {
                contactForm.innerHTML = `
                    <div style="text-align: center; padding: 40px 20px;">
                        <div style="width: 60px; height: 60px; background: rgba(16, 185, 129, 0.2); color: #10b981; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 20px auto;">
                            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
                        </div>
                        <h3 style="font-size: 1.5rem; font-weight: 800; margin-bottom: 10px;">Message Received!</h3>
                        <p style="color: #94a3b8; font-size: 0.95rem; margin-bottom: 24px;">Thank you for contacting Cue Central. A member of our team will respond to your inquiry within 24 hours.</p>
                        <a href="/" class="btn btn-primary btn-sm">Return Home</a>
                    </div>
                `;
            }, 900);
        });
    }
});

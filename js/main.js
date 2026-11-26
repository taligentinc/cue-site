/**
 * Cue Central - Marketing Site Interactivity
 * Church Music & Service Planning Platform
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

    // 3. Interactive Cue Card & Setlist Preview
    const timelineItems = document.querySelectorAll('.timeline-item');
    const stageSongTitle = document.querySelector('.stage-song-title');
    const stageSongDetails = document.querySelector('.stage-song-details');
    const stageTypeBadge = document.getElementById('stage-type-badge');
    const prompterStanza = document.querySelector('.prompter-stanza');
    const prompterCue = document.querySelector('.prompter-cue-line');
    const stageNextItem = document.getElementById('stage-next-item');

    const songData = {
        'prelude': {
            type: 'PRELUDE SET',
            title: 'Prelude Set: Morning Meditation',
            details: '<span>Assigned: Sarah Vance (Piano)</span> • <span>3 Hymns</span> • <span>Hymnal: Majesty</span>',
            stanza: '1. #124 Come, Thou Fount of Every Blessing<br>2. #318 Blessed Assurance<br>3. #405 Be Thou My Vision',
            cue: 'PDF Setlist Ready • 3 Hymnal Scans Linked',
            next: 'Next: Welcome & Opening Prayer'
        },
        'hymn1': {
            type: 'HYMN',
            title: 'Crown Him with Many Crowns',
            details: '<span>Congregational</span> • <span>Key of D</span> • <span>MAJ #242 • SSH #18</span>',
            stanza: 'Verses to Sing: 1, 2, 4<br>OOS Format: Crown Him with Many Crowns - #242 - vv. 1, 2, 4',
            cue: 'Last Sung: 14 weeks ago • Hymnal Scan PDF Attached',
            next: 'Next: Choir Opener — Standing on the Promises'
        },
        'choir': {
            type: 'CHOIR SPECIAL',
            title: 'Worthy Is The Lamb',
            details: '<span>Chancel Choir</span> • <span>Status: Active</span> • <span>Tag: Easter / Worship</span>',
            stanza: 'Attached Assets in S3 Vault:<br>• Full Score (PDF) &nbsp;• Piano Accompaniment (PDF)<br>• Director Reference Recording (Audio)',
            cue: 'Personal Setlist auto-selects your preferred voice/instrument PDF',
            next: 'Next: Offertory — Instrumental Solo'
        },
        'special': {
            type: 'SPECIAL MUSIC',
            title: 'It Is Well With My Soul',
            details: '<span>Vocal Trio</span> • <span>Confirmed via Request Link</span> • <span>Status: Active</span>',
            stanza: 'Submitted by Performer via Automated 6-Day Request Email<br>Linked Choir Library Entry: It Is Well (Trio Arr.)',
            cue: 'Schedule Flag: SPC • Conflict Check: All Members Available',
            next: 'Next: Morning Message — Pastor'
        },
        'closing': {
            type: 'HYMN',
            title: 'Blessed Assurance',
            details: '<span>Invitation / Closing</span> • <span>Key of D</span> • <span>MAJ #318</span>',
            stanza: 'Verses to Sing: 1, 3<br>Logged automatically to Hymnody Usage History when marked sung.',
            cue: '2-Up Printable Cue Card & QR Code Ready',
            next: 'End of Service Order'
        }
    };

    timelineItems.forEach(item => {
        item.addEventListener('click', () => {
            timelineItems.forEach(i => i.classList.remove('active'));
            item.classList.add('active');

            const id = item.getAttribute('data-song-id');
            const data = songData[id];
            if (data && stageSongTitle && prompterStanza) {
                if (stageTypeBadge) stageTypeBadge.textContent = data.type;
                stageSongTitle.textContent = data.title;
                stageSongDetails.innerHTML = data.details;
                prompterStanza.innerHTML = data.stanza;
                if (prompterCue) prompterCue.textContent = data.cue;
                if (stageNextItem) stageNextItem.textContent = data.next;
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
            title: 'Cue Central Studio: Plan Services & Track Hymnody',
            desc: 'Build Sunday AM, Sunday PM, and Wednesday service orders in minutes, pull scheduled specials automatically, and see which hymns are due for rotation.',
            features: [
                'Drag-and-drop Cue Card Builder with 16 item types and reusable service templates',
                'Dashboard metrics for Most Used, Dusting Off, and Never Sung hymns plus Untouched Specials',
                'Monthly Master Schedule for Pianists, Offertories, Choir Openers, and Special Music',
                '2-up printable Cue Cards with QR codes, custom print colors, and one-click Order of Service emails'
            ]
        },
        'accompanists': {
            title: 'Full-Screen Setlist PDF Viewer on Your Music Stand',
            desc: 'Accompanists build a personal PDF stack for any published service and turn pages hands-free with screen taps or Bluetooth foot pedals.',
            features: [
                'Full-screen PDF.js Setlist Viewer with left/right tap zones and ArrowLeft/ArrowRight pedal support',
                'Auto-matches your preferred hymnal and instrument/voice-part PDFs in one click',
                'Slide-down Cue Card drawer lets you check the full service order without leaving your score',
                'Curated Prelude Sets with hymn number sorting and nearby hymn suggestions'
            ]
        },
        'choirs': {
            title: 'Cue Central: Your Mobile Volunteer & Choir Portal',
            desc: 'Volunteers and choir members open the zero-install PWA to view upcoming assignments, manage blackout dates, and access sheet music and rehearsal audio.',
            features: [
                'Personal 30-day My Assignments view with automatic blackout date conflict alerts',
                'Submit Special Music titles directly from automated 6-day reminder emails—no login required',
                'Searchable Sheet Music & Specials library with PDF scores and director-uploaded audio tracks',
                'Web Push reminders 3 days before scheduled assignments'
            ]
        },
        'admins': {
            title: 'Granular Permissions, Custom Hymnals & OIDC SSO',
            desc: 'Configure your church workspace in Cue Central Studio with role presets, multiple hymnals, custom capacity rules, and optional single sign-on.',
            features: [
                '14 granular permissions and 4 built-in role presets (Director, Coordinator, Librarian, Volunteer)',
                'Multi-hymnal support with custom priority ordering, badge colors, and bulk ZIP/CSV import',
                'People, vocal/instrumental groups, pianist flags, and custom email blast lists',
                'Per-tenant OIDC Single Sign-On with automatic group-to-permission mapping'
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

    // 5. FAQ Accordion
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

    // 6. Contact Form Demo Handler
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const submitBtn = contactForm.querySelector('button[type="submit"]');
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

// ============================================
// BARQNOVA - COMPLETE JAVASCRIPT
// ============================================

(function() {
    'use strict';

    document.addEventListener('DOMContentLoaded', function() {
        initStickyHeader();
        initMobileMenu();
        initBackToTop();
        initCounterAnimation();
        initRevealOnScroll();
        initCustomCursor();
        initParticles();
        initHoverEffects();
        initScrollProgress();
        initServiceDetailPage();
        initChatBot();
        initFAQToggles();
    });

    function initStickyHeader() {
        const header = document.getElementById('header');
        if (!header) return;
        window.addEventListener('scroll', function() {
            header.classList.toggle('scrolled', window.scrollY > 50);
        });
    }

    function initMobileMenu() {
        const toggle = document.getElementById('mobileToggle');
        const nav = document.getElementById('nav');
        if (!toggle || !nav) return;
        toggle.addEventListener('click', function() {
            toggle.classList.toggle('active');
            nav.classList.toggle('active');
            document.body.style.overflow = nav.classList.contains('active') ? 'hidden' : '';
        });
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', function() {
                toggle.classList.remove('active');
                nav.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
    }

    function initBackToTop() {
        const backBtn = document.getElementById('backToTop');
        if (!backBtn) return;
        window.addEventListener('scroll', function() {
            backBtn.classList.toggle('visible', window.scrollY > 500);
        });
        backBtn.addEventListener('click', function() {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    function initCounterAnimation() {
        const counters = document.querySelectorAll('.counter');
        if (!counters.length) return;
        let animated = false;
        function animateCounters() {
            if (animated) return;
            animated = true;
            counters.forEach(counter => {
                const target = parseInt(counter.getAttribute('data-target'));
                let current = 0;
                const increment = target / 80;
                const updateCounter = () => {
                    current += increment;
                    if (current < target) {
                        counter.innerText = Math.floor(current);
                        requestAnimationFrame(updateCounter);
                    } else {
                        counter.innerText = target;
                    }
                };
                updateCounter();
            });
        }
        const observer = new IntersectionObserver((entries) => {
            if (entries[0].isIntersecting) {
                animateCounters();
                observer.disconnect();
            }
        }, { threshold: 0.3 });
        observer.observe(counters[0]);
    }

    function initRevealOnScroll() {
        const revealElements = document.querySelectorAll('.reveal');
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                }
            });
        }, { threshold: 0.1 });
        revealElements.forEach(el => observer.observe(el));
    }

    function initCustomCursor() {
        const cursor = document.querySelector('.cursor');
        const follower = document.querySelector('.cursor-follower');
        if (!cursor || !follower) return;
        document.addEventListener('mousemove', (e) => {
            cursor.style.transform = `translate(${e.clientX - 10}px, ${e.clientY - 10}px)`;
            follower.style.transform = `translate(${e.clientX - 20}px, ${e.clientY - 20}px)`;
        });
        const links = document.querySelectorAll('a, button, .btn, .service-card, .portfolio-card');
        links.forEach(link => {
            link.addEventListener('mouseenter', () => {
                cursor.style.transform = 'scale(1.5)';
                follower.style.transform = 'scale(1.5)';
            });
            link.addEventListener('mouseleave', () => {
                cursor.style.transform = 'scale(1)';
                follower.style.transform = 'scale(1)';
            });
        });
    }

    function initParticles() {
        const canvas = document.getElementById('particles-canvas');
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        let width = window.innerWidth;
        let height = window.innerHeight;
        let particles = [];
        
        function resizeCanvas() {
            width = window.innerWidth;
            height = window.innerHeight;
            canvas.width = width;
            canvas.height = height;
            initParticlesArray();
        }
        
        function initParticlesArray() {
            particles = [];
            const particleCount = Math.min(150, Math.floor(width * height / 10000));
            for (let i = 0; i < particleCount; i++) {
                particles.push({
                    x: Math.random() * width,
                    y: Math.random() * height,
                    radius: Math.random() * 3 + 1,
                    alpha: Math.random() * 0.5 + 0.2,
                    vx: (Math.random() - 0.5) * 0.5,
                    vy: (Math.random() - 0.5) * 0.3,
                });
            }
        }
        
        function drawParticles() {
            ctx.clearRect(0, 0, width, height);
            particles.forEach(p => {
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
                ctx.fillStyle = `rgba(99, 102, 241, ${p.alpha})`;
                ctx.fill();
                p.x += p.vx;
                p.y += p.vy;
                if (p.x < 0) p.x = width;
                if (p.x > width) p.x = 0;
                if (p.y < 0) p.y = height;
                if (p.y > height) p.y = 0;
            });
            requestAnimationFrame(drawParticles);
        }
        
        window.addEventListener('resize', resizeCanvas);
        resizeCanvas();
        drawParticles();
    }

    function initHoverEffects() {
        const cards = document.querySelectorAll('.service-card, .portfolio-card');
        cards.forEach(card => {
            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                const rotateX = (y - centerY) / 20;
                const rotateY = (centerX - x) / 20;
                card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-5px)`;
            });
            card.addEventListener('mouseleave', () => {
                card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
            });
        });
        
        const btns = document.querySelectorAll('.btn');
        btns.forEach(btn => {
            btn.addEventListener('mousemove', (e) => {
                const rect = btn.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                const moveX = (x - rect.width / 2) * 0.1;
                const moveY = (y - rect.height / 2) * 0.1;
                btn.style.transform = `translate(${moveX}px, ${moveY}px)`;
            });
            btn.addEventListener('mouseleave', () => {
                btn.style.transform = 'translate(0, 0)';
            });
        });
    }

    function initScrollProgress() {
        const progressBar = document.createElement('div');
        progressBar.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 0%;
            height: 3px;
            background: linear-gradient(135deg, #6366f1, #06b6d4, #00ff88);
            z-index: 10000;
            transition: width 0.1s ease;
        `;
        document.body.appendChild(progressBar);
        window.addEventListener('scroll', () => {
            const scrollTop = window.scrollY;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            const scrollPercent = (scrollTop / docHeight) * 100;
            progressBar.style.width = scrollPercent + '%';
        });
    }

    function initServiceDetailPage() {
        const urlParams = new URLSearchParams(window.location.search);
        const service = urlParams.get('service');
        
        if (service && document.getElementById('service-title')) {
            const serviceData = {
                web: {
                    title: 'Web Development', icon: 'fa-code', 
                    desc: 'We build custom, responsive, and SEO-optimized websites that drive conversions.',
                    features: ['Custom Design & Development', 'Mobile-Responsive Layouts', 'SEO-Optimized Code', 'E-commerce Solutions', 'CMS Integration', '24/7 Technical Support'],
                    price: '$1,500 - $10,000+', 
                    img: 'https://images.pexels.com/photos/1181244/pexels-photo-1181244.jpeg',
                    longDesc: 'Our web development service creates stunning, high-performance websites that engage visitors and convert them into customers. We use the latest technologies to ensure your site is fast, secure, and scalable.'
                },
                marketing: {
                    title: 'Digital Marketing', icon: 'fa-chart-line',
                    desc: 'Data-driven marketing campaigns that maximize your ROI across all platforms.',
                    features: ['PPC Campaigns', 'Social Media Advertising', 'Email Marketing', 'Retargeting Campaigns', 'Monthly Performance Reports'],
                    price: '$1,000 - $5,000/month',
                    img: 'https://images.pexels.com/photos/669612/pexels-photo-669612.jpeg',
                    longDesc: 'Our digital marketing experts create targeted campaigns that reach your ideal customers across Google, Facebook, Instagram, and more. We focus on measurable results and ROI.'
                },
                seo: {
                    title: 'SEO Optimization', icon: 'fa-search',
                    desc: 'Rank #1 on Google with our proven white-hat SEO strategies.',
                    features: ['Keyword Research & Strategy', 'On-Page & Technical SEO', 'Quality Link Building', 'Local SEO Optimization', 'Monthly SEO Audits'],
                    price: '$800 - $3,000/month',
                    img: 'https://images.pexels.com/photos/6804595/pexels-photo-6804595.jpeg',
                    longDesc: 'Get to the top of Google search results with our comprehensive SEO services. We use ethical, white-hat techniques that deliver sustainable long-term results.'
                },
                social: {
                    title: 'Social Media Management', icon: 'fa-instagram',
                    desc: 'Build engaged communities across Instagram, Facebook, LinkedIn, and TikTok.',
                    features: ['Content Strategy & Planning', 'Community Management', 'Analytics & Reporting', 'Paid Social Ads', 'Influencer Marketing'],
                    price: '$500 - $3,000/month',
                    img: 'https://images.pexels.com/photos/2885366/pexels-photo-2885366.jpeg',
                    longDesc: 'Grow your brand presence on social media with our expert management services. We create engaging content, interact with your audience, and drive meaningful engagement.'
                },
                content: {
                    title: 'Content Creation', icon: 'fa-pen-fancy',
                    desc: 'Engaging content that tells your brand story and converts readers.',
                    features: ['Blog Posts & Articles', 'Website Copywriting', 'Social Media Content', 'Email Newsletters', 'Case Studies'],
                    price: '$300 - $2,000/month',
                    img: 'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg',
                    longDesc: 'Compelling content that captures attention and drives action. Our team of professional writers creates SEO-optimized content that ranks and converts.'
                },
                email: {
                    title: 'Email Marketing', icon: 'fa-envelope',
                    desc: 'Automated campaigns that nurture leads and drive repeat sales.',
                    features: ['Email Campaign Strategy', 'Newsletter Design', 'Automation Workflows', 'A/B Testing', 'Analytics & Reporting'],
                    price: '$400 - $2,000/month',
                    img: 'https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg',
                    longDesc: 'Build strong relationships with your audience through strategic email marketing. Our automated campaigns nurture leads, increase engagement, and drive repeat purchases.'
                },
                ppc: {
                    title: 'PPC Advertising', icon: 'fa-ad',
                    desc: 'Google Ads, Facebook Ads, and retargeting campaigns that deliver measurable results.',
                    features: ['Google Ads Management', 'Facebook & Instagram Ads', 'Retargeting Campaigns', 'Landing Page Optimization', 'Monthly ROI Reports'],
                    price: '$800 - $5,000/month',
                    img: 'https://images.pexels.com/photos/2885347/pexels-photo-2885347.jpeg',
                    longDesc: 'Maximize your ROI with targeted PPC campaigns. We manage your ad spend efficiently to get the best possible return on investment.'
                },
                branding: {
                    title: 'Brand Identity', icon: 'fa-trademark',
                    desc: 'Logo design, brand guidelines, and visual identity systems that make you stand out.',
                    features: ['Logo Design', 'Brand Guidelines', 'Color Palette', 'Typography', 'Business Cards & Stationery'],
                    price: '$1,000 - $5,000',
                    img: 'https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg',
                    longDesc: 'Create a memorable brand that resonates with your target audience. Our branding experts develop cohesive visual identities that set you apart from competitors.'
                },
                video: {
                    title: 'Video Production', icon: 'fa-video',
                    desc: 'Professional videos, commercials, and motion graphics that captivate your audience.',
                    features: ['Explainer Videos', 'Product Demos', 'Commercials', 'Motion Graphics', 'Social Media Videos'],
                    price: '$1,000 - $10,000',
                    img: 'https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg',
                    longDesc: 'Engage your audience with professional video content. From explainer videos to product demos, we create compelling visual stories that drive results.'
                },
                analytics: {
                    title: 'Analytics & Insights', icon: 'fa-chart-pie',
                    desc: 'Data-driven decisions with custom reporting dashboards.',
                    features: ['Google Analytics Setup', 'Custom Dashboard Creation', 'Conversion Tracking', 'Monthly Reports', 'Actionable Insights'],
                    price: '$500 - $2,000/month',
                    img: 'https://images.pexels.com/photos/669612/pexels-photo-669612.jpeg',
                    longDesc: 'Make informed decisions with our analytics services. We provide custom dashboards and actionable insights to help you grow your business.'
                }
            };
            
            const data = serviceData[service];
            if (data) {
                document.getElementById('service-title').innerHTML = data.title;
                if(document.getElementById('service-title-name')) 
                    document.getElementById('service-title-name').innerHTML = data.title;
                document.getElementById('service-icon').className = `fas ${data.icon}`;
                document.getElementById('service-desc').textContent = data.desc;
                if(document.getElementById('service-long-desc'))
                    document.getElementById('service-long-desc').textContent = data.longDesc;
                document.getElementById('service-img').src = data.img;
                document.getElementById('service-price').innerHTML = data.price;
                
                const featuresList = document.getElementById('service-features');
                if(featuresList) {
                    featuresList.innerHTML = '';
                    data.features.forEach(f => {
                        const div = document.createElement('div');
                        div.className = 'feature-card';
                        div.innerHTML = `<img src="https://cdn-icons-png.flaticon.com/512/1055/1055666.png" alt="feature"><div><h4>${f}</h4><p style="color: var(--light-gray);">Premium service</p></div>`;
                        featuresList.appendChild(div);
                    });
                }
            }
        }
    }

    function initChatBot() {
        const chatToggle = document.getElementById('chatToggle');
        const chatWindow = document.getElementById('chatWindow');
        const closeChat = document.getElementById('closeChat');
        const sendChat = document.getElementById('sendChat');
        const chatInput = document.getElementById('chatInput');
        const chatMessages = document.getElementById('chatMessages');

        if(!chatToggle) return;

        chatToggle.addEventListener('click', () => {
            chatWindow.style.display = chatWindow.style.display === 'none' ? 'block' : 'none';
        });
        
        if(closeChat) {
            closeChat.addEventListener('click', () => {
                chatWindow.style.display = 'none';
            });
        }

        function addMessage(message, isUser = false) {
            const msgDiv = document.createElement('div');
            msgDiv.style.marginBottom = '1rem';
            msgDiv.style.textAlign = isUser ? 'right' : 'left';
            msgDiv.innerHTML = `<span style="background: ${isUser ? 'var(--primary)' : 'var(--glass)'}; padding: 0.5rem 1rem; border-radius: 15px; display: inline-block;">${message}</span>`;
            chatMessages.appendChild(msgDiv);
            chatMessages.scrollTop = chatMessages.scrollHeight;
        }

        if(sendChat) {
            sendChat.addEventListener('click', () => {
                const message = chatInput.value.trim();
                if (message) {
                    addMessage(message, true);
                    chatInput.value = '';
                    setTimeout(() => {
                        let reply = "Thanks for your message! Our team will get back to you shortly. For immediate assistance, please contact us at hello@barqnova.com";
                        if (message.toLowerCase().includes('price') || message.toLowerCase().includes('cost')) {
                            reply = "Our pricing starts at $1,500 for basic websites and goes up based on requirements. Would you like to schedule a free consultation to discuss your specific needs?";
                        } else if (message.toLowerCase().includes('time') || message.toLowerCase().includes('duration')) {
                            reply = "Project timelines typically range from 2-6 weeks depending on complexity. We'll provide a detailed timeline during our initial consultation.";
                        }
                        addMessage(reply, false);
                    }, 500);
                }
            });

            chatInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') sendChat.click();
            });
        }
    }

    function initFAQToggles() {
        document.querySelectorAll('.faq-item').forEach(item => {
            const question = item.querySelector('.faq-question');
            const answer = item.querySelector('.faq-answer');
            if(question && answer) {
                question.addEventListener('click', () => {
                    const isOpen = answer.style.maxHeight;
                    document.querySelectorAll('.faq-answer').forEach(a => a.style.maxHeight = null);
                    document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('active'));
                    if (!isOpen) {
                        answer.style.maxHeight = answer.scrollHeight + 'px';
                        item.classList.add('active');
                    }
                });
            }
        });
    }
})();

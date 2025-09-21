// DOM이 로드된 후 실행
document.addEventListener('DOMContentLoaded', function() {
    // 네비게이션 관련 기능
    initNavigation();
    
    // 스크롤 애니메이션
    initScrollAnimations();
    
    // 타이핑 애니메이션
    initTypingAnimation();
    
    // 스무스 스크롤
    initSmoothScroll();
    
    // 스크롤 진행률 표시
    initScrollProgress();
    
    // 프로젝트 카드 호버 효과
    initProjectHoverEffects();
    
    // 경력 타임라인 애니메이션
    initTimelineAnimation();
});

// 네비게이션 기능 초기화
function initNavigation() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    const navbar = document.querySelector('.navbar');

    // 햄버거 메뉴 토글
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }

    // 네비게이션 링크 클릭 시 메뉴 닫기
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (hamburger && navMenu) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });
    });

    // 스크롤 시 네비게이션 스타일 변경
    window.addEventListener('scroll', function() {
        if (navbar) {
            if (window.scrollY > 100) {
                navbar.style.backgroundColor = 'rgba(10, 10, 10, 0.95)';
            } else {
                navbar.style.backgroundColor = 'rgba(10, 10, 10, 0.85)';
            }
        }
    });

    // 현재 섹션에 따른 네비게이션 활성화
    window.addEventListener('scroll', updateActiveNavLink);
}

// 현재 섹션에 따른 네비게이션 링크 활성화
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
}

// 스크롤 애니메이션 초기화
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    // 애니메이션할 요소들 선택
    const animateElements = document.querySelectorAll('.about-text, .experience-item, .project-item, .contact-content');
    animateElements.forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });
}

// 타이핑 애니메이션
function initTypingAnimation() {
    const heroProfile = document.querySelector('.hero-profile-image');
    const heroGreeting = document.querySelector('.hero-greeting');
    const heroName = document.querySelector('.hero-name');
    const heroTitle = document.querySelector('.hero-title');
    const heroDescription = document.querySelector('.hero-description');

    if (heroProfile && heroGreeting && heroName && heroTitle && heroDescription) {
        // 초기 상태 설정
        heroProfile.style.opacity = '0';
        heroProfile.style.transform = 'scale(0.8)';
        heroGreeting.style.opacity = '0';
        heroName.style.opacity = '0';
        heroTitle.style.opacity = '0';
        heroDescription.style.opacity = '0';

        // 순차적으로 나타나기
        setTimeout(() => {
            heroProfile.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
            heroProfile.style.opacity = '1';
            heroProfile.style.transform = 'scale(1)';
        }, 200);

        setTimeout(() => {
            heroGreeting.style.transition = 'opacity 0.6s ease';
            heroGreeting.style.opacity = '1';
        }, 700);

        setTimeout(() => {
            heroName.style.transition = 'opacity 0.6s ease';
            heroName.style.opacity = '1';
        }, 1200);

        setTimeout(() => {
            heroTitle.style.transition = 'opacity 0.6s ease';
            heroTitle.style.opacity = '1';
        }, 1700);

        setTimeout(() => {
            heroDescription.style.transition = 'opacity 0.6s ease';
            heroDescription.style.opacity = '1';
        }, 2200);
    }
}

// 스무스 스크롤
function initSmoothScroll() {
    const navLinks = document.querySelectorAll('a[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 70; // 네비게이션 높이 고려
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// 스크롤 진행률 표시
function initScrollProgress() {
    const progressBar = document.createElement('div');
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 2px;
        background: linear-gradient(90deg, #64ffda, #1e3a8a);
        z-index: 10001;
        transition: width 0.1s ease;
    `;
    document.body.appendChild(progressBar);
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset;
        const docHeight = document.body.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        progressBar.style.width = scrollPercent + '%';
    });
}

// 프로젝트 카드 호버 효과
function initProjectHoverEffects() {
    const projectItems = document.querySelectorAll('.project-item');
    
    projectItems.forEach(item => {
        const projectImage = item.querySelector('.project-image .image-placeholder');
        const projectContent = item.querySelector('.project-content');
        
        if (projectImage && projectContent) {
            item.addEventListener('mouseenter', function() {
                projectImage.style.transform = 'scale(1.05)';
                projectContent.style.transform = 'translateY(-5px)';
            });
            
            item.addEventListener('mouseleave', function() {
                projectImage.style.transform = 'scale(1)';
                projectContent.style.transform = 'translateY(0)';
            });
        }
    });
}

// 경력 타임라인 애니메이션
function initTimelineAnimation() {
    const experienceItems = document.querySelectorAll('.experience-item');
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateX(0)';
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    experienceItems.forEach((item, index) => {
        item.style.opacity = '0';
        item.style.transform = 'translateX(-30px)';
        item.style.transition = `opacity 0.6s ease ${index * 0.2}s, transform 0.6s ease ${index * 0.2}s`;
        observer.observe(item);
    });
}

// 스크롤 시 히어로 섹션 패럴랙스 효과
function initParallaxEffect() {
    const hero = document.querySelector('.hero');
    
    if (hero) {
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;
            hero.style.transform = `translateY(${rate}px)`;
        });
    }
}

// 키보드 네비게이션 지원
document.addEventListener('keydown', function(e) {
    // ESC 키로 모바일 메뉴 닫기
    if (e.key === 'Escape') {
        const navMenu = document.querySelector('.nav-menu');
        const hamburger = document.querySelector('.hamburger');
        
        if (navMenu && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            if (hamburger) {
                hamburger.classList.remove('active');
            }
        }
    }
});

// 마우스 커서 효과 (선택사항)
function initCursorEffect() {
    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    cursor.style.cssText = `
        position: fixed;
        width: 20px;
        height: 20px;
        background-color: #64ffda;
        border-radius: 50%;
        pointer-events: none;
        z-index: 9999;
        opacity: 0.8;
        transition: transform 0.1s ease;
        display: none;
    `;
    document.body.appendChild(cursor);

    document.addEventListener('mousemove', function(e) {
        cursor.style.left = e.clientX - 10 + 'px';
        cursor.style.top = e.clientY - 10 + 'px';
        cursor.style.display = 'block';
    });

    document.addEventListener('mouseleave', function() {
        cursor.style.display = 'none';
    });

    // 호버 가능한 요소에 커서 효과
    const hoverElements = document.querySelectorAll('a, button, .project-item, .experience-item');
    hoverElements.forEach(element => {
        element.addEventListener('mouseenter', function() {
            cursor.style.transform = 'scale(1.5)';
            cursor.style.backgroundColor = '#e6f1ff';
        });
        
        element.addEventListener('mouseleave', function() {
            cursor.style.transform = 'scale(1)';
            cursor.style.backgroundColor = '#64ffda';
        });
    });
}

// 페이지 로드 완료 후 추가 초기화
window.addEventListener('load', function() {
    // 모든 이미지가 로드된 후 애니메이션 시작
    const heroSection = document.querySelector('.hero');
    if (heroSection) {
        heroSection.style.opacity = '1';
    }
    
    // 패럴랙스 효과 초기화
    initParallaxEffect();
    
    // 커서 효과 초기화 (데스크톱에서만)
    if (window.innerWidth > 768) {
        initCursorEffect();
    }
    
    // 콘솔에 환영 메시지
    console.log('%c🚀 김개발의 포트폴리오에 오신 것을 환영합니다!', 'color: #64ffda; font-size: 16px; font-weight: bold;');
    console.log('%c💻 함께 멋진 프로젝트를 만들어가요!', 'color: #e6f1ff; font-size: 14px;');
    console.log('%c📧 kim.developer@email.com', 'color: #8892b0; font-size: 12px;');
});

// 리사이즈 이벤트 처리
window.addEventListener('resize', function() {
    // 모바일에서 커서 효과 제거
    const cursor = document.querySelector('.custom-cursor');
    if (cursor) {
        if (window.innerWidth <= 768) {
            cursor.style.display = 'none';
        } else {
            cursor.style.display = 'block';
        }
    }
});

// 스크롤 이벤트 최적화
let ticking = false;

function updateOnScroll() {
    // 스크롤 관련 업데이트 로직
    updateActiveNavLink();
    
    ticking = false;
}

window.addEventListener('scroll', function() {
    if (!ticking) {
        requestAnimationFrame(updateOnScroll);
        ticking = true;
    }
});

// 프로젝트 링크 클릭 이벤트
document.addEventListener('click', function(e) {
    if (e.target.closest('.project-link')) {
        e.preventDefault();
        const link = e.target.closest('.project-link');
        const href = link.getAttribute('href');
        
        if (href && href !== '#') {
            // 실제 링크가 있다면 새 탭에서 열기
            window.open(href, '_blank');
        } else {
            // 링크가 없다면 알림 표시
            showNotification('프로젝트 링크가 준비 중입니다.', 'info');
        }
    }
});

// 알림 표시 함수
function showNotification(message, type = 'info') {
    // 기존 알림 제거
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // 새 알림 생성
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // 스타일 적용
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        padding: 1rem 2rem;
        border-radius: 4px;
        color: white;
        font-weight: 500;
        z-index: 10000;
        transform: translateX(400px);
        transition: transform 0.3s ease;
        max-width: 300px;
        word-wrap: break-word;
        font-family: 'Inter', sans-serif;
    `;
    
    if (type === 'success') {
        notification.style.background = 'linear-gradient(135deg, #10b981, #059669)';
    } else if (type === 'error') {
        notification.style.background = 'linear-gradient(135deg, #ef4444, #dc2626)';
    } else {
        notification.style.background = 'linear-gradient(135deg, #64ffda, #1e3a8a)';
    }
    
    document.body.appendChild(notification);
    
    // 애니메이션
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // 3초 후 제거
    setTimeout(() => {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 300);
    }, 3000);
}
document.addEventListener('DOMContentLoaded', () => {

    // --- [변수 선언] ---
    const introOverlay = document.getElementById('intro-overlay');
    const enterBtn = document.getElementById('enter-btn');
    const bgm = document.getElementById('bgm');
    const soundBtn = document.getElementById('sound-toggle');

    // 노래 제목 설정 (원하는 텍스트로 수정 가능)
    const songTitle = "🔊 프로미스나인(fromis_9) - Up And";
    let isPlaying = false;

    // --- [1] 인트로: 문 열기 ---
    enterBtn.addEventListener('click', () => {
        // 문 열리는 애니메이션
        introOverlay.classList.add('active');

        // 음악 재생 시도
        bgm.volume = 0.5; // 볼륨 50%
        bgm.play().then(() => {
            isPlaying = true;
            soundBtn.innerText = songTitle; // 재생되면 제목 표시
        }).catch(error => {
            console.log("자동 재생 차단: 사용자 터치 필요");
            isPlaying = false;
            soundBtn.innerText = "🔇 Music OFF";
        });

        // 1.5초 뒤 인트로 레이어 숨김 (클릭 방지)
        setTimeout(() => {
            introOverlay.style.visibility = 'hidden';
        }, 1500);
    });

    // --- [2] 소리 버튼 토글 (제목 표시 기능) ---
    soundBtn.addEventListener('click', () => {
        if (isPlaying) {
            bgm.pause();
            soundBtn.innerText = "🔇 Music OFF";
            isPlaying = false;
        } else {
            bgm.play();
            soundBtn.innerText = songTitle;
            isPlaying = true;
        }
    });

    // --- [3] 커스텀 마우스 커서 ---
    const cursor = document.querySelector('.cursor');

    if (cursor) {
        // 커서 이동
        document.addEventListener('mousemove', (e) => {
            cursor.style.left = e.clientX + 'px';
            cursor.style.top = e.clientY + 'px';
        });

        // 클릭 가능한 요소 위에서 커서 모양 변경
        const clickableElements = document.querySelectorAll('button, .card, a');
        clickableElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursor.style.transform = 'translate(-50%, -50%) scale(1.5)';
                cursor.innerText = '🐾'; // 발바닥
            });
            el.addEventListener('mouseleave', () => {
                cursor.style.transform = 'translate(-50%, -50%) scale(1)';
                cursor.innerText = '🌻'; // 해바라기씨
            });
        });
    }

    // --- [4] 스크롤 애니메이션 (요소 등장 효과) ---
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });

    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });

    // --- [5] 프로필 카드 클릭 이벤트 ---
    const profileCard = document.querySelector('.profile-card');
    const badge = document.querySelector('.badge');

    if (profileCard && badge) {
        profileCard.addEventListener('click', () => {
            profileCard.style.animation = 'shake 0.5s ease';
            badge.innerText = "히익! 깜짝이야! 🐹";
            badge.style.backgroundColor = "#8D6E63";
            setTimeout(() => {
                profileCard.style.animation = '';
            }, 500);
        });
    }
});
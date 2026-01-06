document.addEventListener('DOMContentLoaded', function() {
    // Set negara acak
    const countries = ["Jerman", "Italia", "Russia", "India", "Indonesia", "Malaysia", "Inggris", "Amerika"];
    const randomCountry = countries[Math.floor(Math.random() * countries.length)];
    document.getElementById('randomCountry').textContent = randomCountry;
    
    // Timer countdown
    let timeLeft = 60;
    const timerElement = document.getElementById('timer');
    const timerBar = document.getElementById('timerBar');
    
    const timerInterval = setInterval(function() {
        timeLeft--;
        timerElement.textContent = timeLeft;
        
        // Update progress bar
        const progressPercent = (timeLeft / 60) * 100;
        timerBar.style.width = progressPercent + '%';
        
        // Change color based on time
        if (timeLeft < 10) {
            timerBar.style.background = 'linear-gradient(90deg, #ff0000, #ff4444)';
            timerElement.style.color = '#ff0000';
            timerElement.style.textShadow = '0 0 10px #ff0000';
        } else if (timeLeft < 30) {
            timerBar.style.background = 'linear-gradient(90deg, #ffff00, #ffaa00)';
            timerElement.style.color = '#ffff00';
        }
        
        // Time's up
        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            document.getElementById('resultMessage').innerHTML = 
                '<p style="color:#ff0000;"><i class="fas fa-exclamation-triangle"></i> Waktu habis! Semua file telah "terhapus". Hahaha. Coba refresh halaman.</p>';
            document.getElementById('unlockBtn').disabled = true;
            document.getElementById('keyInput').disabled = true;
            
            // Add some dramatic effect
            document.body.style.animation = 'shake 0.5s';
            setTimeout(() => {
                document.body.style.animation = '';
            }, 500);
        }
    }, 1000);
    
    // Unlock button functionality
    document.getElementById('unlockBtn').addEventListener('click', function() {
        const keyInput = document.getElementById('keyInput').value;
        const resultMessage = document.getElementById('resultMessage');
        
        // Simple validation
        if (!keyInput || keyInput.length !== 6) {
            resultMessage.innerHTML = '<p style="color:#ff4444;"><i class="fas fa-times-circle"></i> KEY harus 6 digit! Coba lagi.</p>';
            return;
        }
        
        // "Correct" key (you can change this)
        const correctKey = "123456";
        
        if (keyInput === correctKey) {
            // Success
            clearInterval(timerInterval);
            resultMessage.innerHTML = '<p style="color:#00ff00;"><i class="fas fa-check-circle"></i> Berhasil! File-file lu "terdekripsi". Selamat, lu kabur dari prank ini.</p>';
            document.getElementById('unlockBtn').disabled = true;
            document.getElementById('keyInput').disabled = true;
            
            // Change timer to success
            timerElement.textContent = "TERBUKA";
            timerElement.style.color = '#00ff00';
            timerBar.style.width = '100%';
            timerBar.style.background = 'linear-gradient(90deg, #00ff00, #00aa00)';
            
            // Confetti effect
            createConfetti();
        } else {
            // Wrong key
            resultMessage.innerHTML = '<p style="color:#ff8800;"><i class="fas fa-exclamation-circle"></i> KEY salah! Coba tebak lagi. Hint: ' + correctKey + '</p>';
            
            // Shake animation
            document.getElementById('keyInput').style.animation = 'shake 0.5s';
            setTimeout(() => {
                document.getElementById('keyInput').style.animation = '';
            }, 500);
        }
    });
    
    // Enter key to submit
    document.getElementById('keyInput').addEventListener('keyup', function(event) {
        if (event.key === 'Enter') {
            document.getElementById('unlockBtn').click();
        }
    });
    
    // Full screen detection
    document.addEventListener('fullscreenchange', handleFullscreenChange);
    document.addEventListener('webkitfullscreenchange', handleFullscreenChange);
    
    function handleFullscreenChange() {
        const fullscreenNotice = document.getElementById('fullscreenNotice');
        if (document.fullscreenElement || document.webkitFullscreenElement) {
            fullscreenNotice.style.display = 'block';
        } else {
            fullscreenNotice.style.display = 'none';
        }
    }
    
    // Request full screen on load (might not work due to browser restrictions)
    function requestFullscreen() {
        const elem = document.documentElement;
        if (elem.requestFullscreen) {
            elem.requestFullscreen();
        } else if (elem.webkitRequestFullscreen) {
            elem.webkitRequestFullscreen();
        }
    }
    
    // Try to go fullscreen after a short delay
    setTimeout(() => {
        // requestFullscreen(); // Uncomment jika mau auto fullscreen
    }, 1000);
    
    // Confetti function
    function createConfetti() {
        const confettiCount = 100;
        const colors = ['#ff0000', '#00ff00', '#0000ff', '#ffff00', '#ff00ff', '#00ffff'];
        
        for (let i = 0; i < confettiCount; i++) {
            const confetti = document.createElement('div');
            confetti.style.position = 'fixed';
            confetti.style.width = '10px';
            confetti.style.height = '10px';
            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.borderRadius = Math.random() > 0.5 ? '50%' : '0';
            confetti.style.left = Math.random() * 100 + 'vw';
            confetti.style.top = '-10px';
            confetti.style.zIndex = '9999';
            confetti.style.opacity = '0.9';
            
            document.body.appendChild(confetti);
            
            // Animation
            const animation = confetti.animate([
                { transform: 'translateY(0) rotate(0deg)', opacity: 1 },
                { transform: `translateY(${window.innerHeight + 10}px) rotate(${Math.random() * 360}deg)`, opacity: 0 }
            ], {
                duration: Math.random() * 3000 + 2000,
                easing: 'cubic-bezier(0.215, 0.61, 0.355, 1)'
            });
            
            animation.onfinish = () => confetti.remove();
        }
    }
    
    // Add shake animation to CSS
    const style = document.createElement('style');
    style.textContent = `
        @keyframes shake {
            0%, 100% {transform: translateX(0);}
            10%, 30%, 50%, 70%, 90% {transform: translateX(-5px);}
            20%, 40%, 60%, 80% {transform: translateX(5px);}
        }
    `;
    document.head.appendChild(style);
});

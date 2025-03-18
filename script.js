document.addEventListener('DOMContentLoaded', function() {
    // Initialize particles.js
    particlesJS('particles-js', {
        "particles": {
            "number": {
                "value": 80,
                "density": {
                    "enable": true,
                    "value_area": 800
                }
            },
            "color": {
                "value": "#ffffff"
            },
            "shape": {
                "type": "circle"
            },
            "opacity": {
                "value": 0.5,
                "random": false
            },
            "size": {
                "value": 3,
                "random": true
            },
            "line_linked": {
                "enable": true,
                "distance": 150,
                "color": "#ffffff",
                "opacity": 0.4,
                "width": 1
            },
            "move": {
                "enable": true,
                "speed": 2,
                "direction": "none",
                "random": false,
                "straight": false,
                "out_mode": "out",
                "bounce": false
            }
        },
        "interactivity": {
            "detect_on": "canvas",
            "events": {
                "onhover": {
                    "enable": true,
                    "mode": "repulse"
                },
                "onclick": {
                    "enable": true,
                    "mode": "push"
                },
                "resize": true
            }
        },
        "retina_detect": true
    });

    // Countdown Timer
    const eventDate = new Date('2025-03-27T08:00:00+05:30').getTime();

    function updateCountdown() {
        const now = new Date().getTime();
        const distance = eventDate - now;

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        document.getElementById('countdown').innerHTML = `
            <div class="countdown-item">
                <span class="time-value">${days}</span>
                <span class="time-label">DAYS</span>
            </div>
            <div class="countdown-item">
                <span class="time-value">${hours}</span>
                <span class="time-label">HOURS</span>
            </div>
            <div class="countdown-item">
                <span class="time-value">${minutes}</span>
                <span class="time-label">MINUTES</span>
            </div>
            <div class="countdown-item">
                <span class="time-value">${seconds}</span>
                <span class="time-label">SECONDS</span>
            </div>
        `;

        if (distance < 0) {
            clearInterval(countdownTimer);
            document.getElementById('countdown').innerHTML = "EVENT HAS STARTED";
        }
    }

    const countdownTimer = setInterval(updateCountdown, 1000);
    updateCountdown();

    // Dynamic Team Members Form
    function adjustTeamFields() {
        const teamSize = document.getElementById('teamSize').value;
        const teamMembersSection = document.getElementById('teamMembersSection');
        teamMembersSection.innerHTML = '';

        if (teamSize > 1) {
            for (let i = 2; i <= teamSize; i++) {
                const memberSection = document.createElement('div');
                memberSection.className = 'form-section';
                memberSection.innerHTML = `
                    <div class="section-header">
                        <span class="section-number">0${i}</span>
                        <h2>TEAM MEMBER ${i}</h2>
                    </div>
                    <div class="form-group">
                        <input type="text" id="member${i}Name" name="Member ${i} Name" required>
                        <label for="member${i}Name">FULL NAME</label>
                        <div class="input-line"></div>
                    </div>
                    <div class="form-group">
                        <input type="text" id="member${i}USN" name="Member ${i} USN" required>
                        <label for="member${i}USN">USN</label>
                        <div class="input-line"></div>
                    </div>
                    <div class="form-group">
                        <input type="email" id="member${i}Email" name="Member ${i} Email" required>
                        <label for="member${i}Email">EMAIL</label>
                        <div class="input-line"></div>
                    </div>
                    <div class="form-group">
                        <input type="tel" id="member${i}Phone" name="Member ${i} Phone" required>
                        <label for="member${i}Phone">PHONE NUMBER</label>
                        <div class="input-line"></div>
                    </div>
                    <div class="form-group">
                        <select id="member${i}Semester" name="Member ${i} Semester" required>
                            <option value="">SELECT SEMESTER</option>
                            <option value="2">2nd Semester</option>
                            <option value="4">4th Semester</option>
                            <option value="6">6th Semester</option>
                            <option value="8">8th Semester</option>
                        </select>
                        <label for="member${i}Semester">SEMESTER</label>
                        <div class="input-line"></div>
                    </div>
                `;
                teamMembersSection.appendChild(memberSection);
            }
        }
    }

    // Form Submission Handler
    const form = document.getElementById('registrationForm');
    form.addEventListener('submit', async function(e) {
        e.preventDefault();

        const submitBtn = form.querySelector('.submit-btn');
        const originalBtnText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Submitting...';
        submitBtn.disabled = true;

        try {
            const formData = new FormData(form);
            const data = {};
            
            for (let [key, value] of formData.entries()) {
                data[key] = value.trim();
            }
            
            const response = await fetch('https://script.google.com/macros/s/AKfycbz3PD4oZTRnDbcFS183SY9ri1Qg15__K0bGXLXsqt263ihNxs5p1oxM4JKZfbunvm4E/exec', {
                method: 'POST',
                mode: 'no-cors',
                headers: {
                    'Content-Type': 'text/plain'
                },
                body: JSON.stringify(data)
            });

            showSuccessMessage();
            
        } catch (error) {
            console.error('Submission error:', error);
            showError('Registration failed. Please try again or contact support.');
        } finally {
            submitBtn.innerHTML = originalBtnText;
            submitBtn.disabled = false;
        }
    });

    function showSuccessMessage() {
        const form = document.getElementById('registrationForm');
        
        // Fade out animation for form
        form.style.opacity = '0';
        form.style.transform = 'translateY(20px)';
        form.style.transition = 'all 0.5s ease-out';
    
        setTimeout(() => {
            form.style.display = 'none';
            
            // Create success message container
            const successDiv = document.createElement('div');
            successDiv.className = 'success-container';
            successDiv.style.opacity = '0';
            successDiv.style.transform = 'translateY(-20px)';
            successDiv.style.transition = 'all 0.5s ease-out';
            
            // Generate unique registration ID
            const regId = `EPOCH${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
            const currentDate = new Date().toISOString().split('T')[0];
            
            successDiv.innerHTML = `
                <div class="success-icon">
                    <i class="fas fa-check-circle"></i>
                </div>
                
                <h2 class="success-title">Registration Successful!</h2>
                
                <p class="success-message">
                    🎉 Congratulations! Your journey to EPOCH 2025 begins here. 
                    Get ready for an incredible experience of innovation and technology! 🚀
                </p>
                
                <div class="confirmation-details">
                    <div class="detail-item">
                        <span class="detail-label">Registration ID</span>
                        <span class="detail-value">${regId}</span>
                    </div>
                    <div class="detail-item">
                        <span class="detail-label">Date</span>
                        <span class="detail-value">${currentDate}</span>
                    </div>
                    <div class="detail-item">
                        <span class="detail-label">Status</span>
                        <span class="detail-value">Confirmed</span>
                    </div>
                </div>
    
                <div class="whatsapp-link">
                    <p>Stay updated! Join our WhatsApp group:</p>
                    <a href="https://chat.whatsapp.com/YOUR_GROUP_LINK" 
                    target="_blank" 
                    class="whatsapp-button">
                    <i class="fab fa-whatsapp"></i> Join WhatsApp Group
                    </a>
                </div>
    
                <div class="contact-info">
                    <p>For any queries, contact our team:</p>
                    <div class="detail-item">
                    <span class="detail-label">
                    <i class="fas fa-phone"></i> Phone
                    </span>
                    <a href="tel:+919481627161" class="detail-value">
                    +91 9481627161
                    </a>
                </div>

                <div class="detail-item">
                    <span class="detail-label">
                    <i class="fas fa-envelope"></i> Email
                    </span>
                    <a href="mailto:epoch2025@bmsit.in" class="detail-value">
                    epoch2025@bmsit.in
                    </a>
                </div>
            </div>
            `;
    
            form.parentNode.insertBefore(successDiv, form.nextSibling);
            
            // Add animation classes after a short delay
            setTimeout(() => {
                successDiv.style.opacity = '1';
                successDiv.style.transform = 'translateY(0)';
                
                // Add shimmer effect
                const shimmer = document.createElement('div');
                shimmer.className = 'shimmer-effect';
                successDiv.appendChild(shimmer);
                
                // Add confetti effect
                if (typeof confetti === 'function') {
                    confetti({
                        particleCount: 100,
                        spread: 70,
                        origin: { y: 0.6 }
                    });
                }
            }, 100);
        }, 500);
    }
    
    function showError(message) {
        const errorMessage = document.createElement('div');
        errorMessage.className = 'error-message show';
        errorMessage.innerHTML = `
            <div class="error-content">
                <i class="fas fa-exclamation-circle"></i>
                <span>${message}</span>
            </div>
        `;
        document.body.appendChild(errorMessage);
        
        setTimeout(() => {
            errorMessage.remove();
        }, 5000);
    }

    // Initialize team fields
    document.getElementById('teamSize').addEventListener('change', adjustTeamFields);
    adjustTeamFields();

    // Verify spreadsheet setup on page load
    async function verifySpreadsheet() {
        try {
            const response = await fetch('https://script.google.com/macros/s/AKfycbz3PD4oZTRnDbcFS183SY9ri1Qg15__K0bGXLXsqt263ihNxs5p1oxM4JKZfbunvm4E/exec?action=verify', {
                method: 'GET',
                mode: 'no-cors'
            });
            console.log('Spreadsheet verification requested');
        } catch (error) {
            console.error('Error verifying spreadsheet:', error);
        }
    }

    // Call verification on page load
    verifySpreadsheet();
});
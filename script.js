document.addEventListener('DOMContentLoaded', function() {
    // Particles.js initialization
    particlesJS("particles-js", {
        particles: {
            number: { value: 80, density: { enable: true, value_area: 800 } },
            color: { value: "#ffffff" },
            shape: { type: "circle" },
            opacity: { value: 0.5, random: false },
            size: { value: 3, random: true },
            line_linked: { enable: true, distance: 150, color: "#ffffff", opacity: 0.4, width: 1 },
            move: { enable: true, speed: 6, direction: "none", random: false, straight: false, out_mode: "out", bounce: false }
        },
        interactivity: {
            detect_on: "canvas",
            events: {
                onhover: { enable: true, mode: "repulse" },
                onclick: { enable: true, mode: "push" },
                resize: true
            }
        },
        retina_detect: true
    });

    // Countdown Timer
    const countDownDate = new Date("March 27, 2025 08:00:00").getTime();
    
    function updateCountdown() {
        const now = new Date().getTime();
        const distance = countDownDate - now;
        
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
        document.getElementById("countdown").innerHTML = `
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
    }
    
    setInterval(updateCountdown, 1000);
    updateCountdown();

    // Form Handling
    const form = document.getElementById('registrationForm');
    
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
                        <input type="text" id="member${i}USN" name="Member ${i} USN" 
                               required pattern="1BY\\d{2}[A-Z]{2}\\d{3}">
                        <label for="member${i}USN">USN</label>
                        <div class="input-line"></div>
                    </div>
                    <div class="form-group">
                        <input type="email" id="member${i}Email" name="Member ${i} Email" required>
                        <label for="member${i}Email">EMAIL</label>
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

    document.getElementById('teamSize').addEventListener('change', adjustTeamFields);

    // Form Submission
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
                data[key] = value;
            }
    
            // Get current timestamp in UTC
            const now = new Date();
            const timestamp = now.toISOString().slice(0, 19).replace('T', ' ');
            data.timestamp = timestamp;
    
            console.log('Submitting data:', data);
    
            const response = await fetch('https://script.google.com/macros/s/AKfycbxBOm4jkoZNtCnyPsWhxC1coi3oGhiXxvnpmB-g_4qex7a5eG62wwvS8DdODukX0Xg2/exec', {
                method: 'POST',
                mode: 'no-cors',
                headers: {
                    'Content-Type': 'text/plain'
                },
                body: JSON.stringify(data)
            });
    
            console.log('Form submitted at:', timestamp);
            showSuccess();
            form.reset();
            adjustTeamFields();
            
        } catch (error) {
            console.error('Submission error:', error);
            showError('Form submission failed. Please try again or contact support.');
        } finally {
            submitBtn.innerHTML = originalBtnText;
            submitBtn.disabled = false;
        }
    });

    function showSuccess() {
        const successMessage = document.getElementById('successMessage');
        successMessage.classList.remove('hidden');
        successMessage.classList.add('show');
        setTimeout(() => {
            successMessage.classList.remove('show');
            successMessage.classList.add('hidden');
        }, 5000);
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

    // Verify spreadsheet setup on page load
    async function verifySpreadsheet() {
        try {
            const response = await fetch('https://script.google.com/macros/s/AKfycbxBOm4jkoZNtCnyPsWhxC1coi3oGhiXxvnpmB-g_4qex7a5eG62wwvS8DdODukX0Xg2/exec?action=verify', {
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
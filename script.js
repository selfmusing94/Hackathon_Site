document.addEventListener('DOMContentLoaded', function() {
    // Initialize particles.js
    particlesJS('particles-js', {
        particles: {
            number: {
                value: 80,
                density: { enable: true, value_area: 800 }
            },
            color: { value: '#00ffff' },
            shape: { type: 'circle' },
            opacity: {
                value: 0.5,
                random: true
            },
            size: {
                value: 3,
                random: true
            },
            line_linked: {
                enable: true,
                distance: 150,
                color: '#00ffff',
                opacity: 0.2,
                width: 1
            },
            move: {
                enable: true,
                speed: 2,
                direction: 'none',
                random: true,
                straight: false,
                out_mode: 'out',
                bounce: false
            }
        },
        interactivity: {
            detect_on: 'canvas',
            events: {
                onhover: { enable: true, mode: 'grab' },
                onclick: { enable: true, mode: 'push' },
                resize: true
            }
        },
        retina_detect: true
    });

    // Event Date and Countdown Timer
    const eventDateTime = new Date('2025-03-27T08:00:00+05:30'); // Event start time in IST
    const currentDateTime = new Date('2025-03-17 16:44:01'); // Current time from your input

    function updateCountdown() {
        const now = new Date();
        const distance = eventDateTime - now;

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        document.getElementById('countdown').innerHTML = `
            <div class="countdown-item">
                <span class="time-value">${days.toString().padStart(2, '0')}</span>
                <span class="time-label">DAYS</span>
            </div>
            <div class="countdown-item">
                <span class="time-value">${hours.toString().padStart(2, '0')}</span>
                <span class="time-label">HOURS</span>
            </div>
            <div class="countdown-item">
                <span class="time-value">${minutes.toString().padStart(2, '0')}</span>
                <span class="time-label">MINS</span>
            </div>
            <div class="countdown-item">
                <span class="time-value">${seconds.toString().padStart(2, '0')}</span>
                <span class="time-label">SECS</span>
            </div>
        `;

        if (distance < 0) {
            clearInterval(countdownInterval);
            document.getElementById('countdown').innerHTML = '<div class="live-badge">EVENT LIVE</div>';
        }
    }

    const countdownInterval = setInterval(updateCountdown, 1000);
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
                memberSection.className = 'form-section team-member-section';
                memberSection.innerHTML = `
                    <div class="section-header">
                        <span class="section-number">0${i+1}</span>
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

    form.addEventListener('submit', async function(e) {
        e.preventDefault();

        try {
            const formData = new FormData(form);
            formData.append('Timestamp', new Date('2025-03-17 16:44:01').toISOString());
            formData.append('SubmittedBy', 'selfmusing94');

            // Replace with your Google Apps Script URL
            const response = await fetch('https://script.google.com/macros/s/AKfycbxmKGkRnw8ZWXWEG9DXoi5fMafnltm_-cnapWKRzalZ2PCsS_dlDH3YBUOhg0ILm7JSDQ/exec', {
                method: 'POST',
                body: formData
            });

            if (response.ok) {
                showSuccess();
                form.reset();
            } else {
                throw new Error('Submission failed');
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Failed to submit. Please try again.');
        }
    });

    function showSuccess() {
        const successMessage = document.getElementById('successMessage');
        successMessage.classList.add('show');
        setTimeout(() => {
            successMessage.classList.remove('show');
        }, 5000);
    }
});
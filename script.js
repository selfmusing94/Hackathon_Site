document.addEventListener('DOMContentLoaded', function() {
    // Initialize particles.js
    particlesJS('particles-js', {
        "particles": {
            "number": { "value": 80, "density": { "enable": true, "value_area": 800 } },
            "color": { "value": "#ffffff" },
            "shape": { "type": "circle" },
            "opacity": { "value": 0.5, "random": false },
            "size": { "value": 3, "random": true },
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
                "onhover": { "enable": true, "mode": "repulse" },
                "onclick": { "enable": true, "mode": "push" },
                "resize": true
            }
        },
        "retina_detect": true
    });

    // Constants
    const REGISTRATION_LIMIT = 60;
    const SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbyHuhgk_5tm15U5V8G_67UhD3M__VP-3diCKpkSdd6iOqKeVdpin7jWqb7lJSX9jKFD/exec';
    let currentRegistrations = 0;

    // Countdown Timer
    const eventDate = new Date('2025-03-26T09:30:00+05:30').getTime();

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
    
    // Registration Count Checker
    async function checkRegistrationCount() {
        try {
            const response = await fetch(`${SCRIPT_URL}?action=getCount`);
            const data = await response.json();
    
            if (data.success) {
                currentRegistrations = data.count;
                updateRegistrationCounter(data.count, data.remaining);
    
                // Check if limit is reached
                if (currentRegistrations >= REGISTRATION_LIMIT) {
                    // Clear the interval when limit is reached
                    if (registrationCheckInterval) {
                        clearInterval(registrationCheckInterval);
                        console.log('Registration checks stopped - limit reached');
                    }
                    
                    // Immediately hide form and show closed message
                    const form = document.getElementById('registrationForm');
                    if (form && form.style.display !== 'none') {
                        showRegistrationClosed();
                    }
                    return false;
                }
                return true;
            } else {
                console.error('Failed to get registration count:', data.message);
                return false;
            }
        } catch (error) {
            console.error('Error checking registration count:', error);
            return false;
        }
    }
    
    // Modify the startRegistrationCountChecker function
    async function startRegistrationCountChecker() {
        // Check immediately when page loads
        const initialCheck = await checkRegistrationCount();
        
        // Check if we're already at or over the limit
        if (currentRegistrations >= REGISTRATION_LIMIT) {
            console.log('Registration limit already reached - showing closed message');
            showRegistrationClosed();
            return; // Don't start the interval
        }
        
        // Only start interval if we haven't reached the limit
        if (initialCheck) {
            registrationCheckInterval = setInterval(checkRegistrationCount, 30000);
            console.log('Registration check interval started');
        } else {
            console.log('Registration checks not started - max limit reached');
        }
    }

    function updateRegistrationCounter(count, remaining) {
        const counterElement = document.getElementById('registrationCounter');
        if (counterElement) {
            counterElement.innerHTML = `
                <div class="registration-status">
                    <div class="status-indicator">
                        <span class="current-count">${count}</span>
                        <span class="total-count">/ ${REGISTRATION_LIMIT}</span>
                    </div>
                    <div class="progress-bar">
                        <div class="progress" style="width: ${(count/REGISTRATION_LIMIT)*100}%"></div>
                    </div>
                    <div class="slots-remaining">
                        ${remaining} slots remaining
                    </div>
                </div>
            `;
        }
    }

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
                        <span class="section-number">0${i+1}</span>
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
                        <div class="input-line"></div>
                    </div>
                `;
                teamMembersSection.appendChild(memberSection);
            }
            // Re-run validation setup for new fields
        setupValidation();
        }
    }

    // Form Submission Handler
    const form = document.getElementById('registrationForm');
    form.addEventListener('submit', async function(e) {
        e.preventDefault();

        // Immediately update button state and show spinner
        const submitBtn = form.querySelector('.submit-btn');
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Submitting...';
        submitBtn.disabled = true;

        try {
            // Check registration limit before submission
            const isAvailable = await checkRegistrationCount();
            if (!isAvailable) {
                showError('Registration limit has been reached');
                showRegistrationClosed();
                return;
            }

            const formData = new FormData(form);
            const data = {};
        
            for (let [key, value] of formData.entries()) {
                data[key] = value.trim();
            }

            const response = await fetch(SCRIPT_URL, {
                method: 'POST',
                body: JSON.stringify(data)
            });

            const result = await response.json();
            if (result.success) {

                showSuccessMessage();
                // Update registration counter after successful submission
                checkRegistrationCount();
            } else {
                throw new Error(result.message || 'Submission failed');
            }

        } catch (error) {
            console.error('Submission error:', error);
            showError('Registration failed. Please try again or contact support.');
        } finally {
            // Restore button state after submission
            const submitBtn = form.querySelector('.submit-btn');
            submitBtn.innerHTML = 'Register';
            submitBtn.disabled = false;
        }
    });

    // You might also want to modify your showRegistrationClosed function to ensure it works
function showRegistrationClosed() {
    const form = document.getElementById('registrationForm');
    if (!form) return;
    
    // Only proceed if the form is still visible
    if (form.style.display !== 'none') {
        // Fade out animation for form
        form.style.opacity = '0';
        form.style.transform = 'translateY(20px)';
        form.style.transition = 'all 0.5s ease-out';

        setTimeout(() => {
            form.style.display = 'none';
        
            // Create slots filled message container
            const closedDiv = document.createElement('div');
            closedDiv.className = 'registration-closed';
            closedDiv.style.opacity = '0';
            closedDiv.style.transform = 'translateY(-20px)';
            closedDiv.style.transition = 'all 0.5s ease-out';
        
            closedDiv.innerHTML = `
                <div class="closed-content">
                    <div class="closed-icon">
                        <i class="fas fa-door-closed fa-4x"></i>
                    </div>
                    <h2 class="closed-title">Registration Closed</h2>
                    <div class="registration-status">
                        <div class="status-indicator">
                            <span class="current-count">${REGISTRATION_LIMIT}</span>
                            <span class="total-count">/ ${REGISTRATION_LIMIT}</span>
                        </div>
                        <div class="progress-bar">
                            <div class="progress" style="width: 100%"></div>
                        </div>
                    </div>
                    <p class="closed-message">
                        All slots have been filled! 🎫
                        <br>
                        Try filling the forms early next time.
                    </p>
                    <div class="contact-support">
                        <h3>For further information contact:</h3>
                        <div class="contact-details">
                            <a href="tel:+919481627161" class="contact-link">
                                <i class="fas fa-phone"></i> +91 9481627161
                            </a>
                            <a href="mailto:selfmusing9@gmail.com" class="contact-link">
                                <i class="fas fa-envelope"></i> selfmusing9@gmail.com
                            </a>
                        </div>
                    </div>
                </div>
            `;  

            // Only insert if it doesn't already exist
            if (!document.querySelector('.registration-closed')) {
                form.parentNode.insertBefore(closedDiv, form.nextSibling);
            
                // Fade in animation for closed message
                setTimeout(() => {
                    closedDiv.style.opacity = '1';
                    closedDiv.style.transform = 'translateY(0)';
                }, 100);
            }
        }, 500);
    }
}

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
            const regId = `NEURONOVA${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`;
            const currentDate = new Date().toISOString().split('T')[0];
            
            successDiv.innerHTML = `
                <div class="success-icon">
                    <i class="fas fa-check-circle"></i>
                </div>
                
                <h2 class="success-title">Registration Successful!</h2>
                
                <p class="success-message">
                    🎉 Congratulations! Your journey to NEURONOVA 2025 begins here. 
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
                    <a href="https://chat.whatsapp.com/Kf53muY2QUMHzqeaN0RDA9" 
                       target="_blank" 
                       class="whatsapp-button">
                       <i class="fab fa-whatsapp"></i> Join WhatsApp Group
                    </a>
                </div>
            `;
    
            form.parentNode.insertBefore(successDiv, form.nextSibling);
            
            setTimeout(() => {
                successDiv.style.opacity = '1';
                successDiv.style.transform = 'translateY(0)';
                
                // Add confetti effect if available
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

    // Initialize team fields handler
    document.getElementById('teamSize').addEventListener('change', adjustTeamFields);
    adjustTeamFields();

    // Verify spreadsheet setup and start monitoring
    async function initializeSystem() {
        try {
            // Verify spreadsheet setup
            const response = await fetch(`${SCRIPT_URL}?action=verify`);
            const data = await response.json();
            
            if (data.success) {
                console.log('Sheet verification successful');
                // Start registration monitoring
                startRegistrationCountChecker();
            } else {
                console.error('Sheet verification failed:', data.message);
                showError('System initialization failed. Please refresh the page or contact support.');
            }
        } catch (error) {
            console.error('Initialization error:', error);
            showError('Unable to connect to registration system. Please refresh the page.');
        }
    }

    // Add registration counter to the page if not exists
    function createRegistrationCounter() {
        if (!document.getElementById('registrationCounter')) {
            const counterDiv = document.createElement('div');
            counterDiv.id = 'registrationCounter';
            counterDiv.className = 'registration-counter';
            
            // Insert counter before the form
            const form = document.getElementById('registrationForm');
            form.parentNode.insertBefore(counterDiv, form);
        }
    }

    // Form validation functions
    function validatePhone(phone) {
        const phoneRegex = /^[6-9]\d{9}$/;
        return phoneRegex.test(phone);
    }

    function validateUSN(usn) {
        // USN format: 1BY__AI___ where _ represents digits
        const usnRegex = /^1BY\d{2}AI\d{3}$/;
        return usnRegex.test(usn.toUpperCase());
    }

    function validateEmail(email) {
        const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return emailRegex.test(email);
    }

    // Add input validation listeners
    function setupValidation() {
        const form = document.getElementById('registrationForm');
        
        // Phone number validation
        const phoneInputs = form.querySelectorAll('input[type="tel"]');
        phoneInputs.forEach(input => {
            input.addEventListener('input', function() {
                this.value = this.value.replace(/\D/g, ''); // Remove non-digits
                if (!validatePhone(this.value)) {
                    this.setCustomValidity('Please enter a valid 10-digit mobile number.');
                    this.classList.add('invalid');
                } else {
                    this.setCustomValidity('');
                    this.classList.remove('invalid');
                }
            });
        });
    
        // USN validation
        const usnInputs = form.querySelectorAll('input[id$="USN"]');
        usnInputs.forEach(input => {
            input.addEventListener('input', function() {
                this.value = this.value.toUpperCase(); // Convert to uppercase
                if (!validateUSN(this.value)) {
                    if (!this.value.includes('AI')) {
                        this.setCustomValidity('This event is only for AI&ML students. Please enter a valid USN with AI branch code.');
                    } else {
                        this.setCustomValidity('Please enter a valid USN in format 1BY__AI___ (e.g., 1BY20AI001)');
                    }
                    this.classList.add('invalid');
                } else {
                    this.setCustomValidity('');
                    this.classList.remove('invalid');
                }
                // Show immediate feedback for non-AI USNs
                if (this.value.length >= 7 && !this.value.includes('AI')) {
                    showError('This event is only for AI&ML students');
                }
            });
        });
    
        // Email validation
        const emailInputs = form.querySelectorAll('input[type="email"]');
        emailInputs.forEach(input => {
            input.addEventListener('input', function() {
                if (!validateEmail(this.value)) {
                    this.setCustomValidity('Please enter a valid email address');
                    this.classList.add('invalid');
                } else {
                    this.setCustomValidity('');
                    this.classList.remove('invalid');
                }
            });
        });
    
        // Add real-time validation styling
        const allInputs = form.querySelectorAll('input[type="tel"], input[id$="USN"], input[type="email"]');
        allInputs.forEach(input => {
            // Add styling for invalid fields
            input.addEventListener('invalid', function() {
                this.classList.add('invalid');
            });
            
            // Remove invalid styling when user starts typing
            input.addEventListener('input', function() {
                if (this.checkValidity()) {
                    this.classList.remove('invalid');
                }
            });
        });
    }
    
    // Add some CSS for invalid inputs
    const style = document.createElement('style');
    style.textContent = `
        input.invalid {
            border-color: #ff3860 !important;
            background-color: rgba(255, 56, 96, 0.05) !important;
        }
        input.invalid + .input-line {
            background-color: #ff3860 !important;
        }
        input.invalid:focus + .input-line {
            background-color: #ff3860 !important;
        }
    `;
    document.head.appendChild(style);

    // Function to check if event date has passed
    function checkEventDate() {
        const now = new Date().getTime();
        if (now >= eventDate) {
            showError('Registration period has ended');
            showRegistrationClosed();
            return false;
        }
        return true;
    }

    // Optional: Add this to force check registration status
    function forceCheckRegistrationStatus() {
        checkRegistrationCount().then(status => {
            if (!status || currentRegistrations >= REGISTRATION_LIMIT) {
                showRegistrationClosed();
            }
        });
    }

    // Initialize everything
    async function initialize() {
        if (!checkEventDate()) return;
        
        createRegistrationCounter();
        setupValidation();
        await initializeSystem();
        // Force check registration status on page load
        forceCheckRegistrationStatus();
    }

    // Start initialization
    initialize();

});

document.addEventListener('DOMContentLoaded', function() {
    // Function to check if element is in viewport
    function isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }

    // Function to create confetti
    function createConfetti(problemStatementCard) {
        const colors = ['#FFD700', '#C0C0C0', '#CD7F32', '#582BFF', '#D853FF'];
        const confettiCount = 100;

        for (let i = 0; i < confettiCount; i++) {
            const confetti = document.createElement('div');
            confetti.className = 'confetti';
            
            // Random properties
            const color = colors[Math.floor(Math.random() * colors.length)];
            const opacity = Math.random() * 0.8 + 0.2;
            const rotation = Math.random() * 360;
            const delay = Math.random() * 3;
            
            confetti.style.cssText = `
                --color: ${color};
                --opacity: ${opacity};
                --rotation: ${rotation}deg;
                left: ${Math.random() * 100}%;
                animation: confettiFall ${2 + Math.random() * 2}s linear ${delay}s forwards;
            `;
            
            problemStatementCard.appendChild(confetti);
            
            // Remove confetti after animation
            setTimeout(() => confetti.remove(), 5000 + delay * 1000);
        }
    }

    // Function to reveal winners
    function revealWinners(problemStatementCard) {
        const winners = problemStatementCard.querySelectorAll('.winner-card');
        winners.forEach(winner => {
            if (winner.classList.contains('third')) {
                setTimeout(() => {
                    winner.classList.add('revealed');
                }, 2000);
            }
            if (winner.classList.contains('second')) {
                setTimeout(() => {
                    winner.classList.add('revealed');
                }, 2000);
            }
            if (winner.classList.contains('first')) {
                setTimeout(() => {
                    winner.classList.add('revealed');
                    createConfetti(problemStatementCard);
                }, 2000);
            }
        });
    }

    // Intersection Observer for triggering animations
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
                entry.target.classList.add('animated');
                revealWinners(entry.target);
            }
        });
    }, {
        threshold: 0.2
    });

    // Observe each problem statement card
    document.querySelectorAll('.ps-card').forEach(card => {
        observer.observe(card);
    });
});
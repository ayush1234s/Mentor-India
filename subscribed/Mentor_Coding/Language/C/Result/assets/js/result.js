    // Generate random security PIN
    function generateSecurityPin() {
        return Math.floor(1000 + Math.random() * 9000);
    }

    // Set initial security PIN
    document.getElementById('securityPin').value = generateSecurityPin();

    // Refresh security PIN
    document.getElementById('refreshPin').addEventListener('click', function() {
        document.getElementById('securityPin').value = generateSecurityPin();
    });

    // Handle form submission
    document.getElementById('loginForm').addEventListener('submit', function(e) {
        e.preventDefault();

        const mentorId = document.getElementById('mentorId').value;
        const password = document.getElementById('password').value;
        const pin = document.getElementById('pin').value;
        const securityPin = document.getElementById('securityPin').value;

        // Show loader
        document.getElementById('loader').classList.remove('hidden');

        // Check credentials
        const validCredentials = {
            'MLT840529': '20030625',
            'MLT852478': '20040818'
        };

        if (validCredentials[mentorId] === password && pin === securityPin) {
            // Simulate delay and redirect
            setTimeout(() => {
                window.location.href = `User-Result/${mentorId}.php.htm`;
            }, 1500);
        } else {
            // Hide loader and show error popup after a short delay
            setTimeout(() => {
                document.getElementById('loader').classList.add('hidden');
                document.getElementById('errorPopup').classList.remove('hidden');
            }, 500);
        }
    });

    // Close error popup
    document.getElementById('closePopup').addEventListener('click', function() {
        document.getElementById('errorPopup').classList.add('hidden');
    });
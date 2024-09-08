document.addEventListener('DOMContentLoaded', function () {
    const profileData = JSON.parse(localStorage.getItem('profileData'));
    const profileBadge = document.getElementById('profile-badge');
    const profileName = document.getElementById('profile-name');
    const profileSetupPopup = document.getElementById('profile-setup-popup');
    const welcomeMessage = document.getElementById('welcomeMessage');
    const iconElement = document.createElement('i'); // Create icon element for the greeting

    if (profileData) {
        // Set profile badge and name if data exists
        profileBadge.src = profileData.photo;
        profileName.textContent = profileData.name;

        // Set welcome message with name and typing effect
        setWelcomeMessage(profileData.name);
    } else {
        // Show profile setup popup if data does not exist
        profileSetupPopup.classList.remove('hidden');
    }

    // Function to set welcome message with typing effect
    function setWelcomeMessage(name) {
        const now = new Date();
        const hour = now.getHours();
        let greeting = '';

        // Determine the time of day and appropriate icon
        if (hour >= 5 && hour < 12) {
            greeting = `Good Morning, ${name}!`;
            iconElement.className = 'fas fa-sun text-yellow-500'; // Morning sun icon
        } else if (hour >= 12 && hour < 18) {
            greeting = `Good Afternoon, ${name}!`;
            iconElement.className = 'fas fa-sun text-orange-500'; // Afternoon sun icon
        } else if (hour >= 18 && hour < 21) {
            greeting = `Good Evening, ${name}!`;
            iconElement.className = 'fas fa-cloud-sun text-purple-500'; // Evening sun-cloud icon
        } else {
            greeting = `Good Night, ${name}!`;
            iconElement.className = 'fas fa-moon text-blue-500'; // Night moon icon
        }

        // Clear any existing text before starting the typing effect
        welcomeMessage.innerHTML = '';

        // Add the icon to the welcome message
        welcomeMessage.appendChild(iconElement);

        // Start the typing effect for the message
        typeMessage(greeting);
    }

    // Function to create a typing effect
    function typeMessage(text) {
        let index = 0;

        function type() {
            if (index < text.length) {
                welcomeMessage.innerHTML += text.charAt(index);
                index++;
                setTimeout(type, 100); // Delay between each character
            }
        }

        type(); // Start typing the message
    }

    // Handle profile setup form submission
    document.getElementById('profile-setup-form').addEventListener('submit', function (e) {
        e.preventDefault();

        const fullName = document.getElementById('full-name').value;
        const profilePhotoInput = document.getElementById('profile-photo');
        const profilePhotoFile = profilePhotoInput.files[0];

        if (profilePhotoFile) {
            const reader = new FileReader();

            reader.onload = function (e) {
                const profilePhoto = e.target.result;

                // Save profile data to localStorage
                const profileData = {
                    name: fullName,
                    photo: profilePhoto
                };
                localStorage.setItem('profileData', JSON.stringify(profileData));

                // Set profile badge and name
                profileBadge.src = profilePhoto;
                profileName.textContent = fullName;

                // Set welcome message with typing effect
                setWelcomeMessage(fullName);

                // Hide profile setup popup
                profileSetupPopup.classList.add('hidden');
            };

            reader.readAsDataURL(profilePhotoFile);
        }
    });

    // Handle logout
    document.getElementById('logout').addEventListener('click', function () {
        localStorage.removeItem('profileData');
        location.reload(); // Reload the page after logout
    });
});

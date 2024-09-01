document.addEventListener('DOMContentLoaded', function () {
    // Check if profile data exists in localStorage
    const profileData = JSON.parse(localStorage.getItem('profileData'));
    const profileBadge = document.getElementById('profile-badge');
    const profileName = document.getElementById('profile-name');
    const profileSetupPopup = document.getElementById('profile-setup-popup');

    if (profileData) {
        // Set profile badge and name if data exists
        profileBadge.src = profileData.photo;
        profileName.textContent = profileData.name;
    } else {
        // Show profile setup popup if data does not exist
        profileSetupPopup.classList.remove('hidden');
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
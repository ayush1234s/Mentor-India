const content = document.getElementById('content');
        const noInternetPopup = document.getElementById('noInternetPopup');
        const internetConnectedPopup = document.getElementById('internetConnectedPopup');

        function showNoInternetPopup() {
            noInternetPopup.classList.remove('hidden');
            content.classList.add('disabled-page');
        }

        function hideNoInternetPopup() {
            noInternetPopup.classList.add('hidden');
            content.classList.remove('disabled-page');
        }

        function showInternetConnectedPopup() {
            internetConnectedPopup.classList.remove('hidden');
            setTimeout(() => {
                internetConnectedPopup.classList.add('hidden');
            }, 2000);
        }

        function checkInternetConnection() {
            if (!navigator.onLine) {
                showNoInternetPopup();
            } else {
                hideNoInternetPopup();
                showInternetConnectedPopup();
            }
        }

        window.addEventListener('online', () => {
            hideNoInternetPopup();
            showInternetConnectedPopup();
        });

        window.addEventListener('offline', showNoInternetPopup);

        // Initial check
        checkInternetConnection();
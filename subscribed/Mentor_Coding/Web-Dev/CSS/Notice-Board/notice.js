 // JavaScript to handle the notification request and notifications
 document.getElementById('notificationBell').addEventListener('click', () => {
    if ('Notification' in window) {
        Notification.requestPermission().then(permission => {
            if (permission === 'granted') {
                new Notification('Mentor India Notice Board', {
                    body: 'You have successfully subscribed to notifications!',
                    icon: 'https://mentor-portal.netlify.app/assets/img/favicon.png' // Replace with your icon URL
                });
            }
        });
    }
});

// Example of updating notices with notifications
function showNewNoticeNotification(notice) {
    if ('Notification' in window && Notification.permission === 'granted') {
        new Notification('New Notice Update', {
            body: notice,
            icon: 'https://mentor-portal.netlify.app/assets/img/favicon.png' // Replace with your icon URL
        });
    }
}

// Simulate new notice updates from the server
setTimeout(() => {
    const newNotice = "New HTML5 Tutorial uploaded in the Recorded Class Section.";
    showNewNoticeNotification(newNotice);
    const ul = document.querySelector('ul');
    const li = document.createElement('li');
    li.className = 'text-gray-700';
    li.textContent = newNotice;
    ul.appendChild(li);
}, 10000); // Example: New notice after 10 seconds
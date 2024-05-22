//Para já não está funcional! Ver quando as iniciativas no back-office estiverem a funcionar corretamente.


// Function to load notifications
function loadNotifications() {
    const notifications = JSON.parse(localStorage.getItem('notifications')) || [];
    const notificationList = document.getElementById('notificationList');
    const notificationCount = document.getElementById('notificationCount');
    
    notificationList.innerHTML = '';
    
    notifications.forEach(notification => {
        const li = document.createElement('li');
        li.innerHTML = `
            <div class="notification-item d-flex justify-content-between align-items-center">
                <a class="dropdown-item" href="#">${notification.message}</a>
                <i class="bi-x remove-icon" data-timestamp="${notification.timestamp}"></i>
            </div>
        `;
        notificationList.appendChild(li);
    });
    
    notificationCount.innerText = notifications.length;

    // Attach event listeners to remove icons
    document.querySelectorAll('.remove-icon').forEach(icon => {
        icon.addEventListener('click', function() {
            const timestamp = this.getAttribute('data-timestamp');
            removeNotification(timestamp);
        });
    });
}

// Function to remove a notification
function removeNotification(timestamp) {
    let notifications = JSON.parse(localStorage.getItem('notifications')) || [];
    notifications = notifications.filter(notification => notification.timestamp != timestamp);
    localStorage.setItem('notifications', JSON.stringify(notifications));
    loadNotifications();

    // Trigger a storage event manually (for cross-tab synchronization)
    localStorage.setItem('trigger', JSON.stringify({ action: 'remove_notification' }));
}

// Load notifications when the page loads
document.addEventListener('DOMContentLoaded', loadNotifications);

// Listen for storage events
window.addEventListener('storage', function(event) {
    if (event.key === 'trigger') {
        loadNotifications();
    }
});

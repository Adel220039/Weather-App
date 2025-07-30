// User authentication script for user-auth.html
document.addEventListener('DOMContentLoaded', function() {
    const logoutBtn = document.getElementById('logout-btn');
    const userNameSpan = document.getElementById('user-name');

    // Check session and display user info
    async function checkSession() {
        try {
            const response = await fetch('/api/session', {
                method: 'GET',
                credentials: 'include'
            });

            if (response.ok) {
                const sessionData = await response.json();
                if (sessionData.isAuthenticated && sessionData.sessionData.userName) {
                    userNameSpan.textContent = `Welcome, ${sessionData.sessionData.userName}!`;
                } else {
                    // Not authenticated, redirect to auth page
                    window.location.href = '/auth';
                }
            } else {
                // Session check failed, redirect to auth page
                window.location.href = '/auth';
            }
        } catch (error) {
            console.error('Session check error:', error);
            window.location.href = '/auth';
        }
    }

    // Logout functionality
    logoutBtn.addEventListener('click', async function() {
        try {
            const response = await fetch('/auth/logout', {
                method: 'GET',
                credentials: 'include'
            });

            if (response.ok) {
                console.log('Logged out successfully');
                window.location.href = '/auth';
            } else {
                console.error('Logout failed');
            }
        } catch (error) {
            console.error('Logout error:', error);
        }
    });

    // Check session on page load
    checkSession();
}); 



const profileBtn = document.querySelector('.profile');
const profileSetion = document.querySelector('.profile-setion');

profileBtn.addEventListener('click', ()=>{
    if(profileSetion.style.display === 'none'){
        profileSetion.style.display = 'flex'
    }else{
        profileSetion.style.display = 'none'
    }
})
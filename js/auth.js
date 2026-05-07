// Registration Logic
document.getElementById('registerForm')?.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const name = document.getElementById('regName').value;
    const email = document.getElementById('regEmail').value;
    const category = document.getElementById('regCat').value;
    const pass = document.getElementById('regPass').value;

    const userData = { name, email, category, pass };

    // ब्राउझरच्या मेमरीमध्ये डेटा सेव्ह करणे (Database ऐवजी)
    localStorage.setItem('user_' + email, JSON.stringify(userData));
    
    alert('नोंदणी यशस्वी! आता लॉगिन करा.');
    window.location.href = 'login.html';
});

// Login Logic
document.getElementById('loginForm')?.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const email = document.getElementById('logEmail').value;
    const pass = document.getElementById('logPass').value;
    
    const storedData = localStorage.getItem('user_' + email);

    if (storedData) {
        const user = JSON.parse(storedData);
        if (user.pass === pass) {
            // लॉगिन यशस्वी झाल्यावर सेशन सेट करणे
            localStorage.setItem('currentUser', JSON.stringify(user));
            window.location.href = 'dashboard.html';
        } else {
            alert('चुकीचा पासवर्ड!');
        }
    } else {
        alert('या ईमेलवर खाते सापडले नाही!');
    }
});
      

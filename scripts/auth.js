const subSin = document.querySelector('.sub-sin');

subSin.addEventListener('click' ,async (e)=>{
    e.preventDefault()
    const username = document.querySelector('.name').value;
    const email = document.querySelector('.email').value;
    const password = document.querySelector('.password').value;
    
    const registerForm = document.querySelector('.sign-up');
    
    try {
        const backend = 'http://localhost:3000/auth/register';
        const response = await fetch(backend , {
            method:'POST',
            headers:{
                'Content-type' : 'application/json'
            },
            body:JSON.stringify({
                username :username,
                email : email,
                password : password
            })
        })

        if(response.status === 201){
            // Registration successful, redirect to user-auth.html
            window.location.href = '/user-auth.html';
            return;
        } else if (response.status === 400) {
            const errorData = await response.json();
            const errorMassage = errorData.error || 'All fields are required.';
            removeBefore(errorMassage, registerForm);
        } else if (response.status === 409) {
            const errorData = await response.json();
            const errorMassage = errorData.error || 'Email already registered.';
            removeBefore(errorMassage, registerForm);
        } else {
            const errorMassage = 'Registration failed. Please try again.';
            removeBefore(errorMassage, registerForm);
        }
    } catch(error) {
        console.log('Network error:', error);
        const errorMassage = 'Network error. Please check your connection and try again.';
        removeBefore(errorMassage, registerForm);
    }
})


   function removeBefore(errorMassage, formElement){

        const existingDivs = document.querySelectorAll('.error');
        existingDivs.forEach(existingDiv => {
            existingDiv.textContent ='';
        });
        
        const errorDiv = formElement.querySelector('.error');
        if (errorDiv) {
            errorDiv.textContent = errorMassage;
            errorDiv.style.display = 'block'
        }
       
   }

const subLog = document.querySelector('.sub-log');

subLog.addEventListener('click' ,async (e)=>{
    e.preventDefault()
    const email = document.querySelector('.email-log').value;
    const password = document.querySelector('.password-log').value;
    const backend = 'http://localhost:3000/auth/login';

    try{
    const response = await fetch(backend , {
    method:'POST',
    headers:{
        'Content-type' : 'application/json'
    },
    body:JSON.stringify({
        email : email,
        password : password
    })
    })

    const loginForm = document.querySelector('.login');
    if(response.status === 200){
        // Login successful, redirect to user-auth.html
        window.location.href = '/user-auth.html';
        return;
    }else if (response.status === 400){
        const errorData = await response.json();
        const errorMassage = errorData.error || 'Password is incorrect';
        removeBefore(errorMassage, loginForm);
    }else if(response.status === 404){
        const errorData = await response.json();
        const errorMassage = errorData.error || 'User not found';
        removeBefore(errorMassage, loginForm);
    }else {
        const errorMassage = 'Login failed. Please try again.';
        removeBefore(errorMassage, loginForm);
    }

    }catch(error){
    console.log('Network error:', error);
    const errorMassage = 'Network error. Please check your connection and try again.';
    removeBefore(errorMassage, loginForm);
    }
    
})
 function  activeForm(formID){
    document.querySelectorAll('.active').forEach(form=>{
        form.classList.remove('active')
    })

    document.querySelector(formID).classList.add('active')
}

// Check URL parameters on page load
document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const formType = urlParams.get('form');
    
    if (formType === 'signup') {
        // Small delay to ensure DOM is fully loaded
        setTimeout(() => {
            activeForm('.sign-up');
        }, 100);
    }
});
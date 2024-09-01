
(function ($) {
    "use strict";

    
    /*==================================================================
    [ Validate ]*/
    var input = $('.validate-input .input100');

    $('.validate-form').on('submit',function(){
        var check = true;

        for(var i=0; i<input.length; i++) {
            if(validate(input[i]) == false){
                showValidate(input[i]);
                check=false;
            }
        }

        return check;
    });


    $('.validate-form .input100').each(function(){
        $(this).focus(function(){
           hideValidate(this);
        });
    });

    function validate (input) {
        if($(input).attr('type') == 'email' || $(input).attr('name') == 'email') {
            if($(input).val().trim().match(/^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{1,5}|[0-9]{1,3})(\]?)$/) == null) {
                return false;
            }
        }
        else {
            if($(input).val().trim() == ''){
                return false;
            }
        }
    }

    function showValidate(input) {
        var thisAlert = $(input).parent();

        $(thisAlert).addClass('alert-validate');
    }

    function hideValidate(input) {
        var thisAlert = $(input).parent();

        $(thisAlert).removeClass('alert-validate');
    }
    
    

})(jQuery);


// script of log-reg//
 // Function to get the user's IP address
 async function getUserIpAddress() {
    try {
        const response = await fetch('https://api.ipify.org?format=json');
        const data = await response.json();
        return data.ip;
    } catch (error) {
        console.error('Error fetching IP address:', error);
        return null;
    }
}

// Function to set the phone number in local storage
function setPhoneNumberInLocalStorage() {
    const phoneNumberInput = document.getElementById('loginPhoneNumber');
    localStorage.setItem('phoneNumber', phoneNumberInput.value);
}

// Function to autofill the phone number from local storage
function autofillPhoneNumber() {
    const phoneNumberInput = document.getElementById('loginPhoneNumber');
    const storedPhoneNumber = localStorage.getItem('phoneNumber');

    if (storedPhoneNumber) {
        phoneNumberInput.value = storedPhoneNumber;
    }
}

// Function to set the last visited path in local storage
function setLastVisitedPath(path) {
    localStorage.setItem('lastVisitedPath', path);
}

// Function to get the last visited path from local storage
function getLastVisitedPath() {
    return localStorage.getItem('lastVisitedPath');
}

// Function to set the IP address in local storage
function setIpAddress(ip) {
    localStorage.setItem('userIpAddress', ip);
}

// Function to get the IP address from local storage
function getIpAddress() {
    return localStorage.getItem('userIpAddress');
}

// Attach event listeners to save and autofill the phone number
const phoneNumberInput = document.getElementById('loginPhoneNumber');
phoneNumberInput.addEventListener('input', setPhoneNumberInLocalStorage);
window.addEventListener('load', async () => {
    autofillPhoneNumber();

    const userIp = await getUserIpAddress();
    const storedIp = getIpAddress();
    const lastVisitedPath = getLastVisitedPath();

    if (userIp && storedIp && userIp === storedIp && lastVisitedPath) {
        window.location.href = lastVisitedPath;
    }
});

// Check if user data is stored in local storage
const userData = JSON.parse(localStorage.getItem("userData"));

if (userData) {
    // User is registered, show login form by default
    document.getElementById("registration-form").style.display = "none";
    document.getElementById("login-form").style.display = "block";
} else {
    // User is not registered, show registration form by default
    document.getElementById("registration-form").style.display = "block";
    document.getElementById("login-form").style.display = "none";
}

// Handle registration
document.getElementById("register-button").addEventListener("click", async function (event) {
    event.preventDefault(); // Prevent the form from submitting

    // Get values from the registration form
    const name = document.querySelector("#registration-form input[name='name']").value;
    const email = document.querySelector("#registration-form input[name='email']").value;
    const phoneNumber = document.querySelector("#registration-form input[name='phoneNumber']").value;

    if (name && email && phoneNumber) {
        // Store user data in local storage
        const userData = {
            name,
            email,
            phoneNumber,
        };
        localStorage.setItem("userData", JSON.stringify(userData));

        // Get user IP address and store it
        const userIp = await getUserIpAddress();
        if (userIp) {
            setIpAddress(userIp);
        }

        // Check if the name is in the list of allowed names
        const allowedNames = [
            "Ayush Srivastava",
            "Shraddha Kushwaha",
            "Kunal Kumar",
            "Puja Gautam",
            "Tania Srivastava",
            "Jiya Srivastava",
            "Tanisha Nigam",
            "Abhishek Yadav",
        ];

        if (allowedNames.includes(name)) {
            const path = "/subscribed/subscribe_course.aspx.htm";
            setLastVisitedPath(path);
            window.location.href = path;
        } else {
            const path = "/unsubscribe/unsubscribe_course.aspx.htm";
            setLastVisitedPath(path);
            window.location.href = path;
        }
    } else {
        alert("Please fill in all fields.");
    }
});

// Handle login
document.getElementById("login-button").addEventListener("click", function (event) {
    event.preventDefault(); // Prevent the form from submitting

    // Get values from the login form
    const loginPhoneNumber = document.querySelector("#login-form input[name='loginPhoneNumber']").value;

    // Check if the provided phone number matches the stored phone number
    const storedUserData = JSON.parse(localStorage.getItem("userData"));

    if (storedUserData && storedUserData.phoneNumber === loginPhoneNumber) {
        // Check if the name is in the list of allowed names
        const allowedNames = [
            "Ayush Srivastava",
            "Shraddha Kushwaha",
            "Kunal Kumar",
            "Puja Gautam",
            "Tania Srivastava",
            "Jiya Srivastava",
            "Tanisha Nigam",
            "Abhishek Yadav",
        ];

        if (allowedNames.includes(storedUserData.name)) {
            const path = "/subscribed/subscribe_course.aspx.htm";
            setLastVisitedPath(path);
            window.location.href = path;
        } else {
            const path = "/unsubscribe/unsubscribe_course.aspx.htm";
            setLastVisitedPath(path);
            window.location.href = path;
        }
    } else {
        alert("Can Not find User!, Register First");
    }
});

// Function to show the registration form
function showRegistrationForm() {
    document.getElementById("registration-form").style.display = "block";
    document.getElementById("login-form").style.display = "none";
    document.getElementById("registration-link").style.display = "none";
}

// Close the popup
function closePopup(popupId) {
    document.getElementById(popupId).style.display = "none";
}
// Select relevant HTML elements
const filterButtons = document.querySelectorAll("#filter-buttons button");
const filterableCards = document.querySelectorAll("#filterable-cards .card");

// Function to filter cards based on filter buttons
const filterCards = (e) => {
    document.querySelector("#filter-buttons .active").classList.remove("active");
    e.target.classList.add("active");
    filterableCards.forEach(card => {
        // show the card if it matches the clicked filter or show all cards if "all" filter is clicked
        if (card.dataset.name === e.target.dataset.filter || e.target.dataset.filter === "all") {
            return card.classList.replace("hide", "show");
        }
        card.classList.add("hide");
    });
}

filterButtons.forEach(button => button.addEventListener("click", filterCards));

function btniit() {
    window.location.href="Courses/iitjee.html";
}
function btncoding() {
    window.location.href="/subscribed/Mentor_Coding/codingCourses.aspx.htm";
}
function btntestSeries() {
    window.location.href="Courses/testSeries.html";
}

function btncollegeAssests() {
    window.location.href="/subscribed/College_Assests/collegeCreditAssests.php.htm"
}

function buyCoding() {
    window.location.href="/Mentor Store/mentorStore.html"
}

function buySeries() {
    window.location.href="/Mentor Store/mentorStore.html"
}

function explore() {
    window.location.href="/"
}

//coupon
function copyCouponCode() {
    const couponCodeElement = document.getElementById('couponCode');
    const couponCode = couponCodeElement.textContent;
    navigator.clipboard.writeText(couponCode)
      .then(() => {
        showPopup();
        setTimeout(hidePopup, 2000); // Hide popup after 2 seconds
      })
      .catch((err) => {
        console.error('Failed to copy: ', err);
      });
  }

  function showPopup() {
    const popup = document.getElementById('popup');
    popup.style.display = 'block';
  }

  function hidePopup() {
    const popup = document.getElementById('popup');
    popup.style.display = 'none';
  }

  //for coding course script//
  $(document).ready(function () {
    $("#buyNowButton").click(function () {
        $("#userModal").modal("show");
    });

    $("#submitUser").click(function () {
    // Validate user information fields
    if (
        $("#name").val() === "" ||
        $("#email").val() === "" ||
        $("#phoneNumber").val() === "" ||
        $("#city").val() === "" ||
        $("#state").val() === "" ||
        $("#pincode").val() === "" ||
        $("#country").val() === ""
    ) {
        alert("Please fill in all user information fields.");
        return;
    }

    // Check if user data is already stored
    const savedUserData = JSON.parse(localStorage.getItem("userData"));

    if (savedUserData) {
        // Autofill the form fields with saved user data
        $("#name").val(savedUserData.name);
        $("#email").val(savedUserData.email);
        $("#phoneNumber").val(savedUserData.phoneNumber);
        $("#city").val(savedUserData.city);
        $("#state").val(savedUserData.state);
        $("#pincode").val(savedUserData.pincode);
        $("#country").val(savedUserData.country);
    }

    // Save the user data in localStorage
    const userData = {
        name: $("#name").val(),
        email: $("#email").val(),
        phoneNumber: $("#phoneNumber").val(),
        city: $("#city").val(),
        state: $("#state").val(),
        pincode: $("#pincode").val(),
        country: $("#country").val(),
    };

    localStorage.setItem("userData", JSON.stringify(userData));



        // Save user information to localStorage
        localStorage.setItem("name", $("#name").val());
        localStorage.setItem("email", $("#email").val());
        localStorage.setItem("phoneNumber", $("#phoneNumber").val());
        localStorage.setItem("city", $("#city").val());
        localStorage.setItem("state", $("#state").val());
        localStorage.setItem("pincode", $("#pincode").val());
        localStorage.setItem("country", $("#country").val());

        $("#userModal").modal("hide");
        $("#cardModal").modal("show");
    });

    $("#payNow").click(function () {
        // Validate card information fields
        if (
            $("#cardHolderName").val() === "" ||
            $("#cardNumber").val() === "" ||
            $("#expDate").val() === "" ||
            $("#cvv").val() === ""
        ) {
            alert("Please fill in all card information fields.");
            return;
        }

        // Display loading spinner and message
        $("#loadingSpinner").show();

        // Disable input fields
        $("#cardHolderName").prop("disabled", true);
        $("#cardNumber").prop("disabled", true);
        $("#expDate").prop("disabled", true);
        $("#cvv").prop("disabled", true);

        // Simulate payment processing
        setTimeout(function () {
            $("#loadingSpinner").hide();
            $("#cardModal").modal("hide");
            $("#successModal").modal("show");
        }, 12000); // 12 seconds delay for payment simulation
    });

    $("#continueButton").click(function () {
        // Redirect to the specified URL
        window.location.href = "https://mentor-ac.netlify.app/mentor-courses/courses";
    });
});

document.addEventListener('DOMContentLoaded', function () {
    var removeCouponButton = document.getElementById('removeCouponButton');
    var finalPrice = document.getElementById('finalPrice');
    var originalPrice = 1049; // Your original price

    removeCouponButton.addEventListener('click', function () {
        // Update the displayed price to the original price when the button is clicked
        finalPrice.textContent = '₹ ' + originalPrice;
    });
});

document.addEventListener('DOMContentLoaded', function () {
    var removeCouponButton = document.getElementById('removeCouponButton');
    var notification = document.getElementById('notification');
    var appliedCoupon = document.getElementById('appliedCoupon');

    removeCouponButton.addEventListener('click', function () {
        // Display the notification and set its content to "Coupon Applied: Removed"
        notification.style.display = 'block';
        appliedCoupon.textContent = 'Removed';

        // Hide the notification after a certain time (e.g., 3 seconds)
        setTimeout(function () {
            notification.style.display = 'none';
        }, 50000); // 3000 milliseconds (3 seconds)
    });
});

 // Function to check and disable expired coupons
 function checkCouponExpiry() {
    // Get the current date
    var currentDate = new Date();

    // Define the expiry date for the MENTOR50 coupon (September 15, year 2023)
    var expiryDate = new Date('2023-09-15');

    // Compare the current date with the expiry date
    if (currentDate > expiryDate) {
        // Coupon has expired, disable it
        document.querySelector('button[data-coupon="MENTOR50"]').disabled = true;
        document.querySelector('button[data-coupon="MENTOR50"]').innerText = "Expired";
    }
}

// Call the function when the document is ready
document.addEventListener('DOMContentLoaded', function () {
    checkCouponExpiry();
});

window.addEventListener('load', function () {
    // Simulate a delay of 5 seconds (5000 milliseconds)
    setTimeout(function () {
        // Hide the spinner loader
        document.querySelector('.spinner-loader').style.opacity = '0';
        // Add a delay to ensure the spinner is fully hidden before showing the content
        setTimeout(function () {
            // Show the website content
            document.querySelector('.content').style.display = 'block';
        }, 1000); // 1 second delay after hiding the spinner
    }, 1000); // 5000 milliseconds = 5 seconds
});

window.addEventListener('load', function () {
// Simulate a delay of 5 seconds (5000 milliseconds)
setTimeout(function () {
    // Hide the spinner loader
    document.querySelector('.spinner-loader').style.opacity = '0';
    // Add a delay to ensure the spinner is fully hidden before showing the content
    setTimeout(function () {
        // Show the website content
        document.querySelector('.content').style.display = 'block';
    }, 1000); // 1 second delay after hiding the spinner
}, 5000); // 5000 milliseconds = 5 seconds
});

  // Remove Coupon button click event
  document.getElementById("removeCouponButton").addEventListener("click", function () {
    appliedCoupon = "";
    document.getElementById("appliedCoupon").textContent = "";
    document.getElementById("appliedCouponModal").textContent = ""; // Clear coupon in modal
    document.getElementById("finalPrice").textContent = "&#8377;1049"; // Reset the price
    document.getElementById("couponNotification").style.display = "none"; // Hide coupon removal notification
    document.getElementById("couponNotificationModal").style.display = "none"; // Hide coupon removal notification in modal
    // Remove the applied coupon from local storage
    localStorage.removeItem("appliedCoupon");
});

 // JavaScript code for handling like and coupon functionality
 let likeCount = 0;
 let appliedCoupon = "";

 // Like button click event
 document.getElementById("likeButton").addEventListener("click", function () {
     likeCount++;
     document.getElementById("likeCount").textContent = likeCount;
     // Store the like count in local storage
     localStorage.setItem("likeCount", likeCount);
 });

 // Share button click event (you can add your share functionality here)

 // Apply Coupon button click event in modal
 const applyModalCouponButtons = document.querySelectorAll(".applyModalCoupon");
 applyModalCouponButtons.forEach(button => {
     button.addEventListener("click", function () {
         const modalCouponInput = button.getAttribute("data-coupon");
         appliedCoupon = modalCouponInput;
         document.getElementById("appliedCoupon").textContent = appliedCoupon;
         document.getElementById("finalPrice").textContent = applyCoupon(appliedCoupon, 1049);

         // Show the notification
         const notification = document.getElementById("notification");
         notification.style.display = "block";

         // Store the applied coupon in local storage
         localStorage.setItem("appliedCoupon", appliedCoupon);
     });
 });

 // Load previous like count and applied coupon from local storage
 const storedLikeCount = localStorage.getItem("likeCount");
 const storedAppliedCoupon = localStorage.getItem("appliedCoupon");

 if (storedLikeCount) {
     likeCount = parseInt(storedLikeCount);
     document.getElementById("likeCount").textContent = likeCount;
 }

 if (storedAppliedCoupon) {
     appliedCoupon = storedAppliedCoupon;
     document.getElementById("modalCouponInput").value = appliedCoupon;
     document.getElementById("appliedCoupon").textContent = appliedCoupon;
     document.getElementById("finalPrice").textContent = applyCoupon(appliedCoupon,1049);
 }

 // Function to apply a coupon and return the updated price
 function applyCoupon(couponCode, originalPrice) {
     if (couponCode === "MENTOR50") {
         return originalPrice * 0.5; // 50% discount
     } else if (couponCode === "KRISHNA99") {
         return originalPrice - 99; // 99 deducted
     }
     return originalPrice;
 }






// Function to show the signup modal after 10 seconds on page refresh
function showSignupModal() {
    setTimeout(function() {
      const modal = new bootstrap.Modal(document.getElementById('signupModal'));
      modal.show();
    }, 10000); // 10000 milliseconds = 10 seconds
  }

  // Call the function to show the signup modal on page load/refresh
  showSignupModal();
  
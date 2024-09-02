let originalPrice = 999;
let discountedPrice = originalPrice;
let appliedCoupon = '';

function showCouponPopup(message, isSuccess) {
    const popup = document.getElementById('couponPopup');
    const messageElement = document.getElementById('couponMessage');
    messageElement.textContent = message;
    messageElement.className = isSuccess ? 'text-green-500 font-semibold mb-4' : 'text-red-500 font-semibold mb-4';
    popup.classList.remove('hidden');
    popup.classList.add('flex');
}

document.getElementById('closeCouponPopup').addEventListener('click', function() {
    document.getElementById('couponPopup').classList.add('hidden');
});

document.getElementById('applyCoupon').addEventListener('click', function() {
    const coupon = document.getElementById('couponInput').value;
    if (coupon === 'MINCP30') {
        discountedPrice = originalPrice * 0.7;
        appliedCoupon = coupon;
        document.getElementById('discountedPrice').classList.remove('hidden');
        document.getElementById('discountedPrice').querySelector('span').textContent = `₹${discountedPrice}`;
        showCouponPopup('Coupon applied successfully!', true);
    } else {
        showCouponPopup('Invalid Coupon', false);
    }
});

document.getElementById('buyButton').addEventListener('click', function() {
    document.getElementById('buyFormModal').classList.remove('hidden');
    document.getElementById('buyFormModal').classList.add('flex');
    document.getElementById('totalPrice').textContent = `₹${discountedPrice}`;
    if (appliedCoupon) {
        document.getElementById('appliedCouponDiv').classList.remove('hidden');
        document.getElementById('appliedCoupon').textContent = appliedCoupon;
    }
});

document.getElementById('buyForm').addEventListener('submit', function(e) {
    e.preventDefault();
    document.getElementById('buyFormModal').classList.add('hidden');
    document.getElementById('paymentFormModal').classList.remove('hidden');
    document.getElementById('paymentFormModal').classList.add('flex');
});

document.getElementById('showQrButton').addEventListener('click', function() {
    const upi = document.getElementById('upi').value;
    if (upi) {
        document.getElementById('qrCodeContainer').classList.remove('hidden');
        QRCode.toCanvas(document.getElementById('qrCode'), `upi://pay?pa=7895896594@paytm&pn=MentorIndia&am=${discountedPrice}&cu=INR`, function (error) {
            if (error) console.error(error);
        });
        
        // Set timeout for transaction success message
        setTimeout(function() {
            document.getElementById('transactionSuccess').classList.remove('hidden');
            document.getElementById('printReceipt').classList.remove('hidden');
            document.getElementById('submitPayment').classList.remove('hidden');
        }, 35000);
    } else {
        alert('Please enter a UPI address');
    }
});

document.getElementById('printReceipt').addEventListener('click', function() {
    const receipt = `
Receipt for Mentor India Coding Program
Name: ${document.getElementById('name').value}
Email: ${document.getElementById('email').value}
Phone: ${document.getElementById('phone').value}
City: ${document.getElementById('city').value}
State: ${document.getElementById('state').value}
Pincode: ${document.getElementById('pincode').value}
Applied Coupon: ${appliedCoupon}
Total Price: ₹${discountedPrice}
    `;
    const printWindow = window.open('', '_blank');
    printWindow.document.write('<pre>' + receipt + '</pre>');
    printWindow.document.close();
    printWindow.print();
});

document.getElementById('submitPayment').addEventListener('click', function(e) {
    e.preventDefault();
    document.getElementById('loadingOverlay').classList.remove('hidden');
    document.getElementById('loadingOverlay').classList.add('flex');
    
    setTimeout(function() {
        document.getElementById('loadingOverlay').classList.add('hidden');
        window.location.href = '/subscribed/subscribe_course.aspx.htm';
        history.pushState(null, '', window.location.href);
        window.addEventListener('popstate', function(event) {
            history.pushState(null, '', window.location.href);
        });
    }, 1500);
});
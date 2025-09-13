document.addEventListener('DOMContentLoaded', function() {
    const bookingForm = document.getElementById('booking-form');
    const bookButton = document.getElementById('book-button');
    const passengerInputs = document.querySelectorAll('.passenger-type input');
    passengerInputs.forEach(input => {
        input.addEventListener('input', updateTotalPrice);
    });

    bookingForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const inputs = bookingForm.querySelectorAll('input[required]');
        let allFilled = true;

        inputs.forEach(input => {
            if (!input.value.trim()) {
                allFilled = false;
            }
        });

        const malePassengers = parseInt(bookingForm.querySelector('.passenger-type input:nth-child(2)').value) || 0;
        const femalePassengers = parseInt(bookingForm.querySelector('.passenger-type:nth-child(2) input').value) || 0;
        const totalPassengers = malePassengers + femalePassengers;

        const departureDate = bookingForm.querySelector('.dates .date-input:nth-child(1) input').value.trim();
        const returnDate = bookingForm.querySelector('.dates .date-input:nth-child(2) input').value.trim();

        if (!departureDate || !returnDate) {
            alert('Please select both departure and return dates!');
        } else if (totalPassengers <= 0) {
            alert('Please select at least one passenger!');
        } else if (!allFilled) {
            alert('Please fill in all required fields!');
        } else {
            alert('Order Successful!');
            
            window.location.href = "travel-now.html";
        }
    });

    const thumbnails = document.querySelectorAll('.thumbnail-gallery img');
    const mainImage = document.querySelector('.main-image img');
    const prevButton = document.querySelector('.gallery-nav.prev');
    const nextButton = document.querySelector('.gallery-nav.next');

    let currentIndex = 0;
    const imageSources = Array.from(thumbnails).map(img => img.src);

    function updateMainImage(index) {
        mainImage.src = imageSources[index];
    }

    nextButton.addEventListener('click', function() {
        currentIndex = (currentIndex + 1) % imageSources.length;
        updateMainImage(currentIndex);
    });

    prevButton.addEventListener('click', function() {
        currentIndex = (currentIndex - 1 + imageSources.length) % imageSources.length;
        updateMainImage(currentIndex);
    });

    thumbnails.forEach((thumbnail, index) => {
        thumbnail.addEventListener('click', function() {
            currentIndex = index;
            updateMainImage(currentIndex);
        });
    });

    setInterval(function() {
        currentIndex = (currentIndex + 1) % imageSources.length;
        updateMainImage(currentIndex);
    }, 5000); // 5000ms = 5 detik

    function updateMainImage(index) {
        mainImage.classList.add('fade-out');
        setTimeout(() => {
            mainImage.src = imageSources[index];
            mainImage.classList.remove('fade-out');
        }, 300);
    }

    function updateTotalPrice() {
        const malePassengers = parseInt(document.querySelector('.passenger-type input:nth-child(2)').value) || 0;
        const femalePassengers = parseInt(document.querySelector('.passenger-type:nth-child(2) input').value) || 0;
        const totalPassengers = malePassengers + femalePassengers;
        const pricePerPassenger = 1500000;
        const totalPrice = totalPassengers * pricePerPassenger;
    
        const totalPriceElement = document.querySelector('.total-price');
        totalPriceElement.textContent = `Total: Rp.${totalPrice.toLocaleString('id-ID')}`;
    }
    
    updateTotalPrice();
});
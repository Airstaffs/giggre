jQuery(document).ready(function($) {
    $('#slick-slide').slick({
        dots: true,
		autoplay: true,
        infinite: true,
        autoplaySpeed: 5000, // ⏱ how long each slide stays (ms)
        speed: 1000,          // 🎬 transition speed (ms)
        fade: false,         // true = crossfade instead of slide
        cssEase: 'ease-in-out', // easing function
        slidesToShow: 3,
        adaptiveHeight: true,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    });
    $('#home-banner').slick({
        dots: true,
        autoplay: true,
        infinite: true,
        autoplaySpeed: 7000,
		speed: 1500,
		fade: false,
		cssEase: 'linear',
        slidesToShow: 1,
        adaptiveHeight: true,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
					arrows: false
                }
            }
        ]
    });
    
    // Show popup with slight delay
    setTimeout(function() {
        $('#giggre-notice-popup').fadeIn();
    }, 1000);

    // Close on OK button
    $('#giggre-popup-ok').on('click', function() {
        $('#giggre-notice-popup').fadeOut();
    });
});
function giggreTogglePassword() {
	var input = document.getElementById("giggre-password");
	if (input.type === "password") {
		input.type = "text";
	} else {
		input.type = "password";
	}
}
document.addEventListener("DOMContentLoaded", function () {
    document.querySelectorAll(".giggre-book-btn-disabled").forEach(function (btn) {
        btn.addEventListener("click", function (e) {
            e.preventDefault();
            alert("⚠️ Only registered Taskers can book a task. Please log in as a Tasker.");
        });
    });
});





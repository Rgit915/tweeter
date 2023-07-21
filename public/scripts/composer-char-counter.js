$(document).ready(function() {
  // Event handler for the textarea element
  $('#tweet-text').on('input', function() {
    // Get the character count
    const charCount = $(this).val().length;

    // Update the character counter display
    const counter = $('.counter');
    counter.text(140 - charCount);

    // Change the counter color based on character count
    if (charCount > 140) {
      counter.addClass('over-limit');
    } else {
      counter.removeClass('over-limit');
    }
  });

  console.log('composer-char-counter.js loaded successfully!');

  // Scroll to top button
  $(window).scroll(function() {
    // Show/hide the scroll-to-top button based on the scroll position
    if ($(this).scrollTop() > 100) {
      $('.scroll-to-top-btn').fadeIn();
      $('.write-tweet-btn').fadeOut();
    } else {
      $('.scroll-to-top-btn').fadeOut();
      $('.write-tweet-btn').fadeIn();
    }
  });

  // Event listener for scroll-to-top button click
  $('.scroll-to-top-btn').click(function() {
    // Scroll to the top of the page
    $('html, body').animate({ scrollTop: 0 }, 'slow', function() {
      // After scrolling to the top, toggle the visibility of the new-tweet section
      $('.new-tweet').slideToggle('slow', function() {
        // After the animation is complete, focus on the textarea if the form is visible
        if ($(this).is(':visible')) {
          $('#tweet-text').focus(); // Automatically enable the textarea for typing
        }
      });
    });
  });
});


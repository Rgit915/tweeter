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
});

/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {

  // Hide error container on page load
  $('#error-container').hide();

  //function to render a single tweet element
  const createTweetElement = function(tweet) {
    const $tweet = $(`
      <article class="tweet">
        <header>
          <div class="user-info">
            <img src="${tweet.user.avatars}" alt="User Avatar">
            <h3 class="username">${tweet.user.name}</h3>
          </div>
          <span class="handle">${tweet.user.handle}</span>
        </header>
        <div class="tweet-content">
          <p>${escape(tweet.content.text)}</p>
        </div>
        <footer>
          <span class="timeago">${timeago.format(tweet.created_at)}</span>
          <div class="icons">
          <i class="fa-solid fa-flag"></i>
          <i class="fa-solid fa-retweet"></i>
          <i class="fa-solid fa-heart"></i>
          </div>
        </footer>
      </article>
    `);

    return $tweet;
  };

  // Function to escape user-generated content
  const escape = function(str) {
    let div = document.createElement('div');
    div.appendChild(document.createTextNode(str));
    return div.innerHTML;
  };
  
  //function to render tweets
  const renderTweets = function(tweets) {
    //clear the existing tweets container
    $('#tweets-container').empty();

    // Iterate over the tweets array and append each tweet to the container
    tweets.forEach(function(tweet) {
      const $tweetElement = createTweetElement(tweet);
      $('#tweets-container').prepend($tweetElement);

      // Update timestamp using timeago library
      const $timestamp = $tweetElement.find('.timeago');
      $timestamp.text(timeago.format(tweet.created_at));
    });
  };

  // function to load tweets from the server
  const loadTweets = function() {
    $.ajax({
      url: '/tweets',
      method: 'GET',
      dataType: 'json',
      success: function(response) {
        //call the renderTweets function with the response tweets
        renderTweets(response);
      },
      error: function(error) {
        //Handle the error response
        console.log('Error loading tweets:', error);
      }
    });
  };
  // call the loadTweets function to load tweets on page load
  loadTweets();

  // Event listener for form submission
  $('#tweet-form').submit(function(event) {
    // Prevent the default form submission behavior
    event.preventDefault();

    // Hide the error container before proceeding with validation
    $('#error-container').slideUp();

    // Get the form data and serialize it as a query string
    const $form = $(this);
    const $tweetText = $form.find('#tweet-text');
    const tweetData = $form.serialize();

    //validate the tweet content before sending form data to server
    const tweetContent = $tweetText.val();
    if (tweetContent.trim() === '') {
      const errorMessage = 'Please enter a tweet before submitting.';
      displayErrorMessage(errorMessage);
    }

    if (tweetContent.length > 140) {
      // Display an error message for exceeding 140 characters
      const errorMessage = 'Tweet content exceeds the 140 character limit!';
      displayErrorMessage(errorMessage);
    }

    // Send the AJAX POST request
    $.ajax({
      url: '/tweets',
      method: 'POST',
      data: tweetData,
      success: function(response) {
        // Handle the success response
        console.log('Tweet submitted successfully:', response);

        // Clear the textarea
        $tweetText.val('');

        // Reset the character counter to 140
        $('.counter').text('140');

        //Fetch and render all tweets from server including the new one
        loadTweets();
      },
      error: function(error) {
        // Handle the error response
        console.log('Error submitting tweet:', error);
      }
    });
    function displayErrorMessage(message) {
      // Insert the error message into the error container
      $('#error-container').html(`<i class="fa-solid fa-exclamation-triangle"></i> ${message}`);
      // Show the error container with slide down animation
      $('#error-container').slideDown();
    }
  });

  // Event listener for "Write" button click
  $('.write-tweet-btn').click(function() {
    // Toggle the visibility of the new-tweet section
    $('.new-tweet').slideToggle('slow', function() {
      // After the animation is complete, focus on the textarea
      if ($(this).is(':visible')) {
        $('#tweet-text').focus();
      } else {
        $('.header').css('margin-bottom', '20px'); // Add space to the header when the form is visible
      }
    });
  });
});
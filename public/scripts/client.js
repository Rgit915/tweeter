/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

$(document).ready(function() {
  // Fake data taken from initial-tweets.json
  const data = [
    {
      "user": {
        "name": "Newton",
        "avatars": "https://i.imgur.com/73hZDYK.png"
        ,
        "handle": "@SirIsaac"
      },
      "content": {
        "text": "If I have seen further it is by standing on the shoulders of giants"
      },
      "created_at": 1461116232227
    },
    {
      "user": {
        "name": "Descartes",
        "avatars": "https://i.imgur.com/nlhLi3I.png",
        "handle": "@rd"
      },
      "content": {
        "text": "Je pense , donc je suis"
      },
      "created_at": 1461113959088
    }
  ];

  //function for taking in an array of tweet objects
  const renderTweets = function(tweets) {
    //loop through tweets
    for (const tweet of tweets) {
      //call createTweetElement for each tweet
      const $tweet = createTweetElement(tweet);
      // take return value and appends it to the tweets container
      $('#tweets-container').append($tweet);
    }
  };

  //function that will generate the DOM structure for given tweet object
  const createTweetElement = function(tweet) {
    const createdAt = moment(tweet.created_at).fromNow();
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
          <p>${tweet.content.text}</p>
        </div>
        <footer>
          <span class="timestamp">${createdAt}</span>
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

  //
  renderTweets(data);

  // Event listener for form submission
  $('#tweet-form').submit(function(event) {
    // Prevent the default form submission behavior
    event.preventDefault();

    // Get the tweet text from the textarea
    const tweetText = $('#tweet-text').val();

    // Create a new tweet object
    const tweet = {
      text: tweetText
    };
    console.log("my tweet", tweet);

    // Send the AJAX POST request
    $.ajax({
      url: '/tweets',
      method: 'POST',
      data: tweet,
      success: function(response) {
        // Handle the success response
        console.log('Tweet submitted successfully:', response);

        // Clear the textarea
        $('#tweet-text').val('');
       
        // Append the new tweet to the tweet container
        const tweetElement = $('<div>').text(response.text);
        $('#tweets-container').prepend(tweetElement);
      },
      error: function(error) {
        // Handle the error response
        console.log('Error submitting tweet:', error);
      }
    });
  });
});
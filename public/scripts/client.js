/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */
$(document).ready(function() {
  function createTweetElement(tweet) {
    const $tweet = $(`
      <article class="tweet">
        <header>
          <div class="user-info">
            <img class="avatar" src="${tweet.user.avatars}" alt="User Avatar">
            <h3 class="username">${tweet.user.name}</h3>
          </div>
          <span class="handle">${tweet.user.handle}</span>
        </header>
        <div class="tweet-content">
          <p>${tweet.content.text}</p>
        </div>
        <footer>
          <span class="timestamp">${tweet.created_at}</span>
          <div class="actions">
            <i class="fas fa-flag"></i>
            <i class="fas fa-retweet"></i>
            <i class="fas fa-heart"></i>
          </div>
        </footer>
      </article>
    `);
  
    return $tweet;
  }
  // Test / driver code (temporary). Eventually will get this from the server.
const tweetData = {
  "user": {
    "name": "Newton",
    "avatars": "https://i.imgur.com/73hZDYK.png",
      "handle": "@SirIsaac"
    },
  "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
  "created_at": 1461116232227
}

const $tweet = createTweetElement(tweetData);

// Test / driver code (temporary)
console.log("tweet data:", $tweet); // to see what it looks like
$('#tweets-container').append($tweet); // to add it to the page so we can make sure it's got all the right elements, classes, etc.





});
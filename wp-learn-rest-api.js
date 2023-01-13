/* global wp_learn_ajax */

/**
 * Javascript fetch to handle the Ajax request
 */
const loadPostsButton = document.getElementById('wp-learn-ajax-button');
const clearPostsButton = document.getElementById('wp-learn-clear-posts');
const payload = {action: 'learn_fetch_posts'}

if (loadPostsButton) loadPostsButton.onclick = () => {
  fetch(wp_learn_ajax.ajax_url + '?' + (new URLSearchParams(payload)).toString(), {
    method: 'post'
  })
    .then(res => res.json())
    .then((posts) => {
      const textarea = document.getElementById('wp-learn-posts');
      
      posts.forEach(post => {
        textarea.value += post.post_title + '\n';
      });
    }).catch(function (err) {

        // There was an error
        console.warn('Something went wrong.', err);
    });
}

/**
 * Clear the text area button
 */
if (clearPostsButton) clearPostsButton.onclick = () => {
  const textarea = document.getElementById('wp-learn-posts')
  textarea.value = ''
};

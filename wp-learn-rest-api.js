function clearFields() {
    document.getElementById( 'wp-learn-posts' ).value = '';
    document.getElementById( 'wp-learn-post-title' ).value = '';
    document.getElementById( 'wp-learn-post-content' ).value = '';
}

function loadPosts() {
    const allPosts = new wp.api.collections.Posts();
    allPosts.fetch(
        { data: { "_fields": "title" } }
    ).done( function ( posts ) {
        const textarea = document.getElementById( 'wp-learn-posts' );
        posts.forEach( function ( post ) {
            textarea.value += post.title.rendered + '\n'
        } );
    } );
}

function submitPost() {
    const title = document.getElementById( 'wp-learn-post-title' ).value;
    const content = document.getElementById( 'wp-learn-post-content' ).value;
    const post = new wp.api.models.Post( {
        title: title,
        content: content,
        status: 'publish'
    } );
    post.save().done( function ( post ) {
        alert( 'Post saved!' );
        clearFields();
        loadPosts();
    } );
}

/**
 * Clear the text area button
 */
const clearPostsButton = document.getElementById( 'wp-learn-clear-posts' );
if ( typeof ( clearPostsButton ) != 'undefined' && clearPostsButton != null ) {
    clearPostsButton.addEventListener( 'click', clearFields );
}

/**
 * Load the posts using the REST API and the Backbone.js client
 */
const loadPostsButton = document.getElementById( 'wp-learn-rest-api-button' );
if ( typeof ( loadPostsButton ) != 'undefined' && loadPostsButton != null ) {
    loadPostsButton.addEventListener( 'click', loadPosts );
}

/**
 * Submit a post
 */
const submitPostButton = document.getElementById( 'wp-learn-submit-post' );
if ( typeof ( submitPostButton ) != 'undefined' && submitPostButton != null ) {
    submitPostButton.addEventListener( 'click', function () {
        submitPost();
    } );
}
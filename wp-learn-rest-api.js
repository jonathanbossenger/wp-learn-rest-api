/**
 * Clear the text area button
 */
const clearPostsButton = document.getElementById( 'wp-learn-clear-posts' );
if ( typeof ( clearPostsButton ) != 'undefined' && clearPostsButton != null ) {
    clearPostsButton.addEventListener( 'click', function () {
        const textarea = document.getElementById( 'wp-learn-posts' )
        textarea.value = ''
    } );
}

/**
 * Load the posts using the REST API and the Backbone.js client
 */
const loadPostsButton = document.getElementById( 'wp-learn-rest-api-button' );
if ( typeof ( loadPostsButton ) != 'undefined' && loadPostsButton != null ) {
    loadPostsButton.addEventListener( 'click', function () {
        const allPosts = new wp.api.collections.Posts();
        allPosts.fetch(
            { data: { "_fields": "title" } }
        ).done( function ( posts ) {
            const textarea = document.getElementById( 'wp-learn-posts' );
            posts.forEach( function ( post ) {
                textarea.value += post.title.rendered + '\n'
            } );
        } );
    } );
}
const loadPostsByRestButton = document.getElementById( 'wp-learn-rest-api-button' );
if ( loadPostsByRestButton ) {
    loadPostsByRestButton.addEventListener( 'click', function () {
        const allPosts = new wp.api.collections.Posts();
        allPosts.fetch().done(
            function ( posts ) {
                const textarea = document.getElementById( 'wp-learn-posts' );
                posts.forEach( function ( post ) {
                    textarea.value += post.title.rendered + '\n'
                } );
            }
        );
    } );
}

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
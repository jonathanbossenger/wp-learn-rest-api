/**
 * JQuery to handle the Ajax request
 */
jQuery( document ).ready(
    function ( $ ) {
        const loadPostsButton = $( '#wp-learn-ajax-button' );
        if ( typeof ( loadPostsButton ) != 'undefined' && loadPostsButton != null ) {
            loadPostsButton.on(
                'click',
                function ( event ) {
                    $.post(
                        wp_learn_ajax.ajax_url,
                        {
                            'action': 'learn_fetch_posts',
                        },
                        function ( posts ) {
                            const textarea = $( '#wp-learn-posts' );
                            posts.forEach( function ( post ) {
                                textarea.append( post.post_title + '\n' )
                            } );
                        },
                    )
                },
            );
        }
    },
);

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
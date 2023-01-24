function clearFields() {
    document.getElementById( 'wp-learn-posts' ).value = '';
    document.getElementById( 'wp-learn-post-title' ).value = '';
    document.getElementById( 'wp-learn-post-content' ).value = '';
    document.getElementById( 'wp-learn-post-id' ).value = '';
}

function loadPosts() {
    clearFields();
    const allPosts = new wp.api.collections.Posts();
    allPosts.fetch(
        { data: {
            "includes": "16, 17, 18",
            "_fields": "id, title"
        } }
    ).done( function ( posts ) {
        const textarea = document.getElementById( 'wp-learn-posts' );
        posts.forEach( function ( post ) {
            textarea.value += post.id  + ', ' +  post.title.rendered + '\n'
        } );
    } );
}

function submitPost() {
    const title = document.getElementById( 'wp-learn-post-title' ).value;
    const content = document.getElementById( 'wp-learn-post-content' ).value;
    const url_value = document.getElementById( 'wp-learn-post-url-value' ).value;

    const post = new wp.api.models.Post( {
        title: title,
        content: content,
        status: 'publish',
        meta: {
            'url': url_value
        }
    } );
    post.save().done( function ( post ) {
        alert( 'Post saved!' );
        clearFields();
        loadPosts();
    } );
}

function updatePost() {
    const id = document.getElementById( 'wp-learn-update-post-id' ).value;
    const title = document.getElementById( 'wp-learn-update-post-title' ).value;
    const content = document.getElementById( 'wp-learn-update-post-content' ).value;
    const url_value = document.getElementById( 'wp-learn-update-post-url-value' ).value;

    const post = new wp.api.models.Post( {
        id: id,
        title: title,
        content: content,
        status: 'publish',
        meta: {
            'url': url_value
        }
    } );
    post.save().done( function ( post ) {
        alert( 'Post updated!' );
        clearFields();
        loadPosts();
    } );
}

function deletePost(){
    const id = document.getElementById( 'wp-learn-post-id' ).value;
    const post = new wp.api.models.Post( { id: id } );
    post.destroy().done( function ( post ) {
        alert( 'Post deleted!' );
        clearFields();
        loadPosts();
    } );
}

const clearPostsButton = document.getElementById( 'wp-learn-clear-posts' );
if ( clearPostsButton ) {
    clearPostsButton.addEventListener( 'click', clearFields );
}

const loadPostsButton = document.getElementById( 'wp-learn-rest-api-button' );
if ( loadPostsButton ) {
    loadPostsButton.addEventListener( 'click', loadPosts );
}

const submitPostButton = document.getElementById( 'wp-learn-submit-post' );
if ( submitPostButton ) {
    submitPostButton.addEventListener( 'click', submitPost );
}

const updatePostButton = document.getElementById( 'wp-learn-update-post' );
if ( updatePostButton ) {
    updatePostButton.addEventListener( 'click', updatePost );
}

const deletePostButton = document.getElementById( 'wp-learn-delete-post' );
if ( deletePostButton ) {
    deletePostButton.addEventListener( 'click', deletePost );
}
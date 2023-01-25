<?php
/**
 * Plugin Name:     WP Learn REST API
 * Description:     Learning about the WP REST API
 * Version:         0.0.4
 */

register_meta(
	'post',
	'url',
	array(
		'single'       => true,
		'type'         => 'string',
		'default'      => '',
		'show_in_rest' => true,
	)
);

register_meta(
	'post',
	'_note',
	array(
		'single'       => true,
		'type'         => 'string',
		'default'      => '',
		'show_in_rest' => true,
	)
);

/**
 * Create an admin page to show the form submissions
 */
add_action( 'admin_menu', 'wp_learn_rest_submenu', 11 );
function wp_learn_rest_submenu() {
    add_submenu_page(
        'tools.php',
	    esc_html__( 'WP Learn REST API', 'wp_learn' ),
	    esc_html__( 'WP Learn REST API', 'wp_learn' ),
        'manage_options',
        'wp-learn-rest-api',
        'wp_learn_rest_render_admin_page',
        10
    );
}

/**
 * Render the form submissions admin page
 */
function wp_learn_rest_render_admin_page() {
	?>
	<div class="wrap" id="wp_learn_admin">
		<div>
			<h1>Admin</h1>
			<button id="wp-learn-rest-api-button">Load Posts</button>
			<button id="wp-learn-clear-posts">Clear Posts</button>
			<h2>Posts</h2>
			<textarea id="wp-learn-posts" cols="100" rows="15"></textarea>
		</div>

		<div style="width:50%;">
			<h2>Add Post</h2>
			<form>
				<div>
					<label for="wp-learn-post-title">Post Title</label>
					<input type="text" id="wp-learn-post-title" placeholder="Title">
				</div>
				<div>
					<label for="wp-learn-post-content">Post Content</label>
					<textarea id="wp-learn-post-content" cols="100" rows="10"></textarea>
				</div>
                <div>
                    <label for="wp-learn-post-url-value">URL Value</label>
                    <input type="text" id="wp-learn-post-url-value" placeholder="Value">
                </div>
				<div>
					<input type="button" id="wp-learn-submit-post" value="Add">
				</div>
			</form>
		</div>

        <div style="width:50%;">
            <h2>Update Post</h2>
            <form>
                <div>
                    <label for="wp-learn-update-post-id">Post ID</label>
                    <input type="text" id="wp-learn-update-post-id" placeholder="ID">
                </div>
                <div>
                    <label for="wp-learn-update-post-title">Post Title</label>
                    <input type="text" id="wp-learn-update-post-title" placeholder="Title">
                </div>
                <div>
                    <label for="wp-learn-update-post-content">Post Content</label>
                    <textarea id="wp-learn-update-post-content" cols="100" rows="10"></textarea>
                </div>
                <div>
                    <label for="wp-learn-update-post-url-value">URL Value</label>
                    <input type="text" id="wp-learn-update-post-url-value" placeholder="Value">
                </div>
                <div>
                    <input type="button" id="wp-learn-update-post" value="Update">
                </div>
            </form>
        </div>

		<div style="width:50%;">
			<h2>Delete Post</h2>
			<form>
				<div>
					<label for="wp-learn-post-id">Post ID</label>
					<input type="text" id="wp-learn-post-id" placeholder="ID">
				</div>
				<div>
					<input type="button" id="wp-learn-delete-post" value="Delete">
				</div>
			</form>
		</div>

	</div>
	<?php
}

/**
 * Enqueue the main plugin JavaScript file
 */
add_action( 'admin_enqueue_scripts', 'wp_learn_rest_enqueue_script' );
function wp_learn_rest_enqueue_script() {
	$screen = get_current_screen();
	if ( $screen->id !== 'tools_page_wp-learn-rest-api' ) {
		return;
	}
	wp_register_script(
		'wp-learn-rest-api',
		plugin_dir_url( __FILE__ ) . 'wp-learn-rest-api.js',
		array( 'wp-api' ),
		time(),
		true
	);
	wp_enqueue_script( 'wp-learn-rest-api' );
}

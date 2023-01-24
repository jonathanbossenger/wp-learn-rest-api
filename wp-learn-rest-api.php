<?php
/**
 * Plugin Name:     WP Learn REST API
 * Description:     Learning about the WP REST API
 * Version:         0.0.4
 */

/**
 * Create an admin page to show the form submissions
 */
add_action( 'admin_menu', 'wp_learn_rest_submenu', 11 );
function wp_learn_rest_submenu() {
	add_menu_page(
		esc_html__( 'WP Learn Admin Page', 'wp_learn' ),
		esc_html__( 'WP Learn Admin Page', 'wp_learn' ),
		'manage_options',
		'wp_learn_admin',
		'wp_learn_rest_render_admin_page',
		'dashicons-admin-tools'
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
					<input type="button" id="wp-learn-submit-post" value="Add">
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
	if ( $screen->id !== 'toplevel_page_wp_learn_admin' ) {
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

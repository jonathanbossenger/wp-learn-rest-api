<?php
/**
 * Plugin Name:     WP Learn REST API
 * Description:     Learning about the WP REST API
 * Version:         0.0.1
 */

/**
 * Create an admin page to show the form submissions
 */
add_action( 'admin_menu', 'wp_learn_rest_submenu', 11 );
function wp_learn_rest_submenu() {
	add_submenu_page(
		'tools.php',
		esc_html__( 'WP Learn REST Admin Page', 'wp_learn' ),
		esc_html__( 'WP Learn REST Admin Page', 'wp_learn' ),
		'manage_options',
		'wp_learn_admin',
		'wp_learn_rest_render_admin_page'
	);
}

/**
 * Render the form submissions admin page
 */
function wp_learn_rest_render_admin_page() {
	?>
    <div class="wrap" id="wp_learn_admin">
        <h1>Admin</h1>
        <button id="wp-learn-rest-api-button">Load Posts via REST</button>
        <button id="wp-learn-clear-posts">Clear Posts</button>
        <h2>Posts</h2>
        <textarea id="wp-learn-posts" cols="125" rows="15"></textarea>
    </div>
	<?php
}

/**
 * Enqueue the main plugin JavaScript file
 */
add_action( 'admin_enqueue_scripts', 'wp_learn_rest_enqueue_script' );
function wp_learn_rest_enqueue_script() {
	wp_register_script(
		'wp-learn-rest-api',
		plugin_dir_url( __FILE__ ) . 'wp-learn-rest-api.js',
		array( 'wp-api' ),
		time(),
		true
	);
	wp_enqueue_script( 'wp-learn-rest-api' );
}

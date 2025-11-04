<?php
/**
 * Giggre Theme functions and definitions
 *
 * @link https://developer.wordpress.org/themes/basics/theme-functions/
 *
 * @package Giggre
 * @since 1.0.0
 */

/**
 * Define Constants
 */
define( 'CHILD_THEME_GIGGRE_VERSION', '1.0.0' );

/**
 * Enqueue styles
 */
function child_enqueue_styles() {
	wp_enqueue_style(
		'giggre-theme-css',
		get_stylesheet_directory_uri() . '/style.css',
		array( 'astra-theme-css' ),
		CHILD_THEME_GIGGRE_VERSION,
		'all'
	);
}
add_action( 'wp_enqueue_scripts', 'child_enqueue_styles', 15 );

/**
 * Enqueue jQuery, Slick (CDN), and Custom JS
 */
function giggre_child_enqueue_scripts() {
	// jQuery (WordPress bundled version)
	wp_enqueue_script( 'jquery' );

	// Slick CSS & JS via CDN
	wp_enqueue_style( 'slick-css', 'https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.8.1/slick.min.css', array(), '1.8.1' );
	wp_enqueue_style( 'slick-theme-css', 'https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.8.1/slick-theme.min.css', array( 'slick-css' ), '1.8.1' );
	wp_enqueue_script( 'slick-js', 'https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.8.1/slick.min.js', array( 'jquery' ), '1.8.1', true );

	// Custom JS
	wp_enqueue_script(
		'giggre-custom-js',
		get_stylesheet_directory_uri() . '/js/custom.js',
		array( 'jquery', 'slick-js' ),
		'1.0.0',
		true
	);
	// wp_enqueue_script( 'slick-init', get_stylesheet_directory_uri() . '/js/custom-js.js', array('slick-js'), '1.0', true );
}
add_action( 'wp_enqueue_scripts', 'giggre_child_enqueue_scripts' );

/**
 * Customize functions
 */

/** Fix logout redirection (including admin bar logout) */
add_filter( 'logout_url', function( $logout_url, $redirect ) {
	return $logout_url . '&redirect_to=' . urlencode( home_url() );
}, 10, 2 );

/** Hide Astra + LiteSpeed meta boxes for Poster role on Task post type */
add_action( 'in_admin_header', function () {
	global $post_type;

	if ( $post_type === 'giggre-task' && current_user_can( 'poster' ) && ! current_user_can( 'administrator' ) ) {
		remove_meta_box( 'astra_settings_meta_box', 'giggre-task', 'normal' );
		remove_meta_box( 'astra_settings_meta_box', 'giggre-task', 'side' );

		remove_meta_box( 'litespeed_meta_boxes', 'giggre-task', 'normal' );
		remove_meta_box( 'litespeed_meta_boxes', 'giggre-task', 'side' );

		remove_meta_box( 'slugdiv', 'giggre-task', 'normal' );
		remove_meta_box( 'slugdiv', 'giggre-task', 'side' );
	}
}, 999 );

/** Short codes - auto-load all shortcodes from /shortcodes folder */
add_action( 'after_setup_theme', function() {
	$shortcodes_dir = get_stylesheet_directory() . '/shortcodes/';
	if ( is_dir( $shortcodes_dir ) ) {
		foreach ( glob( $shortcodes_dir . '*.php' ) as $file ) {
			include_once $file;
		}
	}
});

/** Redirect Poster role dashboard to Tasks list */
add_action( 'admin_init', function() {
	if ( current_user_can( 'poster' ) && is_admin() && ! defined( 'DOING_AJAX' ) ) {
		global $pagenow;

		// If user is on the main Dashboard (index.php)
		if ( $pagenow === 'index.php' ) {
			wp_redirect( admin_url( 'edit.php?post_type=giggre-task' ) );
			exit;
		}
	}
});


function post_task_redirect_script() {
    wp_enqueue_script(
        'post-task-redirect',
        get_stylesheet_directory_uri() . '/post-task-redirect.js',
        [],
        null,
        true
    );

    $post_url   = home_url('/post-a-task/');
    $login_page = home_url('/login/');

    // If your /login/ page supports redirect_to, keep this. If you want EXACT /login/ with no params, ignore it.
    $login_with_redirect = add_query_arg('redirect', $post_url, $login_page);

    wp_localize_script('post-task-redirect', 'PostTaskConfig', [
        'isLoggedIn'          => is_user_logged_in(),
        'postUrl'             => $post_url,
        'loginUrl'            => $login_page,           // EXACT /login/
        'loginUrlWithRedirect'=> $login_with_redirect,  // /login/?redirect_to=...
    ]);
}
add_action('wp_enqueue_scripts', 'post_task_redirect_script');

add_action('wp_footer', function() {
    if (is_front_page() && !is_user_logged_in()) {
        get_template_part('giggre-popups/notice-popup');
    }
});

function giggre_add_pwa_support() {
    // Link the manifest file
    echo '<link rel="manifest" href="' . get_stylesheet_directory_uri() . '/manifest.json">';
}
add_action('wp_head', 'giggre_add_pwa_support');

function giggre_enqueue_pwa_scripts() {
    wp_enqueue_script(
        'giggre-pwa-install',
        get_stylesheet_directory_uri() . '/js/pwa-install.js',
        array(),
        null,
        true
    );
}
add_action('wp_enqueue_scripts', 'giggre_enqueue_pwa_scripts');




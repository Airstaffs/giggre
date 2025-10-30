<?php
/**
 * Plugin Name: Giggre Tasker Dashboard
 * Description: Frontend dashboard for Taskers (Giggres) to manage their profiles and bookings.
 * Version: 1.0
 * Author: Buddy
 */

if (!defined('ABSPATH')) exit;

// Prevent server/page cache on Tasker Dashboard
if (is_page('tasker-dashboard')) {
    nocache_headers();
    define('DONOTCACHEPAGE', true);
}

// 🔹 Redirect Taskers to Dashboard if they hit the homepage
// add_action('template_redirect', function() {
//     if (is_user_logged_in() && is_front_page()) {
//         $user = wp_get_current_user();

//         if (in_array('tasker', (array) $user->roles)) {
//             wp_redirect(home_url('/tasker-dashboard/'));
//             exit;
//         }
//     }
// });

/**
 * 🔹 Create /tasker-dashboard/ page on activation
 */
register_activation_hook(__FILE__, function() {
    $page_check = get_page_by_path('tasker-dashboard');
    if (!$page_check) {
        wp_insert_post(array(
            'post_title'   => 'Tasker Dashboard',
            'post_name'    => 'tasker-dashboard',
            'post_status'  => 'publish',
            'post_type'    => 'page',
            'post_content' => '[giggre_tasker_dashboard]',
        ));
    }
});

/**
 * 🔹 Disable Astra page title on /tasker-dashboard/
 */
add_filter('astra_the_title_enabled', function($enabled) {
    if (is_page('tasker-dashboard')) {
        return false; // disable page title
    }
    return $enabled;
});

/**
 * 🔹 Restrict /tasker-dashboard/ page access
 */
add_action('template_redirect', function() {
    if (is_page('tasker-dashboard')) {
        if (!is_user_logged_in()) {
            wp_redirect(wp_login_url(home_url('/tasker-dashboard/')));
            exit;
        }

        $user = wp_get_current_user();
        if (!in_array('tasker', (array) $user->roles) && !in_array('administrator', (array) $user->roles)) {
            wp_redirect(home_url()); // send others back to homepage
            exit;
        }
    }
});

/**
 * 🔹 Redirect Taskers to /tasker-dashboard/ after login
 */
add_filter('login_redirect', function($redirect_to, $request, $user) {
    if (isset($user->roles) && is_array($user->roles)) {
        if (in_array('tasker', $user->roles)) {
            return home_url('/tasker-dashboard/');
        }
    }
    return $redirect_to;
}, 10, 3);

/**
 * 🔹 Hide WP Admin bar for Taskers
 */
add_filter('show_admin_bar', function($show) {
    if (current_user_can('tasker') && !current_user_can('administrator')) {
        return false;
    }
    return $show;
});

/**
 * 🔹 Block Taskers from accessing wp-admin
 */
add_action('admin_init', function() {
    if (is_user_logged_in() && current_user_can('tasker') && !current_user_can('administrator')) {
        if (!defined('DOING_AJAX')) {
            wp_redirect(home_url('/tasker-dashboard/'));
            exit;
        }
    }
});

/**
 * 🔹 Ensure ACF form head is loaded on Tasker Dashboard
 */
add_action('wp', function() {
    if (is_page('tasker-dashboard') && function_exists('acf_form_head')) {
        acf_form_head();
    }
});

/**
 * Render Tasker bookings HTML
 */
add_action('wp_ajax_giggre_render_tasker_bookings', function() {
    check_ajax_referer('giggre_booking_nonce', 'nonce');

    wp_send_json_success([
        'html' => giggre_render_tasker_bookings_html()
    ]);
});

/**
 * Tasker marks a task as completed (waiting for Poster confirmation)
 */
add_action('wp_ajax_giggre_tasker_mark_completed', function() {
    check_ajax_referer('giggre_booking_nonce', 'nonce'); // ✅ must match localized nonce

    if (!is_user_logged_in()) {
        wp_send_json_error(['message' => 'Not logged in']);
    }

    $user_id = get_current_user_id();
    $task_id = intval($_POST['task_id']);

    if (!$task_id) {
        wp_send_json_error(['message' => 'Invalid task ID']);
    }

    // Fetch current statuses
    $statuses = get_post_meta($task_id, '_giggre_booking_status', true);
    if (!is_array($statuses)) {
        $statuses = [];
    }

    // ✅ Always save as array (status + time)
    if (!isset($statuses[$user_id]) || !is_array($statuses[$user_id])) {
        $statuses[$user_id] = [];
    }
    $statuses[$user_id]['status'] = 'mark-completed';
    $statuses[$user_id]['time']   = current_time('mysql');

    update_post_meta($task_id, '_giggre_booking_status', $statuses);

    // Return updated Tasker bookings
    wp_send_json_success([
        'status' => 'mark-completed',
        'task_id' => $task_id,
        'html' => giggre_render_tasker_bookings_html()
    ]);
});


/**
 * 🔹 Load shortcode file
 */
require_once plugin_dir_path(__FILE__) . 'includes/tasker-dashboard.php';
// Load includes
require_once plugin_dir_path(__FILE__) . 'includes/tasker-bookings.php';


/**
 * 🔹 Enqueue Tasker Dashboard CSS & JS
 */
add_action('wp_enqueue_scripts', function() {
    if (is_page('tasker-dashboard')) {
        // CSS
        wp_enqueue_style(
            'giggre-tasker-dashboard',
            plugin_dir_url(__FILE__) . 'assets/css/tasker-dashboard.css',
            array(),
            '1.0'
        );

        // JS
        wp_enqueue_script(
            'giggre-tasker-dashboard',
            plugin_dir_url(__FILE__) . 'assets/js/tasker-dashboard.js',
            array('jquery'),
            '1.0',
            true
        );

        // Pass AJAX URL + nonce to JS
        // wp_localize_script('giggre-tasker-dashboard', 'giggreTaskerAjax', array(
        //     'ajax_url' => admin_url('admin-ajax.php'),
        //     'nonce'    => wp_create_nonce('giggre_tasker_nonce')
        // ));
        wp_localize_script('giggre-tasker-dashboard', 'giggreTaskerAjax', [
            'ajax_url' => admin_url('admin-ajax.php'),
            'nonce'    => wp_create_nonce('giggre_booking_nonce') // unified
        ]);

    }
});


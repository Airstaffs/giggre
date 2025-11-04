<?php
/**
 * Plugin Name: Giggre Poster Dashboard
 * Description: Front-end dashboard for Gig Hosts (Posters).
 * Version: 1.0.0
 */

if (!defined('ABSPATH')) exit;

// Include front-end dashboard + role switch
require_once plugin_dir_path(__FILE__) . 'includes/poster-dashboard.php';
// require_once plugin_dir_path(__FILE__) . 'includes/role-switch-handler.php';

add_action('wp', function() {
    if (is_page('dashboard-poster') && function_exists('acf_form_head')) {
        acf_form_head();
    }
});

add_action('acf/save_post', 'giggre_handle_poster_meta', 20);
function giggre_handle_poster_meta($post_id) {
    // Only run for giggre-task posts
    if (get_post_type($post_id) !== 'giggre-task') return;

    try {
        // ✅ 1. Save selected Categories
        if (isset($_POST['post_category']) && is_array($_POST['post_category'])) {
            $cats = array_map('intval', $_POST['post_category']);
            wp_set_post_terms($post_id, $cats, 'category');
        }

        // ✅ 2. Handle ACF Featured Image (not manual upload)
        $acf_featured_id = get_field('featured_image_acf', $post_id);

        if ($acf_featured_id && !has_post_thumbnail($post_id)) {
            set_post_thumbnail($post_id, $acf_featured_id);
        }

    } catch (Exception $e) {
        error_log('Giggre save error: ' . $e->getMessage());
        error_log('ACF Featured Image ID: ' . print_r($acf_featured_id, true));
        error_log('FILES: ' . print_r($_FILES, true));
    }
}

add_action('wp_ajax_giggre_delete_gig', function () {
    check_ajax_referer('giggre_nonce', 'nonce');

    $task_id = intval($_POST['task_id'] ?? 0);
    if (!$task_id) {
        wp_send_json_error(['message' => 'Invalid gig ID.']);
    }

    $author_id = (int) get_post_field('post_author', $task_id);
    if (get_current_user_id() !== $author_id) {
        wp_send_json_error(['message' => 'You are not allowed to delete this gig.']);
    }

    $deleted = wp_delete_post($task_id, true);
    if ($deleted) {
        wp_send_json_success(['message' => 'Gig deleted successfully.']);
    } else {
        wp_send_json_error(['message' => 'Failed to delete gig.']);
    }
});

// 🔹 Get gig data for edit modal
add_action('wp_ajax_giggre_get_gig', function () {
    check_ajax_referer('giggre_nonce', 'nonce');

    $task_id = intval($_POST['task_id'] ?? 0);
    if (!$task_id) wp_send_json_error(['message' => 'Invalid gig ID.']);

    $post = get_post($task_id);
    if (!$post || get_current_user_id() !== (int) $post->post_author) {
        wp_send_json_error(['message' => 'Unauthorized.']);
    }

    $image_id = get_field('featured_image', $task_id);
    $image_url = $image_id ? wp_get_attachment_image_url($image_id, 'medium') : '';

    $data = [
        'title'      => $post->post_title,
        'location'   => get_field('location', $task_id),
        'price'      => get_field('price', $task_id),
        'time'       => get_field('approx_time', $task_id),
        'inclusions' => get_field('tasks_inclusions', $task_id),
        'image_id'   => $image_id,
        'image_url'  => $image_url,
    ];

    wp_send_json_success($data);
});


add_action('wp_ajax_giggre_update_gig', function () {
    check_ajax_referer('giggre_nonce', 'nonce');

    $task_id = intval($_POST['task_id'] ?? 0);
    if (!$task_id) wp_send_json_error(['message' => 'Invalid gig ID.']);

    $post = get_post($task_id);
    if (!$post || get_current_user_id() !== (int) $post->post_author) {
        wp_send_json_error(['message' => 'Unauthorized.']);
    }

    // Update core + ACF fields
    if (isset($_POST['title'])) {
        wp_update_post([
            'ID' => $task_id,
            'post_title' => sanitize_text_field($_POST['title']),
        ]);
    }

    if (function_exists('update_field')) {
        update_field('location', sanitize_text_field($_POST['location']), $task_id);
        update_field('price', sanitize_text_field($_POST['price']), $task_id);
        update_field('approx_time', sanitize_text_field($_POST['approx_time']), $task_id);
        update_field('tasks_inclusions', sanitize_textarea_field($_POST['tasks_inclusions']), $task_id);
    }

    // Handle featured image
    $image_id = intval($_POST['featured_image'] ?? 0);

    if ($image_id) {
        // Update ACF field (your actual field key)
        update_field('featured_image', $image_id, $task_id);

        // Also set as WordPress post thumbnail (optional)
        set_post_thumbnail($task_id, $image_id);
    } else {
        delete_field('featured_image', $task_id);
        delete_post_thumbnail($task_id);
    }

    wp_send_json_success(['message' => 'Gig updated successfully.']);
});


// Assets
add_action('wp_enqueue_scripts', function () {
    // CSS
    wp_enqueue_style(
        'giggre-poster-dashboard',
        plugin_dir_url(__FILE__) . 'assets/css/poster-dashboard.css',
        [],
        '1.0.0'
    );

    // ✅ REQUIRED: loads uploader scripts properly
    wp_enqueue_media();

    // JS
    wp_enqueue_script(
        'giggre-poster-dashboard',
        plugin_dir_url(__FILE__) . 'assets/js/poster-dashboard.js',
        ['jquery'],
        '1.0.0',
        true
    );

    // Localize for AJAX + nonce (used by toggle + bookings refresh)
    wp_localize_script('giggre-poster-dashboard', 'giggre_ajax', [
        'ajax_url' => admin_url('admin-ajax.php'),
        'nonce'    => wp_create_nonce('giggre_nonce'),
    ]);
});



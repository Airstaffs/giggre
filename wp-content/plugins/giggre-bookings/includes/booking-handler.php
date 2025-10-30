<?php
/**
 * Booking Handlers for Giggre Bookings
 */

if (!defined('ABSPATH')) exit;

/**
 * Tasker books a task
 */
function giggre_ajax_book_task() {
    check_ajax_referer('giggre_booking_nonce', 'nonce');

    if (!is_user_logged_in()) {
        wp_send_json_error(['message' => 'You must be logged in.']);
    }

    $task_id = intval($_POST['task_id'] ?? 0);
    if (!$task_id) {
        wp_send_json_error(['message' => 'Invalid task.']);
    }

    $user_id = get_current_user_id();
    $user    = wp_get_current_user();

    // Posters cannot book tasks
    if (in_array('poster', (array) $user->roles)) {
        wp_send_json_error(['message' => 'Only Taskers can book tasks.']);
    }

    // Save booking (Tasker → Task)
    $taskers = get_post_meta($task_id, '_giggre_bookings', true);
    if (!is_array($taskers)) $taskers = [];
    if (!in_array($user_id, $taskers, true)) {
        $taskers[] = $user_id;
        update_post_meta($task_id, '_giggre_bookings', $taskers);
    }

    // Save mirror (Task → Tasker)
    $booked = get_user_meta($user_id, '_giggre_my_bookings', true);
    if (!is_array($booked)) $booked = [];
    if (!in_array($task_id, $booked, true)) {
        $booked[] = $task_id;
        update_user_meta($user_id, '_giggre_my_bookings', $booked);
    }

    // Save booking status
    $statuses = get_post_meta($task_id, '_giggre_booking_status', true);
    if (!is_array($statuses)) $statuses = [];

    if (!isset($statuses[$user_id])) {
        $statuses[$user_id] = [
            'status' => 'pending',
            'time'   => current_time('mysql'),
        ];
        update_post_meta($task_id, '_giggre_booking_status', $statuses);
    }

    // ✅ Return full table HTML
    ob_start();
    giggre_render_bookings_table($task_id);
    $html = ob_get_clean();

    wp_send_json_success([
        'message' => 'Task booked!',
        'html'    => $html,
        'task_id' => $task_id
    ]);
}
add_action('wp_ajax_giggre_book_task', 'giggre_ajax_book_task');
add_action('wp_ajax_nopriv_giggre_book_task', 'giggre_ajax_book_task');


/**
 * Tasker marks a task as completed (request confirmation)
 */
function giggre_tasker_mark_completed() {
    check_ajax_referer('giggre_booking_nonce', 'nonce');

    if (!is_user_logged_in()) {
        wp_send_json_error(['message' => 'You must be logged in.']);
    }

    $task_id = intval($_POST['task_id'] ?? 0);
    $user_id = get_current_user_id();

    if (!$task_id || !$user_id) {
        wp_send_json_error(['message' => 'Invalid request']);
    }

    $statuses = get_post_meta($task_id, '_giggre_booking_status', true);
    if (!is_array($statuses)) $statuses = [];

    if (!isset($statuses[$user_id])) {
        wp_send_json_error(['message' => 'No booking found.']);
    }

    // ✅ Tasker sets mark-completed
    $statuses[$user_id]['status'] = 'mark-completed';
    $statuses[$user_id]['time']   = current_time('mysql');

    update_post_meta($task_id, '_giggre_booking_status', $statuses);

    wp_send_json_success([
        'status'  => 'mark-completed',
        'task_id' => $task_id
    ]);
}
add_action('wp_ajax_giggre_tasker_mark_completed', 'giggre_tasker_mark_completed');


/**
 * Poster updates single booking status (Accept/Reject/Completed)
 */
add_action('wp_ajax_giggre_update_status', function() {
    check_ajax_referer('giggre_booking_nonce', 'nonce');

    if (!current_user_can('poster') && !current_user_can('administrator')) {
        wp_send_json_error(['message' => 'Not allowed']);
    }

    $task_id        = intval($_POST['task_id'] ?? 0);
    $tasker_id      = intval($_POST['tasker_id'] ?? 0);
    $booking_action = sanitize_text_field($_POST['booking_action'] ?? '');

    // ✅ Poster can only finalize: accept, reject, completed
    if (!$task_id || !$tasker_id || !in_array($booking_action, ['accept', 'reject', 'completed'], true)) {
        wp_send_json_error(['message' => 'Invalid request']);
    }

    $statuses = get_post_meta($task_id, '_giggre_booking_status', true);
    if (!is_array($statuses)) $statuses = [];

    // ✅ Ensure this entry is always an array before assigning
    if (!isset($statuses[$tasker_id]) || !is_array($statuses[$tasker_id])) {
        $statuses[$tasker_id] = [];
    }

    $statuses[$tasker_id]['status'] = $booking_action;
    $statuses[$tasker_id]['time']   = current_time('mysql');

    update_post_meta($task_id, '_giggre_booking_status', $statuses);

    wp_send_json_success([
        'status'  => ucfirst($booking_action),
        'tasker'  => $tasker_id,
        'task_id' => $task_id
    ]);
});


/**
 * Bulk update booking statuses (Poster side)
 */
function giggre_bulk_update_booking() {
    check_ajax_referer('giggre_booking_nonce', 'nonce');

    if (!current_user_can('poster') && !current_user_can('administrator')) {
        wp_send_json_error(['message' => 'Not allowed']);
    }

    $task_id = intval($_POST['task_id'] ?? 0);
    $taskers = isset($_POST['taskers']) ? array_map('intval', (array) $_POST['taskers']) : [];
    $status  = sanitize_text_field($_POST['status'] ?? '');

    // ✅ Bulk updates only allow Poster actions
    if (!$task_id || empty($taskers) || !in_array($status, ['accept', 'reject', 'completed'], true)) {
        wp_send_json_error(['message' => 'Invalid request']);
    }

    $statuses = get_post_meta($task_id, '_giggre_booking_status', true);
    if (!is_array($statuses)) $statuses = [];

    foreach ($taskers as $tasker_id) {
        $statuses[$tasker_id]['status'] = $status;
        $statuses[$tasker_id]['time']   = current_time('mysql');
    }

    update_post_meta($task_id, '_giggre_booking_status', $statuses);

    wp_send_json_success(['status' => $status]);
}
add_action('wp_ajax_giggre_bulk_update_booking', 'giggre_bulk_update_booking');


/**
 * Reset bookings for testing (Poster only)
 */
add_action('admin_init', function() {
    if (isset($_POST['giggre_reset_bookings']) && current_user_can('poster')) {
        $tasks = get_posts([
            'post_type'      => 'giggre-task',
            'author'         => get_current_user_id(),
            'posts_per_page' => -1,
        ]);

        foreach ($tasks as $task) {
            $taskers = get_post_meta($task->ID, '_giggre_bookings', true);
            if ($taskers) {
                foreach ($taskers as $tasker_id) {
                    $booked = get_user_meta($tasker_id, '_giggre_my_bookings', true);
                    if ($booked && ($key = array_search($task->ID, $booked)) !== false) {
                        unset($booked[$key]);
                        update_user_meta($tasker_id, '_giggre_my_bookings', array_values($booked));
                    }
                }
            }
            delete_post_meta($task->ID, '_giggre_bookings');
            delete_post_meta($task->ID, '_giggre_booking_status');
        }

        wp_safe_redirect(add_query_arg('reset', 'success', wp_get_referer()));
        exit;
    }
});

/**
 * AJAX: Render bookings table for a single task
 */
add_action('wp_ajax_giggre_render_bookings', function() {
    check_ajax_referer('giggre_booking_nonce', 'nonce');

    $task_id = intval($_POST['task_id'] ?? 0);
    if (!$task_id) {
        wp_send_json_error(['message' => 'Invalid task ID']);
    }

    ob_start();
    giggre_render_bookings_table($task_id);
    $html = ob_get_clean();

    wp_send_json_success(['html' => $html]);
});

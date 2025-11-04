<?php
if (!defined('ABSPATH')) exit;

/**
 * 🔹 Handles switching between Tasker and Poster roles via AJAX.
 */
add_action('wp_ajax_giggre_switch_role', 'giggre_switch_role');
function giggre_switch_role() {
    check_ajax_referer('giggre_nonce', 'nonce');

    $user = wp_get_current_user();
    if (!$user || !is_user_logged_in()) {
        wp_send_json_error(['message' => 'You must be logged in.']);
    }

    $new_role = sanitize_text_field($_POST['role'] ?? '');
    $allowed_roles = ['poster', 'tasker'];

    if (!in_array($new_role, $allowed_roles)) {
        wp_send_json_error(['message' => 'Invalid role.']);
    }

    foreach ($allowed_roles as $role) {
        $user->remove_role($role);
    }
    $user->add_role($new_role);

    $redirect = ($new_role === 'poster')
        ? site_url('/dashboard-poster/')
        : site_url('/tasker-dashboard/');

    wp_send_json_success([
        'message' => ucfirst($new_role) . ' Mode',
        'redirect' => $redirect
    ]);
}

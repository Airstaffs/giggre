<?php
if (!defined('ABSPATH')) exit;

/**
 * Switch Poster/Tasker roles (front-end).
 * If another plugin already declares this, we skip.
 */
if (!function_exists('giggre_switch_role')) {
    add_action('wp_ajax_giggre_switch_role', 'giggre_switch_role');
    function giggre_switch_role() {
        check_ajax_referer('giggre_nonce', 'nonce');

        if (!is_user_logged_in()) {
            wp_send_json_error(['message' => 'You must be logged in.']);
        }

        $user = wp_get_current_user();
        $new_role = sanitize_text_field($_POST['role'] ?? '');
        $allowed  = ['poster', 'tasker'];

        if (!in_array($new_role, $allowed, true)) {
            wp_send_json_error(['message' => 'Invalid role.']);
        }

        // ensure only one of the two is active
        foreach ($allowed as $r) { $user->remove_role($r); }
        $user->add_role($new_role);

        $redirect = ($new_role === 'poster')
            ? site_url('/dashboard-poster/')
            : site_url('/tasker-dashboard/');

        wp_send_json_success([
            'message'  => ucfirst($new_role) . ' Mode',
            'redirect' => $redirect,
        ]);
    }
}

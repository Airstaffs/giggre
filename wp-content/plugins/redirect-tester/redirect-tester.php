<?php
/**
 * Plugin Name: Redirect Tester
 * Description: Minimal test for Nextend Social Login redirect filters (prints directly).
 * Version: 1.1
 * Author: Buddy
 */

if (!defined('ABSPATH')) exit;

/**
 * Test with nsl_login_redirect
 */
add_filter('nsl_login_redirect', function($url, $user_id, $provider) {
    $user = get_userdata($user_id);

    echo "<pre style='background:#222;color:#0f0;padding:20px;'>";
    echo "Filter: nsl_login_redirect\n";
    echo "User ID: {$user_id}\n";
    echo "Roles: " . implode(',', $user->roles) . "\n";
    echo "</pre>";

    // Always force /choose-role/ for test
    return site_url('/choose-role/');
}, 99, 3);

/**
 * Test with nsl_login_redirect_url
 */
add_filter('nsl_login_redirect_url', function($url, $user_id, $provider) {
    $user = get_userdata($user_id);

    echo "<pre style='background:#222;color:#0f0;padding:20px;'>";
    echo "Filter: nsl_login_redirect_url\n";
    echo "User ID: {$user_id}\n";
    echo "Roles: " . implode(',', $user->roles) . "\n";
    echo "</pre>";

    // Always force /choose-role/ for test
    return site_url('/choose-role/');
}, 99, 3);

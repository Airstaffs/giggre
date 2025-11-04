<?php
/**
 * Plugin Name: Giggre Auth
 * Description: Custom registration & login for Taskers and Posters with role selection.
 * Version: 1.1
 * Author: Buddy
 */

if (!defined('ABSPATH')) exit;

/**
 * Create custom roles on plugin activation
 */
register_activation_hook(__FILE__, function () {
    add_role('tasker', 'Tasker', ['read' => true]);
    add_role('poster', 'Poster', [
        'read'                  => true,
        'edit_posts'            => true,
        'edit_published_posts'  => true,
        'delete_posts'          => true,
        'delete_published_posts'=> true,
        'publish_posts'         => true,
        'upload_files'          => true
    ]);
});

add_action('init', function () {
    $role = get_role('poster');
    if ($role) {
        $role->add_cap('read');
        $role->add_cap('edit_posts');
        $role->add_cap('edit_published_posts');
        $role->add_cap('delete_posts');
        $role->add_cap('delete_published_posts');
        $role->add_cap('publish_posts');
        $role->add_cap('upload_files');
    }
});

// Posters only see their own tasks
add_action('pre_get_posts', function($query) {
    if (
        is_admin() &&
        $query->is_main_query() &&
        $query->get('post_type') === 'giggre-task' &&
        !current_user_can('administrator') &&
        current_user_can('poster')
    ) {
        $query->set('author', get_current_user_id());
    }
});

// Hide the post list filters for Posters
add_filter('views_edit-giggre-task', function($views) {
    if (!current_user_can('administrator') && current_user_can('poster')) {
        // Keep only "Mine"
        return [
            'mine' => $views['mine'] ?? ''
        ];
    }
    return $views;
});

/**
 * Registration Form Shortcode
 */
function giggre_register_form() {
    ob_start();
    if (is_user_logged_in()) {
        // echo "<p>You are already registered.</p>";
        if (in_array('tasker', wp_get_current_user()->roles)) {
            wp_redirect(site_url('/tasker-dashboard/'));
        } else {
            wp_redirect(admin_url('/dashboard-poster/'));
        }
        return ob_get_clean();
    }
    ?>
    <div class="giggre-register-form">
        <h2>Create an Account</h2>
        <form method="post">
            <div>
                <label>Email</label><br>
                <input type="email" name="giggre_email" required>
            </div>
            <div>
                <label>Password</label><br>
                <input type="password" name="giggre_password" required>
            </div>
            <div>
                <label>I am a:</label><br>
                <select name="giggre_role" required>
                    <option value="tasker">Giggre</option>
                    <option value="poster">Gig Host</option>
                </select>
            </div>
            <div>
                <input type="submit" name="giggre_register_submit" value="Register">
            </div>
            <div style="margin-top:15px;" class="giggre-social-login">
                <p>Or register/login with:</p>
                <?php echo do_shortcode('[nextend_social_login provider="google"]'); ?>
            </div>
        </form>
    </div>
    <?php
    return ob_get_clean();
}
add_shortcode('giggre_register', 'giggre_register_form');

/**
 * Handle Manual Registration
 */
add_action('init', function () {
    if (isset($_POST['giggre_register_submit'])) {
        $email    = sanitize_email($_POST['giggre_email']);
        $password = sanitize_text_field($_POST['giggre_password']);
        $role     = sanitize_text_field($_POST['giggre_role']);

        if (email_exists($email)) {
            wp_die('This email is already registered.');
        }

        $user_id = wp_create_user($email, $password, $email);
        if (is_wp_error($user_id)) {
            wp_die($user_id->get_error_message());
        }

        $user = new WP_User($user_id);
        $user->set_role($role);

        wp_set_current_user($user_id);
        wp_set_auth_cookie($user_id);

        if ($role === 'tasker') {
            wp_redirect(site_url('/tasker-dashboard/'));
        } else {
            wp_redirect(admin_url('/dashboard-poster/
            '));
        }
        exit;
    }
});

/**
 * Login Form Shortcode
 */
function giggre_login_form() {
    ob_start();
    if (is_user_logged_in()) {
        // echo "<p>You are already logged in.</p>";
        if (in_array('tasker', wp_get_current_user()->roles)) {
            wp_redirect(site_url('/tasker-dashboard/'));
        } else {
            wp_redirect(admin_url('/dashboard-poster/'));
        }
        return ob_get_clean();
    }
    ?>
    <div class="giggre-login-form">
        <h2>Login to Your Account</h2>
        <form method="post">
            <div>
                <label>Email</label><br>
                <input type="email" placeholder="Enter your email" name="giggre_login_email" required>
            </div>
            <div class="giggre-password-wrapper">
                <label>Password</label><br>
                <input type="password" placeholder="Enter your password" name="giggre_login_password" id="giggre-password" required>
                <span class="toggle-password" onclick="giggreTogglePassword()">👁️</span>
            </div>
            <div>
                <input type="submit" name="giggre_login_submit" value="Login">
            </div>
            <div style="margin-top:15px;" class="giggre-social-login">
                <p>Or login with:</p>
                <?php echo do_shortcode('[nextend_social_login provider="google"]'); ?>
            </div>
        </form>
    </div>

    <?php
    return ob_get_clean();
}
add_shortcode('giggre_login', 'giggre_login_form');

/**
 * Handle Manual Login
 */
add_action('init', function () {
    if (isset($_POST['giggre_login_submit'])) {
        $creds = [
            'user_login'    => sanitize_email($_POST['giggre_login_email']),
            'user_password' => sanitize_text_field($_POST['giggre_login_password']),
            'remember'      => true,
        ];
        $user = wp_signon($creds, false);

        if (is_wp_error($user)) {
            wp_die($user->get_error_message());
        }

        if (in_array('tasker', $user->roles)) {
            wp_redirect(site_url('/tasker-dashboard/'));
        } elseif (in_array('poster', $user->roles)) {
            wp_redirect(admin_url('/dashboard-poster/'));
        } else {
            wp_redirect(site_url('/choose-role/'));
        }
        exit;
    }
});

/**
 * Step 2: Google Login Integration (Nextend Social Login)
 */

/**
 * When a new Google user is created, strip default role and mark as pending
 */
add_action('nsl_register_new_user', function($user_id, $provider) {
    $user = new WP_User($user_id);

    // Remove Subscriber or any other default role
    foreach ($user->roles as $role) {
        $user->remove_role($role);
    }

    // Ensure no capabilities remain
    delete_user_meta($user_id, 'wp_capabilities');

    // Mark user as pending role selection
    update_user_meta($user_id, 'giggre_needs_role', 1);

    // Debug (check wp-content/debug.log if WP_DEBUG enabled)
    if (method_exists($provider, 'get_id')) {
        error_log("✅ nsl_register_new_user fired: " . $provider->get_id() . " user {$user_id}");
    }
}, 100, 2);

/**
 * Redirect after Google/social login
 */
add_filter('nsl_login_redirect_url', function($url, $user_id, $provider) {
    $user = get_userdata($user_id);

    // If pending or no role → force Choose Role page
    if (
        get_user_meta($user_id, 'giggre_needs_role', true) ||
        empty($user->roles) ||
        (count($user->roles) === 1 && in_array('subscriber', $user->roles))
    ) {
        return site_url('/choose-role/');
    }

    // Tasker → Tasker dashboard
    if (in_array('tasker', (array) $user->roles)) {
        return site_url('/tasker-dashboard/');
    }

    // Poster → WP Admin edit.php (later: frontend dashboard)
    if (in_array('poster', (array) $user->roles)) {
        return admin_url('/dashboard-poster/');
    }

    // Fallback → homepage
    return site_url('/');
}, 99, 3);

/**
 * Safety fallback: catch login if Nextend redirect is bypassed
 */
add_action('wp_login', function($user_login, $user) {
    if (
        get_user_meta($user->ID, 'giggre_needs_role', true) ||
        empty($user->roles) ||
        (count($user->roles) === 1 && in_array('subscriber', $user->roles))
    ) {
        wp_safe_redirect(site_url('/choose-role/'));
        exit;
    }
}, 20, 2);

/**
 * Choose Role Shortcode
 */
function giggre_choose_role_form() {
    if (!is_user_logged_in()) return "<p>You must be logged in to choose a role.</p>";

    ob_start(); ?>
    <div class="giggre-role-form">
        <h2>Select Your Role</h2>
        <form method="post">
            <div>
                <label>Select your role:</label>
                <select name="giggre_role" required>
                    <option value="tasker">Giggre</option>
                    <option value="poster">Gig Host</option>
                </select>
            </div>
            <div>
                <input type="submit" name="giggre_choose_role_submit" value="Save Role">
            </div>
        </form>
    </div>

    <?php
    return ob_get_clean();
}
add_shortcode('giggre_choose_role', 'giggre_choose_role_form');

/**
 * Handle Choose Role Submission
 */
add_action('init', function () {
    if (isset($_POST['giggre_choose_role_submit']) && is_user_logged_in()) {
        $role = sanitize_text_field($_POST['giggre_role']);
        $user = wp_get_current_user();

        // Remove subscriber if still present
        $user->remove_role('subscriber');

        // Assign chosen role
        $user->set_role($role);

        // Clear pending flag
        delete_user_meta($user->ID, 'giggre_needs_role');

        // Redirect based on chosen role
        if ($role === 'tasker') {
            wp_redirect(site_url('/tasker-dashboard/'));
        } else {
            wp_redirect(admin_url('/dashboard-poster/'));
        }
        exit;
    }
});

/**
 * Force users with no role to Choose Role page
 */
add_action('wp_login', function($user_login, $user) {
    // If user has no role assigned
    if (empty($user->roles)) {
        wp_safe_redirect(site_url('/choose-role/'));
        exit;
    }
}, 30, 2);

/**
 * Restrict access to Choose Role page
 */
add_action('template_redirect', function () {
    if (is_page('choose-role') && is_user_logged_in()) {
        $user = wp_get_current_user();

        // If user already has tasker or poster role → block access
        if (in_array('tasker', (array) $user->roles) || in_array('poster', (array) $user->roles)) {
            wp_safe_redirect(site_url('/')); // or send them to dashboard
            exit;
        }
    }
});

/**
 * Limit Poster role wp-admin access — but NOT for administrators
 */
add_action('admin_menu', function () {
    $user = wp_get_current_user();

    // ✅ only hide menus if user is Poster AND NOT an Administrator
    if (in_array('poster', (array) $user->roles, true) && !in_array('administrator', (array) $user->roles, true)) {

        // Remove all default menus
        remove_menu_page('index.php');                  // Dashboard
        remove_menu_page('edit.php');                   // Posts
        remove_menu_page('upload.php');                 // Media
        remove_menu_page('edit.php?post_type=page');    // Pages
        remove_menu_page('edit-comments.php');          // Comments
        remove_menu_page('themes.php');                 // Appearance
        remove_menu_page('plugins.php');                // Plugins
        remove_menu_page('users.php');                  // Users
        remove_menu_page('tools.php');                  // Tools
        remove_menu_page('options-general.php');        // Settings

        // Remove plugin-specific menus
        remove_menu_page('edit.php?post_type=elementor_library');
        remove_menu_page('wpcf7');
        // Optional: remove profile page
        // remove_menu_page('profile.php');
    }
}, 999);


/**
 * Limit Poster role admin-bar items — but NOT for administrators
 */
add_action('admin_bar_menu', function ($wp_admin_bar) {
    $user = wp_get_current_user();

    // ✅ only clean admin bar if Poster but NOT Administrator
    if (in_array('poster', (array) $user->roles, true) && !in_array('administrator', (array) $user->roles, true)) {

        $wp_admin_bar->remove_node('wp-logo');
        $wp_admin_bar->remove_node('about');
        $wp_admin_bar->remove_node('wporg');
        $wp_admin_bar->remove_node('documentation');
        $wp_admin_bar->remove_node('support-forums');
        $wp_admin_bar->remove_node('feedback');
        $wp_admin_bar->remove_node('updates');
        $wp_admin_bar->remove_node('comments');
        $wp_admin_bar->remove_node('new-content');
        $wp_admin_bar->remove_node('customize');
        // $wp_admin_bar->remove_node('site-name');
    }
}, 999);




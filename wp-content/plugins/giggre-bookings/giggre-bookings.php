<?php
/**
 * Plugin Name: Giggre Bookings
 * Description: Handles booking system between Posters and Taskers.
 * Version: 1.1
 * Author: Buddy
 */

if (!defined('ABSPATH')) exit;

// === Includes === //
require_once plugin_dir_path(__FILE__) . 'includes/booking-handler.php';
require_once plugin_dir_path(__FILE__) . 'includes/display-functions.php';

// === Helpers === //
function giggre_get_status_class($status) {
    return match (strtolower(trim($status))) {
        'accept', 'accepted'   => 'tag success',
        'reject', 'rejected'   => 'tag error',
        'mark-completed'       => 'tag info',
        'completed'            => 'tag success',
        default                => 'tag warning',
    };
}

function giggre_get_status_label($status) {
    switch (strtolower(trim($status))) {
        case 'accept':
        case 'accepted':
            return __('Accepted', 'giggre');
        case 'reject':
        case 'rejected':
            return __('Rejected', 'giggre');
        case 'mark-completed':
            return __('Waiting Confirmation', 'giggre');
        case 'completed':
            return __('Completed', 'giggre');
        default:
            return __('Pending', 'giggre');
    }
}

// === Inline Styles for Status Tags === //
add_action('admin_head', function() {
    ?>
    <style>
        .tag {
            display:inline-block;
            padding:2px 8px;
            border-radius:3px;
            font-size:12px;
            font-weight:600;
            color:#fff;
        }
        .tag.success { background:#46b450; } /* WP green */
        .tag.error   { background:#dc3232; } /* WP red */
        .tag.warning { background:#ffb900; } /* WP orange */
        .tag.info    { background:#0073aa; } /* WP blue */
        .bulk-actions { margin-top: 10px; }
    </style>
    <?php
});

// === Admin Menu: "My Bookings" for Posters === //
add_action('admin_menu', function() {
    if (current_user_can('poster')) {
        add_menu_page(
            __('My Bookings', 'giggre'),
            __('My Bookings', 'giggre'),
            'read',
            'poster-bookings',
            'giggre_poster_bookings_page',
            'dashicons-groups',
            6
        );
    }
});

// === Poster Bookings Page === //
function giggre_poster_bookings_page() {
    ?>
    <div class="wrap">
        <h1><?php esc_html_e('My Bookings', 'giggre'); ?></h1>

        <?php
        $tasks = get_posts([
            'post_type'      => 'giggre-task',
            'author'         => get_current_user_id(),
            'posts_per_page' => -1,
        ]);

        if ($tasks) :
            foreach ($tasks as $task) :
                $taskers  = get_post_meta($task->ID, '_giggre_bookings', true);
                $statuses = get_post_meta($task->ID, '_giggre_booking_status', true);
                if (!is_array($taskers))  $taskers = [];
                if (!is_array($statuses)) $statuses = [];
                ?>
                <div id="task-<?php echo esc_attr($task->ID); ?>" style="margin-bottom:30px;">
                    <h2><?php echo esc_html($task->post_title); ?></h2>

                    <div class="giggre-bookings-list" data-task="<?php echo esc_attr($task->ID); ?>">
                        <?php if (!empty($taskers)) : ?>
                            <table class="wp-list-table widefat fixed striped">
                                <thead>
                                    <tr>
                                        <td id="cb" class="manage-column check-column">
                                            <input type="checkbox" id="cb-select-all">
                                        </td>
                                        <th style="width:25%;"><?php esc_html_e('Tasker Name', 'giggre'); ?></th>
                                        <th style="width:25%;"><?php esc_html_e('Email', 'giggre'); ?></th>
                                        <th style="width:15%;"><?php esc_html_e('Status', 'giggre'); ?></th>
                                        <th style="width:20%;"><?php esc_html_e('Date', 'giggre'); ?></th>
                                        <th style="width:15%;"><?php esc_html_e('Actions', 'giggre'); ?></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <?php foreach ($taskers as $tasker_id) :
                                        $tasker = get_userdata($tasker_id);
                                        if (!$tasker) continue;

                                        // Handle both array + string formats
                                        $status_data = $statuses[$tasker_id] ?? null;

                                        if (is_array($status_data)) {
                                            $status = $status_data['status'] ?? 'pending';
                                            $time   = $status_data['time'] ?? '';
                                        } else {
                                            $status = $status_data ?: 'pending';
                                            $time   = '';
                                        }

                                        $status_class = giggre_get_status_class($status);
                                        $status_label = giggre_get_status_label($status);
                                        ?>
                                        <tr>
                                            <th scope="row" class="check-column">
                                                <input type="checkbox" class="tasker-checkbox"
                                                    data-task="<?php echo esc_attr($task->ID); ?>"
                                                    value="<?php echo esc_attr($tasker_id); ?>">
                                            </th>
                                            <td><?php echo esc_html($tasker->display_name); ?></td>
                                            <td><?php echo esc_html($tasker->user_email); ?></td>
                                            <td>
                                                <span class="<?php echo esc_attr($status_class); ?>" data-tasker="<?php echo esc_attr($tasker_id); ?>">
                                                    <?php echo esc_html($status_label); ?>
                                                </span>
                                            </td>
                                            <td>
                                                <?php echo $time ? esc_html(date_i18n(get_option('date_format') . ' ' . get_option('time_format'), strtotime($time))) : '-'; ?>
                                            </td>
                                            <td>
                                                <?php if ($status === 'pending') : ?>
                                                    <button class="giggre-action button" data-action="accept"
                                                        data-task="<?php echo esc_attr($task->ID); ?>"
                                                        data-tasker="<?php echo esc_attr($tasker_id); ?>">Accept</button>
                                                    <button class="giggre-action button" data-action="reject"
                                                        data-task="<?php echo esc_attr($task->ID); ?>"
                                                        data-tasker="<?php echo esc_attr($tasker_id); ?>">Reject</button>
                                                <?php elseif (in_array(strtolower($status), ['accept', 'accepted'])) : ?>
                                                    <span class="button disabled">Task Ongoing</span>
                                                <?php elseif ($status === 'mark-completed') : ?>
                                                    <button class="giggre-action button button-secondary" data-action="completed"
                                                        data-task="<?php echo esc_attr($task->ID); ?>"
                                                        data-tasker="<?php echo esc_attr($tasker_id); ?>">Confirm Completed</button>
                                                <?php elseif ($status === 'completed') : ?>
                                                    <span class="button disabled">✅ Done</span>
                                                <?php elseif (in_array(strtolower($status), ['reject', 'rejected'])) : ?>
                                                    <span class="button disabled">❌ Rejected</span>
                                                <?php endif; ?>
                                            </td>
                                        </tr>
                                    <?php endforeach; ?>
                                </tbody>

                            </table>

                            <div class="bulk-actions">
                                <select id="bulk-action">
                                    <option value=""><?php esc_html_e('Bulk Actions', 'giggre'); ?></option>
                                    <option value="accept"><?php esc_html_e('Accept', 'giggre'); ?></option>
                                    <option value="reject"><?php esc_html_e('Reject', 'giggre'); ?></option>
                                    <option value="completed"><?php esc_html_e('Confirm Completed', 'giggre'); ?></option>
                                </select>
                                <button id="apply-bulk" class="button action"><?php esc_html_e('Apply', 'giggre'); ?></button>
                            </div>
                        <?php else : ?>
                            <p><?php esc_html_e('No Taskers booked this task yet.', 'giggre'); ?></p>
                        <?php endif; ?>
                    </div>
                </div>
            <?php endforeach; ?>
        <?php else : ?>
            <p><?php esc_html_e('You have no tasks yet.', 'giggre'); ?></p>
        <?php endif; ?>

        <?php if (current_user_can('poster') || current_user_can('administrator')) : ?>
            <form method="post" style="margin:10px 0;">
                <button type="submit" name="giggre_reload_page" class="button button-secondary">
                    🔄 Refresh Bookings
                </button>
            </form>

            <form method="post" style="margin-top:20px;">
                <input type="hidden" name="giggre_reset_bookings" value="1">
                <button type="submit" class="button button-danger">
                    <?php esc_html_e('Reset All Bookings (Test Only)', 'giggre'); ?>
                </button>
            </form>
        <?php endif; ?>

    </div>
    <?php
}

// === Enqueue Scripts (Frontend) === //
add_action('wp_enqueue_scripts', function() {
    wp_enqueue_script(
        'giggre-booking',
        plugin_dir_url(__FILE__) . 'booking.js',
        ['jquery'],
        '1.1',
        true
    );

    wp_localize_script('giggre-booking', 'giggre_ajax', [
        'ajax_url' => admin_url('admin-ajax.php'),
        'nonce'    => wp_create_nonce('giggre_booking_nonce')
    ]);
});

// === Enqueue Scripts (Admin) === //
add_action('admin_enqueue_scripts', function($hook) {
    if ($hook === 'toplevel_page_poster-bookings' && (current_user_can('poster') || current_user_can('administrator'))) {
        wp_enqueue_script(
            'giggre-poster-refresh',
            plugin_dir_url(__FILE__) . 'poster-refresh.js',
            ['jquery'],
            '1.1',
            true
        );
        wp_localize_script('giggre-poster-refresh', 'giggre_admin_ajax', [
            'ajax_url' => admin_url('admin-ajax.php'),
            'nonce'    => wp_create_nonce('giggre_booking_nonce')
        ]);
    }
});

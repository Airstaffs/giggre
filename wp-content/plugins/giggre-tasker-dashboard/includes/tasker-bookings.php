<?php
if (!defined('ABSPATH')) exit;

function giggre_render_tasker_bookings_html() {
    $user_id = get_current_user_id();

    if (!$user_id) {
        return '<p>You must be logged in to see bookings.</p>';
    }

    $args = [
        'post_type'      => 'giggre-task',
        'posts_per_page' => -1,
    ];
    $tasks = get_posts($args);

    $my_tasks = [];
    foreach ($tasks as $task) {
        $taskers = get_post_meta($task->ID, '_giggre_bookings', true);
        if (is_array($taskers) && in_array($user_id, $taskers)) {
            $my_tasks[] = $task;
        }
    }

    ob_start();

    if (!empty($my_tasks)) : ?>
        <div class="giggre-bookings-table-wrapper">
            <table class="giggre-bookings-table">
                <thead>
                    <tr>
                        <th>Task</th>
                        <th>Gig Poster</th>
                        <th>Status</th>
                        <th>Date</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                <?php foreach ($my_tasks as $task) :
                    $statuses = get_post_meta($task->ID, '_giggre_booking_status', true);
                    if (!is_array($statuses)) {
                        $statuses = [];
                    }

                    $status = 'pending';
                    $time   = '';
                    if (isset($statuses[$user_id])) {
                        if (is_array($statuses[$user_id])) {
                            $status = $statuses[$user_id]['status'] ?? 'pending';
                            $time   = $statuses[$user_id]['time'] ?? '';
                        } elseif (is_string($statuses[$user_id])) {
                            $status = $statuses[$user_id];
                        }
                    }

                    $poster = get_userdata($task->post_author);

                    $status_class = 'tag warning'; 
                    $status_label = ucfirst($status ?: 'pending');

                    switch (strtolower($status)) {
                        case 'accept':
                        case 'accepted':
                            $status_class = 'tag success';
                            $status_label = 'Accepted';
                            break;
                        case 'reject':
                        case 'rejected':
                            $status_class = 'tag error';
                            $status_label = 'Rejected';
                            break;
                        case 'mark-completed':
                            $status_class = 'tag info';
                            $status_label = 'Waiting for Poster Confirmation';
                            break;
                        case 'completed':
                            $status_class = 'tag success';
                            $status_label = 'Completed';
                            break;
                        default:
                            $status_class = 'tag warning';
                            $status_label = 'Pending';
                    }
                    ?>
                    <tr>
                        <td>
                            <a href="<?php echo esc_url(get_permalink($task->ID)); ?>">
                                <?php echo esc_html(get_the_title($task->ID)); ?>
                            </a>
                        </td>
                        <td><?php echo esc_html($poster ? $poster->display_name : 'Unknown'); ?></td>
                        <td><span class="<?php echo esc_attr($status_class); ?>"><?php echo esc_html($status_label); ?></span></td>
                        <td>
                            <?php echo $time 
                                ? esc_html(date_i18n(get_option('date_format').' '.get_option('time_format'), strtotime($time)))
                                : esc_html(get_the_date('', $task->ID)); ?>
                        </td>
                        <td>
                            <?php if (in_array(strtolower($status), ['accept', 'accepted'])) : ?>
                                <button class="giggre-complete-btn" 
                                        data-task="<?php echo esc_attr($task->ID); ?>">
                                    Mark Completed
                                </button>
                            <?php elseif ($status === 'mark-completed') : ?>
                                <em>Waiting for Poster Confirmation</em>
                            <?php elseif ($status === 'completed') : ?>
                                ✅ Done
                            <?php elseif (in_array(strtolower($status), ['reject', 'rejected'])) : ?>
                                ❌ Rejected
                            <?php else : ?>
                                —
                            <?php endif; ?>
                        </td>
                    </tr>
                <?php endforeach; ?>
                </tbody>
            </table>
        </div>
    <?php else : ?>
        <p>No bookings yet.</p>
    <?php endif;

    return ob_get_clean();
}

/**
 * AJAX handler to refresh Tasker bookings
 */
add_action('wp_ajax_giggre_render_tasker_bookings', function() {
    // Verify logged in
    if (!is_user_logged_in()) {
        wp_send_json_error(['message' => 'Not logged in']);
    }

    // Verify nonce
    if (!isset($_POST['nonce']) || !wp_verify_nonce($_POST['nonce'], 'giggre_booking_nonce')) {
        wp_send_json_error(['message' => 'Invalid request']);
    }

    wp_send_json_success([
        'html' => giggre_render_tasker_bookings_html()
    ]);
});

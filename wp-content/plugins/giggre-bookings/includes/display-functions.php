<?php
if (!defined('ABSPATH')) exit;

/**
 * Render bookings table for a given task
 */
function giggre_render_bookings_table($task_id) {
    $taskers  = get_post_meta($task_id, '_giggre_bookings', true);
    $statuses = get_post_meta($task_id, '_giggre_booking_status', true);
    if (!is_array($statuses)) $statuses = [];

    if (empty($taskers)) {
        echo '<p>No Taskers booked this task yet.</p>';
        return;
    }
    ?>
    <table class="wp-list-table widefat fixed striped">
        <thead>
            <tr>
                <th style="width:25%;">Tasker Name</th>
                <th style="width:25%;">Email</th>
                <th style="width:15%;">Status</th>
                <th style="width:20%;">Date</th>
                <th style="width:15%;">Actions</th>
            </tr>
        </thead>
        <tbody>
            <?php foreach ($taskers as $tasker_id) {
                echo giggre_render_booking_row($task_id, $tasker_id);
            } ?>
        </tbody>
    </table>

    <div class="bulk-actions">
        <select id="bulk-action">
            <option value="">Bulk Actions</option>
            <option value="accept">Accept</option>
            <option value="reject">Reject</option>
            <option value="completed">Confirm Completed</option>
        </select>
        <button id="apply-bulk" class="button action">Apply</button>
    </div>
    <?php
}

/**
 * Render a single booking row (Tasker) for a given task
 */
function giggre_render_booking_row($task_id, $tasker_id) {
    $tasker = get_userdata($tasker_id);
    if (!$tasker) return '';

    $statuses = get_post_meta($task_id, '_giggre_booking_status', true);
    if (!is_array($statuses)) $statuses = [];

    $status_data = $statuses[$tasker_id] ?? null;

    if (is_array($status_data)) {
        $status = $status_data['status'] ?? 'pending';
        $time   = $status_data['time'] ?? '';
    } else {
        $status = $status_data ?: 'pending';
        $time   = '';
    }

    $status_class = match (strtolower($status)) {
        'accept', 'accepted'   => 'tag success',
        'reject', 'rejected'   => 'tag error',
        'mark-completed'       => 'tag info',
        'completed'            => 'tag success',
        default                => 'tag warning',
    };

    $status_label = function_exists('giggre_get_status_label')
        ? giggre_get_status_label($status)
        : ucfirst($status);

    ob_start(); ?>
    <tr>
        <td><?php echo esc_html($tasker->display_name); ?></td>
        <td><?php echo esc_html($tasker->user_email); ?></td>
        <td>
            <span class="<?php echo esc_attr($status_class); ?> giggre-status" 
                  data-tasker="<?php echo esc_attr($tasker_id); ?>">
                <?php echo esc_html($status_label); ?>
            </span>
        </td>
        <td>
            <?php echo $time 
                ? esc_html(date_i18n(get_option('date_format').' '.get_option('time_format'), strtotime($time))) 
                : '-'; ?>
        </td>
        <td>
            <?php if ($status === 'pending') : ?>
                <button class="giggre-action button" data-action="accept"
                    data-task="<?php echo esc_attr($task_id); ?>"
                    data-tasker="<?php echo esc_attr($tasker_id); ?>">Accept</button>
                <button class="giggre-action button" data-action="reject"
                    data-task="<?php echo esc_attr($task_id); ?>"
                    data-tasker="<?php echo esc_attr($tasker_id); ?>">Reject</button>
            <?php elseif (in_array(strtolower($status), ['accept', 'accepted'])) : ?>
                <span class="button disabled">Task Ongoing</span>
            <?php elseif ($status === 'mark-completed') : ?>
                <button class="giggre-action button button-secondary" 
                    data-action="completed"
                    data-task="<?php echo esc_attr($task_id); ?>"
                    data-tasker="<?php echo esc_attr($tasker_id); ?>">
                    Confirm Completed
                </button>
            <?php elseif ($status === 'completed') : ?>
                <span class="button disabled">✅ Done</span>
            <?php elseif (in_array(strtolower($status), ['reject', 'rejected'])) : ?>
                <span class="button disabled">❌ Rejected</span>
            <?php endif; ?>
        </td>
    </tr>
    <?php
    return ob_get_clean();
}


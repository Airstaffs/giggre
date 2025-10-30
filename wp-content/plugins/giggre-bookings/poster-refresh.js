jQuery(document).ready(function($) {

    /**
     * Accept / Reject / Confirm Completed (single booking)
     */
    $(document).on('click', '.giggre-action', function(e) {
        e.preventDefault();

        const button   = $(this);
        const taskId   = button.data('task');
        const taskerId = button.data('tasker');
        let action     = button.data('action');

        // ✅ Normalize (Poster never sets mark-completed)
        if (action === 'mark-completed') {
            action = 'completed';
        }

        $.ajax({
            url: giggre_admin_ajax.ajax_url,
            method: 'POST',
            data: {
                action: 'giggre_update_status',
                nonce: giggre_admin_ajax.nonce,
                task_id: taskId,
                tasker_id: taskerId,
                booking_action: action
            },
            beforeSend: function() {
                button.prop('disabled', true).text('Processing...');
            },
            success: function(response) {
                if (response.success) {
                    // 🔹 Refresh this task’s table
                    refreshTaskTable(taskId);
                } else {
                    alert(response.data.message || 'Something went wrong');
                }
            },
            error: function() {
                alert('Server error. Please try again.');
            },
            complete: function() {
                // Row will be refreshed, so no need to reset original button text
                button.prop('disabled', false);
            }
        });
    });


    /**
     * Bulk Accept / Reject / Completed
     */
    $(document).on('click', '#apply-bulk', function(e) {
        e.preventDefault();

        let action = $('#bulk-action').val();
        if (!action) return alert('Please select a bulk action.');

        let taskers = [];
        let taskId = null;

        $('.tasker-checkbox:checked').each(function() {
            taskers.push($(this).val());
            taskId = $(this).data('task'); // assume same task
        });

        if (!taskers.length) return alert('No taskers selected.');

        // ✅ Normalize (Poster never sets mark-completed in bulk)
        if (action === 'mark-completed') {
            action = 'completed';
        }

        $.post(giggre_admin_ajax.ajax_url, {
            action: 'giggre_bulk_update_booking',
            nonce: giggre_admin_ajax.nonce,
            task_id: taskId,
            taskers: taskers,
            status: action
        }, function(response) {
            if (response.success) {
                refreshTaskTable(taskId);
            } else {
                alert(response.data.message || 'Something went wrong');
            }
        }).fail(function() {
            alert('Server error. Please try again.');
        });
    });


    /**
     * 🔄 Refresh a single task’s booking table via AJAX
     */
    function refreshTaskTable(taskId) {
        $.post(giggre_admin_ajax.ajax_url, {
            action: 'giggre_render_bookings',
            nonce: giggre_admin_ajax.nonce,
            task_id: taskId
        }, function(response) {
            if (response.success) {
                $('#task-' + taskId + ' .giggre-bookings-list').html(response.data.html);
            }
        }).fail(function() {
            alert('Failed to refresh bookings.');
        });
    }

});

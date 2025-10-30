jQuery(document).ready(function($) {
    // Tabs switching
    $('.giggre-tab-menu li').on('click', function() {
        var tab = $(this).data('tab');
        $('.giggre-tab-menu li').removeClass('active');
        $(this).addClass('active');
        $('.giggre-dashboard-section').removeClass('active');
        $('#tab-' + tab).addClass('active');
    });

    // Tasker clicks Mark Completed
    $(document).on('click', '.giggre-complete-btn', function(e) {
        e.preventDefault();

        const button = $(this);
        const taskId = button.data('task');

        $.ajax({
            url: giggreTaskerAjax.ajax_url,
            method: 'POST',
            data: {
                action: 'giggre_tasker_mark_completed',
                nonce: giggreTaskerAjax.nonce, 
                task_id: taskId
            },
            beforeSend: function() {
                button.prop('disabled', true).text('Processing...');
            },
            success: function(response) {
                if (response.success) {
                    // 🔄 Refresh Tasker bookings after marking completed
                    refreshTaskerBookings();
                } else {
                    alert(response.data.message || 'Something went wrong.');
                    button.prop('disabled', false).text('Mark Completed');
                }
            },
            error: function() {
                alert('Server error. Please try again.');
                button.prop('disabled', false).text('Mark Completed');
            }
        });
    });

    // Manual refresh
    $('#refresh-tasker-bookings').on('click', function() {
        refreshTaskerBookings();
    });

    // Refresh Tasker bookings
    function refreshTaskerBookings() {
        $.post(giggreTaskerAjax.ajax_url, {
            action: 'giggre_render_tasker_bookings',
            nonce: giggreTaskerAjax.nonce
        }, function(response) {
            if (response.success) {
                $('.giggre-bookings-list').html(response.data.html);
            } else {
                alert('Failed to refresh bookings');
            }
        }).fail(function() {
            alert('Failed to refresh bookings.');
        });
    }
});

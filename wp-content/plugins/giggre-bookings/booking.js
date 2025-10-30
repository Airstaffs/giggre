jQuery(document).ready(function($) {
    $(document).on('click', '.giggre-book-btn', function(e) {
        e.preventDefault();

        const btn    = $(this);
        const taskId = btn.data('task');

        $.ajax({
            url: giggre_ajax.ajax_url,
            method: 'POST',
            data: {
                action: 'giggre_book_task',
                task_id: taskId,
                nonce: giggre_ajax.nonce
            },
            beforeSend: function() {
                btn.prop('disabled', true).text('Booking...');
            },
            success: function(response) {
                if (response.success) {
                    btn.text('Booked ✅');

                    // 🔹 Update Poster dashboard if it’s open
                    const container = $('#task-' + response.data.task_id + ' .giggre-bookings-list');
                    if (container.length) {
                        if (response.data.html) {
                            // First booking → insert full table
                            container.html(response.data.html);
                        } else if (response.data.row) {
                            // Append only the new row
                            container.find('tbody').append(response.data.row);
                        }
                    }
                } else {
                    btn.prop('disabled', false).text('Book Task');
                    alert(response.data.message || 'Unable to book task.');
                }
            },
            error: function() {
                btn.prop('disabled', false).text('Book Task');
                alert('Server error. Please try again.');
            }
        });
    });
});

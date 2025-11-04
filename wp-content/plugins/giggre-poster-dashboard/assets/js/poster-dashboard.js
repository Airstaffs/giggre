jQuery(function ($) {
  // Tabs
  $(document).on('click', '.giggre-tab-menu li', function () {
    const tab = $(this).data('tab');
    $('.giggre-tab-menu li').removeClass('active');
    $(this).addClass('active');
    $('.giggre-dashboard-section').removeClass('active');
    $('#tab-' + tab).addClass('active');
  });

  // Role toggle
  $(document).on('change', '.giggre-switch-role-toggle', function () {
    const checkbox = $(this);
    const isOn = checkbox.is(':checked');
    const newRole = isOn ? checkbox.data('role-on') : checkbox.data('role-off');
    const label = checkbox.closest('.giggre-role-toggle').find('.role-label');
    label.text('Switching…');

    $.post(giggre_ajax.ajax_url, {
      action: 'giggre_switch_role',
      role: newRole,
      nonce: giggre_ajax.nonce
    }).done(function (res) {
      if (res && res.success) {
        label.text(res.data.message);
        setTimeout(() => { window.location.href = res.data.redirect; }, 500);
      } else {
        alert((res && res.data && res.data.message) || 'Error switching role');
        checkbox.prop('checked', !isOn);
        label.text(isOn ? 'Tasker Mode' : 'Poster Mode');
      }
    }).fail(function () {
      alert('Server error. Please try again.');
      checkbox.prop('checked', !isOn);
      label.text(isOn ? 'Tasker Mode' : 'Poster Mode');
    });
  });

  /**
   * Load bookings tables for each posted gig.
   * Matches your existing poster JS convention, which injects HTML into
   * #task-{id} .giggre-bookings-list after AJAX render:contentReference[oaicite:2]{index=2}.
   */
  $('.giggre-poster-task').each(function () {
    const section = $(this);
    const id = section.attr('id').replace('task-', '');
    renderBookings(id);
  });

  // Reusable renderer (same action your admin-side uses)
  function renderBookings(taskId) {
    $.post(giggre_ajax.ajax_url, {
      action: 'giggre_render_bookings',
      nonce: giggre_ajax.nonce,
      task_id: taskId
    }).done(function (res) {
      if (res && res.success) {
        $('#task-' + taskId + ' .giggre-bookings-list').html(res.data.html);
      } else {
        $('#task-' + taskId + ' .giggre-bookings-list').html('<p>Failed to load bookings.</p>');
      }
    }).fail(function () {
      $('#task-' + taskId + ' .giggre-bookings-list').html('<p>Server error.</p>');
    });
  }

  /**
   * Your existing admin-side buttons use .giggre-action and then call a refresh
   * on the same task’s table:contentReference[oaicite:3]{index=3}. We keep the same class so those events
   * still work if you reuse the same partials/buttons.
   */
  $(document).on('click', '.giggre-action', function (e) {
    e.preventDefault();
    const btn     = $(this);
    const taskId  = btn.data('task');
    const taskerId= btn.data('tasker');
    let   action  = btn.data('action');

    if (action === 'mark-completed') action = 'completed'; // normalize as in your existing file:contentReference[oaicite:4]{index=4}

    btn.prop('disabled', true).text('Processing…');

    $.post(giggre_ajax.ajax_url, {
      action: 'giggre_update_status',
      nonce: giggre_ajax.nonce,
      task_id: taskId,
      tasker_id: taskerId,
      booking_action: action
    }).done(function (res) {
      if (res && res.success) {
        renderBookings(taskId);
      } else {
        alert((res && res.data && res.data.message) || 'Something went wrong');
      }
    }).fail(function () {
      alert('Server error. Please try again.');
    }).always(function () {
      btn.prop('disabled', false);
    });
  });

  // Optional: bulk actions (same API you already use):contentReference[oaicite:5]{index=5}
  $(document).on('click', '#apply-bulk', function (e) {
    e.preventDefault();
    const action = $('#bulk-action').val();
    if (!action) return alert('Please select a bulk action.');

    let taskers = []; let taskId = null;
    $('.tasker-checkbox:checked').each(function () {
      taskers.push($(this).val());
      taskId = $(this).data('task');
    });

    if (!taskers.length) return alert('No taskers selected.');

    const normalized = (action === 'mark-completed') ? 'completed' : action;

    $.post(giggre_ajax.ajax_url, {
      action: 'giggre_bulk_update_booking',
      nonce: giggre_ajax.nonce,
      task_id: taskId,
      taskers: taskers,
      status: normalized
    }).done(function (res) {
      if (res && res.success) {
        renderBookings(taskId);
      } else {
        alert((res && res.data && res.data.message) || 'Something went wrong');
      }
    }).fail(function () {
      alert('Server error. Please try again.');
    });
  });

  // 🔹 DELETE gig
  $(document).on('click', '.giggre-delete-btn', function (e) {
    e.preventDefault();

    const btn = $(this);
    const taskId = btn.data('task');

    if (!confirm('Are you sure you want to delete this gig?')) return;

    $.ajax({
      url: giggre_ajax.ajax_url, // ✅ must be giggre_ajax, not giggre_admin_ajax
      type: 'POST',
      data: {
        action: 'giggre_delete_gig',
        nonce: giggre_ajax.nonce, // ✅ must match localized name
        task_id: taskId
      },
      beforeSend: function () {
        btn.prop('disabled', true).text('Deleting...');
      },
      success: function (response) {
        console.log(response); // 👈 helpful for debugging
        if (response.success) {
          $('#task-' + taskId).fadeOut(400, function () { $(this).remove(); });
        } else {
          alert(response.data.message || 'Error deleting gig.');
          btn.prop('disabled', false).text('🗑️ Delete');
        }
      },
      error: function (xhr) {
        console.error(xhr.responseText);
        alert('Server error, try again.');
        btn.prop('disabled', false).text('🗑️ Delete');
      }
    });
  });

  // 🔹 Open modal & load data
  $(document).on('click', '.giggre-edit-btn', function (e) {
    e.preventDefault();
    const taskId = $(this).data('task');

    $.post(giggre_ajax.ajax_url, {
      action: 'giggre_get_gig',
      nonce: giggre_ajax.nonce,
      task_id: taskId
    }).done(function (res) {
      if (res.success) {
        const d = res.data;
        $('#edit-task-id').val(taskId);
        $('#edit-title').val(d.title);
        $('#edit-location').val(d.location);
        $('#edit-price').val(d.price);
        $('#edit-time').val(d.time);
        $('#edit-inclusions').val(d.inclusions);

        if (d.image_url) {
          $('#edit-featured-preview').attr('src', d.image_url).show();
          $('#edit-featured-image').val(d.image_id);
          $('#giggre-remove-image').show();
        } else {
          $('#edit-featured-preview').hide();
          $('#edit-featured-image').val('');
          $('#giggre-remove-image').hide();
        }

        $('#giggre-edit-modal').fadeIn(200);
      } else {
        alert(res.data.message || 'Failed to load gig.');
      }
    });
  });

  // 🔹 Close modal when clicking the X or outside
  $(document).on('click', '.giggre-close', function () {
    $('#giggre-edit-modal').fadeOut(200);
  });

  $(document).on('click', function (e) {
    const modal = $('#giggre-edit-modal .giggre-modal-content');
    if (
      $('#giggre-edit-modal').is(':visible') &&
      !modal.is(e.target) &&
      modal.has(e.target).length === 0
    ) {
      $('#giggre-edit-modal').fadeOut(200);
    }
  });

  // 🔹 Save updates
  $(document).on('submit', '#giggre-edit-form', function (e) {
    e.preventDefault();

    const form = $(this);
    const formData = form.serializeArray();

    const data = { action: 'giggre_update_gig', nonce: giggre_ajax.nonce };
    formData.forEach(f => data[f.name] = f.value);

    $.post(giggre_ajax.ajax_url, data)
      .done(function (res) {
        console.log(res);
        if (res.success) {
          alert('✅ Gig updated successfully!');
          $('#giggre-edit-modal').fadeOut(200);
          // You can reload or just update the DOM dynamically
          location.reload();
        } else {
          alert(res.data.message || 'Failed to update gig.');
        }
      })
      .fail(function () {
        alert('Server error. Please try again.');
      });
  });

  // 🔹 Upload / Change Image (Upload-Only)

  let uploadFrame;

  $(document).on('click', '#giggre-upload-btn', function (e) {
    e.preventDefault();

    if (typeof wp === 'undefined' || !wp.media) {
      alert('Media uploader not available — please refresh the page.');
      return;
    }

    // Create a fresh frame every time to prevent cached UI
    uploadFrame = wp.media({
      title: 'Upload Featured Image',
      button: { text: 'Use this image' },
      library: { type: 'image' },
      multiple: false
    });

    // Force upload tab *after* frame is fully rendered
    uploadFrame.on('ready', function () {
      const $router = uploadFrame.$el.find('.media-router');
      const $uploadTab = $router.find('.media-menu-item-upload');
      $uploadTab.trigger('click');
      $router.find('.media-menu-item:not(.media-menu-item-upload)').hide();
    });

    uploadFrame.on('open', function () {
      // Safety fallback if "ready" misses timing
      setTimeout(() => {
        $('.media-router .media-menu-item:not(.media-menu-item-upload)').hide();
        $('.media-menu-item-upload').trigger('click');
      }, 200);
    });

    // On file select
    uploadFrame.on('select', function () {
      const attachment = uploadFrame.state().get('selection').first().toJSON();
      $('#edit-featured-image').val(attachment.id);
      $('#edit-featured-preview').attr('src', attachment.url).show();
      $('#giggre-remove-image').show();
    });

    uploadFrame.open();
  });

  // 🔹 Remove image
  $(document).on('click', '#giggre-remove-image', function (e) {
    e.preventDefault();
    $('#edit-featured-image').val('');
    $('#edit-featured-preview').hide();
    $(this).hide();
  });

});

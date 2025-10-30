<?php
if (!defined('ABSPATH')) exit;

/**
 * 🔹 Check if a task is still available (no accepted/completed bookings).
 */
if (!function_exists('giggre_task_is_available')) {
    function giggre_task_is_available($task_id) {
        $statuses = get_post_meta($task_id, '_giggre_booking_status', true);
        if (!is_array($statuses)) {
            return true; // no bookings → available
        }

        foreach ($statuses as $user_id => $user_booking_data) {
            if (is_array($user_booking_data) && isset($user_booking_data['status'])) {
                $status = $user_booking_data['status'];
                if (in_array($status, ['accept', 'completed', 'mark-completed'], true)) {
                    return false; // ❌ hide if already taken
                }
            }
        }
        return true; // ✅ still available
    }
}

/**
 * 🔹 Shortcode: [giggre_tasker_dashboard]
 * Renders the Tasker Dashboard with profile and bookings sections.
 */
function giggre_tasker_dashboard_shortcode() {
    if (defined('DONOTCACHEPAGE') === false) {
        define('DONOTCACHEPAGE', true);
    }
    nocache_headers();

    if (!is_user_logged_in()) {
        return '<p>Please log in to access your dashboard.</p>';
    }

    $user = wp_get_current_user();
    if (!in_array('tasker', (array) $user->roles) && !in_array('administrator', (array) $user->roles)) {
        return '<p>You do not have permission to view this page.</p>';
    }

    ob_start(); ?>

    <?php if (isset($_GET['updated']) && in_array($_GET['updated'], ['1', 'true'], true)) : ?>
        <div class="giggre-success-message">
            ✅ Profile updated successfully!
        </div>
    <?php endif; ?>

    <div class="giggre-tasker-dashboard-main-wrapper">
        <div class="giggre-dashboard-header">
            <h2 class="giggre-dashboard-title">Giggre Dashboard</h2>
            <div class="giggre-user-info">
                <?php 
                $photo = get_field('profile_photo', 'user_' . $user->ID);
                if ($photo) : ?>
                    <img src="<?php echo esc_url($photo['url']); ?>" 
                        alt="<?php echo esc_attr($user->display_name); ?>" 
                        class="giggre-user-photo">
                <?php else : ?>
                    <?php echo get_avatar($user->ID, 80, '', $user->display_name, array('class' => 'giggre-user-photo')); ?>
                <?php endif; ?>
                <?php
                $name = get_field('full_name', 'user_' . $user->ID);
                if ($name) {
                    echo '<p>Welcome, <b>' . esc_html($name) . '</b>!</p>';
                } else {
                    echo '<p>Welcome, <b>' . esc_html($user->display_name) . '</b>!</p>';
                }
                ?>
            </div>
        </div>

        <div class="giggre-tasker-dashboard">
            <div class="giggre-dashboard-tabs">
                <ul class="giggre-tab-menu">
                    <li data-tab="profile">👤 My Profile</li>
                    <li class="active" data-tab="payouts">🔎 Browse Gigs</li>
                    <li data-tab="bookings">📋 My Gigs</li>
                </ul>

                <div class="giggre-tab-content">

                    <!-- Profile -->
                    <div id="tab-profile" class="giggre-dashboard-section">
                        <h3>My Profile</h3>
                        <?php if (function_exists('acf_form')) {
                            acf_form(array(
                                'post_id'        => 'user_' . $user->ID,
                                'field_groups'   => array('group_68c070237ef65'),
                                'submit_value'   => 'Save Profile',
                                'return'         => add_query_arg('updated', '1', get_permalink()),
                                'updated_message'=> false
                            ));
                        } ?>
                    </div>

                    <!-- Browse Gigs -->
                    <div id="tab-payouts" class="giggre-dashboard-section active">
                        <h3>🔎 Get a Gigs</h3>

                        <!-- 🔹 Filter Controls -->
                        <div class="giggre-task-filters">
                            <div class="giggre-filters-row">
                                <!-- Search Input -->
                                <div class="giggre-search-box">
                                    <input type="text" id="task-search" placeholder="Search gigs by title..." class="giggre-search-field">
                                </div>
                                <!-- Category Dropdown -->
                                <div class="giggre-category-box">
                                    <select id="task-category" class="giggre-category-field">
                                        <option value="">All Categories</option>
                                        <?php 
                                        $categories = get_terms(array(
                                            'taxonomy' => 'category',
                                            'hide_empty' => false,
                                        ));
                                        if (!is_wp_error($categories) && !empty($categories)) {
                                            foreach ($categories as $category) {
                                                echo '<option value="' . esc_attr($category->slug) . '">' . esc_html($category->name) . '</option>';
                                            }
                                        }
                                        ?>
                                    </select>
                                </div>
                            </div>
                        </div>

                        <!-- Task Container -->
                        <div id="tasks-list">
                            <?php echo do_shortcode('[giggre_tasks]'); ?>
                        </div>
                    </div>

                    <!-- My Gigs -->
                    <div id="tab-bookings" class="giggre-dashboard-section">
                        <h3>📋 My Gigs</h3>
                        <button type="button" id="refresh-tasker-bookings" class="button button-secondary" style="margin:10px 0;">
                            🔄 Refresh Gigs
                        </button>
                        <div class="giggre-bookings-list">
                            <?php echo giggre_render_tasker_bookings_html(); ?>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    </div>

    <!-- 🔹 Inline Script -->
    <script type="text/javascript">
    jQuery(document).ready(function($) {
        // TAB FUNCTIONALITY
        $('.giggre-tab-menu li').on('click', function() {
            var tab = $(this).data('tab');
            $('.giggre-tab-menu li').removeClass('active');
            $(this).addClass('active');
            $('.giggre-dashboard-section').removeClass('active');
            $('#tab-' + tab).addClass('active');
        });

        /**
         * 🔎 TASK FILTERING
         */
        var searchTimer;
        $('#task-search').on('input', function() {
            clearTimeout(searchTimer);
            searchTimer = setTimeout(filterTasks, 500);
        });
        $('#task-category').on('change', function() {
            filterTasks();
        });
        function filterTasks() {
            var searchValue   = $('#task-search').val().trim();
            var categoryValue = $('#task-category').val();
            var tasksContainer = $('#tasks-list');
            tasksContainer.addClass('tasks-loading');
            $.ajax({
                url: '<?php echo admin_url('admin-ajax.php'); ?>',
                type: 'POST',
                data: {
                    action: 'filter_giggre_tasks',
                    search: searchValue,
                    category: categoryValue,
                    nonce: '<?php echo wp_create_nonce('giggre_booking_nonce'); ?>'
                },
                success: function(response) {
                    if (response.success) {
                        tasksContainer.html(response.data);
                    } else {
                        tasksContainer.html('<p class="no-task">No tasks found.</p>');
                    }
                },
                error: function() {
                    tasksContainer.html('<p class="no-task">Error loading tasks.</p>');
                },
                complete: function() {
                    tasksContainer.removeClass('tasks-loading');
                }
            });
        }

        /**
         * 🔄 Refresh Bookings
         */
        $('#refresh-tasker-bookings').on('click', function() {
            $.post('<?php echo admin_url('admin-ajax.php'); ?>', {
                action: 'giggre_render_tasker_bookings',
                nonce: '<?php echo wp_create_nonce('giggre_tasker_nonce'); ?>'
            }, function(response) {
                if (response.success) {
                    $('.giggre-bookings-list').html(response.data.html);
                } else {
                    alert('Failed to refresh bookings');
                }
            });
        });
    });
    </script>

    <?php
    return ob_get_clean();
}
add_shortcode('giggre_tasker_dashboard', 'giggre_tasker_dashboard_shortcode');

/**
 * 🔹 AJAX Handler: Filter Gigs by Title + Category
 */
function handle_filter_giggre_tasks() {
    if (!wp_verify_nonce($_POST['nonce'], 'giggre_booking_nonce')) {
        wp_die('Security check failed');
    }

    $search   = sanitize_text_field($_POST['search'] ?? '');
    $category = sanitize_text_field($_POST['category'] ?? '');

    $args = [
        'post_type'      => 'giggre-task',
        'post_status'    => 'publish',
        'posts_per_page' => -1,
        'orderby'        => 'date',
        'order'          => 'DESC',
    ];

    if ($search) {
        $args['s'] = $search;
    }

    if ($category) {
        $args['tax_query'] = [
            [
                'taxonomy' => 'category',
                'field'    => 'slug',
                'terms'    => $category,
            ]
        ];
    }

    $query = new WP_Query($args);

    if ($query->have_posts()) {
        ob_start();
        echo '<div class="giggre-task-list">';
        while ($query->have_posts()) : $query->the_post();
            if (giggre_task_is_available(get_the_ID())) : ?>
                <div class="giggre-task-card">
                    <?php if (has_post_thumbnail()) : ?>
                        <div class="giggre-task-thumb"><?php the_post_thumbnail('medium'); ?></div>
                    <?php endif; ?>
                    <div class="giggre-task-text">
                        <h3 class="giggre-task-title"><?php the_title(); ?></h3>
                        <div class="defualt name"><strong>Name:</strong> <?php echo esc_html(get_field('name')); ?></div>
                        <div class="defualt location"><strong>Location:</strong> <?php echo esc_html(get_field('location')); ?></div>
                        <div class="defualt time"><strong>Approx.</strong> <?php echo esc_html(get_field('approx_time')); ?></div>
                        <div class="defualt includes"><strong>Included:</strong> <?php echo esc_html(get_field('tasks_inclusions')); ?></div>
                        <div class="defualt price"><strong>Price:</strong> $<?php echo esc_html(get_field('price')); ?></div>
                        <?php if (is_user_logged_in() && in_array('tasker', (array) wp_get_current_user()->roles)) : ?>
                            <button class="giggre-task-button giggre-book-btn" data-task="<?php the_ID(); ?>">Take Gig</button>
                        <?php else : ?>
                            <button class="giggre-task-button giggre-book-btn-disabled">Take Gig</button>
                        <?php endif; ?>
                    </div>
                </div>
            <?php endif;
        endwhile;
        echo '</div>';
        wp_reset_postdata();

        wp_send_json_success(ob_get_clean());
    } else {
        wp_send_json_success('<p class="no-task">No tasks found.</p>');
    }

    wp_die();
}
add_action('wp_ajax_filter_giggre_tasks', 'handle_filter_giggre_tasks');
add_action('wp_ajax_nopriv_filter_giggre_tasks', 'handle_filter_giggre_tasks');

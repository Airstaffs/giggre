<?php
if (!defined('ABSPATH')) exit;

/**
 * [giggre_poster_dashboard]
 * Front-end dashboard for users with the "poster" role.
 */
function giggre_poster_dashboard_shortcode() {
    if (!is_user_logged_in()) {
        return '<p>Please log in to access your dashboard.</p>';
    }

    // 🔹 This line is CRUCIAL for ACF form processing
    if (function_exists('acf_form_head')) {
        acf_form_head();
    }

    $user = wp_get_current_user();
    if (!in_array('poster', (array) $user->roles, true) && !in_array('administrator', (array) $user->roles, true)) {
        return '<p>You do not have permission to view this page.</p>';
    }

    $is_tasker = in_array('tasker', (array) $user->roles, true);

    // Fetch all gigs authored by this Poster
    $q = new WP_Query([
        'post_type'      => 'giggre-task',
        'post_status'    => 'publish',
        'posts_per_page' => -1,
        'author'         => $user->ID,
        'orderby'        => 'date',
        'order'          => 'DESC',
    ]);

    ob_start(); ?>
    <div class="giggre-poster-dashboard">
        <div class="giggre-dashboard-header">
            <h2>Gig Host Dashboard</h2>

            <!-- Role switch -->
            <div class="giggre-role-toggle">
                <label class="switch">
                    <input
                        type="checkbox"
                        class="giggre-switch-role-toggle"
                        data-role-on="tasker"
                        data-role-off="poster"
                        <?php echo $is_tasker ? 'checked' : ''; ?>
                    >
                    <span class="slider round"></span>
                </label>
                <span class="role-label"><?php echo $is_tasker ? 'Tasker Mode' : 'Poster Mode'; ?></span>
            </div>
        </div>

        <div class="giggre-dashboard-tabs">
            <ul class="giggre-tab-menu">
                <li class="active" data-tab="my-gigs">📋 My Posted Gigs</li>
                <li data-tab="new-gig">➕ Post New Gig</li>
                <li data-tab="bookings">👥 All Gig</li>
            </ul>

            <div class="giggre-tab-content">
                <!-- My gigs (each with bookings table placeholder) -->
                <div id="tab-my-gigs" class="giggre-dashboard-section active">
                    <?php if ($q->have_posts()) : ?>
                        <?php while ($q->have_posts()) : $q->the_post(); ?>
                            <section id="task-<?php the_ID(); ?>" class="giggre-poster-task">
                                <h3 class="giggre-task-title"><?php the_title(); ?></h3>

                                <!-- task meta bits (optional) -->
                                <div class="giggre-task-meta">
                                    <?php if ($price = get_field('price')): ?>
                                        <span class="meta"><strong>Price:</strong> $<?php echo esc_html($price); ?></span>
                                    <?php endif; ?>
                                    <?php if ($loc = get_field('location')): ?>
                                        <span class="meta"><strong>Location:</strong> <?php echo esc_html($loc); ?></span>
                                    <?php endif; ?>
                                </div>

                                <!-- BOOKINGS TABLE gets injected here via AJAX -->
                                <div class="giggre-bookings-list"><em>Loading bookings…</em></div>
                            </section>
                        <?php endwhile; wp_reset_postdata(); ?>
                    <?php else: ?>
                        <p>No gigs posted yet.</p>
                    <?php endif; ?>
                </div>

                <!-- ACF form (optional) to post new gig -->
                <div id="tab-new-gig" class="giggre-dashboard-section">
                    <?php
                    if (function_exists('acf_form')) {

                        // 🔹 Build category checkboxes only
                        ob_start();
                        ?>
                        <div class="acf-extra-fields giggre-extra-meta">
                            <h4>Categories</h4>
                            <div class="giggre-category-checkboxes">
                                <?php
                                $categories = get_terms([
                                    'taxonomy'   => 'category',
                                    'hide_empty' => false,
                                ]);

                                if (!empty($categories) && !is_wp_error($categories)) {
                                    foreach ($categories as $category) {
                                        echo '<label class="giggre-cat-item">';
                                        echo '<input type="checkbox" name="post_category[]" value="' . esc_attr($category->term_id) . '"> ';
                                        echo esc_html($category->name);
                                        echo '</label>';
                                    }
                                } else {
                                    echo '<p>No categories found.</p>';
                                }
                                ?>
                            </div>
                        </div>
                        <?php
                        $category_fields = ob_get_clean();

                        // 🔹 Render the ACF form (ACF will render the Featured Image field)
                        acf_form([
                            'post_id'       => 'new_post',
                            'new_post'      => [
                                'post_type'   => 'giggre-task',
                                'post_status' => 'publish',
                            ],
                            'post_title'    => true,
                            'field_groups'  => ['group_68b9efcdb76e1'], // your ACF group with featured_image_acf
                            'submit_value'  => 'Publish Gig',
                            'updated_message' => false,
                            'html_after_fields' => $category_fields, // ✅ only categories now
                        ]);

                    } else {
                        echo '<p>ACF not active. Add your gig creation form here.</p>';
                    }
                    ?>
                </div>

                <!-- Aggregate bookings view -->
                <div id="tab-bookings" class="giggre-dashboard-section">
                    <?php if ($q->have_posts()) : ?>
                        <?php while ($q->have_posts()) : $q->the_post(); ?>
                            <section id="task-<?php the_ID(); ?>" class="giggre-poster-task">
                                <h3 class="giggre-task-title"><?php the_title(); ?></h3>

                                <!-- BOOKINGS TABLE gets injected here via AJAX -->
                                <div class="giggre-bookings-list"><em>Loading bookings…</em></div>
                            </section>
                        <?php endwhile; wp_reset_postdata(); ?>
                    <?php else: ?>
                        <p>No gigs posted yet.</p>
                    <?php endif; ?>
                </div>
            </div>
        </div>
    </div>
    <?php
    return ob_get_clean();
}
add_shortcode('giggre_poster_dashboard', 'giggre_poster_dashboard_shortcode');

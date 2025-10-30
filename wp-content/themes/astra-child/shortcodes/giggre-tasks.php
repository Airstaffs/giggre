<?php
if (!defined('ABSPATH')) exit;

/**
 * 🔹 Shortcode: [giggre_tasks]
 */
function giggre_tasks_shortcode($atts) {
    if (defined('DONOTCACHEPAGE') === false) {
        define('DONOTCACHEPAGE', true);
    }
    nocache_headers();

    $atts = shortcode_atts([
        'category' => '',
        'limit'    => -1,
    ], $atts, 'giggre_tasks');
    
    $args = [
        'post_type'      => 'giggre-task',
        'posts_per_page' => intval($atts['limit']),
        'orderby'        => 'date',
        'order'          => 'DESC',
    ];
    
    if ($atts['category']) {
        $args['tax_query'] = [[
            'taxonomy' => 'category',
            'field'    => 'slug',
            'terms'    => $atts['category'],
        ]];
    }
    
    $query = new WP_Query($args);
    $available_tasks = [];

    if ($query->have_posts()) {
        while ($query->have_posts()) {
            $query->the_post();
            $task_id = get_the_ID();

            // 🔹 Use the helper from plugin
            if (function_exists('giggre_task_is_available') && giggre_task_is_available($task_id)) {
                $available_tasks[] = get_post();
            }
        }
        wp_reset_postdata();
    }
    
    ob_start();
    if (!empty($available_tasks)) : ?>
        <div class="giggre-task-list">
            <?php foreach ($available_tasks as $task) : 
                setup_postdata($task); ?>
                <div class="giggre-task-card">
                    <?php if (has_post_thumbnail($task->ID)) : ?>
                        <div class="giggre-task-thumb">
                            <?php echo get_the_post_thumbnail($task->ID, 'medium'); ?>
                        </div>
                    <?php endif; ?>
                    <div class="giggre-task-text">
                        <h3 class="giggre-task-title"><?php echo esc_html($task->post_title); ?></h3>
                        <div class="defualt name"><strong>Name:</strong> <?php echo esc_html(get_field('name', $task->ID)); ?></div>
                        <div class="defualt location"><strong>Location:</strong> <?php echo esc_html(get_field('location', $task->ID)); ?></div>
                        <div class="defualt time"><strong>Approx.</strong> <?php echo esc_html(get_field('approx_time', $task->ID)); ?></div>
                        <div class="defualt includes"><strong>Included:</strong> <?php echo esc_html(get_field('tasks_inclusions', $task->ID)); ?></div>
                        <div class="defualt price"><strong>Price:</strong> $<?php echo esc_html(get_field('price', $task->ID)); ?></div>
                        <?php if (is_user_logged_in() && in_array('tasker', (array) wp_get_current_user()->roles)) : ?>
                            <button 
                                class="giggre-task-button giggre-book-btn" 
                                data-task="<?php echo $task->ID; ?>">
                                Take Gig
                            </button>
                        <?php else : ?>
                            <button 
                                class="giggre-task-button giggre-book-btn-disabled" 
                                data-task="<?php echo $task->ID; ?>">
                                Take Gig (Login as Tasker to book)
                            </button>
                        <?php endif; ?>
                    </div>
                </div>
            <?php endforeach; 
            wp_reset_postdata(); ?>
        </div>
    <?php else : ?>
        <p class="no-task">No Gigs found.</p>
    <?php endif;
    
    return ob_get_clean();
}
add_shortcode('giggre_tasks', 'giggre_tasks_shortcode');

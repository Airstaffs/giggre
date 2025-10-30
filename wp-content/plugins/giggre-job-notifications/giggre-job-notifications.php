<?php
/**
 * Plugin Name: Giggre Job Notifications
 * Description: Sends emails when a user applies to a job and when an application is accepted.
 * Version: 1.0.0
 * Author: Your Name
 */

if (!defined('ABSPATH')) { exit; }

/**
 * UTIL: Send HTML email with branded headers.
 */
function giggre_send_html_email($to, $subject, $html, $reply_to = '') {
    $headers = array('Content-Type: text/html; charset=UTF-8');
    if ($reply_to) {
        $headers[] = 'Reply-To: ' . $reply_to;
    }
    // Let site owners adjust subject/body/headers if needed
    $subject = apply_filters('giggre_email_subject', $subject);
    $html    = apply_filters('giggre_email_body', $html);
    $headers = apply_filters('giggre_email_headers', $headers);

    return wp_mail($to, $subject, $html, $headers);
}

/**
 * TEMPLATES (minimal inline styles for safe rendering)
 */
function giggre_email_wrap($content, $title = '') {
    $styles = 'font-family:Segoe UI,Roboto,Helvetica,Arial,sans-serif;font-size:15px;line-height:1.6;color:#111;';
    $box    = 'max-width:560px;margin:0 auto;padding:24px;border:1px solid #e5e7eb;border-radius:8px;';
    $h1     = 'margin:0 0 12px;font-size:18px;';
    $hr     = 'border:none;border-top:1px solid #e5e7eb;margin:20px 0;';
    $muted  = 'color:#6b7280;font-size:13px;';
    $home   = esc_url( home_url('/') );

    ob_start(); ?>
    <div style="<?php echo esc_attr($styles); ?>">
      <div style="<?php echo esc_attr($box); ?>">
        <?php if ($title): ?>
          <h1 style="<?php echo esc_attr($h1); ?>"><?php echo esc_html($title); ?></h1>
        <?php endif; ?>
        <div><?php echo wp_kses_post(wpautop($content)); ?></div>
        <hr style="<?php echo esc_attr($hr); ?>" />
        <p style="<?php echo esc_attr($muted); ?>">
          This is an automated message from <a href="<?php echo $home; ?>"><?php echo esc_html(parse_url($home, PHP_URL_HOST)); ?></a>.
        </p>
      </div>
    </div>
    <?php
    return ob_get_clean();
}

/**
 * EVENT 1: Someone applies to a job
 *
 * Usage: fire this when your "Apply" action succeeds:
 *   do_action('giggre_job_applied', $application_id, $job_id, $applicant_user_id);
 */
add_action('giggre_job_applied', function($application_id, $job_id, $applicant_user_id) {
    $job      = get_post($job_id);
    if (!$job || 'publish' !== $job->post_status) return;

    $employer_id    = $job->post_author;
    $employer       = get_userdata($employer_id);
    $applicant      = get_userdata($applicant_user_id);

    if (!$employer || !$applicant) return;

    $employer_email = $employer->user_email;
    $applicant_name = $applicant->display_name ?: $applicant->user_login;
    $job_title      = get_the_title($job);
    $job_link       = get_permalink($job) ?: home_url('/');

    // Subject & Body (Employer notification)
    $subject = sprintf('New application for "%s"', $job_title);
    $body    = sprintf(
        "Hello %s,\n\n%s has just applied to your job: %s.\n\nView job: %s\n\nApplication ID: #%d",
        $employer->display_name ?: $employer->user_login,
        $applicant_name,
        $job_title,
        $job_link,
        (int) $application_id
    );

    giggre_send_html_email($employer_email, $subject, giggre_email_wrap($body, 'New Job Application'));

    // Optional: also notify the applicant (confirmation)
    $subject_app = sprintf('Your application to "%s" was received', $job_title);
    $body_app    = sprintf(
        "Hi %s,\n\nThanks for applying to \"%s\". The employer has been notified and may contact you soon.\n\nView job: %s\n\nApplication ID: #%d",
        $applicant_name,
        $job_title,
        $job_link,
        (int) $application_id
    );

    giggre_send_html_email($applicant->user_email, $subject_app, giggre_email_wrap($body_app, 'Application Received'));
}, 10, 3);

/**
 * EVENT 2: Employer accepts an application
 *
 * Usage: fire this when an application status becomes "accepted":
 *   do_action('giggre_application_accepted', $application_id, $job_id, $applicant_user_id, $employer_user_id);
 */
add_action('giggre_application_accepted', function($application_id, $job_id, $applicant_user_id, $employer_user_id = 0) {
    $job        = get_post($job_id);
    if (!$job) return;

    $applicant  = get_userdata($applicant_user_id);
    $employer   = $employer_user_id ? get_userdata($employer_user_id) : get_userdata($job->post_author);
    if (!$applicant || !$employer) return;

    $applicant_email = $applicant->user_email;
    $employer_name   = $employer->display_name ?: $employer->user_login;
    $job_title       = get_the_title($job);
    $job_link        = get_permalink($job) ?: home_url('/');

    // Notify Applicant
    $subject_app = sprintf('Accepted: "%s"', $job_title);
    $body_app    = sprintf(
        "Great news, %s!\n\nYour application for \"%s\" has been accepted by %s.\n\nView job: %s\n\nApplication ID: #%d",
        $applicant->display_name ?: $applicant->user_login,
        $job_title,
        $employer_name,
        $job_link,
        (int) $application_id
    );
    giggre_send_html_email($applicant_email, $subject_app, giggre_email_wrap($body_app, 'Application Accepted'));

    // Optional: Notify Employer (receipt)
    $subject_emp = sprintf('You accepted an application for "%s"', $job_title);
    $body_emp    = sprintf(
        "Hi %s,\n\nYou accepted an application for \"%s\".\n\nView job: %s\n\nApplication ID: #%d\n\nYou can now reach out to the applicant to coordinate next steps.",
        $employer_name,
        $job_title,
        $job_link,
        (int) $application_id
    );
    giggre_send_html_email($employer->user_email, $subject_emp, giggre_email_wrap($body_emp, 'Acceptance Confirmed'));
}, 10, 4);

/**
 * OPTIONAL INTEGRATIONS:
 * If you use a jobs/applications plugin, you can hook their events here and forward to our actions.
 * (These are examples; comment/uncomment based on your stack.)
 */

// Example (pseudo) for a custom "application created" event.
// add_action('my_plugin_application_created', function($application_id, $job_id, $user_id) {
//     do_action('giggre_job_applied', $application_id, $job_id, $user_id);
// }, 10, 3);

// Example (pseudo) for a custom "application status updated" event.
// add_action('my_plugin_application_status_changed', function($application_id, $job_id, $user_id, $new_status, $by_user_id) {
//     if ('accepted' === $new_status) {
//         do_action('giggre_application_accepted', $application_id, $job_id, $user_id, $by_user_id);
//     }
// }, 10, 5);


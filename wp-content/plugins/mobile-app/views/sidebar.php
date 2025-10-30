<div class="canvas-sidebar">

	<div class="canvas-side-block ml-open-welcome">
		<a href="<?php echo esc_attr('https://canvas.mobiloud.com/?utm_source=' . CanvasAdmin::$utm_source . '&utm_medium=sidebar'); ?>" target="_blank"
			class="button button-hero button-primary canvas-fullwidth app-builder-btn">
			App Configuration Tool
		</a>
	</div>

	<?php if ( CanvasAdmin::welcome_screen_is_avalaible() ) : ?>
		<div class="canvas-side-block ml-open-welcome talk-to-expert">
			<a href="<?php echo esc_attr('https://www.mobiloud.com/demo?utm_source=' . CanvasAdmin::$utm_source . '&utm_medium=sidebar'); ?>" target="_blank"
				class="button button-hero button-primary canvas-fullwidth app-builder-btn">
				Talk To An Expert
			</a>
		</div>
	<?php endif; ?>

	<div class="canvas-side-block">
		<div class="canvas-side-header">Help & Support</div>
		<div class="canvas-side-body">
			<p>Make sure to check our Help Center for more details on how to build your app.</p>
			<p><a href="https://mobiloud.com/docs" target="_blank">MobiLoud Help Center</a></p>
			<p><a href="mailto:support@mobiloud.com">Send us an email</a></p>
		</div>
	</div>

	<div class="canvas-side-block">
		<div class="canvas-side-header">Like our plugin?</div>
		<div class="canvas-side-body">
			<p>If you enjoy our service, don't forget to rate it with 5 stars on WordPress.org!</p>
			<p><a href="https://wordpress.org/support/plugin/mobile-app/reviews/#new-post" target="_blank">Rate this plugin</a></p>
		</div>
	</div>
</div>

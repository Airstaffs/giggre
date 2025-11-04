<?php
define( 'WP_CACHE', true );

/**
 * The base configuration for WordPress
 *
 * The wp-config.php creation script uses this file during the installation.
 * You don't have to use the web site, you can copy this file to "wp-config.php"
 * and fill in the values.
 *
 * This file contains the following configurations:
 *
 * * Database settings
 * * Secret keys
 * * Database table prefix
 * * Localized language
 * * ABSPATH
 *
 * @link https://wordpress.org/support/article/editing-wp-config-php/
 *
 * @package WordPress
 */

// ** Database settings - You can get this info from your web host ** //
/** The name of the database for WordPress */
define( 'DB_NAME', 'giggre' );

/** Database username */
define( 'DB_USER', 'root' );

/** Database password */
define( 'DB_PASSWORD', '' );

/** Database hostname */
define( 'DB_HOST', 'localhost' );

/** Database charset to use in creating database tables. */
define( 'DB_CHARSET', 'utf8' );

/** The database collate type. Don't change this if in doubt. */
define( 'DB_COLLATE', '' );

/**#@+
 * Authentication unique keys and salts.
 *
 * Change these to different unique phrases! You can generate these using
 * the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}.
 *
 * You can change these at any point in time to invalidate all existing cookies.
 * This will force all users to have to log in again.
 *
 * @since 2.6.0
 */
define( 'AUTH_KEY',          'mg NF)267gAk><Pg<k:$B^MbTm=h?S8/HFJ*&C>Vm3jPly=uiW(yi.Wd7 _RSq{}' );
define( 'SECURE_AUTH_KEY',   '(Rk%YOO888>)y>|I{JY]<bZM+]} 6[rN ji (H]fOzd$xF(Zr61-nI1>2@T0*D%j' );
define( 'LOGGED_IN_KEY',     '>ln wy*EB<A~9aHmB:tPTE9w-/3lnQNOPDLRLwWm>t3pO>(dNcH*92Q#OA-Avted' );
define( 'NONCE_KEY',         '%Eo!x~Z`:QW{6/Gf8iTyU!VkyM*DU3(5.t|h-Z+bz_UUL#xw(Fl=sfA%bxY3l/J-' );
define( 'AUTH_SALT',         'aP9(Dg}Q}|bfc?oU?!@396YZ7d[q;sNZ!;dbn9]4Mb8c$gF>xauoL`R&B~Y;QuF/' );
define( 'SECURE_AUTH_SALT',  'PWdH.eI5,1rnSYL#?RbriU| DLa[TE$D+2|L/KUMsJQ&tOzNV-54+{eKE32aGjkY' );
define( 'LOGGED_IN_SALT',    '[:Nk{un;n1xL,jq|=h5R=!Nb#oPm6W[8WlxSF$x,[V^aGjG>l8n h8#Fo`:sBV~5' );
define( 'NONCE_SALT',        '4G9S^ QYnGpzDOt|dD0a]bVk*oqS)0LH&;U88$:-7/N]Y b]M!gjog~H-j#i.lUa' );
define( 'WP_CACHE_KEY_SALT', 'D=g2sS9UY;H$(/7S|I[c88FvI.oJc9=3?4=+ PLAULC,%I?Uj?Nv5_J4*&{83<6(' );


/**#@-*/

/**
 * WordPress database table prefix.
 *
 * You can have multiple installations in one database if you give each
 * a unique prefix. Only numbers, letters, and underscores please!
 */
$table_prefix = 'wp_';


/* Add any custom values between this line and the "stop editing" line. */



/**
 * For developers: WordPress debugging mode.
 *
 * Change this to true to enable the display of notices during development.
 * It is strongly recommended that plugin and theme developers use WP_DEBUG
 * in their development environments.
 *
 * For information on other constants that can be used for debugging,
 * visit the documentation.
 *
 * @link https://wordpress.org/support/article/debugging-in-wordpress/
 */
if ( ! defined( 'WP_DEBUG' ) ) {
	define( 'WP_DEBUG', false );
	define('WP_DEBUG_LOG', false);
	define('WP_DEBUG_DISPLAY', false);
}

define( 'FS_METHOD', 'direct' );
define( 'COOKIEHASH', 'fc1f1bf7ec949930441125ea80500674' );
define( 'WP_AUTO_UPDATE_CORE', 'minor' );
/* That's all, stop editing! Happy publishing. */

/** Absolute path to the WordPress directory. */
if ( ! defined( 'ABSPATH' ) ) {
	define( 'ABSPATH', __DIR__ . '/' );
}

/** Sets up WordPress vars and included files. */
require_once ABSPATH . 'wp-settings.php';

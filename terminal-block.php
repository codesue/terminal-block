<?php
/**
 * Plugin Name:       Terminal Block
 * Description:       Display rich text in a terminal window.
 * Requires at least: 5.9
 * Requires PHP:      7.0
 * Version:           0.1.3.3
 * Author:            Suzen Fylke
 * Author URI:        codesue.com
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       terminal-block
 *
 * @package           codesue/terminal-block
 */

function codesue_terminal_block_init() {
	register_block_type( __DIR__ . '/build' );
}
add_action( 'init', 'codesue_terminal_block_init' );

function codesue_terminal_block_enqueue() {
    wp_enqueue_script(
        'codesue-terminal-block-script',
        plugins_url( '/assets/scripts/terminal.js', __FILE__ ),
		[],
		false,
		true
    );
}
add_action( 'wp_enqueue_scripts', 'codesue_terminal_block_enqueue' );

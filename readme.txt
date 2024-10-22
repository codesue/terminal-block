=== Terminal Block ===
Contributors:      Suzen Fylke
Tags:              gutenberg, block, blocks, terminal, code, documentation
Tested up to:      6.6
Stable tag:        0.1.3.3
License:           GPL-2.0-or-later
License URI:       https://www.gnu.org/licenses/gpl-2.0.html

Display rich text in a terminal window.

== Description ==

Add a rich text terminal window to WordPress posts with Terminal Block.

Terminal Block supports the following display and animation styles:
* Command: displays a prompt with user input and a cursor, uses typing animations
* Output: displays output text, does not use typing animations
* Progress: displays an animated progress bar

This block's style and animation are adapted from [termynal.js](https://github.com/ines/termynal) version 0.0.1 by [Ines Montani](ines.io), licensed under MIT license.

The plugin icon is [terminal icons](https://www.flaticon.com/free-icons/terminal) created by Bharat Icons - Flaticon.

== Installation ==

1. Upload the plugin files to the `/wp-content/plugins/terminal-block` directory, or install the plugin directly through the WordPress plugins page.
2. Activate the plugin through the 'Plugins' page in WordPress.
3. Search for the block within the Gutenberg block editor.


== Frequently Asked Questions ==

= How do I use custom prompts? =

1. Select the commmand block you would like to have a custom prompt.
2. Select "Block" in the settings sidebar.
3. Change the prompt from "$" to your custom prompt in the "Prompt Settings" section.

= Does this block use similar typing animations to termynal.js? =

Yes, typing animations are supported as of version 0.1.1.

== Screenshots ==

1. By default, each command line is prefixed with "$".
2. Terminal Block also supports custom prompts, such as ">>>".
3. You can change the terminal's title and colors in the block setting sidebar.
4. You can change the prompt used for a command in the block settings sidebar.

== Changelog ==

= 0.1.3 =
* Test up to WordPress 6.1
* Set up linting and CI workflows

= 0.1.2 =
* Fix theme style bleeding into editor view
* Add support for user defined accent color for prompt and title

= 0.1.1 =
* Use inner blocks for terminal inputs, outputs, and progress bars
* Add animation
* Add Fira Mono font

= 0.1.0 =
* Initial release

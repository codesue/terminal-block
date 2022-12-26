/**
 * Adapted from termynal.js version 0.0.1 by Ines Montani <ines@ines.io>, licensed under MIT license.
 */

'use strict';

/** Generate a terminal widget. */
class Terminal {
	/**
	 * Construct the widget's settings.
	 *
	 * @param {Node} container - A container element.
	 */
	constructor(container) {
		this.container = container;
		this.startDelay = 600;
		this.typeDelay = 90;
		this.lineDelay = 1500;
		this.progressLength = 40;
		this.progressChar = '█';
		this.progressPercent = 100;
		this.cursor = '▋';
		this.lines = container.querySelectorAll('p');
		this.init();
	}

	/**
	 * Initialize the widget, get lines, clear container and start animation.
	 */
	init() {
		/**
		 * Calculates width and height of Terminal container.
		 * If container is empty and lines are dynamically loaded, defaults to browser `auto` or CSS.
		 */
		// eslint-disable-next-line no-undef
		const containerStyle = getComputedStyle(this.container);
		this.container.style.width =
			containerStyle.width !== '0px' ? containerStyle.width : undefined;
		this.container.style.minHeight =
			containerStyle.height !== '0px' ? containerStyle.height : undefined;
		this.container.innerHTML = '';
		this.start();
	}

	/**
	 * Start the animation and rener the lines depending on their classes.
	 */
	async start() {
		await this._wait(this.startDelay);
		// eslint-disable-next-line prefer-const
		for (let line of this.lines) {
			if (
				line.classList.contains(
					'wp-block-codesue-terminal-command-block'
				)
			) {
				line.classList.add('display-cursor');
				await this.type(line);
				await this._wait(this.lineDelay);
			} else if (
				line.classList.contains(
					'wp-block-codesue-terminal-progress-bar-block'
				)
			) {
				await this.progress(line);
				await this._wait(this.lineDelay);
			} else if (
				line.classList.contains(
					'wp-block-codesue-terminal-output-block'
				)
			) {
				this.container.appendChild(line);
				await this._wait(this.lineDelay);
			}

			line.classList.remove('display-cursor');
		}
	}

	/**
	 * Animate a typed line.
	 *
	 * @param {Node} line - The line element to render.
	 */
	async type(line) {
		const chars = [...line.textContent];
		line.textContent = '';
		this.container.appendChild(line);

		// eslint-disable-next-line prefer-const
		for (let char of chars) {
			await this._wait(this.typeDelay);
			line.textContent += char;
		}
	}

	/**
	 * Animate a progress bar.
	 *
	 * @param {Node} line - The line element to render.
	 */
	async progress(line) {
		const progressChar =
			line.getAttribute('character') || this.progressChar;
		const chars = progressChar.repeat(this.progressLength);
		const progressPercent =
			line.getAttribute('percent') || this.progressPercent;
		line.textContent = '';
		this.container.appendChild(line);

		for (let i = 1; i < chars.length + 1; i++) {
			await this._wait(this.typeDelay);
			const percent = Math.round((i / chars.length) * 100);
			line.textContent = `${chars.slice(0, i)} ${percent}%`;
			if (percent > progressPercent) {
				break;
			}
		}
	}

	/**
	 * Helper function for animation delays, called with `await`.
	 *
	 * @param {number} time - Timeout, in ms.
	 */
	_wait(time) {
		return new Promise((resolve) => setTimeout(resolve, time));
	}
}

const containers = [
	...document.getElementsByClassName('wp-block-codesue-terminal-block'),
];
if (containers.length) {
	containers.forEach((container) => new Terminal(container));
}

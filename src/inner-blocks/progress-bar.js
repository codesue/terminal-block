import { registerBlockType } from '@wordpress/blocks';
import {
	useBlockProps,
	InspectorControls,
	RichText,
} from '@wordpress/block-editor';
import {
	// eslint-disable-next-line @wordpress/no-unsafe-wp-apis
	__experimentalNumberControl as NumberControl,
	PanelBody,
	PanelRow,
	TextControl,
} from '@wordpress/components';
import { __ } from '@wordpress/i18n';

import metadata from '../block.json';

registerBlockType('codesue/terminal-progress-bar-block', {
	title: 'Progress Bar',
	parent: [metadata.name],
	icon: 'chart-bar',
	description: 'Add a progress bar to a terminal window.',
	category: 'design',
	supports: {
		color: {
			text: true,
			background: false,
		},
	},
	attributes: {
		content: {
			type: 'string',
			source: 'html',
			selector: 'p',
		},
		character: {
			type: 'string',
			default: '█',
		},
		percent: {
			type: 'number',
			default: '100',
		},
	},
	example: {
		attributes: {
			content: '███████████████████ 100%',
		},
	},

	edit({ attributes, setAttributes }) {
		const blockProps = useBlockProps();

		const createProgressBar = (character, percent) => {
			if (!character) return '';
			return `${character.repeat(percent / 2.5)} ${attributes.percent}%`;
		};
		const onChangeContent = (content) => {
			setAttributes({ content });
		};
		const onChangeCharacter = (character) => {
			setAttributes({ character });
			createProgressBar(character, attributes.percent);
		};
		const onChangePercent = (percent) => {
			setAttributes({ percent: parseInt(percent) });
			createProgressBar(attributes.character, parseInt(percent));
		};

		return (
			<>
				<InspectorControls>
					<PanelBody
						title={__('Progress Bar Settings', metadata.textdomain)}
						initialOpen={true}
					>
						<PanelRow>
							<TextControl
								label={__('Character', metadata.textdomain)}
								value={attributes.character}
								onChange={onChangeCharacter}
								help={__(
									'Change the character. Defaults to █',
									metadata.textdomain
								)}
							/>
						</PanelRow>
						<PanelRow>
							<NumberControl
								label={__('Percent', metadata.textdomain)}
								labelPosition="edge"
								value={attributes.percent}
								onChange={onChangePercent}
								isDragEnabled={true}
								min={0}
								max={100}
								step={10}
								help={__(
									'Change the percent. Defaults to 100',
									metadata.textdomain
								)}
							/>
						</PanelRow>
					</PanelBody>
				</InspectorControls>
				<RichText
					{...blockProps}
					tagName="p"
					value={createProgressBar(
						attributes.character,
						attributes.percent
					)}
					character={attributes.character}
					percent={attributes.percent}
					onChange={onChangeContent}
					allowedFormats={[]}
				/>
			</>
		);
	},

	save({ attributes }) {
		const blockProps = useBlockProps.save();
		return (
			<RichText.Content
				{...blockProps}
				tagName="p"
				value={attributes.content}
				character={attributes.character}
				percent={attributes.percent}
			/>
		);
	},
});

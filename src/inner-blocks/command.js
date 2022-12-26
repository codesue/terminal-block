import { createBlock, registerBlockType } from '@wordpress/blocks';
import {
	useBlockProps,
	InspectorControls,
	RichText,
} from '@wordpress/block-editor';
import { PanelBody, PanelRow, TextControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

import metadata from '../block.json';

registerBlockType('codesue/terminal-command-block', {
	title: 'Command',
	parent: [metadata.name],
	icon: 'arrow-right-alt2',
	description: 'Add a command to a terminal window.',
	category: 'text',
	attributes: {
		content: {
			type: 'string',
			source: 'html',
			selector: 'p',
		},
		prompt: {
			type: 'string',
			default: '$',
		},
	},
	example: {
		attributes: {
			content: 'pip install spacy',
		},
	},

	edit({ attributes, setAttributes }) {
		const blockProps = useBlockProps();
		const onChangeContent = (content) => {
			setAttributes({ content });
		};
		const onChangePrompt = (prompt) => {
			setAttributes({ prompt });
		};
		return (
			<>
				<InspectorControls>
					<PanelBody
						title={__('Prompt Settings', metadata.textdomain)}
						initialOpen={true}
					>
						<PanelRow>
							<TextControl
								label={__('Prompt', metadata.textdomain)}
								value={attributes.prompt}
								onChange={onChangePrompt}
								help={__(
									'Change the prompt. Defaults to $',
									metadata.textdomain
								)}
							/>
						</PanelRow>
					</PanelBody>
				</InspectorControls>
				<RichText
					{...blockProps}
					tagName="p"
					value={attributes.content}
					prompt={attributes.prompt}
					className="display-prompt"
					onChange={onChangeContent}
					placeholder={__('Enter your command…', metadata.textdomain)}
					allowedFormats={[
						'core/bold',
						'core/italic',
						'core/link',
						'core/text-color',
						'core/underline',
					]}
				/>
			</>
		);
	},

	save({ attributes }) {
		const blockProps = useBlockProps.save();
		const { content, prompt } = attributes;
		return (
			<RichText.Content
				{...blockProps}
				tagName="p"
				value={content}
				prompt={prompt}
				className="display-prompt"
			/>
		);
	},

	transforms: {
		to: [
			{
				type: 'block',
				blocks: ['codesue/terminal-output-block'],
				transform: ({ content }) => {
					return createBlock('codesue/terminal-output-block', {
						content,
					});
				},
			},
		],
		from: [
			{
				type: 'block',
				blocks: ['codesue/terminal-output-block'],
				transform: ({ content }) => {
					return createBlock('codesue/terminal-command-block', {
						content,
					});
				},
			},
		],
	},
});

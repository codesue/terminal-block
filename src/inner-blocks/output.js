import { createBlock, registerBlockType } from '@wordpress/blocks';
import { useBlockProps, RichText } from '@wordpress/block-editor';
import { __ } from '@wordpress/i18n';

import metadata from '../block.json';

registerBlockType('codesue/terminal-output-block', {
	title: 'Output',
	parent: [metadata.name],
	icon: 'editor-paragraph',
	description: 'Add output text to a terminal window.',
	category: 'text',
	attributes: {
		content: {
			type: 'string',
			source: 'html',
			selector: 'p',
		},
	},
	example: {
		attributes: {
			content: 'Successfully installed spacy',
		},
	},

	edit({ attributes, setAttributes }) {
		const blockProps = useBlockProps();
		const onChangeContent = (content) => {
			setAttributes({ content });
		};
		return (
			<RichText
				{...blockProps}
				tagName="p"
				value={attributes.content}
				onChange={onChangeContent}
				placeholder={__('Write your output…', metadata.textdomain)}
				allowedFormats={[
					'core/bold',
					'core/italic',
					'core/link',
					'core/text-color',
					'core/underline',
				]}
			/>
		);
	},

	save({ attributes }) {
		const blockProps = useBlockProps.save();
		const { content } = attributes;
		return <RichText.Content {...blockProps} tagName="p" value={content} />;
	},

	transforms: {
		to: [
			{
				type: 'block',
				blocks: ['codesue/terminal-command-block'],
				transform: ({ content }) => {
					return createBlock('codesue/terminal-command-block', {
						content,
					});
				},
			},
		],
		from: [
			{
				type: 'block',
				blocks: ['codesue/terminal-command-block'],
				transform: ({ content }) => {
					return createBlock('codesue/terminal-output-block', {
						content,
					});
				},
			},
		],
	},
});

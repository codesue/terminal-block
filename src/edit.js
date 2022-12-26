import {
	useBlockProps,
	InnerBlocks,
	InspectorControls,
	PanelColorSettings,
} from '@wordpress/block-editor';
import { TextControl, PanelBody, PanelRow } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

import './inner-blocks/command';
import './inner-blocks/output';
import './inner-blocks/progress-bar';

import metadata from './block.json';

import './editor.scss';

export default function edit({ attributes, setAttributes }) {
	const blockProps = useBlockProps();
	const onChangeTitle = (title) => {
		setAttributes({ title });
	};
	const onChangeBackgroundColor = (backgroundColor) => {
		setAttributes({ backgroundColor });
	};
	const onChangetextColor = (textColor) => {
		setAttributes({ textColor });
	};
	const onChangeAccentColor = (accentColor) => {
		setAttributes({ accentColor });
	};
	return (
		<>
			<InspectorControls>
				<PanelBody
					title={__('Terminal Settings', metadata.textdomain)}
					initialOpen={true}
				>
					<PanelRow>
						<TextControl
							label={__('Title', metadata.textdomain)}
							value={attributes.title}
							onChange={onChangeTitle}
							help={__(
								'Change the title. Defaults to bash',
								metadata.textdomain
							)}
						/>
					</PanelRow>
				</PanelBody>
				<PanelColorSettings
					title={__('Color Settings', metadata.textdomain)}
					initialOpen={true}
					colorSettings={[
						{
							value: attributes.backgroundColor,
							onChange: onChangeBackgroundColor,
							label: __('Background color', metadata.textdomain),
						},
						{
							value: attributes.textColor,
							onChange: onChangetextColor,
							label: __('Text color', metadata.textdomain),
						},
						{
							value: attributes.accentColor,
							onChange: onChangeAccentColor,
							label: __('Accent color', metadata.textdomain),
						},
					]}
				/>
			</InspectorControls>
			<div
				{...blockProps}
				title={attributes.title}
				style={{
					'--wp--default--terminal--block--color--background':
						attributes.backgroundColor,
					'--wp--default--terminal--block--color--text':
						attributes.textColor,
					'--wp--default--terminal--block--color--accent':
						attributes.accentColor,
				}}
			>
				<InnerBlocks
					allowedBlocks={[
						'core/spacer',
						'codesue/terminal-command-block',
						'codesue/terminal-output-block',
						'codesue/terminal-progress-bar-block',
					]}
				/>
			</div>
		</>
	);
}

import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';

export default function save({ attributes }) {
	const blockProps = useBlockProps.save();
	const { title, backgroundColor, textColor, accentColor } = attributes;
	return (
		<div
			{...blockProps}
			title={title}
			style={{
				'--wp--default--terminal--block--color--background':
					backgroundColor,
				'--wp--default--terminal--block--color--text': textColor,
				'--wp--default--terminal--block--color--accent': accentColor,
			}}
		>
			<InnerBlocks.Content />
		</div>
	);
}

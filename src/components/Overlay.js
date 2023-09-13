export function Overlay({ setOpen, zIndexValue = false, callback = () => {} }) {
	return (
		<div
			style={zIndexValue ? { zIndex: zIndexValue } : {}}
			onClick={callback}
			className="overlay"
		></div>
	);
}

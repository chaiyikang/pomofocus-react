export function Overlay({ setOpen, callback = () => {} }) {
	return <div onClick={callback} className="overlay"></div>;
}

import removeBlack from "../img/remove-black-sm.png";

export function CloseButton({ closeButtonHandler, buttonClassName = "" }) {
	return (
		<button className={buttonClassName} onClick={closeButtonHandler}>
			<img className="close-btn" src={removeBlack} alt="" />
		</button>
	);
}

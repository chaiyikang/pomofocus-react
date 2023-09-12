import clockRed from "../img/clock-red.png";
import { CloseButton } from "./CloseButton";
import { Overlay } from "./Overlay";

export function Report({ closeReport }) {
	return (
		<>
			<div className="report">
				<header className="report-header">
					<h2 className="activity-summary-title">Activity Summary</h2>
					<CloseButton
						closeButtonHandler={closeReport}
						buttonClassName="report-close-btn"
					/>
				</header>
				<div className="card">
					<img className="report-clock" src={clockRed} alt="" />
					<div className="report-text">
						<p className="display-hours">0</p>
						<p className="hours-focused-label">seconds focused</p>
					</div>
				</div>
			</div>
			<Overlay callback={closeReport} />
		</>
	);
}

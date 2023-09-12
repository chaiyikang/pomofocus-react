import configWhite from "../img/config-white.png";
import graphWhite from "../img/graph-white.png";
import iconWhite from "../img/icon-white2.png";
import userWhite from "../img/user-white.png";

export function NavBar({ setSettingsOpen, setReportOpen }) {
	return (
		<header>
			<nav>
				<div className="logo">
					<img className="pomo-icon" src={iconWhite} alt="" />
					<h1 className="pomofocus-title">Pomofocus</h1>
				</div>
				<div className="buttons">
					<NavButton
						imgSrc={graphWhite}
						buttonLabel="Report"
						handler={() => {
							setReportOpen(true);
						}}
					/>
					<NavButton
						imgSrc={configWhite}
						buttonLabel="Settings"
						handler={() => {
							setSettingsOpen(true);
						}}
					/>
					<NavButton imgSrc={userWhite} buttonLabel="Login" />
				</div>
			</nav>
		</header>
	);
}

function NavButton({ imgSrc, buttonLabel, handler }) {
	return (
		<button onClick={handler}>
			<img className="nav-buttons" src={imgSrc} alt="" />
			<span>{buttonLabel}</span>
		</button>
	);
}

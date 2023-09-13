import { useRef, useState } from "react";
import { NavBar } from "./components/NavBar";
import { Settings } from "./components/Settings";
import { Report } from "./components/Report";

import "./styles/nav.css";
import "./styles/style.css";
import "./styles/button.css";
import "./styles/color-picker.css";
import "./styles/global.css";
import "./styles/report.css";
import "./styles/settings.css";
import "./styles/toggle.css";
import nextWhite from "./img/next-white3.png";

const defaultSettings = {
	lengthsSec: {
		pomodoro: 5,
		shortBreak: 5 * 60,
		longBreak: 15 * 60,
	},
};

function App() {
	const [settingsOpen, setSettingsOpen] = useState(false);
	const [reportOpen, setReportOpen] = useState(false);

	return (
		<>
			<NavBar setSettingsOpen={setSettingsOpen} setReportOpen={setReportOpen} />
			<AppWindow>
				{settingsOpen && <Settings setSettingsOpen={setSettingsOpen} />}
				{reportOpen && (
					<Report
						closeReport={() => {
							setReportOpen(false);
						}}
					/>
				)}
			</AppWindow>
		</>
	);
}

function AppWindow({ children }) {
	const [settings, setSettings] = useState(defaultSettings);
	const [secondsLeft, setSecondsLeft] = useState(settings.lengthsSec.pomodoroLengthSec);
	const [timerRunning, setTimerRunning] = useState(false);
	const intervalID = useRef(false);
	const [activeType, setActiveType] = useState("pomodoro");

	function handleToggleTimer() {
		// stop
		if (timerRunning) {
			return stopTimer();
		}

		// start
		setTimerRunning(true);
		const timeStampStart = new Date().getTime();
		const timeStampEnd = timeStampStart + secondsLeft * 1000;

		intervalID.current = setInterval(() => {
			countdown(timeStampEnd);
		}, 1000);
	}

	function handleToggleType(click) {
		if (timerRunning) {
			stopTimer();
		}
		const clickedType = click.target.dataset.type;
		console.log("🚀 ~ file: App.js:73 ~ handleToggleType ~ clickedType:", clickedType);
		setActiveType(clickedType);
		const resetDuration = settings.lengthsSec[clickedType];
		setSecondsLeft(resetDuration);
	}

	function stopTimer() {
		clearInterval(intervalID.current);
		setTimerRunning(false);
	}

	function countdown(timeStampEnd) {
		let timeStampCurrent = new Date().getTime();
		let timeLeftSec = Math.round((timeStampEnd - timeStampCurrent) / 1000);
		setSecondsLeft(timeLeftSec);
		if (timeLeftSec <= 0) stopTimer();
	}

	return (
		<>
			<main className="container">
				<div className="app-window">
					<div className="buttons types">
						<button onClick={handleToggleType} data-type="pomodoro" className="types">
							Pomodoro
						</button>
						<button onClick={handleToggleType} data-type="shortBreak" className="types">
							Short Break
						</button>
						<button onClick={handleToggleType} data-type="longBreak" className="types">
							Long Break
						</button>
					</div>
					<time className="timer">
						{Math.floor(secondsLeft / 60)
							.toString()
							.padStart(2, 0)}
						:{(secondsLeft % 60).toString().padStart(2, 0)}
					</time>
					<button
						onClick={handleToggleTimer}
						className={`start-stop ${timerRunning ? "pressToStop" : ""}`}
					>
						{timerRunning ? "STOP" : "START"}
					</button>
					<button className="skip-timer-btn">
						<img className="skip-timer-img" src={nextWhite} alt="" />
					</button>
				</div>
				<div className="app-info">
					<p className="counter">#1</p>
					<p className="message">Time to Focus!</p>
				</div>
			</main>
			{children}
		</>
	);
}

export default App;

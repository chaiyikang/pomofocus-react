import { useEffect, useRef, useState } from "react";
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
		pomodoro: 2,
		shortBreak: 1,
		longBreak: 5,
	},
	interval: 4,
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
	const [secondsLeft, setSecondsLeft] = useState(settings.lengthsSec.pomodoro);
	const [timerRunning, setTimerRunning] = useState(false);
	const intervalID = useRef(false);
	const [activeType, setActiveType] = useState("pomodoro");
	const [workSetsCompleted, setWorkSetsCompleted] = useState(0);

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
			countdownAndControlEnded(timeStampEnd);
		}, 1000);
	}

	function handleToggleType(click) {
		if (timerRunning) {
			stopTimer();
		}
		const clickedType = click.target.dataset.type;
		setActiveType(clickedType);
		const resetDuration = settings.lengthsSec[clickedType];
		setSecondsLeft(resetDuration);
	}

	function countdownAndControlEnded(timeStampEnd) {
		let timeStampCurrent = new Date().getTime();
		let timeLeftSec = Math.round((timeStampEnd - timeStampCurrent) / 1000);
		setSecondsLeft(timeLeftSec);
		if (timeLeftSec > 0) {
			return;
		}
		stopTimer();
		controlTimerEnded();
	}

	function handleSkip() {
		stopTimer();
		controlTimerEnded();
	}

	function controlTimerEnded() {
		const nextType = getNextType();
		if (nextType !== "pomodoro") {
			setWorkSetsCompleted((sets) => sets + 1);
		}

		setSecondsLeft(settings.lengthsSec[nextType]);
		setActiveType(nextType);
	}

	function getNextType() {
		const nextIsPomodoro = activeType !== "pomodoro";
		const nextIsLongBreak = (workSetsCompleted + 1) % settings.interval === 0;
		if (nextIsPomodoro) return "pomodoro";
		if (nextIsLongBreak) return "longBreak";
		return "shortBreak";
	}

	function stopTimer() {
		clearInterval(intervalID.current);
		setTimerRunning(false);
	}
	return (
		<>
			<main className="container">
				<div className="app-window">
					<div className="buttons types">
						<button
							onClick={handleToggleType}
							data-type="pomodoro"
							className={`types ${activeType === "pomodoro" ? "button-active" : ""}`}
						>
							Pomodoro
						</button>
						<button
							onClick={handleToggleType}
							data-type="shortBreak"
							className={`types ${
								activeType === "shortBreak" ? "button-active" : ""
							}`}
						>
							Short Break
						</button>
						<button
							onClick={handleToggleType}
							data-type="longBreak"
							className={`types ${activeType === "longBreak" ? "button-active" : ""}`}
						>
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
					{timerRunning && (
						<button onClick={handleSkip} className="skip-timer-btn">
							<img className="skip-timer-img" src={nextWhite} alt="" />
						</button>
					)}
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

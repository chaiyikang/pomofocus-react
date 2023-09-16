import { useEffect, useState } from "react";
import { NavBar } from "./components/NavBar";
import { Report } from "./components/Report";

import "./styles/nav.css";
import "./styles/style.css";
import "./styles/button.css";
import "./styles/color-picker.css";
import "./styles/global.css";
import "./styles/report.css";
import "./styles/settings.css";
import "./styles/toggle.css";
import { AppWindow } from "./components/AppWindow";

const defaultSettings = {
	lengthsSec: {
		pomodoro: 25,
		shortBreak: 5,
		longBreak: 15,
	},
	colors: {
		pomodoro: "rgb(186, 73, 73)",
		shortBreak: "rgb(56, 133, 138)",
		longBreak: "rgb(57, 112, 151)",
	},
	interval: 4,
	toggleBreak: true,
	togglePomodoro: false,
};

function App() {
	const [settingsOpen, setSettingsOpen] = useState(false);
	const [reportOpen, setReportOpen] = useState(false);
	const [settings, setSettings] = useState(defaultSettings);
	const [secondsFocused, setSecondsFocused] = useState(0);

	return (
		<>
			<NavBar setSettingsOpen={setSettingsOpen} setReportOpen={setReportOpen} />
			<AppWindow
				settings={settings}
				setSettings={setSettings}
				settingsOpen={settingsOpen}
				setSettingsOpen={setSettingsOpen}
				secondsFocused={secondsFocused}
				setSecondsFocused={setSecondsFocused}
			>
				{reportOpen && (
					<Report
						closeReport={() => {
							setReportOpen(false);
						}}
						secondsFocused={secondsFocused}
					/>
				)}
			</AppWindow>
		</>
	);
}

export default App;

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
	interval: 4,
	toggleBreak: true,
	togglePomodoro: false,
};

function App() {
	const [settingsOpen, setSettingsOpen] = useState(false);
	const [reportOpen, setReportOpen] = useState(false);
	const [settings, setSettings] = useState(defaultSettings);

	return (
		<>
			<NavBar setSettingsOpen={setSettingsOpen} setReportOpen={setReportOpen} />
			<AppWindow
				settings={settings}
				setSettings={setSettings}
				settingsOpen={settingsOpen}
				setSettingsOpen={setSettingsOpen}
			>
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

export default App;

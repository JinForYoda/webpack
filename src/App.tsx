import Button from 'Button/Button'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
const PROJECT_NAME = 'webpack'
function App() {
	return (
		<BrowserRouter basename={'/' + PROJECT_NAME}>
			<Routes>
				<Route path="/btn" element={<Button />} />
				<Route path="*" element={<Navigate to="/btn" />} />
			</Routes>
		</BrowserRouter>
	)
}
export default App

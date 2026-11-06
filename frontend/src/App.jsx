import './App.css'
import "@fontsource/nunito/latin-ext-400.css";
import "@fontsource/nunito/latin-ext-500.css";
import "@fontsource/nunito/latin-ext-600.css";
import "@fontsource/nunito/latin-ext-700.css";
import "@fontsource/lora/latin-ext-400.css";
import "@fontsource/lora/latin-ext-500.css";
import "@fontsource/lora/latin-ext-600.css";
import "@fontsource/lora/latin-ext-700.css";
import "@fontsource/lexend/latin-ext-400.css";
import "@fontsource/lexend/latin-ext-500.css";
import "@fontsource/lexend/latin-ext-600.css";
import "@fontsource/lexend/latin-ext-700.css";
import "@fontsource/open-sans/latin-ext-400.css";
import "@fontsource/open-sans/latin-ext-500.css";
import "@fontsource/open-sans/latin-ext-600.css";
import "@fontsource/open-sans/latin-ext-700.css";
import Header from './component/layout/Header'
import AppRoutes from './routes/AppRoutes'

function App() {
  return (
    <>
        <Header/>
        <AppRoutes />
    </>
  )
}

export default App

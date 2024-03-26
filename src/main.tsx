import { Suspense } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import GlobalStyle from "@app/global-styles";
import AppThemeProvider from "@app/common/theme";
import { MainPageLoader } from "@app/common/components/loader";

ReactDOM.createRoot(document.getElementById('root')!).render(
  <AppThemeProvider>
     <GlobalStyle />
     <Suspense fallback={<MainPageLoader />}>
    <App />
    </Suspense>
  </AppThemeProvider>,
)

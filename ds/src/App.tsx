import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Layout } from './docs/layout/Layout';
import { ToastProvider } from './components/Toast/Toast';
import { ThemeProvider } from './components/ThemeProvider';

// Pages
import { OverviewPage } from './docs/pages/OverviewPage';
import { TokensPage } from './docs/pages/TokensPage';
import { ColorsPage } from './docs/pages/ColorsPage';
import { TypographyPage } from './docs/pages/TypographyPage';
import { SpacingPage } from './docs/pages/SpacingPage';
import { ButtonPage } from './docs/pages/ButtonPage';
import { BadgePage } from './docs/pages/BadgePage';
import { InputPage } from './docs/pages/InputPage';
import { TextareaPage } from './docs/pages/TextareaPage';
import { DropdownPage } from './docs/pages/DropdownPage';
import { CheckboxPage } from './docs/pages/CheckboxPage';
import { RadioPage } from './docs/pages/RadioPage';
import { TogglePage } from './docs/pages/TogglePage';
import { AvatarPage } from './docs/pages/AvatarPage';
import { TabsPage } from './docs/pages/TabsPage';
import { TooltipPage } from './docs/pages/TooltipPage';
import { ToastPage } from './docs/pages/ToastPage';
import { IconsPage } from './docs/pages/IconsPage';

const App: React.FC = () => (
  <ThemeProvider>
  <ToastProvider>
    <Layout>
      <Routes>
        <Route path="/" element={<OverviewPage />} />
        <Route path="/tokens" element={<TokensPage />} />
        <Route path="/colors" element={<ColorsPage />} />
        <Route path="/typography" element={<TypographyPage />} />
        <Route path="/spacing" element={<SpacingPage />} />
        <Route path="/icons" element={<IconsPage />} />
        <Route path="/components/button" element={<ButtonPage />} />
        <Route path="/components/badge" element={<BadgePage />} />
        <Route path="/components/input" element={<InputPage />} />
        <Route path="/components/textarea" element={<TextareaPage />} />
        <Route path="/components/dropdown" element={<DropdownPage />} />
        <Route path="/components/checkbox" element={<CheckboxPage />} />
        <Route path="/components/radio" element={<RadioPage />} />
        <Route path="/components/toggle" element={<TogglePage />} />
        <Route path="/components/avatar" element={<AvatarPage />} />
        <Route path="/components/tabs" element={<TabsPage />} />
        <Route path="/components/tooltip" element={<TooltipPage />} />
        <Route path="/components/toast" element={<ToastPage />} />
        <Route path="*" element={<OverviewPage />} />
      </Routes>
    </Layout>
  </ToastProvider>
  </ThemeProvider>
);

export default App;

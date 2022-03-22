import React, { useState } from 'react';
import { CssBaseline, Tabs, Tab, useMediaQuery } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { ToastContainer } from 'react-toastify';

import Muix from './components/muix';
import AgGrid from './components/aggrid';

enum AppTabs {
    MuiX,
    Aggrid
}

const App = (): JSX.Element => {
    const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

    const [currentTab, setCurrentTab] = useState(AppTabs.MuiX);

    const theme = React.useMemo(
        () => {
            return createTheme({
                palette: {
                    mode: prefersDarkMode ? 'dark' : 'light'
                }
            });
        },
        [prefersDarkMode]
    );

    const handleTabChange = (event: React.SyntheticEvent, tabName: AppTabs): void => {
        setCurrentTab(tabName);
    };

    return (
        <ThemeProvider theme={theme}>
            <CssBaseline enableColorScheme />
            <ToastContainer position='bottom-center' theme='colored' />
            <div>
                <Tabs
                    value={currentTab}
                    onChange={handleTabChange}
                >
                    <Tab
                        label='MUI X'
                        value={AppTabs.MuiX}
                    />
                    <Tab
                        label='AG Grid'
                        value={AppTabs.Aggrid}
                    />
                </Tabs>

                <section>
                    {
                        currentTab === AppTabs.MuiX &&
                        <Muix />
                    }

                    {
                        currentTab === AppTabs.Aggrid &&
                        <AgGrid />
                    }
                </section>
            </div>
        </ThemeProvider>
    );
};

export default App;

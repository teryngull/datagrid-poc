import React, { useMemo, useState } from 'react';
import { CssBaseline, Tabs, Tab, useMediaQuery } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { ToastContainer } from 'react-toastify';

import OverviewNotes from './components/overview';
import Muix from './components/muix';
import MuixNotes from './components/muixnotes';
import AgGrid from './components/aggrid';
import AgGridNotes from './components/aggridnotes';

enum AppTabs {
    Overview,
    MuiX,
    MuiXNotes,
    Aggrid,
    AggridNotes
}

const App = (): JSX.Element => {
    const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

    const [currentTab, setCurrentTab] = useState(AppTabs.Overview);

    const theme = useMemo(
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
                    centered
                    value={currentTab}
                    onChange={handleTabChange}
                >
                    <Tab
                        label='Overview'
                        value={AppTabs.Overview}
                    />
                    <Tab
                        label='MUI X'
                        value={AppTabs.MuiX}
                    />
                    <Tab
                        label='MUI X Notes'
                        value={AppTabs.MuiXNotes}
                    />
                    <Tab
                        label='AG Grid'
                        value={AppTabs.Aggrid}
                    />
                    <Tab
                        label='AG Grid Notes'
                        value={AppTabs.AggridNotes}
                    />
                </Tabs>

                <section>
                    {
                        currentTab === AppTabs.Overview &&
                        <OverviewNotes />
                    }

                    {
                        currentTab === AppTabs.MuiX &&
                        <Muix />
                    }

                    {
                        currentTab === AppTabs.MuiXNotes &&
                        <MuixNotes />
                    }

                    {
                        currentTab === AppTabs.Aggrid &&
                        <AgGrid />
                    }

                    {
                        currentTab === AppTabs.AggridNotes &&
                        <AgGridNotes />
                    }
                </section>
            </div>
        </ThemeProvider>
    );
};

export default App;

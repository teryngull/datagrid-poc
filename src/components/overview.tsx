import React from 'react';
import { Grid, Link, Typography } from '@mui/material';

const MuixNotes = (): JSX.Element => {
    return (
        <div style={{ height: 'calc(100vh 48px)', overflowY: 'auto', padding: '32px' }}>
            <Typography variant='h3'>Overview:</Typography>
            <p>
                Below are the data grid projects I researched. Based on previous experiences and the
                <Link
                    style={{ marginLeft: '4px' }}
                    href='https://www.npmtrends.com/@devexpress/dx-react-grid-vs-@devexpress/dx-react-grid-material-ui-vs-@mui/x-data-grid-vs-@progress/kendo-react-grid-vs-@syncfusion/ej2-react-grids-vs-ag-grid-react-vs-react-data-grid-vs-@mui/x-data-grid-pro'
                >
                    NPM trends
                </Link>
                , I am recommending that we move forward with POC&apos;s with MUI and AG Grid.
            </p>
            <ul>
                <li><Link href='https://mui.com/components/data-grid/getting-started/'>MUI Data Grid</Link></li>
                <li><Link href='https://ag-grid.com/react-data-grid/getting-started/'>AG Grid</Link></li>
                <li><Link href='https://devexpress.github.io/devextreme-reactive/react/grid/docs/guides/getting-started/'>Dev Express Reactive Grid</Link></li>
                <li><Link href='https://www.telerik.com/kendo-react-ui/components/grid/get-started/'>Telerik React Grid</Link></li>
                <li><Link href='https://ej2.syncfusion.com/react/demos/#/material/grid/overview'>Syncfusion React Grid</Link></li>
                <li><Link href='https://github.com/adazzle/react-data-grid'>React Data Grid</Link></li>
                <li><Link href='https://github.com/nadbm/react-datasheet'>React Datasheet</Link></li>
            </ul>

            <Typography variant='h5'>Feature List:</Typography>
            <Grid container>
                <Grid item xs={4}>
                    <p>Feature</p>
                    <ul>
                        <li>Top action menu</li>
                        <li>Export data (CSV)</li>
                        <li>Column selection</li>
                        <li>Refresh data</li>
                        <li>Single Row selection</li>
                        <li>Multiple Row selection</li>
                        <li>Row actions</li>
                        <li>Row virtualization</li>
                        <li>Column filtering/searching</li>
                        <li>Column resizing</li>
                        <li>Column reordering</li>
                        <li>Column sorting</li>
                        <li>Column virtualization</li>
                        <li>Sub tables/Master Detail</li>
                        <li>FAB for new row</li>
                        <li>Selects rows per page</li>
                        <li>Pagination with total counts</li>
                    </ul>
                </Grid>
                <Grid item xs={4}>
                    <p>MUI Data Grid</p>
                    <ul>
                        <li>Can do ourselves</li>
                        <li>Yes*</li>
                        <li>Yes</li>
                        <li>Can do ourselves</li>
                        <li>Yes*</li>
                        <li>Yes</li>
                        <li>Yes</li>
                        <li>Yes</li>
                        <li>Yes</li>
                        <li>Yes</li>
                        <li>Yes</li>
                        <li>Yes</li>
                        <li>Yes</li>
                        <li>Yes</li>
                        <li>Can do ourselves</li>
                        <li>Yes</li>
                        <li>Yes</li>
                    </ul>
                </Grid>
                <Grid item xs={4}>
                    <p>AG Grid</p>
                    <ul>
                        <li>Top action menu</li>
                        <li>Export data (CSV)</li>
                        <li>Column selection</li>
                        <li>Refresh data</li>
                        <li>Single Row selection</li>
                        <li>Multiple Row selection</li>
                        <li>Row actions</li>
                        <li>Row virtualization</li>
                        <li>Column filtering/searching</li>
                        <li>Column resizing</li>
                        <li>Column reordering</li>
                        <li>Column sorting</li>
                        <li>Column virtualization</li>
                        <li>Sub tables/Master Detail</li>
                        <li>FAB for new row</li>
                        <li>Selects rows per page</li>
                        <li>Pagination with total counts</li>
                    </ul>
                </Grid>
            </Grid>
        </div>
    );
};

export default MuixNotes;

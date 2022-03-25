import React from 'react';
import { Link, Typography } from '@mui/material';

const MuixNotes = (): JSX.Element => {
    return (
        <div style={{ height: 'calc(100vh 48px)', overflowY: 'auto', padding: '32px' }}>
            <Typography variant='h3'>MUI X Notes</Typography>
            <p><Link href='https://mui.com/components/data-grid/'>Documentation</Link></p>
            <p><Link href='https://mui.com/components/data-grid/getting-started/#feature-comparison'>Community vs. Pro/Premium feature comparison</Link></p>

            <Typography variant='h5'>Overview:</Typography>
            <ul>
                <li>
                    Almost everything seems to be fully customizable and controllable if needed, however for even a simple data grid with very minimal setup, it has all of the basics.
                </li>
                <li>
                    Additional props would need to be added and state controlled in order to implement server side sorting, filtering, pagination, etc.
                </li>
                <li>
                    Overall the documentation was pretty well done, and I only had to go digging into a TS definition for one example when typing the columns var once I added the actions column.
                </li>
            </ul>

            <Typography variant='h5'>Features I implemented/used:</Typography>
            <ul>
                <li>
                    <b>API data is used to populate the table</b>
                    <ul>
                        <li>
                            Used data types of strings, booleans, date and times
                        </li>
                        <li>
                            Simulated calling the server to sort and the same can be done for filtering and pagination
                        </li>
                    </ul>
                </li>

                <li>
                    <b>Loading</b>
                    <ul>
                        <li>
                            The loading component can be overriden from the default circular progress to a linear progress if wanted for a simpler look.
                        </li>
                    </ul>
                </li>

                <li>
                    <b>Columns</b>
                    <ul>
                        <li>
                            Added a custom actions column for our row actions
                        </li>
                        <li>
                            Descriptions can be added for additional info when hovering over a column header
                        </li>
                        <li>
                            Column widths can be set to a number, or you can use a flex property to take up the remaining width, which is really cool
                        </li>
                        <li>
                            Cells can be rendered with custom components and lots of flexibility there for all use cases I could see
                        </li>
                    </ul>
                </li>

                <li>
                    <b>Pinned Columns</b>
                    <ul>
                        <li>
                            Right now, I have the actions and checkbox columns pinned on the left
                        </li>
                    </ul>
                </li>

                <li>
                    <b>Sorting</b>
                    <ul>
                        <li>
                            Implemented a fake server side sorting as an example
                        </li>
                        <li>
                            Sorting order is overridden to not allow them to &lsquo;clear&rsquo; sorting since we typically have a default sort order from the API
                        </li>
                    </ul>
                </li>

                <li>
                    <b>Filtering</b>
                    <ul>
                        <li>
                            Client side filtering is still enabled, but server side is definitely possible and is fully controllable.
                        </li>
                    </ul>
                </li>

                <li>
                    <b>Pagination</b>
                    <ul>
                        <li>
                            Client side pagination is still enabled, but server side is definitely possible and is fully controllable.
                        </li>
                    </ul>
                </li>

                <li>
                    <b>Master Detail</b>
                    <ul>
                        <li>
                            Implemented a basic master detail expansion panel to show more details.
                        </li>
                    </ul>
                </li>

                <li>
                    <b>Toolbar</b>
                    <ul>
                        <li>
                            Can easily just use their default toolbar, or fully customize (see issues below)
                        </li>
                    </ul>
                </li>

                <li>
                    <b>Exporting</b>
                    <ul>
                        <li>
                            Exporting is added in the default toolbar, and some customization is allowed (see issues below)
                        </li>
                    </ul>
                </li>

                <li>
                    <b>Styling</b>
                    <ul>
                        <li>
                            Some additional TS work is needed to be able to override the theme options for the data grid, but honestly the default styles look just fine.
                        </li>
                        <li>
                            Works just fine with our existing theme and dark mode as well.
                        </li>
                    </ul>
                </li>
            </ul>

            <Typography variant='h5'>Issues:</Typography>
            <ul>
                <li>
                    <b>Loading</b>
                    <ul>
                        <li>
                            Additional work/overrides would need to be done to use skeleton loaders, but I do not think that is a dealbreaker.
                        </li>
                    </ul>
                </li>
                <li>
                    <b>Columns</b>
                    <ul>
                        <li>
                            If you implement `checkboxSelection`, I do not see a way to only allow one row to be selected.
                        </li>
                    </ul>
                </li>
                <li>
                    <b>Pagination</b>
                    <ul>
                        <li>
                            Default pagination is the slimmed down version for a table, but you can fully override if if you want to have the page selection as well.
                        </li>
                    </ul>
                </li>
                <li>
                    <b>Master Detail</b>
                    <ul>
                        <li>
                            They might lack some customization with the master detail implementation, but I think for our needs it is probably fine.
                        </li>
                    </ul>
                </li>
                <li>
                    <b>Toolbar</b>
                    <ul>
                        <li>
                            Built-in Toolbar does not adjust for mobile, so it does not fully fit on the screen, so we would need to customize things there.
                        </li>
                    </ul>
                </li>
                <li>
                    <b>Exporting</b>
                    <ul>
                        <li>
                            Exporting does not tie to a server, so we would maybe need to implement a custom export button instead.
                        </li>
                    </ul>
                </li>
            </ul>
        </div>
    );
};

export default MuixNotes;

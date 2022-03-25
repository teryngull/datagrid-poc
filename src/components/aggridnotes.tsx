import React from 'react';
import { Link, Typography } from '@mui/material';

const AgGridNotes = (): JSX.Element => {
    return (
        <div style={{ height: 'calc(100vh 48px)', overflowY: 'auto', padding: '32px' }}>
            <Typography variant='h3'>AG Grid Notes</Typography>
            <Link href='https://ag-grid.com/react-data-grid/'>Documentation</Link>

            <Typography variant='h5'>Overview:</Typography>
            <ul>
                <li>
                    I spent twice as long trying to set up a basic server side data grid with AG Grid than with MUI. This is due to them requiring a really weird &quot;getRows&quot; function to be set up, instead of just utilizing normal React type code.
                </li>
                <li>
                    They do not prioritize providing TypeScript examples, so I had to dig into the interfaces a lot, to only find that they have something typed very loosely, often as &quot;any&quot;.
                </li>
                <li>
                    Lots of other props were typed as strings, but had specific values they had to be typed to. Which was either documented on their website or in some cases, was not.
                </li>
                <li>
                    By default, every feature of a data grid is off by default, so it takes a lot of extra work to turn everything on. As opposed to MUI where a lot of basic functionality is there from the start and you can choose to turn it off if need be.
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
                    </ul>
                </li>

                <li>
                    <b>Loading</b>
                    <ul>
                        <li>
                            The loading component can be overriden if we want.
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
                            Column widths can be set to a number, or you can use a flex property to take up the remaining width, which is really cool
                        </li>
                        <li>
                            Cells can be rendered with custom components and lots of flexibility there for all use cases I could see
                        </li>
                        <li>
                            Column types are pretty confusing and not as simple as MUI to setup. There are ways to fully customize this, but it was difficult to understand the documentation
                        </li>
                    </ul>
                </li>

                <li>
                    <b>Pinned Columns</b>
                    <ul>
                        <li>
                            Right now, I have the actions pinned on the left
                        </li>
                    </ul>
                </li>

                <li>
                    <b>Sorting</b>
                    <ul>
                        <li>
                            Client side sorting is still enabled, but server side appears possible with more work
                        </li>
                    </ul>
                </li>

                <li>
                    <b>Filtering</b>
                    <ul>
                        <li>
                            Client side filtering is still enabled, but server side appears possible with more work
                        </li>
                    </ul>
                </li>

                <li>
                    <b>Pagination</b>
                    <ul>
                        <li>
                            Client side pagination is still enabled, but server side appears possible with more work
                        </li>
                    </ul>
                </li>

                <li>
                    <b>Master Detail</b>
                    <ul>
                        <li>
                            Implemented a basic master detail expansion panel to show more details, but I was unable to get a working example
                        </li>
                    </ul>
                </li>

                <li>
                    <b>Toolbar</b>
                    <ul>
                        <li>
                            They do not seem to have any built-in toolbar, so we would have to implement anything ourselves
                        </li>
                    </ul>
                </li>

                <li>
                    <b>Exporting</b>
                    <ul>
                        <li>
                            Exporting is available with extra work to add the buttons and functionality
                        </li>
                    </ul>
                </li>

                <li>
                    <b>Styling</b>
                    <ul>
                        <li>
                            Default Material styles do not really line up with other MUI tables, but could be adjusted to our needs with SCSS.
                        </li>
                    </ul>
                </li>
            </ul>

            <Typography variant='h5'>Issues:</Typography>
            <ul>
                <li>
                    <b>Columns</b>
                    <ul>
                        <li>
                            The checkbox and master detail options have to be tied to a column, which is kind of weird.
                        </li>
                        <li>
                            Ran into conflict issues with using server data and adding a select all checkbox in the header.
                        </li>
                    </ul>
                </li>
                <li>
                    <b>Pagination</b>
                    <ul>
                        <li>
                            Pagination does seem to have some customization, but we may end up having to override the entire component to do anything other than the basics.
                        </li>
                    </ul>
                </li>
                <li>
                    <b>Master Detail</b>
                    <ul>
                        <li>
                            They might lack some customization with the master detail implementation, but it was hard to tell with their documenation.
                        </li>
                    </ul>
                </li>
                <li>
                    <b>Toolbar</b>
                    <ul>
                        <li>
                            No built in toolbar. Any examples of this are with them building custom html buttons to do any functions.
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
                <li>
                    <b>Themeing</b>
                    <ul>
                        <li>
                            Have to pull in separate CSS to style the table, and it will not tie into our MUI theme.
                        </li>
                        <li>
                            AG Grid does have a material theme, however according to a note on their website:
                            &quot;This theme looks great for simple applications with lots of white space, and is the obvious choice if the rest of your application
                            follows the Google Material Design spec. However, the Material spec does not cater for advanced grid features such as grouped columns
                            and tool panels. If your application uses these features, consider using ag-theme-alpine instead.&quot;
                        </li>
                        <li>
                            If we were to support dark mode as MUI does, we would likely need to use the alpine or balham theme because the AG Grid Material theme does not have built in dark styles.
                        </li>
                    </ul>
                </li>
            </ul>
        </div>
    );
};

export default AgGridNotes;

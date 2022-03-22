# MUI X Data Grid

Documentation: https://mui.com/components/data-grid/

      Overview:
        - Almost everything seems to be fully customizable and controllable if needed, however for even a simple data grid with very minimal setup, it has all of the basics.
        - Additional props would need to be added and state controlled in order to implement server side sorting, filtering, pagination, etc.
        - Overall the documentation was pretty well done, and I only had to go digging into a TS definition for one example when typing the columns var once I added the actions column.
      Features I implemented/used:
        - API data is used to populate the table
            - used data types of strings, booleans, date and times
            - simulated calling the server to sort and the same can be done for filtering and pagination
        - Loading
            - The loading component can be overriden from the default circular progress to a linear progress if wanted for a simpler look.
        - Columns
            - Added a custom actions column for our row actions
            - Descriptions can be added for additional info when hovering over a column header
            - Column widths can be set to a number, or you can use a flex property to take up the remaining width, which is really cool
            - Cells can be rendered with custom components and lots of flexibility there for all use cases I could see
        - Pinned Columns
            - Right now, I have the actions and checkbox columns pinned on the left
        - Sorting
            - Implemented a fake server side sorting as an example
            - Sorting order is overridden to not allow them to "clear" sorting since we typically have a default sort order from the API
        - Filtering
            - Client side filtering is still enabled, but server side is definitely possible and is fully controllable.
        - Pagination
            - Client side pagination is still enabled, but server side is definitely possible and is fully controllable.
        - Master Detail
            - Implemented a basic master detail expansion panel to show more details.
        - Toolbar
            - Can easily just use their default toolbar, or fully customize (see issues below)
        - Exporting
            - Exporting is added in the default toolbar, and some customization is allowed (see issues below)
        - Themeing
            - Some additional TS work is needed to be able to override the theme options for the data grid, but honestly the default styles look just fine.
      Issues:
        - Loading
            - Additional work/overrides would need to be done to use skeleton loaders, but I don't think that's a dealbreaker.
        - Columns
            - If you implement `checkboxSelection`, I don't see a way to only allow one row to be selected.
        - Pagination
            - Default pagination is the slimmed down version for a table, but you can fully override if if you want to have the page selection as well.
        - Master Detail
            - They might lack some customization with the master detail implementation, but I think for our needs it's probably fine.
        - Toolbar
            - Built-in Toolbar doesn't adjust for mobile, so it doesn't fully fit on the screen, so we would need to customize things there.
        - Toolbar
            - Exporting doesn't tie to a server, so we'd maybe need to implement a custom export button instead.

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';

const classesPrefix = 'aggrid';

const classes = {
    sectionWrapper: `${classesPrefix}-sectionWrapper`
};

const StyledSection = styled('section')(() => {
    return {
        [`&.${classes.sectionWrapper}`]: {
            height: 'calc(100vh - 48px)'
        }
    };
});

const AgGrid = (): JSX.Element => {
    const [rowData] = useState([
        { make: 'Toyota', model: 'Celica', price: 35000 },
        { make: 'Ford', model: 'Mondeo', price: 32000 },
        { make: 'Porsche', model: 'Boxter', price: 72000 }
    ]);

    const [columnDefs] = useState([
        { field: 'make' },
        { field: 'model' },
        { field: 'price' }
    ]);

    return (
        <StyledSection className={`ag-theme-material ${classes.sectionWrapper}`}>
            <AgGridReact
                rowData={rowData}
                columnDefs={columnDefs}
            />
        </StyledSection>
    );
};

export default AgGrid;

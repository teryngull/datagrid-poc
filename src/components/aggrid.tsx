import React, { Fragment, useCallback, useMemo } from 'react';
import { toast } from 'react-toastify';
import { IconButton, Link } from '@mui/material';
import { styled } from '@mui/material/styles';
import Icon from '@mdi/react';
import { mdiDelete, mdiSafetyGoggles, mdiContentDuplicate } from '@mdi/js';
import { AgGridReact } from 'ag-grid-react';
import { ColDef, ColGroupDef, GridReadyEvent, ICellRendererParams, IServerSideDatasource, IServerSideGetRowsParams } from 'ag-grid-community';
import 'ag-grid-enterprise';
import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';

import { ApiData, DataResponse } from '../interfaces';

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

const createServerSideDatasource = (server: {
    getData(request: any): {
        success: boolean;
        rows: any[];
    };
}): IServerSideDatasource => {
    return {
        getRows(params: IServerSideGetRowsParams): void {
            console.log('[Datasource] - rows requested by grid: ', params.request);
            // get data for request from our fake server
            const response = server.getData(params.request);
            // simulating real server call with a 500ms delay
            setTimeout(() => {
                if (response.success) {
                    // supply rows for requested block to grid
                    params.success({ rowData: response.rows });
                } else {
                    toast.error('Failed to fetch api data');
                    params.fail();
                }
            }, 500);
        }
    };
};

const createFakeServer = (allData: ApiData[]): {
    getData(request: any): {
        success: boolean;
        rows: any[];
    };
} => {
    return {
        getData(request): {
            success: boolean;
            rows: ApiData[];
        } {
            console.log('request', request);
            // take a copy of the data to return to the client
            const requestedRows = allData.slice();
            return {
                success: true,
                rows: requestedRows
            };
        }
    };
};

const AgGrid = (): JSX.Element => {
    const defaultColDef = {
        sortable: true,
        filter: true,
        resizable: true
    };
    const columns = useMemo((): (ColDef | ColGroupDef)[] => {
        return [
            {
                field: 'actions',
                headerName: 'Actions',
                suppressColumnsToolPanel: true,
                pinned: 'left',
                lockPinned: true,
                resizable: false,
                width: 150,
                cellRenderer: (): JSX.Element => {
                    return (
                        <Fragment>
                            <IconButton><Icon size={1} path={mdiDelete} /></IconButton>
                            <IconButton><Icon size={1} path={mdiSafetyGoggles} /></IconButton>
                        </Fragment>
                    );
                }
            },
            { field: 'API', headerName: 'API Name', checkboxSelection: true, cellRenderer: 'agGroupCellRenderer' },
            { field: 'Auth', headerName: 'Auth' },
            { field: 'Category', headerName: 'Category' },
            { field: 'Cors', headerName: 'Cors', width: 150 },
            { field: 'Description', headerName: 'Description' },
            { field: 'HTTPS', headerName: 'HTTPS' },
            { field: 'createdDate', headerName: 'Created Date', width: 250 },
            {
                field: 'Link',
                headerName: 'API Link',
                flex: 1,
                cellRenderer: (params: ICellRendererParams): React.ReactNode => {
                    return (
                        <Link href={params.value}>{params.value}</Link>
                    );
                }
            }
        ];
    }, []);

    // Fetch fake api data
    const onGridReady = useCallback((params: GridReadyEvent) => {
        fetch('https://api.publicapis.org/entries')
            .then((resp) => { return resp.json(); })
            .then((apiResponse: DataResponse) => {
                const newDataArray = apiResponse.entries.map((apiItem, index) => {
                    return {
                        id: index,
                        createdDate: new Date(),
                        ...apiItem
                    };
                });

                // setup the fake server with entire dataset
                const fakeServer = createFakeServer(newDataArray);
                // create datasource with a reference to the fake server
                const datasource = createServerSideDatasource(fakeServer);
                // register the datasource with the grid
                params.api.setServerSideDatasource(datasource);
            });
    }, []);

    const detailCellRendererParams = {
        detailGridOptions: {
            // detail grid columns
            columnDefs: [
                { field: 'callId' },
                { field: 'direction' },
                { field: 'duration', valueFormatter: "x.toLocaleString() + 's'" },
                { field: 'switchCode', minWidth: 150 },
                { field: 'number', minWidth: 180 }
            ],
            defaultColDef: {
                flex: 1
            }
        },
        getDetailRowData: (params: any): void => {
            // supply data to the detail grid
            params.successCallback(params.data.callRecords);
        }
    };

    return (
        <StyledSection className={`ag-theme-material ${classes.sectionWrapper}`}>
            <AgGridReact
                onGridReady={onGridReady}
                rowModelType='serverSide'
                defaultColDef={defaultColDef}
                columnDefs={columns}
                getRowId={(params): string => { return params.data.id; }}
                rowSelection='multiple'
                masterDetail
                detailCellRendererParams={detailCellRendererParams}
                pagination
            />
        </StyledSection>
    );
};

export default AgGrid;

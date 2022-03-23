import React, { useEffect, useMemo, useState } from 'react';
import { toast } from 'react-toastify';
import { Link } from '@mui/material';
import { styled } from '@mui/material/styles';
import { AgGridReact } from 'ag-grid-react';
import { ColDef, ColGroupDef, ICellRendererParams } from 'ag-grid-community';
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

const loadServerRows = async (sortModel: any): Promise<ApiData[]> => {
    // eslint-disable-next-line no-async-promise-executor
    return new Promise<ApiData[]>(async (resolve, reject) => {
        try {
            const response = await fetch('https://api.publicapis.org/entries');
            const json = await response.json() as DataResponse;

            const newDataArray = json.entries.map((apiItem, index) => {
                return {
                    id: index,
                    createdDate: new Date(),
                    ...apiItem
                };
            });

            if (sortModel.length === 0) {
                resolve(newDataArray);
                return;
            }

            const sortedColumn = sortModel[0];

            let sortedRows = [...newDataArray].sort((a, b) => {
                // @ts-ignore
                return String(a[sortedColumn.field]).localeCompare(String(b[sortedColumn.field]));
            });

            if (sortModel[0].sort === 'desc') {
                sortedRows = sortedRows.reverse();
            }

            resolve(sortedRows);
        } catch (error) {
            toast.error('Failed to fetch api data');
            reject(error);
        }
    });
};

const AgGrid = (): JSX.Element => {
    const [isFetching, setIsFetching] = useState(false);
    const [data, setData] = useState<ApiData[]>([]);

    const defaultColumnParams = {
        sortable: true,
        filter: true
    };
    const columns = useMemo((): (ColDef | ColGroupDef)[] => {
        return [
            {
                field: 'actions',
                headerName: 'Actions',
                type: 'actions',
                // hideable: false,
                width: 80,
                // getActions: (): React.ReactElement<GridActionsCellItemProps>[] => {
                //     return [
                //         <GridActionsCellItem
                //             key='Delete'
                //             icon={<Icon size={1} path={mdiDelete} />}
                //             label='Delete'
                //         />,
                //         <GridActionsCellItem
                //             key='Toggle'
                //             icon={<Icon size={1} path={mdiSafetyGoggles} />}
                //             label='Toggle Admin'
                //             showInMenu
                //         />,
                //         <GridActionsCellItem
                //             key='Duplicate'
                //             icon={<Icon size={1} path={mdiContentDuplicate} />}
                //             label='Duplicate User'
                //             showInMenu
                //         />
                //     ];
                // }
            },
            { field: 'API', headerName: 'API Name', ...defaultColumnParams, checkboxSelection: true },
            { field: 'Auth', headerName: 'Auth', ...defaultColumnParams },
            { field: 'Category', headerName: 'Category', ...defaultColumnParams },
            { field: 'Cors', headerName: 'Cors', ...defaultColumnParams, width: 150 },
            { field: 'Description', headerName: 'Description', ...defaultColumnParams },
            { field: 'HTTPS', headerName: 'HTTPS', ...defaultColumnParams, type: 'boolean' },
            { field: 'createdDate', headerName: 'Created Date', ...defaultColumnParams, type: 'dateTime', width: 250 },
            {
                field: 'Link',
                headerName: 'API Link',
                ...defaultColumnParams,
                flex: 1,
                cellRenderer: (params: ICellRendererParams): React.ReactNode => {
                    return (
                        <Link href={params.value}>{params.value}</Link>
                    );
                }
            }
        ];
    }, [defaultColumnParams]);

    // Fetch fake api data
    useEffect(() => {
        const fetchData = async (): Promise<void> => {
            setIsFetching(true);
            try {
                const newRows = await loadServerRows([]);
                setIsFetching(false);
                setData(newRows);
            } catch (error) {
                setIsFetching(false);
                setData([]);
            }
        };

        fetchData();
    }, []);

    return (
        <StyledSection className={`ag-theme-material ${classes.sectionWrapper}`}>
            <AgGridReact
                rowData={data}
                columnDefs={columns}
            />
        </StyledSection>
    );
};

export default AgGrid;

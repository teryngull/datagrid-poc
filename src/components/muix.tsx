import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { toast } from 'react-toastify';
import { styled } from '@mui/material/styles';
import {
    DataGridPro,
    GridActionsCellItem,
    GridActionsCellItemProps,
    GridActionsColDef,
    GridColDef,
    GridFilterModel,
    GridRenderCellParams,
    GridSortModel,
    // GridToolbar,
    GridToolbarColumnsButton,
    GridToolbarContainer,
    GridToolbarDensitySelector,
    GridToolbarExport,
    GridToolbarFilterButton,
    GRID_CHECKBOX_SELECTION_COL_DEF
} from '@mui/x-data-grid-pro';
import { Grid, Link, Typography } from '@mui/material';
import Icon from '@mdi/react';
import { mdiDelete, mdiSafetyGoggles, mdiContentDuplicate } from '@mdi/js';

const classesPrefix = 'muix';

const classes = {
    sectionWrapper: `${classesPrefix}-sectionWrapper`
};

const StyledSection = styled('section')(() => {
    return {
        [`&.${classes.sectionWrapper}`]: {
            height: 'calc(100vh - 56px)',
            overflowY: 'auto'
        }
    };
});

type Cors = 'yes' | 'no' | 'unknown';

interface ApiData {
    API: string;
    Auth: string;
    Category: string;
    Cors: Cors;
    Description: string;
    HTTPS: boolean;
    Link: string;
}

interface DataResponse {
    count: number;
    entries: ApiData[];
}

const loadServerRows = async (sortModel: GridSortModel): Promise<ApiData[]> => {
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

const CustomToolbar = (): JSX.Element => {
    return (
        <GridToolbarContainer>
            <GridToolbarColumnsButton />
            <GridToolbarFilterButton />
            <GridToolbarDensitySelector />
            <GridToolbarExport />
            {/* <Button>Custom</Button> */}
        </GridToolbarContainer>
    );
};

const Muix = (): JSX.Element => {
    const [isFetching, setIsFetching] = useState(false);
    const [data, setData] = useState<ApiData[]>([]);

    const [sortModel, setSortModel] = useState<GridSortModel>([
        { field: 'API', sort: 'asc' }
    ]);
    const [filterModel, setFilterModel] = useState<GridFilterModel>({
        items: [
            // { id: 1, columnField: 'Link', operatorValue: 'contains', value: 'dog' }
        ]
    });
    const [pageSize, setPageSize] = useState(20);

    // Fetch fake api data
    useEffect(() => {
        const fetchData = async (): Promise<void> => {
            setIsFetching(true);
            try {
                const newRows = await loadServerRows(sortModel);
                setIsFetching(false);
                setData(newRows);
            } catch (error) {
                setIsFetching(false);
                setData([]);
            }
        };

        fetchData();
    }, [sortModel]);

    const columns = useMemo((): (GridActionsColDef | GridColDef)[] => {
        return [
            {
                field: 'actions',
                headerName: 'Actions',
                type: 'actions',
                hideable: false,
                width: 80,
                getActions: (): React.ReactElement<GridActionsCellItemProps>[] => {
                    return [
                        <GridActionsCellItem
                            key='Delete'
                            icon={<Icon size={1} path={mdiDelete} />}
                            label='Delete'
                        />,
                        <GridActionsCellItem
                            key='Toggle'
                            icon={<Icon size={1} path={mdiSafetyGoggles} />}
                            label='Toggle Admin'
                            showInMenu
                        />,
                        <GridActionsCellItem
                            key='Duplicate'
                            icon={<Icon size={1} path={mdiContentDuplicate} />}
                            label='Duplicate User'
                            showInMenu
                        />
                    ];
                }
            },
            { field: 'API', headerName: 'API Name', description: 'Name of the API' },
            { field: 'Auth', headerName: 'Auth' },
            { field: 'Category', headerName: 'Category' },
            { field: 'Cors', headerName: 'Cors', width: 50 },
            { field: 'Description', headerName: 'Description', description: 'Description of the API', flex: 1 },
            { field: 'HTTPS', headerName: 'HTTPS', type: 'boolean' },
            { field: 'createdDate', headerName: 'Created Date', type: 'dateTime', width: 200 },
            {
                field: 'Link',
                headerName: 'API Link',
                hideable: false,
                flex: 1,
                renderCell: (params: GridRenderCellParams<string>): React.ReactNode => {
                    return (
                        <Link href={params.value}>{params.value}</Link>
                    );
                }
            }
        ];
    }, []);

    const getDetailPanelHeight = useCallback(() => {
        return 150;
    }, []);
    const getDetailPanelContent = useCallback(
        ({ row }) => {
            return (
                <div style={{ margin: '16px' }}>
                    <Typography variant='h6'>API Details</Typography>

                    <Grid container>
                        <Grid item md={6}>
                            <Typography variant='body2' color='textSecondary'>
                                API Information
                            </Typography>
                            <Typography variant='body1'>{row.id}</Typography>
                            <Typography variant='body1'>{row.API}</Typography>
                            <Typography variant='body1'>{row.Link}</Typography>
                        </Grid>
                    </Grid>
                </div>
            );
        },
        []
    );

    const handleSortModelChange = (newModel: GridSortModel): void => {
        setSortModel(newModel);
    };

    const handleFilterModelChange = (newFilterModel: GridFilterModel): void => {
        setFilterModel(newFilterModel);
    };

    const handlePageSizeChange = (newPageSize: number): void => {
        setPageSize(newPageSize);
    };

    return (
        <StyledSection className={classes.sectionWrapper}>
            <DataGridPro
                columns={columns}
                rows={data}
                loading={isFetching}
                initialState={{
                    pinnedColumns: {
                        left: ['actions', GRID_CHECKBOX_SELECTION_COL_DEF.field]
                    }
                }}
                checkboxSelection
                // disableMultipleSelection
                // disableSelectionOnClick
                sortingOrder={['desc', 'asc']}
                sortingMode='server'
                sortModel={sortModel}
                onSortModelChange={handleSortModelChange}
                // filterMode='server'
                filterModel={filterModel}
                onFilterModelChange={handleFilterModelChange}
                pagination
                // paginationMode='server'
                pageSize={pageSize}
                onPageSizeChange={handlePageSizeChange}
                rowsPerPageOptions={[5, 10, 20, 50, 100]}
                getDetailPanelHeight={getDetailPanelHeight}
                getDetailPanelContent={getDetailPanelContent}
                components={{
                    // Toolbar: GridToolbar,
                    Toolbar: CustomToolbar
                }}
            />
        </StyledSection>
    );
};

export default Muix;

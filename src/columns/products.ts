import {GridColDef} from "@material-ui/data-grid";


const columnWidth = 150

export const productsColumns: GridColDef[] = [
    {
        field: 'id',
        headerName: 'ID',
        width: columnWidth,
        editable: false,
    },
    {
        field:"brand",
        headerName: '品牌',
        width: columnWidth,
        editable: true,
    },
    {
        field:"category",
        headerName: '分类',
        width: columnWidth,
        editable: true,
    },
    {
        field: 'title',
        headerName: '主题',
        width: columnWidth,
        editable: true,
    },
    {
        field: 'price',
        headerName: '价格',
        width: columnWidth,
        editable: true,
    },
    {
        field: 'stock',
        headerName: '库存',
        width: columnWidth,
        editable: true,
    },

    {
        field: 'rating',
        headerName: '评分',
        width: columnWidth,
        editable: true,
    },
]
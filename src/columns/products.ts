import {GridColDef} from "@material-ui/data-grid";

export const productsColumns: GridColDef[] = [
    {
        field: 'id',
        headerName: 'ID',
        width: 150,
        editable: false,
    },
    {
        field:"brand",
        headerName: '品牌',
        width: 150,
        editable: true,
    },
    {
        field:"category",
        headerName: '分类',
        width: 150,
        editable: true,
    },
    {
        field: 'title',
        headerName: '主题',
        width: 150,
        editable: true,
    },
    {
        field: 'price',
        headerName: '价格',
        width: 150,
        editable: true,
    },
    {
        field: 'stock',
        headerName: '库存',
        width: 150,
        editable: true,
    },

    {
        field: 'rating',
        headerName: '评分',
        width: 150,
        editable: true,
    },
]
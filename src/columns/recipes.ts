import {GridColDef} from "@material-ui/data-grid";

export const recipesColumns: GridColDef[] = [
    {
        field: 'id',
        headerName: 'ID',
        width: 150,
        editable: false,
    },
    {
        field:"name",
        headerName: '菜品名称',
        width: 150,
        editable: false,
    },
    {
        field:"ingredients",
        headerName: '配料表',
        width: 150,
        editable: false,
    },
    {
        field:"instructions",
        headerName: "烹饪步骤",
        width: 150,
        editable: false,
    }

]
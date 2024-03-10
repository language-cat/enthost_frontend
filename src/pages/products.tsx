import {DataGrid, GridColDef} from '@material-ui/data-grid';
import {useState} from "react";
import Header from "@/components/Header";
import {Button, Card, CardContent, Dialog, DialogActions, DialogTitle, Divider, Grid, TextField } from '@material-ui/core';
import React from 'react';


const ProductDetail = ({ openDialog, handleCloseDialog, selectedRow, columns, setSelectedRow, handleEditButtonClick}:any) => {

    const handleInputChange = (event: any, fieldName: string) => {
        const { value } = event.target;
        const updatedRow = { ...selectedRow, [fieldName]: value };
        console.log(updatedRow)
        setSelectedRow(updatedRow)
    }

    return (
        <Dialog open={openDialog} onClose={handleCloseDialog}>
            <DialogTitle>详细信息</DialogTitle>
            <Divider light/>
            <Card variant="outlined" >
                <CardContent>
                    {selectedRow && columns.map(function (column:any, index:number) {
                        if (column.headerName !== '操作') {
                            return(
                                <div key={index}>
                                    <TextField
                                        fullWidth
                                        label={column.headerName}
                                        value={selectedRow[column.field]}
                                        onChange={
                                            (e) => handleInputChange(e, column.field)
                                        }
                                        InputProps={{
                                            readOnly: column.headerName === 'ID'
                                        }}

                                    />
                                </div>
                            )
                        }
                        }
                    )}
                </CardContent>
            </Card>
            <DialogActions>
                <Button variant="contained" color="primary" onClick={handleEditButtonClick} >
                    修改
                </Button>
                <Button variant="contained" color="primary" onClick={handleCloseDialog}>
                    关闭
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default function Products({posts}: any) {
    const [selectedRow, setSelectedRow] = useState(null);
    const [openDialog, setOpenDialog] = useState(false);
    const [data, setData] = useState([])
    const columns: GridColDef[] = [
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
        {
            field: "操作",
            headerName: '操作',
            width: 300,
            renderCell: (params) => (
                <div style={{ display: 'flex', gap: '4px' }}>
                    <Button
                        variant="contained"
                        style={{ backgroundColor: 'lightblue', color: 'black' }}
                        size="small"
                        onClick={() => handleRowClick(params)}
                    >
                        详情
                    </Button>
                    <Button
                        variant="contained"
                        color="primary"
                        size="small"
                        onClick={() => handleEditButtonClick(params.row)}
                    >
                        更改
                    </Button>
                    <Button
                        variant="contained"
                        color="secondary"
                        size="small"
                        onClick={() => handleDeleteButtonClick(params.row)}
                    >
                        删除
                    </Button>
                </div>

            )
        },
    ]
    const handleRowClick = (params:any) => {
        setSelectedRow(params.row);
        setOpenDialog(true);
    };

    const handleCloseDialog = () => {
        setOpenDialog(false);
    };

    const handleEditButtonClick = (params:any) =>{
        console.log("修改按钮")
        console.log(params)
    }

    const handleDeleteButtonClick = (params:any)=>{
        console.log("删除按钮")
        console.log(params.id)
    }

    return (
        <div style={{display: 'flex', height: '95vh', width: '100%'}}>
            <Header/>
            {/*TODO paddingTop need to be fixed */}
            <div style={{flexGrow: 1, overflowX: 'auto', paddingTop: '55px'}}>
                <DataGrid
                    columns={columns}
                    rows={posts.products}
                    rowsPerPageOptions={[5, 10, 25, 50, 100]}
                    checkboxSelection
                    disableSelectionOnClick
                />
                <ProductDetail
                    openDialog={openDialog}
                    handleCloseDialog={handleCloseDialog}
                    handleEditButtonClick={handleEditButtonClick}
                    setSelectedRow={setSelectedRow}
                    selectedRow={selectedRow}
                    columns={columns}
                />
            </div>
        </div>
    );
}


export async function getStaticProps() {
    let res = await fetch('https://dummyjson.com/products')
    let posts = await res.json()

    return {
        props: {
            posts,
        },
    }
}




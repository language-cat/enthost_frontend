import {DataGrid} from '@material-ui/data-grid';
import {useState} from "react";
import Header from "@/components/Header";
import {Button, Card, CardContent, Dialog, DialogActions, DialogTitle, Divider, TextField } from '@material-ui/core';
import React from 'react';
import {useTheme} from "@material-ui/core/styles";
import {productsColumns} from "@/columns/products";
import Box from "@mui/material/Box";


const ProductDetail = ({ openDialog, handleCloseDialog, selectedRow, columns, setSelectedRow, handleEditButtonClick}:any) => {

    const handleInputChange = (event: any, fieldName: string) => {
        const { value } = event.target;
        const updatedRow = { ...selectedRow, [fieldName]: value };
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

export default function Products({rawData}: any) {
    const theme = useTheme();
    const [selectedRow, setSelectedRow] = useState(null);
    const [openDialog, setOpenDialog] = useState(false);
    const [data, setData] = useState([])

    const columns = [
        ...productsColumns,
        {
            field: "操作",
            headerName: '操作',
            width: 300,
            renderCell: (params:any) => (
                <div style={{ display: 'flex', gap: '4px' }}>
                    <Button
                        variant="contained"
                        style={{ backgroundColor: '#c0fc99', color: 'black' }}
                        size="small"
                        onClick={() => handleRowClick(params)}
                    >
                        详情
                    </Button>
                    <Button
                        variant="contained"
                        style={{ backgroundColor: '#3f50b5', color: 'white' }}
                        size="small"
                        onClick={() => handleEditButtonClick(params.row)}
                    >
                        更改
                    </Button>
                    <Button
                        variant="contained"
                        style={{ backgroundColor: '#fd2f1f', color: 'white' }}
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
        <Box sx={{ height: '98vh', width: '100%' }}>
            <Header/>
            <div style={{height: '90%', width: '100%' ,paddingTop: `${theme.mixins.toolbar.minHeight}px`}}>
                <DataGrid
                    columns={columns}
                    rows={rawData.products}
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
        </Box>
    );
}


export async function getStaticProps() {
    let res = await fetch('https://dummyjson.com/products')
    let rawData = await res.json()

    return {
        props: {
            rawData,
        },
        revalidate: 60
    }
}




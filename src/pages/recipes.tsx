import {
    Box,
    Button,
    Card,
    CardActions,
    CardContent,
    CardHeader,
    CardMedia,
    Chip,
    Container,
    Dialog, DialogActions, DialogTitle, Divider,
    Grid,
    Typography
} from "@material-ui/core"
import React, {useEffect, useLayoutEffect, useRef, useState} from "react";
import Header from "@/components/Header";
import { Rating } from "@mui/material";
import {recipesColumns} from "@/columns/recipes";

const RecipeCardDetail = ({openDialog, handleCloseDialog, columns, selectData}:any)=>{
    return (
        <Dialog open={openDialog} onClose={handleCloseDialog}>
            <DialogTitle>Detail</DialogTitle>
            <Divider light/>
            <Box display="flex" justifyContent="space-between" alignItems="center" padding="16px">
                <Box>
                    <Typography
                        variant="h6"
                    >instructions
                    </Typography>
                    <Typography>
                        <ul>
                            {selectData && selectData.instructions.map((ingredient: string, index: number) => (
                                <li key={index}>{ingredient}</li>
                            ))}
                        </ul>
                    </Typography>
                </Box>
                <Box>
                    <Typography
                        variant="h6"
                    >ingredients
                    </Typography>
                    <Typography>
                        <ul>
                            {selectData && selectData.ingredients.map((ingredient: string, index: number) => (
                                <li key={index}>{ingredient}</li>
                            ))}
                        </ul>
                    </Typography>
                </Box>
            </Box>

            <DialogActions>
                <Button variant="contained" color="primary" onClick={handleCloseDialog}>
                    关闭
                </Button>
            </DialogActions>
        </Dialog>
    )
}




const RecipeCards = ({recipe, columns}:any) =>{
    const [selectData, setSelectData] = useState()
    const [openDialog, setOpenDialog] = useState(false)

    const getColorByDifficulty = (difficulty: any): any => {
        const colorByDifficulty = {
            easy: "#4caf50", // 绿色
            medium: "#ff9800", // 橙色
            hard: "#f44336", // 红色
            default: "#4ecdde",
        }
        const lowercaseDifficulty = difficulty.toLowerCase() as keyof typeof colorByDifficulty;
        return colorByDifficulty[lowercaseDifficulty] || colorByDifficulty["default"];
    };


    const handleDialog = (params:any)=>{
        setSelectData(params)
        setOpenDialog(!openDialog);
    }

    const handleCloseDialog = (params:any) =>{
        setOpenDialog(!openDialog)
    }

    return (
        <Grid item xs={12} sm={6} md={4} lg={4}>
            <Container>
                <Card variant="outlined">
                    <CardHeader
                        title={recipe.name}>
                    </CardHeader>
                    <CardContent>
                        <Typography
                            variant="h6"
                            style={{ marginBottom: "2px", color: getColorByDifficulty(recipe.difficulty) }}>
                            {recipe.difficulty}
                        </Typography>
                        <CardMedia
                            component="img"
                            height="300"
                            image={recipe.image}
                        />
                    </CardContent>
                    <CardContent>
                        <Typography variant="subtitle1">tags:</Typography>
                        {recipe.tags.map(function (tag:any, index:string){
                            return(
                                <Chip
                                    key={index}
                                    variant="outlined"
                                    label={tag}
                                />
                            )
                        })}
                    </CardContent>
                    <CardContent>
                        <Typography variant="subtitle1">meal type:</Typography>
                        {recipe.mealType.map(function (tag:any, index:string){
                            return(
                                <Chip
                                    key={index}
                                    variant="outlined"
                                    label={tag}
                                />
                            )
                        })}
                    </CardContent>
                    <CardContent>
                        <Typography variant="subtitle1">rating:</Typography>
                        <Rating name="recipe-rating" value={recipe.rating} precision={0.1} readOnly />
                    </CardContent>
                    <CardActions>
                        <Button
                            size="small"
                            variant="contained"
                            color="primary"
                            onClick={()=>handleDialog(recipe)}
                        >
                            Learn More
                        </Button>
                    </CardActions>
                    <RecipeCardDetail
                        openDialog={openDialog}
                        handleCloseDialog={handleCloseDialog}
                        selectData={selectData}
                        columns={columns}
                    />
                </Card>
            </Container>
        </Grid>
    )
}

export default function Recipes({rawData}:any){
    const [data, setDate] = useState([])

    return (
        <div style={{display: 'flex', width: '100%'}}>
            <Header/>
            <Grid container spacing={1} style={{ flex: 1, overflowY: 'auto' }}>
                {rawData.recipes.map(function (recipe: any) {
                    return (
                        <RecipeCards
                            key={recipe.id}
                            recipe={recipe}
                            columns={recipesColumns}
                        />
                    )
                })}
            </Grid>

        </div>
    )
}


export async function getStaticProps() {
    let res = await fetch('https://dummyjson.com/recipes')
    let rawData = await res.json()

    return {
        props: {
            rawData,
        },
        // revalidate: 60
    }
}
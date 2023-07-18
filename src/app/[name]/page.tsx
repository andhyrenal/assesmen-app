'use client';

import getPokemonBG from "@/helpers/getPokemonBG";
import { Button, Card, CardActions, CardContent, LinearProgress, Snackbar } from "@mui/material";
import Image from "next/image";
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import usePokemonDetail from "./page.hooks";

const detailPokemon = () => {
    const { data, isLoading, onClickBookmark, open, handleClose, message, hasbook} = usePokemonDetail();
    
    return (
        <>
            {data &&
                <Card sx={{ minWidth: 275 }} style={{backgroundColor:'#e2e2e2'}}>
                    <CardContent className="flex">
                        <div className="w-54 mr-24 inline-block rounded-xl relative shadow-inner shadow-black mb-2" style={getPokemonBG(data?.data.types)}>
                            <div className="relative mt-8 -translate-y-0.5 transform">
                                <Image className="drop-shadow-2xl shadow-black" 
                                    src={!isLoading ? data?.data.sprites.other.dream_world.front_default : '/300.png'} 
                                    alt={data?.data.name}
                                    width={200}
                                    height={200}
                                />
                            </div>
                        </div>
                        <Card sx={{ minWidth: 500 }} className="shadow-2xl">
                            <CardContent>
                                <h3 className="font-bold">
                                    Type
                                </h3>
                                {data?.data.types.map((el:any) => 
                                    <ul key={el.type.name}>{el.type.name}</ul>
                                )}
                                <h3 className="font-bold">Base Stats</h3>
                                {data && data?.data.stats.map((item: any) => (
                                    <div className="flex items-baseline" key={item.stat.name}>
                                        <span className="w-24">{item.stat.name}</span>
                                        <span className="w-10">{item.base_stat}</span>
                                        <LinearProgress className="p-2 w-96 rounded-full" variant="determinate" value={item.base_stat} />
                                    </div>
                                ))}
                            </CardContent>
                        </Card>
                    </CardContent>
                    <CardActions className="-mt-7 ml-3">
                        <Button onClick={() => onClickBookmark(data?.data)} className="w-48" variant="contained" startIcon={hasbook ? <BookmarkIcon /> : <BookmarkBorderIcon />}>
                            Bookmark
                        </Button>
                    </CardActions>
                    <Snackbar
                        open={open}
                        autoHideDuration={1000}
                        onClose={handleClose}
                        message={message}
                    />
                </Card>
            }
        </>
    )
}

export default detailPokemon
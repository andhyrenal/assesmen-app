'use client';

import { Button, Card, CardActions, CardContent } from "@mui/material";
import getPokemonBG from "@/helpers/getPokemonBG";
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import Image from "next/image";
import Link from "next/link";
import useBookMark from "./page.hooks";

const MyPokemons = () => {
    const {pokemons, onClickBookmark} = useBookMark();
    return (
        <>
            <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
                {pokemons.length !== 0 &&
                    pokemons.map(el => (
                    <Card sx={{ maxWidth: 345 }} key={el.id}>
                        <CardContent>
                            <div className="w-54 mr-24 inline-block rounded-xl relative shadow-inner shadow-black mb-2" style={getPokemonBG(el.types)}>
                                <div className="relative mt-8 -translate-y-0.5 transform">
                                    <Image className="drop-shadow-2xl shadow-black" 
                                        src={el.sprites.other.dream_world.front_default} 
                                        alt={el.name}
                                        width={200}
                                        height={200}
                                    />
                                </div>
                            </div>
                            <h3 className="font-bold">
                                {el.name}
                            </h3>
                        </CardContent>
                        <CardActions className="ml-3">
                            <Link href={`/${el.name}`} className='text-indigo-700'>See Detail</Link>
                        </CardActions>
                    </Card>
                ))}
            </div>
        </>
    )
}

export default MyPokemons
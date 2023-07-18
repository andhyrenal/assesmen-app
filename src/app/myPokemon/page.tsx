'use client';

import { Card, CardContent } from "@mui/material";
import useBookMark from "./page.hooks";
import getPokemonBG from "@/helpers/getPokemonBG";
import Image from "next/image";

const myPokemons = () => {
    const {pokemons, onClickBookmark} = useBookMark();
    console.log(pokemons)
    return (
        <>
            <div className="flex gap-10">
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
                    </Card>
                ))}
            </div>
        </>
    )
}

export default myPokemons
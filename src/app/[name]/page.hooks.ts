"use client";
import { Pokemon } from "@/types/pokemon";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { usePathname } from "next/navigation";

const usePokemonDetail = () => {
    const pathname = usePathname();
    const name = pathname?.replaceAll('/', '')
    const url = `https://pokeapi.co/api/v2/pokemon/${name}`

    const fetchData = async (url:string) => {
        const data = await axios.get(url)
        const pokemonList = JSON.parse(String(localStorage.getItem('myPokemonList'))) as Array<Pokemon>;
        data.data.hasBookMarked = Boolean((pokemonList || []).find(el => el.id === data.data.id));
        return data
    }

    const onClickBookmark = (pokemon: Pokemon) => {
      const {hasBookMarked, id} = pokemon;
      console.log(pokemon)
      const pokemonList = JSON.parse(String(localStorage.getItem('myPokemonList'))) as Array<Pokemon> || [];
      const newPokemonList = hasBookMarked ? pokemonList.filter(el => el.id !== id) : [...pokemonList, pokemon];
      newPokemonList.map(el => {
          el.hasBookMarked = true
        })
      console.log(newPokemonList)
      localStorage.setItem('myPokemonList', JSON.stringify(newPokemonList));
    };

    const {data, isLoading} = useQuery(["detail", ], () => fetchData(url))
    return {
      data,
      isLoading,
      onClickBookmark
    };
  };
  
  export default usePokemonDetail;
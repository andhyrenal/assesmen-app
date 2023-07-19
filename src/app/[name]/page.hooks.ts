"use client";
import { Pokemon } from "@/types/pokemon";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const usePokemonDetail = () => {
    const pathname = usePathname();
    const name = pathname?.replaceAll('/', '')
    const url = `https://pokeapi.co/api/v2/pokemon/${name}`
    const [open, setOpen] = useState(false);
    const [hasbook, setHasBook] = useState(false);
    const [message, setMessage] = useState('');
    const [NewPokemon, setNewPokemon] = useState<Pokemon | null>(null);
    
    const {data, isLoading} = useQuery(["detail", ], () => fetchData(url))

    const fetchData = async (url:string) => {
        const data = await axios.get(url)
        const pokemonList = JSON.parse(String(localStorage.getItem('myPokemonList'))) as Array<Pokemon>;
        data.data.hasBookMarked = Boolean((pokemonList || []).find(el => el.id === data.data.id));
        setHasBook(data.data.hasBookMarked)
        setNewPokemon(data.data)
        return NewPokemon
    }

    const onClickBookmark = (pokemon: Pokemon) => {
      const {hasBookMarked, id} = pokemon;
      const pokemonList = JSON.parse(String(localStorage.getItem('myPokemonList'))) as Array<Pokemon> || [];
      const newPokemonList = hasBookMarked ? pokemonList.filter(el => el.id !== id) : [...pokemonList, pokemon];
      pokemon.hasBookMarked = !hasBookMarked;
      setHasBook(!hasBookMarked);
      setNewPokemon(pokemon)
      setMessage(hasBookMarked ? 'Berhasil menghapus Pokemon' : 'Berhasil menambah Pokemon')
      setOpen(true);
      localStorage.setItem('myPokemonList', JSON.stringify(newPokemonList));
      
    };

    const handleClose = (
      event: React.SyntheticEvent | Event,
      reason?: string
    ) => {
      if (reason === 'clickaway') {
        return;
      }

      setOpen(false);
    };

    useEffect(() => {
      fetchData(url);
    }, [open]);

    return {
      NewPokemon,
      isLoading,
      onClickBookmark,
      open,
      handleClose,
      message,
      hasbook    };
  };
  
  export default usePokemonDetail;
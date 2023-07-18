import { Pokemon } from "@/types/pokemon";
import { useEffect, useState } from "react";

const useBookMark = () => {  
    const [pokemons, setPokemons] = useState<Array<Pokemon>>([]);
  
    const getData = () => {
        const pokemonList = JSON.parse(String(localStorage.getItem('myPokemonList'))) as Array<Pokemon> || [];
      const sortedPokemon = pokemonList.sort((a, b) => a.id - b.id);
      setPokemons(sortedPokemon.map(el => {
        el.hasBookMarked = true;
        return el;
      }));
      return pokemonList;
    };
    

    const onClickBookmark = (pokemon: Pokemon) => {
      const {hasBookMarked, id} = pokemon;
      const pokemonList = JSON.parse(String(localStorage.getItem('myPokemonList'))) as Array<Pokemon> || [];
      const newPokemonList = hasBookMarked ? pokemonList.filter(el => el.id !== id) : [...pokemonList, pokemon];
      localStorage.setItem('myPokemonList', JSON.stringify(newPokemonList));
      setPokemons(pokemons.map(el => {
        if (el.id === id) {
          el.hasBookMarked = !hasBookMarked;
        }
        return el;
      }));

    };

    useEffect(() => {
        getData();
      }, []);
  
    return {
      pokemons,
      onClickBookmark
    };
  };
  
  export default useBookMark;
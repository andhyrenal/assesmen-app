"use client";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useEffect, useState } from "react";

const usePokemonList = () => {
    const [url, setUrl] = useState("https://pokeapi.co/api/v2/pokemon?offset=0&limit=10");
    const [nextPage, setNextPage] = useState(false);
    const [prevPage, setPrevPage] = useState(false);
    
    const fetchData = async (url:string) => {
        return await axios.get(url)
    }

    const {data, isLoading} = useQuery(["pokemonList", url], () => fetchData(url))

    const handleDisable = () => {
        data?.data.next ? setNextPage(false) : setNextPage(true)
        data?.data.previous ? setPrevPage(false) : setPrevPage(true)
    }

    const handleNextPage = () => {
        setUrl(data?.data.next)
    }

    const handlePrevPage = () => {
        setUrl(data?.data.previous)
    }

    useEffect(() => {
        handleDisable();
    }, [data?.data]);

    return {
      data,
      isLoading,
      nextPage,
      prevPage,
      handleNextPage,
      handlePrevPage,
    };
  };
  
  export default usePokemonList;
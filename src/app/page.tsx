"use client";

import EnhancedTable from "@/components/table";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import axios from 'axios';
import { CircularProgress } from "@mui/material";

export default function Home() {
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

  if (isLoading || !data) return <div className="flex justify-center"><CircularProgress /></div>

  return (
    <div>
      <h1 className="font-bold">List Pokémon</h1>
      <div className="flex flex-col items-center justify-between p-5">
        <EnhancedTable 
          data={data?.data.results} 
          handleNextPage={handleNextPage} 
          handlePrevPage={handlePrevPage}
          actionTable= {true}
          nextPage= {nextPage}
          prevPage= {prevPage}
        />
      </div>
    </div>
  )
}

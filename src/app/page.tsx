"use client";

import EnhancedTable from "@/components/table";
import { CircularProgress } from "@mui/material";
import usePokemonList from "./page.hooks";

export default function Home() {
  const { data, isLoading, nextPage, prevPage, handleNextPage, handlePrevPage} = usePokemonList();

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

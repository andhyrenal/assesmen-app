import TYPE_COLORS from '@/constant/typeColors';
import { Type } from '@/types/pokemon';

const getPokemonBG = (types: Array<Type>) => {
  console.log(types)
  const type = types.map((el:any) => el.type.name)
  return {
    background: `linear-gradient(
                   to right, 
                   ${TYPE_COLORS[type[0]]} 50%, 
                   ${TYPE_COLORS[type[1]] || TYPE_COLORS[type[0]]})`
  };
};
export default getPokemonBG
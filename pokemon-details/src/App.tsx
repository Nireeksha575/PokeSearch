import {  useState } from "react";

function App(){
  const [name,setName]=useState<string>('');
  const [inputText,setInputText]=useState<string>('')
  const [ability, setAbility] = useState<string>('');
  const [error,setError]=useState<boolean>(false)
  const [errMsg, seterrMsg] = useState<string>('');

  function fetchPokemon(pokemonName:string){
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`).then((response)=>response.json()).then((data) => {
      setName(data.name);
      setError(false);          
      seterrMsg(''); 
      if (data.abilities && data.abilities.length > 0) {
        setAbility(data.abilities[0].ability.name);
      }
    }).catch(()=>{
      setError(true);
      setAbility(' ');
     setName('');
     seterrMsg('Sry.. Pokemon not found')
    });
  }
  return(
    <div className="flex flex-col items-center justify-center bg-gradient-to-tl from-blue-300 to-blue-600 h-screen">
       <h1 className="text-fuchsia-900 font-bold">POKEMON INFO</h1>
       <input className="p-2 border-2 rounded-md" type="text" value={inputText} placeholder="Enter the pokemon name?" onChange={(e)=>setInputText(e.target.value)}/>
       <button className="bg-fuchsia-500 text-white p-2 mt-3 rounded-md" onClick={()=>fetchPokemon(inputText)}>Search</button>
        {name &&(
          <>
                 <div className="font-bold">{name.toUpperCase()}</div>
                 <div className="font-bold text-xl">Ability: {ability.toUpperCase()}</div>
          </>
        )}
        {
          error &&(
            <div className="font-bold text-red-600 text-sm">{errMsg}</div>
          )
        }
    </div>
  )
}
export default App;
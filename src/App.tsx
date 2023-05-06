import React, { useState } from "react"
import { useTypedDispatch, useTypedSelector } from "./store"
import { elementsMap, parse } from "./store/reducers/chemicals"

const App = () => {
  
  const {formula, elements, molecularMass, massFraction} = useTypedSelector(state => state.chemicals)
  const dispatch = useTypedDispatch()

  const [rawFormula, setRawFormula] = useState("H2O")

  return (
    <div className="flex flex-col justify-between min-h-screen">
      <div className="flex flex-col justify-center items-center pt-32">
        <h1 className="text-2xl font-bold">Formula Parser</h1>
        <h1 className="text-2xl">{formula}</h1>
      <div className="flex justify-start w-96">
        <input onChange={(e) => setRawFormula(e.target.value)} type="text" className="text-xl bg-gray-300 border-blue-700 border-2 w-full"/>
        <button onClick={() => dispatch(parse(rawFormula))}  className="ml-2 bg-sky-600 font-mono text-white duration-200 hover:bg-sky-900  ">Calculate</button>
      </div>

      <div className="bg-slate-300 w-96 h-fit pb-11 px-40 shadow-2xl flex flex-col justify-start items-center">
        <div className="w-36 text-center">Molecular Mass: {molecularMass}</div>
        {(() => {
          let res : React.ReactNode[] = []

          Object.keys(elements).forEach((val) => {
            res.push(
            <div> 
              <span className="text-xl">{val}</span>
              <span className="text-xs">{elements[val]}</span>
              <span className="text-slate-800 text-2xl">[{massFraction[val]}%]</span>
              <br/>
              <div className="w-96">{elementsMap.get(val)!.summary}</div>
            </div>
            )
          })

          return res
        })()}
      </div>
      </div>

      <footer className="mt-auto w-full bg-slate-700 h-12 flex justify-center items-center text-white">
        Made by Intervinn and powered by Vercel
      </footer>
    </div>
  )
}

export default App
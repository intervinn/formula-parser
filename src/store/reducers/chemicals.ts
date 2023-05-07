import { createSlice } from "@reduxjs/toolkit";
import chemicalFormula from "chemical-formula"
import elementsJson from "./elements.json"

export const elementsMap = new Map(Object.entries(elementsJson))

interface ChemicalState {
    formula: string,
    elements: {[key : string] : number},
    molecularMass : number,
    massFraction : {[key : string] : number}
}

const initialState : ChemicalState = {
    formula: "",
    elements: {},
    molecularMass: 0,
    massFraction: {}
}

const chemicalReducer = createSlice({
    name: "count",
    initialState,
    reducers: {
        parse: (state, action) => {
            state.formula = action.payload
            state.elements = chemicalFormula(action.payload)
            let molecularMass : number = 0
            let massFraction : {[key : string] : number} = {}
            Object.keys(state.elements).forEach((k) => {
                molecularMass += (state.elements[k] * elementsMap.get(k)!.atomic_mass)
            })

            Object.keys(state.elements).forEach((k) => {
                massFraction[k] = Math.round(state.elements[k] * elementsMap.get(k)!.atomic_mass / molecularMass * 100)
            })
            state.molecularMass = molecularMass
            state.massFraction = massFraction
        }
    }
})

export const {parse} = chemicalReducer.actions

export default chemicalReducer.reducer
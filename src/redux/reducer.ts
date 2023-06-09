import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import Dish from "./types";


interface initial {
    dishes: Dish[];
    totalAmount: number,
}
const initialState: initial = {
    dishes: [],
    totalAmount: 0,
}

const cartSlicer = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addMeal: (state, action: PayloadAction<Dish>) => {
            state.totalAmount += action.payload.numberOfItem * action.payload.price;
            let alreadyExistedItemIndex = state.dishes.findIndex(item => item.id === action.payload.id);
            let existedItem = state.dishes[alreadyExistedItemIndex];
            if (existedItem) {
                const updateItem = {
                    ...existedItem,
                    numberOfItem: Number(existedItem.numberOfItem) + Number(action.payload.numberOfItem)
                };
                state.dishes = state.dishes.map((dish) => {
                    if (dish.id === action.payload.id) {
                        return updateItem
                    }
                    else {
                        return dish
                    }
                })
            }
            else {
                state.dishes.push(action.payload);
                // state = {...state, dishes:[...state.dishes,action.payload]} // both are same

            }
        },
    removeMeal:(state,action:PayloadAction<Dish>) =>{
        state.totalAmount -= action.payload.price;
        let alreadyExistedItemIndex = state.dishes.findIndex(item => item.id === action.payload.id);
            let existedItem = state.dishes[alreadyExistedItemIndex];
            if(Number(existedItem.numberOfItem) === 1){
                state.dishes = state.dishes.filter((item) => {  return item.id !== action.payload.id})

            }
            else{
                const reduceItem = {
                    ...existedItem,
                    numberOfItem: Number(existedItem.numberOfItem) - 1,
                };
                state.dishes = state.dishes.map((dish) => {
                    if (dish.id === action.payload.id) {
                        return reduceItem
                    }
                    else {
                        return dish
                    }
                });
            }
    },
    emptyCart:(state) =>  {
          state.dishes=[];
          state.totalAmount = 0;
    },
    }
});


export const { addMeal , removeMeal, emptyCart} = cartSlicer.actions;
export default cartSlicer.reducer;
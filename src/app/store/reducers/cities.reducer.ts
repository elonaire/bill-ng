import { createReducer, on, Action } from "@ngrx/store";
import { BillboardzCitiesState } from "src/app/@types/billboardz";
import { loadCities, loadCitiesSuccess } from "../actions/cities.actions";

export const INITIAL_STATE: BillboardzCitiesState = {
    cities: [],
    loading: false,
};

const citiesReducer = createReducer(
    INITIAL_STATE,
    on(loadCities, (state) => state),
    on(loadCitiesSuccess, (state, { payload }) => {
      
      return {
        ...state,
        loading: false,
        suppliers: payload.data['getCities'],
      };
    }),
    );
  
  export function reducer(state: BillboardzCitiesState | undefined, action: Action) {
    return citiesReducer(state, action);
  }
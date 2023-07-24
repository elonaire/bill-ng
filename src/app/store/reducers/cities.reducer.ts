import { createReducer, on, Action } from "@ngrx/store";
import { BillboardzCitiesState } from "src/app/@types/billboardz";
import { loadCities, loadCitiesSuccess } from "../actions/cities.actions";
import { error } from "../actions/global.actions";

export const INITIAL_STATE: BillboardzCitiesState = {
    cities: [],
    loading: false,
    error: '',
};

const citiesReducer = createReducer(
    INITIAL_STATE,
    on(loadCities, (state) => state),
    on(loadCitiesSuccess, (state, { payload }) => {
      
      return {
        ...state,
        loading: false,
        cities: payload.data['getCities'],
      };
    }),
    on(error, (state, { payload }) => {
      return {
          ...state,
          loading: false,
          error: payload['message']
      };
    })
    );
  
  export function reducer(state: BillboardzCitiesState | undefined, action: Action) {
    return citiesReducer(state, action);
  }
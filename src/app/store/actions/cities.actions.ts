import { createAction } from "@ngrx/store";
import { ActionPayloadResponse } from "src/app/@types/billboardz";

export const loadCities = createAction('[Cities] Load Cities');
export const loadCitiesSuccess = createAction('[Cities] Load Cities Success', (payload: ActionPayloadResponse) => ({ payload }));

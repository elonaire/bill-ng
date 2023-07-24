import { createAction } from "@ngrx/store";

export const error = createAction('[Global] Error', (payload: any) => ({ payload }));

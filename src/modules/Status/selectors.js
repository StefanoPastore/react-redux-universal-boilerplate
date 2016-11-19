import { createSelector } from 'reselect';

export const getData = (state) => state.Error;

export const crash = createSelector(getData, data => data.crash);
export const notFound = createSelector(getData, data => data.notFound);

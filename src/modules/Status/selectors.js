import { createSelector } from 'reselect';

export const getData = (state) => state.Status;

export const crash = createSelector(getData, data => data.crash);
export const notFound = createSelector(getData, data => data.notFound);

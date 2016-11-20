import { createSelector } from 'reselect';

export const getData = (state) => state.HelloWorld;

export const helloWorld = createSelector(getData, data => data.helloWorld);

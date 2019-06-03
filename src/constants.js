import { getArrayEntry } from "./utils";

export const possibleColors = ["#FFAA32", "#FFBF69", "#F2D49D"];

export const keywords = [
  "competitors",
  "similar products",
  "industry",
  "relevant topics",
  "clients",
  "companies",
  "analyzing data"
];
export const possibleEndings = [
  "report",
  "in my area",
  "data"
];

export const getSearchText = () =>
  `${getArrayEntry(keywords)} ${getArrayEntry(possibleEndings)}`;
// export const possibleText = ['My competitors', 'similar products', 'industry report', 'relevant topic', 'clients in my area', 'companies using similar products', 'analyzing data']

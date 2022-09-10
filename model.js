import { getRandomId, shuffleArray } from "./helper.js";
import { API_URL } from "./config.js";

import "core-js/stable";
import "regenerator-runtime/runtime";
import { async } from "regenerator-runtime";

export const state = {
  pokemons: [],
};

export const getData = async function () {


  const arr = getRandomId();
  const randomIds = [...arr, ...arr];

  shuffleArray(randomIds);

  const pokePromises = randomIds.map(id => fetch(`${API_URL}${id}`));
  const responses = await Promise.all(pokePromises);
  const data = await Promise.all(responses.map(res => res.json()));
  state.pokemons = data;
  return data;

};


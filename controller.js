import * as model from "./model.js";
import appView from "./appView.js";

const controlReset = async function () {

  model.state.pokemons = await model.getData();
  appView.render(model.state.pokemons);
  if (appView._matches === 8) {
    console.log("You won");
    model.state.pokemons = await model.getData();
    appView.render(model.state.pokemons);
  }

};

const init = async function () {

  await model.getData();
  console.log(model.state.pokemons);
  appView.render(model.state.pokemons);
  appView.addHandlerClick();
  appView.addHandlerReset(controlReset);
};
init();





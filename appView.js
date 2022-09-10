import View from "./view.js";
import { getBackAndFront, rotateElements } from "./helper.js";

class AppView extends View {
  _parentElement = document.querySelector(".game");
  _cardNum = 0;
  _firstPick = null;
  _secondPick = null;
  _isPaused = false;
  _matches = 0;


  generateMarkup() {

    const colors = {
      fire: '#FDDFDF',
      grass: '#DEFDE0',
      electric: '#FCF7DE',
      water: '#DEF3FD',
      ground: '#f4e7da',
      rock: '#d5d5d4',
      fairy: '#fceaff',
      poison: '#98d7a5',
      bug: '#f8d5a3',
      dragon: '#97b3e6',
      psychic: '#eaeda1',
      flying: '#F5F5F5',
      fighting: '#E6E0D4',
      normal: '#F5F5F5'
    };

    return this._data.map((pokemon, index) => {
      const color = colors[pokemon.types[0]?.type?.name] || "normal";
      const markup = `
      <div class="card" data-pokename=${pokemon.name} style="background-color:${color};">
        <div class="back"></div>
        <div class="front rotate" style="background-color:${color};">
          <img src="${pokemon.sprites.front_default}" alt="${pokemon.name}"/>
          <h2>${pokemon.name}</h2>
        </div>
      </div>
      `;
      return markup;
    }).join("");


  }

  addHandlerClick() {
    this._parentElement.addEventListener("click", (e) => {
      e.preventDefault();
      const card = e.target.closest(".card");
      console.log(card.dataset.pokename);
      const [back, front] = getBackAndFront(card);
      console.log(back, front);

      if (back.classList.contains("rotate") || this._isPaused) return;
      this._isPaused = true;
      rotateElements([back, front]);
      if (!this._firstPick) {
        this._firstPick = card;
        this._isPaused = false;
      } else {
        const firstPokemonName = this._firstPick.dataset.pokename;
        const secondPokemonName = card.dataset.pokename;
        if (firstPokemonName !== secondPokemonName) {
          const [firstBack, firstFront] = getBackAndFront(this._firstPick);
          setTimeout(() => {
            rotateElements([back, front, firstBack, firstFront]);
            this._firstPick = null;
            this._isPaused = false;
          }, 500);

        } else {
          this._matches++;
          this._firstPick = null;
          this._isPaused = false;
        }
      }



    });
  }

  addHandlerReset(handler) {
    const btn = document.querySelector(".reset");
    btn.addEventListener("click", function (e) {
      e.preventDefault();
      this._matches = 0;
      this._firstPick = null;
      this._secondPick = null;
      this._isPaused = true;
      setTimeout(() => {
        handler();
        this._isPaused = false;

      }, 200);




    });
  }


};


export default new AppView();
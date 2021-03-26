import React from "react";
import ReactDOM from "react-dom";
import Axios from "axios";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import "bootstrap/dist/css/bootstrap.min.css";

////////////////
// Configurar los rangos de los consecutivos
// en el localStorage en el client es lo primero que se debe hacer!
////////////////

const stealIds = (c) => {
  let ret = [];
  c.forEach((x) => {
    ret = [...ret, x["id"]];
  });
  return ret;
};

const returnNumbers = (str) => {
  let numbers = "";
  for (let i = 0; i < str["length"]; i++) {
    if (!isNaN(str[i])) {
      numbers += str[i];
    }
  }
  return numbers;
};

const splitIds = (ids) => {
  let ret = [];
  ids.forEach((x) => {
    x = returnNumbers(x);
    ret = [...ret, x];
  });
  return ret;
};

const c_setter = (arr) => {
  return arr["length"];
};

const localStorageInitialConfigurations = (uriEntityStr, localKeyStr) => {
  if (localStorage.getItem(localKeyStr) === null) {
    const uri = `https://vvuelosrestfulservices.azurewebsites.net/api/${uriEntityStr}`;
    let aux = [];
    Axios.get(uri)
      .then((res) => {
        aux = res["data"];
        aux = stealIds(aux);
        aux = splitIds(aux);
        aux = c_setter(aux);
        localStorage.setItem(localKeyStr, aux);
      })
      .catch((err) => alert(err));
  } else {
    console.log(`${localKeyStr} ya esta configurado en el cliente.`);
  }
};

(() => {
  [
    { r: "rPuertas", t: "Puertas" },
    { r: "rVuelosLlegadas", t: "VuelosLlegadas" },
    { r: "rAerolineas", t: "Aerolineas" },
    { r: "rBoletos", t: "Boletos" },
    { r: "rVuelosSalidas", t: "VuelosSalidas" },
    { r: "rPaises", t: "Paises" },
  ].forEach((obj) => {
    localStorageInitialConfigurations(obj["t"], obj["r"]);
  });
})();

////////////////////////////////////////////////////////////

ReactDOM.render(<App />, document.getElementById("root"));
reportWebVitals();

import Axios from "axios";

//Sirve para escribir un nuevo rango YA EXISTENTE, lo mismo para read(key).
export const write = (key, range) => {
  if (localStorage.getItem(key) === undefined)
    throw new Error(`Key '${key}' inexistente en el localStorage!`);
  localStorage.setItem(key, range);
  console.log(`Rango ${key} configurado a ${range}.`);
};

export const read = (key) => {
  if (localStorage.getItem(key) === undefined)
    throw new Error(`Key '${key}' inexistente en el localStorage!`);
  return localStorage.getItem(key);
};

export const goNext = async (table) => {
  let consecutivos = await getConsecutivos();

  switch (table) {
    case "paises":
      if (localStorage.getItem("rPaises") === undefined) {
        localStorage.setItem("rPaises", Number(consecutivos[0]["rangoi"]));
      } else {
        if (localStorage.getItem("rPaises") >= consecutivos[0]["rangof"])
          throw new Error(
            `El rango del consecutivo ${consecutivos[0]["tabla"]} ha llegado a su limite! Cree mas consecutivos!`
          );
        localStorage.setItem(
          "rPaises",
          Number(localStorage.getItem("rPaises")) + 1
        );
      }
      break;
    case "aerolineas":
      if (localStorage.getItem("rAerolineas") === undefined) {
        localStorage.setItem("rAerolineas", Number(consecutivos[1]["rangoi"]));
      } else {
        if (localStorage.getItem("rAerolineas") >= consecutivos[1]["rangof"])
          throw new Error(
            `El rango del consecutivo ${consecutivos[1]["tabla"]} ha llegado a su limite! Cree mas consecutivos!`
          );
        localStorage.setItem(
          "rAerolineas",
          Number(localStorage.getItem("rAerolineas")) + 1
        );
      }
      break;
    case "puertas":
      if (localStorage.getItem("rPuertas") === undefined) {
        localStorage.setItem("rPuertas", Number(consecutivos[2]["rangoi"]));
      } else {
        if (localStorage.getItem("rPuertas") >= consecutivos[2]["rangof"])
          throw new Error(
            `El rango del consecutivo ${consecutivos[2]["tabla"]} ha llegado a su limite! Cree mas consecutivos!`
          );
        localStorage.setItem(
          "rPuertas",
          Number(localStorage.getItem("rPuertas")) + 1
        );
      }
      break;
    case "vs":
      if (localStorage.getItem("rVuelosSalidas") === undefined) {
        localStorage.setItem(
          "rVuelosSalidas",
          Number(consecutivos[3]["rangoi"])
        );
      } else {
        if (localStorage.getItem("rVuelosSalidas") >= consecutivos[3]["rangof"])
          throw new Error(
            `El rango del consecutivo ${consecutivos[3]["tabla"]} ha llegado a su limite! Cree mas consecutivos!`
          );
        localStorage.setItem(
          "rVuelosSalidas",
          Number(localStorage.getItem("rVuelosSalidas")) + 1
        );
      }
      break;
    case "vl":
      if (localStorage.getItem("rVuelosLlegadas") === undefined) {
        localStorage.setItem(
          "rVuelosLlegadas",
          Number(consecutivos[4]["rangoi"])
        );
      } else {
        if (
          localStorage.getItem("rVuelosLlegadas") >= consecutivos[4]["rangof"]
        )
          throw new Error(
            `El rango del consecutivo ${consecutivos[4]["tabla"]} ha llegado a su limite! Cree mas consecutivos!`
          );
        localStorage.setItem(
          "rVuelosLlegadas",
          Number(localStorage.getItem("rVuelosLlegadas")) + 1
        );
      }
      break;
    case "boletos":
      if (localStorage.getItem("rBoletos") === undefined) {
        localStorage.setItem("rBoletos", Number(consecutivos[5]["rangoi"]));
      } else {
        if (localStorage.getItem("rBoletos") >= consecutivos[5]["rangof"])
          throw new Error(
            `El rango del consecutivo ${consecutivos[5]["tabla"]} ha llegado a su limite! Cree mas consecutivos!`
          );
        localStorage.setItem(
          "rBoletos",
          Number(localStorage.getItem("rBoletos")) + 1
        );
      }
      break;
    default:
      throw new Error("Error en el módulo StorageHandler.js");
  }
};

export const getConsecutivos = async () => {
  let consecutivos = [];
  const uri =
    "https://vvuelosrestfulservices.azurewebsites.net/api/Consecutivos";
  await Axios.get(uri)
    .then((res) => {
      let arr = Object.values(res["data"]);
      arr.forEach((c) => {
        consecutivos = [...consecutivos, c];
      });
    })
    .catch((err) => console.log(err));
  return consecutivos;
};

// devuelve el consecutivo propio correspondiente a la llave primaria de la tabla
export const trim = (consecutivo, rango) => {
  return consecutivo["prefijo"] !== null
    ? `${consecutivo["prefijo"]}-${consecutivo["consecutivo"]}${rango}`
    : `${consecutivo["consecutivo"]}${rango}`;
};

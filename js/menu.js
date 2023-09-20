const openMenu = document.querySelector("#open-menu");
const closeMenu = document.querySelector("#close-menu");
const aside = document.querySelector("aside");

openMenu.addEventListener("click", () => { /** esto para que al hacer click en el boton de las 3 rayitas de menu se abra la parte de la izquierda con todo el menu */
    aside.classList.add("aside-visible");
})

closeMenu.addEventListener("click", () => { /** para que al hacer click en la x se cierre el menu */
    aside.classList.remove("aside-visible");
})

botonesCategorias.forEach(boton => boton.addEventListener("click", () => { /** esto se hace para que al hacer click en cualquier categoria se cierre solo el menu sin hacer click en la x */
    aside.classList.remove("aside-visible");
}))
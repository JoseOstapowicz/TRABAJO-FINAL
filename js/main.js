let productos = [];

fetch( "./js/productos.json" ) 
    .then(response => response.json())
    .then(data => {
        productos = data;
        cargarProdutos(productos);
    })


/* estas son las cosas que va a traer del html*/
const contenedorProductos = document.querySelector("#contenedor-productos"); /*aca vamos a meter todos los productos que queremos, por eso se usa esta linea */
const botonesCategorias = document.querySelectorAll(".boton-categoria"); /*Aca quier que me traiga todos los botones categorias por eso uso all,ademas lleva "." porque es una clase */
const tituloPrincipal = document.querySelector("#titulo-principal");
let botonesAgregar = document.querySelectorAll(".producto-agregar");
const numerito = document.querySelector("#numerito");


/* hacemos un for each del array para que recorra todos los productos que estan en el inicio de esta pantalla para que los muestre*/
function cargarProdutos (productosElegidos) {

    contenedorProductos.innerHTML = ""; /* esto hacemos para que cada vez que hagamos click en la categoria que querramos, se vacie primero y luego se ejecute el foreach y aparezcan los productos filtrados sin repetirse */

    productosElegidos.forEach(producto => {
        
        const div = document.createElement ("div");
        div.classList.add ("producto");
        div.innerHTML = `
            <img class="producto-imagen" src="${producto.imagen}" alt="${producto.titulo}">
            <div class="producto-detalles">
                <h3 class="producto-titulo">${producto.titulo}</h3>
                <p class="producto-precio">$${producto.precio}</p>
                <button class="producto-agregar" id="${producto.id}" >Agregar</button>
            </div>
        `;

        contenedorProductos.append(div);
    })

    /* esto viene de la funcion creada mas abajo, la de actualizarbotonesagregar*/
    actualizarBotonesAgregar();
}



/* acá lo que hago es agregar un evento donde al hacer click en los botones de categorias (abrigos, camisetas pantalones) se activen los mismos y me muestre su contenido*/
botonesCategorias.forEach(boton => {
    boton.addEventListener("click", (e) => {

        botonesCategorias.forEach(boton => boton.classList.remove("active"));
        e.currentTarget.classList.add("active");

        /* agrego este if para que en todos los productos aparezcan todos los artuculos que tenemos */
        if (e.currentTarget.id != "todos") {
            const productoCategoria = productos.find(producto => producto.categoria.id === e.currentTarget.id);
            tituloPrincipal.innerText = productoCategoria.categoria.nombre;

        /* este "filter" lo que hace es mostrarme una determinada categoria al hacer click en los botones segun el id que dicha categoria tenga en el html */
            const productosBoton = productos.filter(productos => productos.categoria.id === e.currentTarget.id);
            cargarProdutos(productosBoton);
        } else {
            tituloPrincipal.innerText = "Todos los productos";
            cargarProdutos(productos);

        }


    })
})

/* esto es para que me el boton agregar de los productos funcione*/

function actualizarBotonesAgregar() {
    botonesAgregar = document.querySelectorAll('.producto-agregar');   

    botonesAgregar.forEach(boton => {
        boton.addEventListener("click", agregarAlCarrito);
    });
}

/* creamos esto para que la pagina agregue los productos que tenemos almacenados en el local storage al carrito y no se borren*/
let productosenCarrito;

let productosenCarritoLS = localStorage.getItem("productos-en-carrito");

if (productosenCarritoLS) {
    productosenCarrito = JSON.parse(productosenCarritoLS);
    actualizarNumerito();
} else {
    productosenCarrito = [];
}


/* creamos un array vacio para que cada vez que haga click en los botones estos agreguen prodctos a dicho array*/

/* esta funcion lo que nos hace es agregar prodctos al carrito y aumentar la cantidad de estos en el carrito cada vez que hacemos click en agregar*/
function agregarAlCarrito(e) {

    Toastify({
        text: "Producto agregado",
        duration: 3000,
        close: true,
        gravity: "top", // `top` or `bottom`
        position: "right", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
          background: "linear-gradient(to right, #4b33a8, #785ee0)",
          borderRadius: "2rem",
          textTransform: "uppercase",
          fontSize: "0.75rem"

        },
        offset: {
            x: '1.5rem', // horizontal axis - can be a number or a string indicating unity. eg: '2em'
            y: '1.5rem' // vertical axis - can be a number or a string indicating unity. eg: '2em'
          },
        onClick: function(){} // Callback after click
      }).showToast();

    const idBoton = e.currentTarget.id;
    const productoAgregado = productos.find(producto => producto.id === idBoton);

    if(productosenCarrito.some(producto => producto.id === idBoton)) {
        const index = productosenCarrito.findIndex(producto => producto.id === idBoton);
        productosenCarrito[index].cantidad++;
    } else {
        productoAgregado.cantidad = 1;
        productosenCarrito.push(productoAgregado);
    }

    actualizarNumerito();

    /* esto es para que al agregar un producto se almacene localmente*/
    localStorage.setItem("productos-en-carrito", JSON.stringify(productosenCarrito));
    console.log(localStorage)
}

/* esto es para que cada vez que hacemos click en el boton agregar de los prodcutos, se agreguen al carrito y se cambie el numerito que tiene al lado*/
function actualizarNumerito () {
    let nuevoNumerito = productosenCarrito.reduce((acc, producto) => acc + producto.cantidad, 0);
    numerito.innerText = nuevoNumerito;
}

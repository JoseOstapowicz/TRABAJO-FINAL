let productosenCarrito = localStorage.getItem("productos-en-carrito");
productosenCarrito = JSON.parse(productosenCarrito);

const contenedorCarritoVacio = document.querySelector("#carrito-vacio");
const contenedorCarritoProductos = document.querySelector("#carrito-productos");
const contenedorCarritoAcciones = document.querySelector("#carrito-acciones");
const contenedorCarritoComprado = document.querySelector("#carrito-comprado");
let botonesEliminar = document.querySelectorAll(".carrito-producto-eliminar");
const botonVaciar = document.querySelector("#carrito-acciones-vaciar");
const contenedorTotal = document.querySelector("#total");
const botonComprar = document.querySelector("#carrito-acciones-comprar");


function cargarProdutosCarrito () {
    if (productosenCarrito && productosenCarrito.length > 0) {
        /* con esto lo que busco es que no se muestren los mensajes de "tu carrito esta vacio" y que las acciones de lo puesto como "disabled" en el html de carrito se activen acá, por eso usamos remove en uno y add en otro */
        contenedorCarritoVacio.classList.add("disabled");
        contenedorCarritoProductos.classList.remove("disabled");
        contenedorCarritoAcciones.classList.remove("disabled");
        contenedorCarritoComprado.classList.add("disabled");
    
        contenedorCarritoProductos.innerHTML = ""; 
    
        productosenCarrito.forEach(producto => {
            const div = document.createElement("div");
            div.classList.add("carrito-producto");
            div.innerHTML = `
            <img class="carrito-producto-imagen" src="${producto.imagen}" alt="${producto.titulo}">
                <div class="carrito-producto-titulo">
                    <small>Título</small>
                    <h3>${producto.titulo}</h3>
                </div>
                <div class="carrito-producto-cantidad">
                    <small>Cantidad</small>
                    <p>${producto.cantidad}</p>
                </div>
                <div class="carrito-producto-precio">
                    <small>Precio</small>
                    <p>$${producto.precio}</p>
                </div>
                <div class="carrito-producto-subtotal">
                    <small>Subtotal</small>
                    <p>$${producto.precio * producto.cantidad}</p>
                </div>
                    <button class="carrito-producto-eliminar" id="${producto.id}"><i class="bi bi-trash-fill"></i></button>
            `;
    
            contenedorCarritoProductos.append(div);
        });
    
    } else {
        contenedorCarritoVacio.classList.remove("disabled");
        contenedorCarritoProductos.classList.add("disabled");
        contenedorCarritoAcciones.classList.add("disabled");
        contenedorCarritoComprado.classList.add("disabled");
    }
    
    actualizarBotonesEliminar();
    actualizarTotal()
}

cargarProdutosCarrito();


/* para que os botones de eliminar de cada articulo cargado en el carrito funcionen*/
function actualizarBotonesEliminar() {
    botonesEliminar = document.querySelectorAll('.carrito-producto-eliminar');   

    botonesEliminar.forEach(boton => {
        boton.addEventListener("click", eliminarDelCarrito);
    });
}

function eliminarDelCarrito(e) {

    Toastify({
        text: "Eliminado vizte vo",
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
    const index = productosenCarrito.findIndex(producto => producto.id === idBoton);

    productosenCarrito.splice(index , 1);
    cargarProdutosCarrito();

    localStorage.setItem("productos-en-carrito", JSON.stringify(productosenCarrito));
    
}

/* para que el boton de VACIAR CARRITO funcione y vacie realmente*/
botonVaciar.addEventListener("click", vaciarCarrito);
function vaciarCarrito () {

    Swal.fire({
        title: '¿Estas seguro?',
        icon: 'question',
        html:
          `Se van a borrar ${productosenCarrito.reduce((acc,producto) => acc + producto.cantidad, 0)} productos`,
        showCancelButton: true,
        focusConfirm: false,
        confirmButtonText: 'Si',
        cancelButtonText: 'No',
      }) .then((result) => { /** agregamos esto para que al dar clilck en vaciar carrito y nos tire la pregunta los prudctos no se vacien si no le damos a "si" */
        if (result.isConfirmed) {
            productosenCarrito.length = 0;
            localStorage.setItem("productos-en-carrito", JSON.stringify(productosenCarrito));
            cargarProdutosCarrito();
        }
      })

    

}

/* para que la suma total se vaya actualizando cuando agregamos cosas al carrito*/
function actualizarTotal() {
    const totalCalculado = productosenCarrito.reduce((acc, producto) => acc + (producto.precio * producto.cantidad), 0); 
    total.innerText = `$${totalCalculado}`;
}


/* para que al realizar click en el boton comprar este nos muestre el mensaje de gracias por su compra o gracias vuelva prontos*/
botonComprar.addEventListener("click", comprarCarrito);
function comprarCarrito () {

    productosenCarrito.length = 0;
    localStorage.setItem("productos-en-carrito", JSON.stringify(productosenCarrito));

    contenedorCarritoVacio.classList.add("disabled");
    contenedorCarritoProductos.classList.add("disabled");
    contenedorCarritoAcciones.classList.add("disabled");
    contenedorCarritoComprado.classList.remove("disabled");

}
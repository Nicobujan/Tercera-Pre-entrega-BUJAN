const stockProductos = [
    {
      id: 1,
      nombre: "Azucar",
      cantidad: 1,
      desc: "Azucar Ledesma",
      precio: 270,
      img: "./FOTO/azucar.jpg",
    },
    {
      id: 2,
      nombre: "Cigarrillos",
      cantidad: 1,
      desc: "Cigarrillos Milenio",
      precio: 450,
      img: "./FOTO/cigarros.jpg",
    },
    {
      id: 3,
      nombre: "Cerveza",
      cantidad: 1,
      desc: "Cerveza Corona 750ml",
      precio: 500,
      img: "./FOTO/corona-6832-1.png",
    },
    {
      id: 4,
      nombre: "Harina",
      cantidad: 1,
      desc: "Harina 0000",
      precio: 180,
      img: "./FOTO/harina.jpg",
    },
    {
      id: 5,
      nombre: "Galletitas",
      cantidad: 1,
      desc: "Galletitas Terrabusi",
      precio: 250,
      img: "./FOTO/terrabusi.webp",
    },
    {
      id: 6,
      nombre: "Yerba",
      cantidad: 1,
      desc: "Yerba Playadito 1kg",
      precio: 550,
      img: "./FOTO/yerba.jpg",
    },
];
const carritoContendor = document.querySelector('#carritoContenedor')
const vaciarCarrito= document.querySelector('#vaciarCarrito')
let carrito =[];
const contenedor =document.querySelector('#contenedor')
const precioTotal= document.querySelector('#precioTotal')



document.addEventListener('DOMContentLoaded',()=>{
  carrito = JSON.parse(localStorage.getItem('carrito')) || []
  mostrarCarrito()
})

stockProductos.forEach((prod) => {
    const { id, nombre, precio, desc, img, cantidad } = prod
    if (contenedor) {
      contenedor.innerHTML += `
      <div class="card mt-3" style="width: 18rem;">
      <img class="card-img-top mt-2" src="${img}" width="300" height="300" alt="Card image cap">
      <div class="card-body">
        <h5 class="card-title">${nombre}</h5>
        <p class="card-text">Precio: $${precio}</p>
        <p class="card-text">Descripcion: ${desc}</p>
        <p class="card-text">Cantidad: ${cantidad}</p>
        <button class="btn btn-primary" onclick="agregarProducto(${id})">Agregar al carrito</button>
      </div>
    </div>
      `;
    }
  });


vaciarCarrito.addEventListener('click',()=>{
  carrito.length=[]
  mostrarCarrito()
})


  function agregarProducto(id){
    const item= stockProductos.find((prod) => prod.id === id)
    carrito.push(item)
    mostrarCarrito()
    }

    const mostrarCarrito =()=>{
        const modalBody = document.querySelector('.modal .modal-body')
        modalBody.innerHTML=''
        carrito.forEach((prod)=>{
            const {id, nombre, img, desc, cantidad, precio}= prod
            modalBody.innerHTML+=`
            <div class="modal-contenedor">
            <div>
            <img class="img-fluid img-carrito" src="${img}"/>
            </div>

            <div>
            <p>Producto: ${nombre}</p>
            <p>Precio: $${precio}</p>
            <p>Unidades: ${cantidad}</p>

            <button onclick="eliminarProducto(${id})" class="btn btn-danger">Eliminar</button>
            </div> 
            </div>


            `
        });
        
        carritoContendor.textContent= carrito.length
        
        precioTotal.innerText= carrito.reduce((acc,prod)=> acc + prod.cantidad * prod.precio, 0)
        
        
        
        
        guardarStorage()
      }

    function eliminarProducto(id){
        const mercaderiaId=id
        carrito=carrito.filter((merca)=> merca.id !== mercaderiaId)
        mostrarCarrito()
    }

    function guardarStorage(){
      localStorage.setItem("carrito",JSON.stringify(carrito))
    }

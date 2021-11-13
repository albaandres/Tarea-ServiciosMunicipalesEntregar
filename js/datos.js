let map;
//Array con los datos leidos en la BD
let datos = new Array();
let totalpedido = 0;
//querySelector es lo mismo que getElementByID
document.getElementById("lupa").addEventListener("click", generarAlmacen, false);

//definimos la clase para trabajar con los datos 
class servicios {
    constructor(id, Descripcion, Tipo, Direccion, Latitud, Longitud, Precio, Duracion) {
        this.codigo = id;
        this.descripcion = Descripcion;
        this.tipo = Tipo;
        this.direccion = Direccion;
        this.latitud = Latitud;
        this.longitud = Longitud;
        this.precio = Precio;
        this.duracion = Duracion;

    }
    leerRegistro() {
        return this;
    }
}
function generarAlmacen(evt) {

    var cuerpoa = document.querySelector("#cuerpoServicios");
    //borra y carga de nuevo
    cuerpoa.innerHTML = "";
    //datos está creado en BdWebSql
    for (i = 0; i < datos.length; i++) {

        registro = datos[i]


        linea = document.createElement("tr");
        botonId = document.createElement("button");
        // En el atributo  del button creado paso el artículo seleccionado pedido
        //este boton guarda los datos que está en el array datos.   
        botonId.registro = registro;
        //Genera un evento en tiempo de ejecucion para el boton
        botonId.addEventListener("click", contratarServicio, true);

        //En textNode copiamos el cmpa codigo a visualizar en el Button
        dato = document.createTextNode(registro.codigo);
        botonId.appendChild(dato);

        Columna = document.createElement("td");
        Columna.appendChild(botonId);
        linea.appendChild(Columna);
        //Columna descripcion 
        parrafo = document.createElement("p");
        dato = document.createTextNode(registro.descripcion);

        parrafo.appendChild(dato);
        parrafo.style.margin = "1px";
        parrafo.style.padding = "1px";


        Columna = document.createElement("td");
        Columna.appendChild(dato);
        linea.appendChild(Columna)

        //Columna precio
        parrafo = document.createElement("p");
        dato = document.createTextNode(registro.precio);
        Columna = document.createElement("td");
        Columna.appendChild(dato);
        linea.appendChild(Columna)

        //Columna duraccion
        parrafo = document.createElement("p");
        dato = document.createTextNode(registro.duracion);
        Columna = document.createElement("td");
        Columna.appendChild(dato);
        linea.appendChild(Columna)


        //Columna direccion
        parrafo = document.createElement("p");
        dato = document.createTextNode(registro.direccion);
        Columna = document.createElement("td");
        Columna.appendChild(dato);
        linea.appendChild(Columna)

        cuerpoa.appendChild(linea);

    }
}
function contratarServicio() {
    //this.registro es la posicion 
    registro = this.registro;

    map = new google.maps.Map(
        document.getElementById('map_canvas'), {

        // En el mapa se visualiza el mapa correspondiente a esta latitud, longitud
        center: new google.maps.LatLng(registro.latitud, registro.longitud),//latitud,longitud),//
        // center: new google.maps.LatLng(41.6685198,-3.6886618),//latitud,longitud),//
        zoom: 18, // zoom del mapa
        draggableCursor: 'auto', // forma del cursor
        draggingCursor: 'crosshair',
        mapTypeId: google.maps.MapTypeId.HYBRID // tipo de mama
    });
    // Tabla Pedidos

    var cuerpoPedido = document.querySelector("#cuerpoPedido");

    linea = document.createElement("tr");
    botonId = document.createElement("button");
    // En el atributo  del button creado paso el artículo seleccionado pedido  
    botonId.registro = registro;
    dato = document.createTextNode(registro.codigo);
    botonId.appendChild(dato);
    Columna = document.createElement("td");
    Columna.appendChild(botonId);
    linea.appendChild(Columna);

    parrafo = document.createElement("p");
    dato = document.createTextNode(registro.descripcion);
    Columna = document.createElement("td");
    Columna.appendChild(dato);
    linea.appendChild(Columna)


    parrafo = document.createElement("p");
    dato = document.createTextNode(registro.precio);
    Columna = document.createElement("td");
    Columna.appendChild(dato);
    linea.appendChild(Columna)

    var ccantidad = document.createElement("input");
    ccantidad.type = "text"
    ccantidad.registro = registro;
    
    //Guardo el precio del servicio que estoy contratando
    ccantidad.precio = registro.precio;
    ccantidad.title=registro.precio;
    
    ccantidad.codigo=registro.codigo;
    ccantidad.addEventListener("keyup", calculoimporte, false)

    Columna = document.createElement("td");
    Columna.appendChild(ccantidad);
    linea.appendChild(Columna)

    //////////////////IMPORTE
    var cimporte = document.createElement("input");
    cimporte.type = "text"
    cimporte.disabled = "true"
    //ASIGNO UN ID PARA EL IMPUT PARA USARLO EN LA FUNCTION CALCULAR IMPORTE
    cimporte.id = "c" + registro.codigo;
    Columna = document.createElement("td");
    Columna.appendChild(cimporte);
    linea.appendChild(Columna)

    cuerpoPedido.appendChild(linea);
    /*registro = datos[this.registro];
    alert(this.registro.descripcion + " " + registro.direccion)*/
    this.removeEventListener("click", contratarServicio, true);
}
function calculoimporte() {
    cantidad = this.value;
    precio = this.precio;
    importe = precio * cantidad;
    
    let cajaimporte = document.getElementById("c" + this.codigo);

    
    var importeAnterior=parseFloat(cajaimporte.value);

    if(isNaN(importeAnterior)){
        importeAnterior=0;
    }
    cajaimporte.value=importe;

    if(isNaN(cajaimporte.value)){
        importeAnterior=0;
    }
    if(isNaN(totalpedido)){
        importeAnterior=0;
    }
    totalpedido=totalpedido + importe - importeAnterior;
    var ctotal=document.querySelector("#total");
    ctotal.value=totalpedido;
}
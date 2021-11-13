window.onload = function () {
    FamiliaSeleccionada.addEventListener("change", seleccionarFamilia, false);
    fechaDesde.addEventListener("change", seleccionarFecha, false);
    contacto.addEventListener("change", seleccionarContacto, false);
    Teléfono.addEventListener("change", seleccionarTelefono, false);
    Email.addEventListener("change", seleccionarEmail, false);


    
}
let existeSeleccion = false;
var select;
//seleciona los parametros de los diferentes tipos al seleccionar una familia
function seleccionarFamilia() {
    let datosCopia = new Array();
    select = document.getElementById("FamiliaSeleccionada");
    let familia= select.value;
    for (i = 0; i < datos.length; i++) {
        if (datos[i].Familia == select.value) {
            datosCopia.push(datos[i]);
        }
        // console.log(datosCopia[i]);

    }
    //en caso de no seleccionar ningún parametro en buscar familia crea la tabla segun el array de Datos 
    switch (select.value) {
        case "":
            registro = datos[i]
            existeSeleccion = false;
            break;
        //en caso de seleccionar algún parametro en buscar familia crea la tabla segun el array de DatosCopia ya que varia según el parametro 
        default:
            registro = datosCopia[i]
            existeSeleccion = true;
            break;
    }
    alert("La familia seleccionada ha sido " + familia)
    inicio();
    
}

function seleccionarFecha(){
    select = document.getElementById("fechaDesde");
    let fecha= select;
    alert("Fecha de solicitud realizada el día " +fecha.value);
}
function seleccionarContacto(){
    select = document.getElementById("contacto");
    let nombre= select;
    alert("El nombre del conctato que se encarga de hacer estos servicios Municipales es: " +nombre.value);
}
function seleccionarTelefono(){
    select = document.getElementById("Teléfono");
    let telefono= select;
    alert("El telefono de contacto de la persona es: " +telefono.value);
}
function seleccionarEmail(){
    select = document.getElementById("Email");
    let email= select;
    alert("El correo electronico del contacto que se encarga de hacer estos servicios Municipales es: " +email.value);
}

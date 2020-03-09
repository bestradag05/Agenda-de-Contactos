var agregarContacto = document.getElementById('agregar');
var formulario = document.getElementById('formulario_crear_usuario');
var action = formulario.getAttribute('action');
var divCrear = document.getElementById('crear_contacto');
var tablaRegistrados = document.getElementById('registrados');
var checkBoxes = document.getElementsByClassName('borrar_contacto');
var btn_borrar = document.getElementById('btn_borrar');
var tableBody = document.getElementsByTagName('tbody');
var divExistentes = document.getElementsByClassName('existentes');
var inputBuscador = document.getElementById('buscador');
var totalRegistros = document.getElementById('total'); 
var checkTodos = document.getElementById('borrar_todos');

function RegistroExitoso(nombre)
{
    // Crear Div y agregar un id
    
    var divMensaje = document.createElement('DIV');
    divMensaje.setAttribute("id","mensaje");
    
    //Agregar texto
    
    var texto = document.createTextNode('Creado: ' + nombre);
    
    divMensaje.appendChild(texto);
    
    divCrear.insertBefore(divMensaje, divCrear[4]);// childnodes para insertar en el nodo que quieras
    
    //Agregar la clase mostrar
    divMensaje.classList.add('mostrar');
    //Ocultar el mensaje de creacion
    setTimeout(function()
    {
        divMensaje.classList.add('ocultar');
        setTimeout(function()
        {
            var DivPadreMensaje=divMensaje.parentNode;
            DivPadreMensaje.removeChild(divMensaje);
        },500)
        
    },3000)
    
    
    
}
//Construit template para insertar datos dinamicamente
function construirTemplate(nombre,telefono, registro_id)
{
    // crear nombre de contacto
    
    var tdNombre = document.createElement('TD');
    var textoNombre = document.createTextNode(nombre);
    var parrafoNombre= document.createElement('P');
    parrafoNombre.appendChild(textoNombre);
    tdNombre.appendChild(parrafoNombre);
    
    //crear telefono de contacto
    var tdtelefono = document.createElement('TD');
    var textotelefono = document.createTextNode(telefono);
    var parrafoTelefono= document.createElement('P');
    parrafoTelefono.appendChild(textotelefono);
    tdtelefono.appendChild(parrafoTelefono);
    
    // crear enlace para editar
    
    var nodoBtn = document.createElement('A');
    var textoEnlace = document.createTextNode('Editar');
    nodoBtn.appendChild(textoEnlace);
    nodoBtn.href = '#';
    nodoBtn.classList.add('editarBtn');
    
    //Crear boton para guardar
    var btnGuardar = document.createElement('a');
    var textGuardar = document.createTextNode('Guardar');
    btnGuardar.appendChild(textGuardar);
    btnGuardar.href = '#';
    btnGuardar.classList.add('guardarBtn');
    
    
    //Agregar el boton al td

    var nodoTdEditar = document.createElement('TD');
    nodoTdEditar.appendChild(nodoBtn);
    nodoTdEditar.appendChild(btnGuardar);
    
    // Crear Check
    
    var checkBorrar = document.createElement('INPUT');
    checkBorrar.type = 'checkbox';
    checkBorrar.name = registro_id;
    checkBorrar.classList.add('borrar_contacto');
    
    //agregar td al checkbox
    var tdCheckBox = document.createElement('TD');
    tdCheckBox.classList.add('borrar');
    tdCheckBox.appendChild(checkBorrar)
    
    // Crear Input con el nombre
    
    var inputNombre= document.createElement('INPUT');
    inputNombre.type = 'text';
    inputNombre.name = 'contacto_' + registro_id;
    inputNombre.value = nombre;
    inputNombre.classList.add('nombre_contacto');
    tdNombre.appendChild(inputNombre);
     // Crear Input con el telefono
    
    var inputNumero = document.createElement('INPUT');
    inputNumero.type = 'text';
    inputNumero.name = 'telefono_' + registro_id;
    inputNumero.value = telefono;
    inputNumero.classList.add('telefono_contacto');
    tdtelefono.appendChild(inputNumero);
  

    
    
    var trContacto = document.createElement('TR');
    trContacto.setAttribute('id', registro_id);
    trContacto.appendChild(tdNombre);
    trContacto.appendChild(tdtelefono);
    trContacto.appendChild(nodoTdEditar);
    trContacto.appendChild(tdCheckBox);
    
    tablaRegistrados.childNodes[3].append(trContacto);
    
    recorrerBotonesEditar();
    recorrerBotonesGuardar(registro_id);
}

function crearUsuario()
{
  var form_datos = new FormData(formulario);
  for([key, value] of form_datos.entries())
  {
      
      console.log(key + ": " + value);
  }
      var xhr =new XMLHttpRequest();
      xhr.open('POST', action, true);
      xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');// se pone por que se esta usando el atributo e pone por que se esta usando el atrifromdata
      xhr.onreadystatechange = function()
      {
          if(xhr.readyState == 4 && xhr.status == 200 )
          {
              var resultado = xhr.responseText;
              console.log("Respuesta: " + resultado);
              var json = JSON.parse(resultado); 
              if(json.respuesta == true)
              {
                  RegistroExitoso(json.nombre);
                  construirTemplate(json.nombre,json.telefono, json.id);
                 
              }
          }
      };
    xhr.send(form_datos);
}
function mostrarEliminado()
{
    // crear div y agregar id
    
    var divEliminado =  document.createElement('DIV');
    
    divEliminado.setAttribute('id','borrado'); 
    
    // agregar texto
    
    var texto = document.createTextNode('Eliminado de la lista de contactos');
    divEliminado.appendChild(texto);
    
    //agregar clase de css
    
    divEliminado.classList.add('mostrar');
    
    divExistentes[0].insertBefore(divEliminado, divExistentes[0].childNodes[0] );
    
    //Agregar la clase mostrar
    divEliminado.classList.add('mostrar');
    //Ocultar el mensaje de creacion
    setTimeout(function()
    {
        divEliminado.classList.add('ocultar');
        setTimeout(function()
        {
            var DivPadreMensaje=divEliminado.parentNode;
            DivPadreMensaje.removeChild(divEliminado);
        },500)
        
    },3000)
    
}

function eliminarHTML(ids_borrados)
{

console.log(ids_borrados);
for(i=0;i < ids_borrados.length;i++)
{
    var elementoBorrar = document.getElementById(ids_borrados[i]);
    tableBody[0].removeChild(elementoBorrar);
}
}

function contactosEliminar(contactos)
{
    var xhr = new XMLHttpRequest();
    xhr.open('GET','borrar.php?id=' + contactos, true)
    xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
     xhr.onreadystatechange = function()
      {
          if(xhr.readyState == 4 && xhr.status == 200 )
          {
              var resultadoBorrar = xhr.responseText;
              var json = JSON.parse(resultadoBorrar);
              if(json.respuesta == false)
              {
                  alert("Seleccione un elemento");
              }else
              {
                  console.log("Resultado: "+ resultadoBorrar);
                  eliminarHTML(contactos);
                  mostrarEliminado();
              }
          }
      };
      xhr.send();
}

function checkBoxesSeleccionado()
{
    var contactos = [];
    for(i = 0; i < checkBoxes.length; i++)
    {
        if(checkBoxes[i].checked == true)
        {
            contactos.push(checkBoxes[i].name);
            
        }
    }
    contactosEliminar(contactos);
    
}

for (var i = 0; i<checkBoxes.length; i++) {
    
    checkBoxes[i].addEventListener('change',function ()
    {
       if(this.checked)
       {
           this.parentNode.parentNode.classList.add('activo');
       }else
       {
           this.parentNode.parentNode.classList.remove('activo');
       }
    });
    
}

agregarContacto.addEventListener('click', function(e)
{
    e.preventDefault();
    crearUsuario();
});

btn_borrar.addEventListener('click', function ()
{
    checkBoxesSeleccionado();
});


function actualizarNumero()
{
     var registros = document.querySelectorAll('tbody tr');
     
     var cantidad = 0;
     var ocultos =0;
     
     for(i=0; i< registros.length;i++)
     {
         var elementos = registros[i]; 
         
         if(elementos.style.display == 'table-row')
         {
             cantidad++;
             totalRegistros.innerHTML = cantidad;
         }else
         {
             if(elementos.style.display == 'none')
             {
                 ocultos++;
                 if(ocultos == registros.length)
                 {
                     ocultos -= registros.length;
                      totalRegistros.innerHTML = ocultos;
                 }
             }
         }
     }
}

function ocultarRegistros(e)
{
   
     const expresion = new RegExp(e.target.value, "i"),
          registros = document.querySelectorAll('tbody tr');

          registros.forEach(registro => {
            registro.classList.add('ocultar');
            registro.style.display = 'none';

            if(registro.childNodes[1].textContent.replace(/\s/g, " ").search(expresion) != -1 || nombre=='' ) {
                registro.classList.add('mostrar');
                registro.classList.remove('ocultar');    
                registro.style.display = 'table-row';
                
            }
            actualizarNumero();
          });
}

inputBuscador.addEventListener('input', ocultarRegistros);

// Seleccionar Todos

checkTodos.addEventListener('click',function()
{
    if(this.checked)
    {
        var todosRegistros = tableBody[0].getElementsByTagName('tr');
        for(i=0;i<checkBoxes.length; i++)
        {
            checkBoxes[i].checked = true;
            todosRegistros[i].classList.add('activo');
        }
    }else
    {
       var todosRegistros = tableBody[0].getElementsByTagName('tr');
        for(var i=0;i<checkBoxes.length; i++)
        {
            checkBoxes[i].checked = false;
            todosRegistros[i].classList.remove('activo');
        }
    }
});

function recorrerBotonesGuardar(id)
{
    var btn_guardar = tableBody[0].querySelectorAll('.guardarBtn');
   for(var i =0; i<btn_guardar.length; i++)
   {
       btn_guardar[i].addEventListener('click', function(event)
       {
           
        actualizarRegistro(id);
       });
   }
}



// Editar Registros 

function recorrerBotonesEditar()
{
    var btn_editar = tableBody[0].querySelectorAll('.editarBtn');
   for(var i =0; i<btn_editar.length; i++)
   {
       btn_editar[i].addEventListener('click', function(event)
       {
           event.preventDefault();
           desabilitarEdicion();
           
           
        var registroActivo = this.parentNode.parentNode;
        registroActivo.classList.add('modo-edicion');
        registroActivo.classList.remove('desactivado');
        //Actualizamos el registro especifico
         actualizarRegistro(registroActivo.id);
       });
   }
}

function desabilitarEdicion()
{
    var registrosTr = document.querySelectorAll('#registrados tbody tr');
    for(var i =0; i< registrosTr.length; i++)
    {
        registrosTr[i].classList.add('desactivado');
        
    }
}

function habilitarEdicion()
{
    var registrosTr = document.querySelectorAll('#registrados tbody tr');
    for(var i =0; i< registrosTr.length; i++)
    {
        registrosTr[i].classList.remove('desactivado');
    }
}


function actualizarRegistro(id)
{
    //Seleccionar Boton de Guardar del Registro en especifico (se pasa el ID)
    var btnGuardar = document.getElementById(id).getElementsByClassName('guardarBtn');
    btnGuardar[0].addEventListener('click',function(event)
    {
        event.preventDefault();
        // Obtiene el valor del campo nombre
        var inputNombreNuevo = document.getElementById(id).getElementsByClassName('nombre_contacto');
        var nombreNuevo = inputNombreNuevo[0].value;
        
        // Obtiene el valor del campo telefono
        var inputTelefonoNuevo = document.getElementById(id).getElementsByClassName('telefono_contacto');
        var telefonoNuevo = inputTelefonoNuevo[0].value;
        
        var contacto = {
            nombre : nombreNuevo,
            telefono : telefonoNuevo,
            id: id
        };
        actualizarAjax(contacto);
        
    });
}

function actualizarAjax(datosContacto)
{
    // convertir un objeto a un json
 var jsonContacto = JSON.stringify(datosContacto);   
 
  var xhr = new XMLHttpRequest();
    xhr.open('GET','actualizar.php?datos=' + jsonContacto, true)
    xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
     xhr.onreadystatechange = function()
      {
          if(xhr.readyState == 4 && xhr.status == 200 )
          {
              var resultadoActualizar = xhr.responseText;
              var json = JSON.parse(resultadoActualizar);
           
             if(json.respuesta == true)
             {
                 var registroActivo = document.getElementById(datosContacto.id);
                 
                 //Inserta dinamicamente el nombre
                 registroActivo.getElementsByTagName('td')[0].getElementsByTagName('p')[0].innerHTML = json.nombre;
                 
                 // Inserta dinamicamente el telefono
                 registroActivo.getElementsByTagName('td')[1].getElementsByTagName('p')[0].innerHTML = json.telefono;
                 
                 // Borar modo edicion
                 
                 registroActivo.classList.remove('modo-edicion');
                 
                 habilitarEdicion();
             }else
             {
                 console.log("Hubo un error");
             }
          }
      };
      xhr.send();
 
}

document.addEventListener('DOMContentLoaded', function(event)
{
    recorrerBotonesEditar();
});
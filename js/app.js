let listaParticipantes = [];

const objParticipantes = {
    id: '',
    nombre: '',
    puesto: '',
}

let editando = false;

const formulario = document.querySelector('#formulario');
const nombreImput = document.querySelector('#nombre');
const puestoImput = document.querySelector('#puesto');
const btnAgregar = document.querySelector('#btnAgregar');

formulario.addEventListener('submit', validarFormulario);

function validarFormulario(e) {
    e.preventDefault();

    if(nombreImput.value === '' || puestoImput.value === '') {
        alert('Todos los campos son obligatorios.');
        return;
    }

    if(editando) {
        editarParticipante();
        editando = false;
    } else {
        objParticipantes.id = Date.now();
        objParticipantes.nombre = nombreImput.value;
        objParticipantes.puesto = puestoImput.value;

        agrgarParticipantes();
    }
}

function agrgarParticipantes() {
    listaParticipantes.push({...objParticipantes});

    mostrarParticipantes();

    formulario.reset();

    limpiarObjeto();

}

function limpiarObjeto() {
    objParticipantes.id = '';
    objParticipantes.nombre = '';
    objParticipantes.puesto = '';
}

    function mostrarParticipantes() {
        const divParticipantes = document.querySelector('.div-participantes');

        limpiarHTML();

        listaParticipantes.forEach( participante => {
            const {id, nombre, puesto} = participante;

            const parrafo = document.createElement('p');
            parrafo.textContent = `${id} - ${nombre} - ${puesto} -`;
            parrafo.dataset.id = id;

            const editarBoton = document.createElement('button');
            editarBoton.onclick = () => cargarParticipante(participante);
            editarBoton.textContent = 'Editar';
            editarBoton.classList.add('btn', 'btn-editar');
            parrafo.append(editarBoton);

            const eliminarBoton = document.createElement('button');
            eliminarBoton.onclick = () => eliminarParticipante(id);
            eliminarBoton.textContent = 'Eliminar';
            eliminarBoton.classList.add('btn', 'btn-eliminar');
            parrafo.append(eliminarBoton);

            const hr = document.createElement('hr');

            divParticipantes.appendChild(parrafo);
            divParticipantes.appendChild(hr);


        })
    }


function cargarParticipante(participante) {

    const {id, nombre, puesto} = participante

    nombreImput.value = nombre;
    puestoImput.value = puesto; 

    objParticipantes.id = id;
    
    formulario.querySelector('button[type="submit"]').textContent = 'Actualizar';

    editando = true;

}

function editarParticipante() {

    objParticipantes.nombre = nombreImput.value;
    objParticipantes.puesto = puestoImput.value;

    listaParticipantes.map( participante => {

        if(participante.id === objParticipantes.id) {
            participante.id = objParticipantes.id;
            participante.nombre = objParticipantes.nombre;
            participante.puesto = objParticipantes.puesto;
        }

    });

    limpiarHTML();
    mostrarParticipantes();

    formulario.reset();

    formulario.querySelector('button[type="submit"]').textContent = 'Agregar';

    editando = false;

}

function eliminarParticipante(id) {

    listaParticipantes = listaParticipantes.filter(participante => participante.id !== id);
    
    limpiarHTML();
    mostrarParticipantes();
    formulario.reset();
    formulario.querySelector('button[type="submit"]').textContent = 'Agregar';
    editando = false; 
}

function limpiarHTML() {
    const divParticipantes = document.querySelector('.div-participantes');
    while(divParticipantes.firstChild) {
        divParticipantes.removeChild(divParticipantes.firstChild);
    }

}
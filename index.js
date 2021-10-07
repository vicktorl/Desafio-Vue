/*<-----javascript----->
const arrayLista = [];
document.querySelector('#registrar').addEventListener("click", () => {
    let nombre = document.querySelector('#txt-nombre').value;
    let descripcion = document.querySelector('#txt-descripcion').value;
    let precio = document.querySelector('#txt-precio').value;
    let lista = {};
    lista.nombre = nombre;
    lista.descripcion = descripcion;
    lista.precio = precio;
    arrayLista.push(lista);
    cargarTabla();
});
const cargarTabla = () => {
    const tbody = document.querySelector('#tabla-tbody');
    tbody.innerHTML = "";
    const tabla = arrayLista.map((elemento) => {
        let fila = document.createElement("tr");
        let celdaNombre = document.createElement("td");
        celdaNombre.innerText = elemento.nombre;
        let celdaDescripcion = document.createElement("td");
        celdaDescripcion.innerText = elemento.descripcion;
        let celdaPrecio = document.createElement("td");
        celdaPrecio.innerText = elemento.precio;
        let celdaEliminar = document.createElement("td");
        let btnEliminar = document.createElement("button");
        btnEliminar.classList.add("btn", "btn-danger");
        btnEliminar.innerText = "Eliminar";
        celdaEliminar.appendChild(btnEliminar);
        fila.appendChild(celdaNombre);
        fila.appendChild(celdaDescripcion);
        fila.appendChild(celdaPrecio);
        fila.appendChild(btnEliminar);
        tbody.appendChild(fila);
    });
    limpiar();
}
const limpiar = () => {
    let form = document.getElementById('formulario');
    form.reset();
}
*/
class Todo {
  constructor(todo = {}) {
    this.description = todo.description || ''
    this.status = todo.status || false
  }
}

const app = Vue.createApp({
  data() {
    return {
      submited: false,
      listado: {
        nombre: '',
        descripcion: '',
        precio: ''
      },
      editTodo: '',
      todos: [],
      error: false,
      editIndex: -1,
    }
  },
  methods: {
    addTodo() {
      this.error = false;
      if (this.listado.nombre.length > 0 && this.listado.descripcion.length > 0&& this.listado.precio > 0) {
        this.todos.push(this.listado);
        this.listado = new Todo();
      } else {
        this.error = true;
      }
    },
    setTodo(index) {
      this.editIndex = index;
      this.editTodo = this.todos[index].description;
    },
    saveTodo(index) {
      this.todos[index].description = this.editTodo;
      this.editIndex = -1;
    },
    deleteTodo(index) {
      const confirm = window.confirm('¿Estás seguro de eliminar la tarea?');
      if (confirm) this.todos.splice(index, 1);
    },
    cancel() {
      this.editIndex = -1
    },
    changeStatus(index) {
      this.todos[index].status = !this.todos[index].status;
    }
  }
})
app.mount('#app')
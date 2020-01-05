
class ControlPeticiones {

   constructor() {
      let url = window.location.href;
      this.urlBase = `${url.substr(0, url.indexOf('/Fase-3'))}/Fase-3/`;
      this.urlBaseControl = `${this.urlBase}control/`;
      this.urlBasePeticiones = `${this.urlBase}control/Controladores/`;
   }

   getOpcionesPeticion(datos) {

      return {
         method: 'POST',
         body: JSON.stringify(datos),
         headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
         },
         cache: 'no-cache'
      };
   }

   getRespuestaStatus(response) {
      if (response.status == 200 || response.status == 401) {
         return response.json();
      } else {
         return response.text();
      }
   }

   crearModalCargando() {
      this.eliminarModalCargando();
      let div = document.createElement('div');
      div.setAttribute('id', 'modalCargando');
      div.innerHTML = `
      <button type="button" style="display:none;" data-toggle="modal" id="btnModalLanzar" 
            data-target="#modalCargandoContenido" data-backdrop="static"></button>
      <div class="modal show" id="modalCargandoContenido" tabindex="-1" role="dialog" 
         ria-labelledby="modalCargandoContenido" aria-modal="true">
         <div class="modal-dialog" role="document">
            <div class="">
               <div class="modal-body">
                  <div class="text-center">
                     <div class="spinner-border text-secondary m-5" style="width: 5rem; height: 5rem;" role="status">
                        <span class="sr-only">Loading...</span>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>
      `;
      document.body.append(div);
      $('#btnModalLanzar').trigger('click');
   }

   crearModalTexto(msg, tipo = 'success', eventoBtn = null) {
      this.eliminarModalTexto();
      let div = document.createElement('div');
      div.setAttribute('id', 'modalTexto');
      div.innerHTML = `
      <button type="button" style="display:none;" data-toggle="modal" id="btnModalTexto" 
            data-target="#modalTextoContenido" data-backdrop="static"></button>
      <div class="modal show" id="modalTextoContenido" tabindex="-1" role="dialog" 
         ria-labelledby="modalTextoContenido" aria-modal="true">
         <div class="modal-dialog" role="document">
            <div class="modal-content">
               <div class="modal-body">
                  ${this.getCajaAlertaTexto(msg, tipo)}
               </div>
               <div class="modal-footer">
                  <button ${eventoBtn ? 'onclick="' + eventoBtn + '"' : ''} 
                  type="button" class="btn btn-primary" data-dismiss="modal" autofocus="autofocus">Aceptar</button>
               </div>
            </div>
         </div>
      </div>
      `;
      document.body.append(div);
      $('#btnModalTexto').trigger('click');
   }

   eliminarModalCargando() {
      $('#modalCargandoContenido').modal('hide');
      let modal = $('#modalCargando');
      if (modal.length > 0) modal[0].remove();

   }

   eliminarModalTexto() {
      $('#modalTextoContenido').modal('hide');
      let modal = $('#modalTexto');
      if (modal.length > 0) modal[0].remove();

   }

   eliminarModales() {
      this.eliminarModalCargando();
      this.eliminarModalTexto();
   }

   getCajaAlertaTexto(mensaje, tipoCaja) {
      return `<div class="alert alert-${tipoCaja}" role="alert">${mensaje}</div>`;
   }
   manejarMensajeRespuesta(response, tipo = 'modal', el = null) {
      let mensaje = [];
      if (typeof response === 'string') {
         mensaje = [`Ha ocurrido un error: ${response}`, 'danger'];
      } else if (response.error) {
         mensaje = [`Ha ocurrido un error: ${response.error}`, 'danger'];
      } else if (response.tipoMensaje === 'error') {
         mensaje = [`Ha ocurrido un error: ${response.mensaje}`, 'danger'];
      } else if (response.tipoMensaje === 'exito') {
         mensaje = [`Mensaje: ${response.mensaje}`, 'success'];
      } else if (response.tipoMensaje === 'alerta') {
         mensaje = [`Mensaje: ${response.mensaje}`, 'warning'];
      } else {
         mensaje = [`Mensaje: ${response.mensaje}`, 'light'];
      }
      if (tipo === 'modal') {
         this.crearModalTexto(...mensaje);
      } else {
         el.innerHTML = this.getCajaAlertaTexto(...mensaje);
      }
      this.eliminarModalCargando();
   }

   crearBackup(btn) {
      btn.disabled = true;
      this.crearModalCargando();
      fetch(`${this.urlBasePeticiones}controlAdmin.php`,
         this.getOpcionesPeticion({ accion: 'backup' })
      )
         .then(response => {
            btn.disabled = false;
            return this.getRespuestaStatus(response);
         })
         .then(response => {
            if (this.validaSesion(response)) {
               this.manejarMensajeRespuesta(response);
               this.eliminarModalCargando();
            }
         })
         .catch(err => {
            console.log(err);
            this.eliminarModales();
         });
   }

   crearBD(btn) {
      btn.disabled = true;
      this.crearModalCargando();
      fetch(`${this.urlBasePeticiones}controlAdmin.php`,
         this.getOpcionesPeticion({ accion: 'bd' })
      )
      .then(response => {
         btn.disabled = false;
         return this.getRespuestaStatus(response);
      })
      .then(response => {
         if (this.validaSesion(response)) {
            this.manejarMensajeRespuesta(response);
            this.eliminarModalCargando();
         }
      })
      .catch(err => {
         console.log(err);
         this.eliminarModales();
      });
   }

   crearTabla(btn) {
      btn.disabled = true;
      this.crearModalCargando();
      fetch(`${this.urlBasePeticiones}controlAdmin.php`,
         this.getOpcionesPeticion({ accion: 'tb' })
      )
      .then(response => {
         btn.disabled = false;
         return this.getRespuestaStatus(response);
      })
      .then(response => {
         if (this.validaSesion(response)) {
            this.manejarMensajeRespuesta(response);
            this.eliminarModalCargando();
         }
      })
      .catch(err => {
         console.log(err);
         this.eliminarModales();
      });
   }

   ingresarProducto(form) {
      let datos = {
         accion: 'ingresar',
         codigo: $('#codigo').val(),
         nombre: $('#nombre').val(),
         marca: $('#marca').val(),
         precio: $('#precio').val(),
         cantidad: $('#cantidad').val()
      };
      this.crearModalCargando();
      fetch(`${this.urlBasePeticiones}controlInventario.php`,
         this.getOpcionesPeticion(datos)
      )
      .then(response => {
         return this.getRespuestaStatus(response);
      })
      .then(response => {
         this.eliminarModalCargando();
         if (this.validaSesion(response)) {
            form.reset();//Resetea el formulario con jquery   
            this.manejarMensajeRespuesta(response);
         }
      })
      .catch(err => {
         console.log(err);
         this.eliminarModales();
      });
   }

   actualizarProducto(form) {
      let datos = {
         accion: 'actualizar',
         codigo: $('#codigo').val(),
         nombre: $('#nombre').val(),
         marca: $('#marca').val(),
         precio: $('#precio').val(),
         cantidad: $('#cantidad').val()
      };
      this.crearModalCargando();
      fetch(`${this.urlBasePeticiones}controlInventario.php`,
         this.getOpcionesPeticion(datos)
      )
         .then(response => {
            return this.getRespuestaStatus(response);
         })
         .then(response => {
            this.eliminarModalCargando();
            if (this.validaSesion(response)) {
               form.reset();//Resetea el formulario con jquery   
               this.manejarMensajeRespuesta(response);
            }
         })
         .catch(err => {
            console.log(err);
            this.eliminarModales();
         });
   }

   eliminarProducto(form) {
      let datos = {
         accion: 'eliminar',
         codigo: $('#codigoEliminar').val()
      };
      this.crearModalCargando();
      fetch(`${this.urlBasePeticiones}controlInventario.php`,
         this.getOpcionesPeticion(datos)
      )
         .then(response => {
            return this.getRespuestaStatus(response);
         })
         .then(response => {
            if (this.validaSesion(response)) {
               form.reset();//Resetea el formulario con jquery
               this.manejarMensajeRespuesta(response);
               this.eliminarModalCargando();
            }
         })
         .catch(err => {
            console.log(err);
            this.eliminarModales();
         });
   }

   consultarProducto(form) {
      let datos = {
         accion: 'consultar',
         codigo: $('#codigoConsulta').val()
      };
      this.crearModalCargando();
      fetch(`${this.urlBasePeticiones}controlInventario.php`,
         this.getOpcionesPeticion(datos)
      )
         .then(response => {
            return this.getRespuestaStatus(response);
         })
         .then(response => {
            if (this.validaSesion(response)) {
               form.reset();
               this.manejarMensajeRespuesta(response);
               this.eliminarModalCargando();
               this.mostrarProductoConsultado(response.datos);
            }
         })
         .catch(err => {
            console.log(err);
            this.eliminarModales();
         });
   }

   consultarProductos() {
      this.crearModalCargando();
      fetch(`${this.urlBasePeticiones}controlInventario.php`,
         this.getOpcionesPeticion({ accion: 'consultarTodo' })
      )
         .then(response => {
            return this.getRespuestaStatus(response);
         })
         .then(response => {
            if (this.validaSesion(response)) {
               this.mostrarProductosConsultados(response);
               this.eliminarModalCargando();
            }
         })
         .catch(err => {
            console.log(err);
            this.eliminarModales();
         });
   }

   mostrarProductoConsultado(datos) {
      let div = document.getElementById('infoConsultada');
      div.innerHTML = '';
      if (datos) {
         div.innerHTML = `
         <div class="alert alert-success" role="alert">
            <form>
					<div class="row form-group">
						<label for-"nombre" class="col-form-label col-md-4">Codigo</label>
						<div class="col-md-8">
							<input type="number" name="codigo" value="${datos.codigo}" id="codigo" class="form-control" disabled>							
						</div>						
					</div>
					<div class="row form-group">
						<label for-"nombre" class="col-form-label col-md-4">Nombre</label>
						<div class="col-md-8">
							<input type="text" name="nombre" value="${datos.nombre}" id="nombre" class="form-control" disabled>							
						</div>						
					</div>
					<div class="row form-group">
						<label for-"nombre" class="col-form-label col-md-4">Marca</label>
						<div class="col-md-8">
							<input type="text" name="marca" value="${datos.marca}" id="marca" class="form-control" disabled>							
						</div>						
					</div>
					<div class="row form-group">
						<label for-"nombre" class="col-form-label col-md-4">Precio</label>
						<div class="col-md-8">
							<input type="number" name="precio" value="${datos.precio}" id="precio" class="form-control" disabled>							
						</div>						
					</div>
					<div class="row form-group">
						<label for-"nombre" class="col-form-label col-md-4">Cantidad</label>
						<div class="col-md-8">
							<input type="number" name="cantidad" value="${datos.cantidad}" id="cantidad" class="form-control" disabled>							
						</div>						
					</div>
            </form>
         </div>
         `;
      }
   }

   mostrarProductosConsultados(repuesta) {
      let div = document.getElementById('infoConsultada');
      div.innerHTML = '';
      this.manejarMensajeRespuesta(repuesta, 'cuerpo', div);
      if (repuesta.datos) {
         let filas = repuesta.datos.map(producto => {
            return `<tr>
                        <td style="border:1px solid #dee2e6;text-align:left;font-size:11pt;color:#6c757d;">${producto.codigo}</td>
                        <td style="border:1px solid #dee2e6;text-align:left;font-size:11pt;color:#6c757d;">${producto.nombre}</td>
                        <td style="border:1px solid #dee2e6;text-align:left;font-size:11pt;color:#6c757d;">${producto.marca}</td>
                        <td style="border:1px solid #dee2e6;text-align:center;font-size:11pt;color:#6c757d;">${new Intl.NumberFormat().format(producto.precio)}</td>
                        <td style="border:1px solid #dee2e6;text-align:center;font-size:11pt;color:#6c757d;">${new Intl.NumberFormat().format(producto.cantidad)}</td>
                     </tr>`
         });
         div.innerHTML = `<div id="contenedorPdf" style="width:720px;">
                              <h1 style="text-align:center;font-size:22pt;font-weight:bold;color:#6c757d;">PRODUCTOS</h1>
                              <table style="width:100%;border:1px solid #dee2e6;margin-top:5px;border-spacing:0px;">
                                 <tr style="background:#f8f9fa;">
                                    <td style="border:1px solid #dee2e6;text-align:center;font-size:14pt;font-weight:bold;color:#6c757d;">CÓDIGO</td>
                                    <td style="border:1px solid #dee2e6;text-align:center;font-size:14pt;font-weight:bold;color:#6c757d;">NOMBRE</td>
                                    <td style="border:1px solid #dee2e6;text-align:center;font-size:14pt;font-weight:bold;color:#6c757d;">MARCA</td>
                                    <td style="border:1px solid #dee2e6;text-align:center;font-size:14pt;font-weight:bold;color:#6c757d;">PRECIO</td>
                                    <td style="border:1px solid #dee2e6;text-align:center;font-size:14pt;font-weight:bold;color:#6c757d;">CANTIDAD</td>
                                 </tr>
                                 ${filas.join('')}
                              </table>
                           </div>
                           `;
         $(div).append(`<button type="submit" class="btn btn-info" onclick="controlPeticiones.generarPdf();">Generar PDF</button>`);
      }
   }

   generarPdf() {
      let div = document.getElementById('contenedorPdf');
      if (div) {
         let form = $(`<form style="display:none;" id="formPdf" target="_blank" method="post" 
                        action="${this.urlBaseControl}Inventario/informeProductos.php">
                        </form>`);
         let input = $(`<input type="text" name="contenidoPdf" />`);
         input.val(div.innerHTML);
         form.append(input);
         $(document.body).append(form);
         form.submit();
         form.remove();
      }
   }

   validaSesion(response) {
      if (response.autenticar) {
         this.eliminarModalCargando();
         this.crearModalTexto(response.mensaje, 'warning', `controlPeticiones.redireccionar('login.html')`);
         return false;
      }
      return true;
   }

   loguear(form) {
      let div = document.getElementById('infoConsultada');
      div.innerHTML = '';

      let datos = {
         accion: 'ingresar',
         usuario: $('#usuario').val(),
         contrasena: $('#contrasena').val()
      };
      this.crearModalCargando();
      fetch(`${this.urlBaseControl}sesion/inicioSesion.php`,
         this.getOpcionesPeticion(datos)
      )
         .then(response => {
            if (response.status == 200) {
               return response.json();
            } else {
               return response.text();
            }
         })
         .then(response => {
            form.reset();//Resetea el formulario con jquery   
            this.manejarMensajeRespuesta(response, null, div);
            this.eliminarModalCargando();
            if (response.valido) this.redireccionar('');
         })
         .catch(err => {
            console.log(err);
            this.eliminarModales();
         });
   }

   verificarEstadoSesion() {
      fetch(`${this.urlBaseControl}sesion/inicioSesion.php`,
         this.getOpcionesPeticion({ accion: "validar" })
      )
         .then(response => {
            return this.getRespuestaStatus(response);
         })
         .then(response => {
            if (!response.valido) {
               this.crearModalTexto(response.mensaje, 'warning', `controlPeticiones.redireccionar('login.html')`);
               setTimeout(() => {
                  this.redireccionar('login.html');
               }, 2000);
            }
         })
         .catch(err => {
            console.log(err);
         });
   }

   redireccionar(lugar) {
      location.href = `${this.urlBase}${lugar}`;
   }


}

controlPeticiones = new ControlPeticiones();

import {html, PolymerElement} from '@polymer/polymer/polymer-element.js';
import '@vaadin/vaadin-grid/vaadin-grid.js';
import '@vaadin/vaadin-grid/vaadin-grid-sorter.js';
import '@vaadin/vaadin-grid/vaadin-grid-column.js';
import '@vaadin/vaadin-grid/vaadin-grid-selection-column.js';


/**
 * `persona-list-element`
 * Listado de personas
 *
 * @customElement
 * @polymer
 * @demo demo/index.html
 */
class PersonaListElement extends PolymerElement {
  static get template() {
    return html`
      <style>
        :host {
          display: block;
        }
      </style>
      <vaadin-grid id="grid" theme="row-stripes" items="[[personas]]" active-item="{{activeItem}}" column-reordering-allowed multi-sort>
      <vaadin-grid-column width = "300px">
        <template class="header">
          <vaadin-grid-sorter path="nombres">Nombre</vaadin-grid-sorter>
        </template>
        <template>[[item.nombres]] [[item.apellidos]]</template>
      </vaadin-grid-column>
      <vaadin-grid-column width = "200px" >
        <template class="header">
          <vaadin-grid-sorter path="num_documento">Documento</vaadin-grid-sorter>
        </template>
        <template>[[item.tipoDocumento.codigo]] : [[item.numDocumento]]</template>
      </vaadin-grid-column>
      <vaadin-grid-column width = "250px">
        <template class="header">
          <vaadin-grid-sorter path="email">Email</vaadin-grid-sorter>
        </template>
        <template>[[item.email]]</template>
      </vaadin-grid-column>
      <vaadin-grid-column width = "150px">
        <template class="header">
          <vaadin-grid-sorter path="telefono">Telefono</vaadin-grid-sorter>
        </template>
        <template>[[item.telefono]]</template>
      </vaadin-grid-column>
      <vaadin-grid-column width = "200px">
        <template class="header">
          <vaadin-grid-sorter path="fecNacimiento">Fec. Nacimiento</vaadin-grid-sorter>
        </template>
        <template>[[item.fecNacimiento]]</template>
      </vaadin-grid-column>
    </vaadin-grid>
    `;
  }
  static get properties() {
    return {
      personas:{
        type:Object,
        value: [],
        notify:true
      }
    };
  }

  ready() {
    super.ready();
    this.$.grid.addEventListener('active-item-changed', function(event) {
      let item = event.detail.value;
      this.dispatchEvent(new CustomEvent(
        'persona-selected-event',
        {
          detail: {
            persona: item
          }
        }));
    });  
  }

}

window.customElements.define('persona-list-element', PersonaListElement);

import Component from '@glimmer/component';

export default class AbcButtonsComponent extends Component {
  get atoz() {
    return Array.apply(null, { length: 26 }).map((x, i) => String.fromCharCode(97 + i).toUpperCase());
  }
}

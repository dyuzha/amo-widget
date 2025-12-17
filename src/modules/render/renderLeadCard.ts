import { IWidgetExtended } from "../../interfaces/widget-extended.interface";
import { getCurrentFunnel } from "../../utils/getCurrentFunnel";
import { renderBooked } from "./renderBooked";
import { renderMC } from "./renderMC";


export function renderLeadCard(widget: IWidgetExtended): void {

    const elem = '.linked-forms__group-wrapper.linked-forms__group-wrapper_main.js-cf-group-wrapper'

    switch (getCurrentFunnel()) {
      case 'Бронирование':
        console.log('Booked-render')
        renderBooked(widget, elem)
        break;
      case 'Мед. центр':
        console.log('MC-render')
        renderMC(widget, elem)
        break;
      default:
        break;
    }

}


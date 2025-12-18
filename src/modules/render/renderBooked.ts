import { IWidgetExtended } from "../../interfaces/widget-extended.interface";
import { BookedDataBuilder } from "../DataBuilders/BookedDataBuilder";
import { renderFunnelUI } from "./renderFunnelUI";


export function renderBooked(widget: IWidgetExtended, elem: string) {
  const url = "http://localhost:4455/crm/v1/request";
  const summary_template = 'field-booking-summary'
  const captionButton = 'Оформить бронирование'
  const dataBuilder = new BookedDataBuilder(
    {
      lead_id: { type: "selector", val: '[name="MAIN_ID"]' },
      totalPrice: { type: "selector", val: '[name="lead[PRICE]"]' },
      paidPrice: { type: "CFV", val: widget.params.paid_price },
      name: { type: "selector", val: '.js-linked-name-view' },
      phone: { type: "selector", val: '[data-type="phone"]' },
      email: { type: "selector", val: '[data-type="email"]' },
      inn: { type: "CFV", val: widget.params.inn },
      kpp: { type: "CFV", val: widget.params.kpp },
      alias: { type: "CFV", val: widget.params.alias },
      checkIn: { type: "CFV", val: widget.params.check_in },
      checkOut: { type: "CFV", val: widget.params.check_out },
      note: { type: "CFV", val: widget.params.note },
      zdravID: { type: "CFV", val: widget.params.zdrav_id },
      status: { type: "CFV", val: widget.params.status_booked },
    }
  )

  renderFunnelUI({
    widget: widget,
    url: url,
    builder: dataBuilder,
    elem: elem,
    captionButton: captionButton,
    summary_template: summary_template,
  })

}

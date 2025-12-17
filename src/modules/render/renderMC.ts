import { MCDataBuilder } from "../DataBuilders/MCDataBuilder";
import { IWidgetExtended } from "../../interfaces/widget-extended.interface";
import { renderFunnelUI } from "./renderFunnelUI";


export function renderMC(widget: IWidgetExtended, elem: string) {
  const url = "http://localhost:4455/crm/v1/ch1";
  const summary_template = 'field-mc-summary'
  const dataBuilder = new MCDataBuilder(
    {
      lead_id: { type: "selector", val: '[name="MAIN_ID"]' },
      totalPrice: { type: "selector", val: '[name="lead[PRICE]"]' },
      paidPrice: { type: "CFV", val: widget.params.paid_price },
      name: { type: "selector", val: '.js-linked-name-view' },
      phone: { type: "selector", val: '[data-type="phone"]' },
      email: { type: "selector", val: '[data-type="email"]' },
      zdravID: { type: "CFV", val: widget.params.zdrav_id },
      sex: { type: "enumCFV", val: widget.params.sex },
      birthday: { type: "CFV", val: widget.params.birthday },
      createdAt: { type: "CFV", val: widget.params.created_at },
    }
  )
  const captionButton = 'Записать клиента'

  renderFunnelUI({
    widget: widget,
    url: url,
    builder: dataBuilder,
    elem: elem,
    captionButton: captionButton,
    summary_template: summary_template,
  })

}

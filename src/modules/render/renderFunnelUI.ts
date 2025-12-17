import { addFunnelButton } from "./addFunnelButton";
import { addSummaryData } from "./addSummaryData";
import { IWidgetExtended } from "../../interfaces/widget-extended.interface";
import { DataBuilder } from "../DataBuilders/DataBuilder";

interface interfaceFunnelUI {
  widget: IWidgetExtended,
  url: string,
  builder: DataBuilder,
  elem: string,
  captionButton: string,
  summary_template: string,
}

export function renderFunnelUI(params: interfaceFunnelUI) {
  const widget = params.widget;
  const url = params.url;
  const builder = params.builder;
  const elem = params.elem;
  const captionButton = params.captionButton;
  const summary_template = params.summary_template;

  const domLocation = document.querySelector(elem);
  if (!domLocation) {
    console.error(`"Элемент ${elem} не найден`)
    return
  }

  const summary = builder.buildSummaryData()
  const sendData = builder.buildSendData()
  if (summary) {
    console.log('Показываем сводные данные.')
    addSummaryData.call(
      widget, domLocation, summary_template, summary, () => callback(sendData, url)
    )
  } else {
    console.log('Показываем кнопку.')
    addFunnelButton.call(
      widget, domLocation, captionButton, () => callback(sendData, url)
    )
  }
}


function callback(sendObj: object, url: string) {
  const xhr = new XMLHttpRequest();
  xhr.overrideMimeType("application/json");
  xhr.open("POST", url, true);
  xhr.send(JSON.stringify(sendObj));
}

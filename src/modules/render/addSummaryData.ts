import { IWidgetExtended } from "../../interfaces/widget-extended.interface";
import { loadTemplate } from "../../utils/loadTemplate";

export const addSummaryData = function(
  this: IWidgetExtended,
  DOMLocaliton: Element,
  template: string,
  data: Record<string, string>,
  onClick?: (e: MouseEvent) => void  // callback для кнопки
): boolean {

  loadTemplate.call(
    this,
    template,
    { ...data },
    (html: string) => {
      DOMLocaliton.insertAdjacentHTML('beforeend', html);
      const link = DOMLocaliton.querySelector<HTMLAnchorElement>('.resortsoft_card__button');

      link?.addEventListener('click', (e) => {
        e.preventDefault();
        if (onClick) {
          onClick(e);
        } else {
          console.log('Отсутствует метод передачи данных')
        }
      });
    }
  );
  return true
}

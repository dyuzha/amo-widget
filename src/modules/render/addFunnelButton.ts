import { IWidgetExtended } from "../../interfaces/widget-extended.interface";
import { loadTemplate } from "../../utils/loadTemplate";


export const addFunnelButton = function(
    this: IWidgetExtended,
    DOMLocaliton: Element,
    caption: string,
    onClick?: (e: MouseEvent) => void  // callback для кнопки
): boolean {

    if (!DOMLocaliton) return false;

    loadTemplate.call(
        this,
        'custom-button',
        { innerText: caption },
        (html: string) => {
            DOMLocaliton.insertAdjacentHTML('beforeend', html);
            const button = DOMLocaliton.querySelector<HTMLButtonElement>('.profit_button');
            button?.addEventListener('click', (e) => {
                e.preventDefault();
                // e.stopPropagation();
                if (onClick) {
                    onClick(e);
                } else {
                    console.log('Отсутствует метод передачи данных')
                }
            });
        },
    );
    return true;
}

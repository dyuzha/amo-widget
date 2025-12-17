export function getCurrentFunnel(): string {
    // Находим все элементы с названием воронки
    const funnels = Array.from(document.querySelectorAll<HTMLElement>('.pipeline-select__caption-text'));

    // Берем первый видимый элемент
    const visibleFunnel = funnels.find(el => el.offsetParent !== null);

    // Возвращаем название через title или пустую строку
    return visibleFunnel?.getAttribute('title') ?? '';
}

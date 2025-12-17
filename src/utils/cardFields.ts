export type FieldSelector_ =
  | { name: string }
  | { id: string }
  | { dataType: string }
  | { textCFV: string }
  | { enumCFV: string }
  | { selector: string };

export function formatDateToISO(date: string | void): string {
  if (!date) {
    return ""
  };

  const parts = date.split(".");
  if (parts.length !== 3) {
    return ""
  };

  const [day, month, year] = parts;
  return `${year}-${month}-${day}`;
}

export function getFieldBySelector(selector: FieldSelector_): string {
  let el: HTMLInputElement | null = null;

  if ('name' in selector) {
    el = document.querySelector<HTMLInputElement>(`[name="${selector.name}"]`);

  } else if ('id' in selector) {
    el = document.getElementById(selector.id) as HTMLInputElement;

  } else if ('textCFV' in selector) {
    el = document.querySelector<HTMLInputElement>(`[name="CFV[${selector.textCFV}]"]`);

  } else if ('dataType' in selector) {
    el = document.querySelector<HTMLInputElement>(`[data-type="${selector.dataType}"]`);

  } else if ('selector' in selector) {
    el = document.querySelector<HTMLInputElement>(selector.selector);

  } else if ('enumCFV' in selector) {
    const text = document.querySelector<HTMLInputElement>(
      `.linked-form__field[data-id="${selector.enumCFV}"] .control--select--button`
    )?.querySelector('.control--select--button-inner')?.textContent?.trim();
    return text || '';
  };
  return el?.value || ''
}

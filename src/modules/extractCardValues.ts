export type FieldSelector =
  | { type: "CFV"; val: string }
  | { type: "enumCFV"; val: string }
  | { type: "selector"; val: string }
  | { type: "selectorID"; val: string };


export function extractCardValues(
  v: FieldSelector, formatFN?: (v: string) => string
): () => string {

  let fn: () => string

  switch (v.type) {

    case "CFV":
      fn = () => document.querySelector<HTMLInputElement>(`[name="CFV[${v.val}]"]`)?.value || ''
      break;

    case "enumCFV":
      fn = () => {
        return document.querySelector<HTMLElement>(
          `.linked-form__field[data-id="${v.val}"] .control--select--button`
        )?.querySelector('.control--select--button-inner')?.textContent?.trim() || '';
      }
      break;

    case "selector":
      fn = () => document.querySelector<HTMLInputElement>(v.val)?.value || '';
      break;

    case "selectorID":
      fn = () => (document.getElementById(v.val) as HTMLInputElement)?.value || '';
      break;

    default:
      console.error(`Неизвестный тип селектора:`, v);
      fn = () => ''
      break;

  }

  return formatFN ? () => formatFN(fn()) : fn;
}

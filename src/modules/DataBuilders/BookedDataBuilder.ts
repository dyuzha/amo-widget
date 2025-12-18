import { extractCardValues, FieldSelector } from "../extractCardValues";
import { DataBuilder, DataInterface } from "./DataBuilder";

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

interface BookedDataInterface extends DataInterface {
  inn?: FieldSelector
  kpp?: FieldSelector
  alias?: FieldSelector
  checkIn?: FieldSelector
  checkOut?: FieldSelector
  note?: FieldSelector
  status?: FieldSelector
}

export class BookedDataBuilder extends DataBuilder {
  private inn?: () => string;
  private kpp?: () => string;
  private alias?: () => string;
  private checkIn?: () => string;
  private checkOut?: () => string;
  private clientNote?: () => string;
  private status?: () => string;

  constructor(data: BookedDataInterface) {
    super(data)
    if (data.inn) this.inn = extractCardValues(data.inn);
    if (data.kpp) this.kpp = extractCardValues(data.kpp);
    if (data.alias) this.alias = extractCardValues(data.alias);
    if (data.checkIn) this.checkIn = extractCardValues(data.checkIn);
    if (data.checkOut) this.checkOut = extractCardValues(data.checkOut);
    if (data.note) this.clientNote = extractCardValues(data.note);
    if (data.status) this.status = extractCardValues(data.status);
  }

  public buildSendData(): object {
    const data = {
      id: this.lead_id(),
      main_contact: {
        name: this.name?.(),
        phones: this.phone ? [this.removeLeadingPlus(this.phone())] : [],
        emails: this.email ? [this.email()] : [],
      },
      contractor: {
        inn: this.inn?.(),
        kpp: this.kpp?.(),
        alias: this.alias?.(),
      },
      check_in: formatDateToISO(this.checkIn?.()),
      check_out: formatDateToISO(this.checkOut?.()),
      client_note: this.clientNote?.(),
    };
    return data
  }

  public buildSummaryData(): Record<string, string> | null {
    if (!this.status?.()) {
      return null;
    }

    if (this.status?.() === 'Выбрать') {
      return null;
    }
    console.log(this.statePaid)

    return {
      status: this.status?.() || '',
      checkin: this.checkIn?.() || '',
      checkout: this.checkOut?.() || '',
      zdravID: this.zdravID?.() || '',
      paidPrice: this.paidPrice?.() || '0',
      statusRu: this.statusRu,
      statePaid: this.statePaid,
      percent: String(this.paymentPerсent),
    };
  }

  private get statusRu(): string {
    const map = new Map([
      ["booked", "Забронировано"],
      ["cancel", "Отменено"],
      ["checkin", "Проживает"],
      ["checkout", "Выехал"],
      ["waiting", "В ожидании"],
    ]);
    if (!this.status) {
      return '';
    }
    return map.get(this.status()) ?? "";
  }
}

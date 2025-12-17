import { extractCardValues, FieldSelector } from "../extractCardValues";
import { DataBuilder, DataInterface } from "./DataBuilder";


interface MCDataInterface extends DataInterface {
  sex?: FieldSelector
  birthday?: FieldSelector
  createdAt?: FieldSelector
}

export class MCDataBuilder extends DataBuilder {
  private sex?: () => string;
  private birthday?: () => string;
  private createdAt?: () => string;

  constructor(data: MCDataInterface) {
    super(data)
    if (data.sex) this.sex = extractCardValues(data.sex)
    if (data.birthday) this.birthday = extractCardValues(data.birthday)
    if (data.createdAt) this.createdAt = extractCardValues(data.createdAt)
  }

  public buildSendData(): Object {
    const data = {
      id: this.lead_id(),
      main_contact: {
        name: this.name?.(),
        phone: this.phone ? this.removeLeadingPlus(this.phone?.()) : '',
        email: this.email?.(),
        sex: this.sex ? this.normalizeSex(this.sex()) : '',
        birthday: this.birthday,
      },
    };
    return data;
  }

  public buildSummaryData(): Record<string, string> | null {
    if (!this.createdAt?.()) {
      return null;
    }
    return {
      createdAt: this.createdAt?.() || '',
      paidPrice: this.paidPrice?.() || '0',
      zdravID: this.zdravID?.() || '',
      statePaid: this.statePaid,
      percent: String(this.paymentPerсent),
    };

  }

  private normalizeSex(value: string): string {
    switch (value) {
      case "Мужской":
        return "M";
      case "Женский":
        return "F";
      default:
        return "";
    }
  }
}

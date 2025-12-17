import { extractCardValues, FieldSelector } from "../extractCardValues";

export interface DataInterface {
  lead_id: FieldSelector
  totalPrice?: FieldSelector
  paidPrice?: FieldSelector
  name?: FieldSelector
  phone?: FieldSelector
  email?: FieldSelector
  zdravID?: FieldSelector
}

export abstract class DataBuilder {
  protected lead_id: () => string;
  protected name?: () => string;
  protected phone?: () => string;
  protected email?: () => string;
  protected zdravID?: () => string;
  protected totalPrice?: () => string;
  protected paidPrice?: () => string;

  constructor(data: DataInterface) {
    this.lead_id = extractCardValues(data.lead_id);
    if (data.totalPrice) this.totalPrice = extractCardValues(data.totalPrice);
    if (data.name) this.name = extractCardValues(data.name);
    if (data.phone) this.phone = extractCardValues(data.phone);
    if (data.email) this.email = extractCardValues(data.email);
    if (data.zdravID) this.zdravID = extractCardValues(data.zdravID);
    if (data.paidPrice) this.paidPrice = extractCardValues(data.paidPrice)
  }
  abstract buildSendData(): object;
  abstract buildSummaryData(): Record<string, string> | null;

  protected removeLeadingPlus(value: string) {
    return value.replace(/^\+/, "");
  }

  protected get paymentPerсent(): number {
    let percent: number = 0

    const total = +(this.totalPrice?.() || 0);
    const paid = +(this.paidPrice?.() || 0);

    if (paid !== 0 && total !== 0) {
      percent = Math.round((paid / total) * 100)
    } else if (paid !== 0 && total === 0) {
      percent = 100
    }
    return percent
  }

  protected get statePaid(): string {
    const perсent = this.paymentPerсent
    let statePaid: string = 'none'

    switch (true) {

      case perсent === 0:
        statePaid = 'none'; break;

      case perсent <= 25:
        statePaid = 'low'; break;

      case perсent <= 50:
        statePaid = 'medium'; break;

      case perсent === 100:
        statePaid = 'full'; break;

      case perсent <= 100:
        statePaid = 'high'; break;

      case perсent > 100:
        statePaid = 'overfull'; break;

      default: statePaid = 'default'
    }

    return statePaid
  }
}


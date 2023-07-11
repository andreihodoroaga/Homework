import { ConfiguredSculpture } from "./configured-sculpture";

export interface Order {
  id: string;
  buyerName: string;
  buyerDeliveryAddress: string;
  configuredSculptures: ConfiguredSculpture[];
}

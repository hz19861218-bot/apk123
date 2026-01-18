
export type Language = 'zh' | 'en';
export type Region = 'AU' | 'UK';

export interface iPhoneModel {
  id: string;
  name: string;
  specs: string;
  basePrice: {
    AU: number;
    UK: number;
  };
  image: string;
  features: string[];
}

export interface Translation {
  title: string;
  subtitle: string;
  selectRegion: string;
  selectLang: string;
  buyNow: string;
  priceDetails: string;
  serviceFee: string;
  estTotal: string;
  chatPlaceholder: string;
  chatTitle: string;
  shippingNote: string;
  australia: string;
  uk: string;
  compareModels: string;
  priceTrend: string;
  trackTitle: string;
  trackPlaceholder: string;
  trackButton: string;
  trackStatus: string;
  orderPlaced: string;
  shipped: string;
  inTransit: string;
  customs: string;
  delivered: string;
  login: string;
  register: string;
  orderFormTitle: string;
  fullName: string;
  phoneNumber: string;
  address: string;
  confirmOrder: string;
  orderSuccess: string;
  orderSuccessDesc: string;
  close: string;
}

export interface AppState {
  lang: Language;
  region: Region;
}

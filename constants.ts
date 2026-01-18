
import { iPhoneModel, Translation } from './types';

export const IPHONE_MODELS: iPhoneModel[] = [
  {
    id: '17-pro-max',
    name: 'iPhone 17 Pro Max',
    specs: '6.9" Super Retina, A19 Pro, 48MP Periscope',
    basePrice: { AU: 2249, UK: 1249 },
    image: 'https://images.unsplash.com/photo-1695420950337-f10df0551101?auto=format&fit=crop&q=80&w=1200',
    features: ['Polished Titanium', 'A19 Pro Chip', 'ProMotion 120Hz']
  },
  {
    id: '17-pro',
    name: 'iPhone 17 Pro',
    specs: '6.3" ProMotion, A19 Pro, New Action Button',
    basePrice: { AU: 1899, UK: 1049 },
    image: 'https://images.unsplash.com/photo-1678911820864-e2c567c655d7?auto=format&fit=crop&q=80&w=1200',
    features: ['Siri with Apple Intelligence+', 'USB-C 4.0', 'ProRes Video']
  },
  {
    id: '17-slim',
    name: 'iPhone 17 Air',
    specs: '6.6" Ultra Slim Design, A19 Chip',
    basePrice: { AU: 1699, UK: 949 },
    image: 'https://images.unsplash.com/photo-1726053350320-c756209b0b46?auto=format&fit=crop&q=80&w=1200',
    features: ['Ultra Lightweight', 'Single Powerful Cam', 'MagSafe 3']
  },
  {
    id: '17-base',
    name: 'iPhone 17',
    specs: '6.1" Dynamic Island, A19 Chip',
    basePrice: { AU: 1449, UK: 849 },
    image: 'https://images.unsplash.com/photo-1726581944517-575510f2795c?auto=format&fit=crop&q=80&w=1200',
    features: ['A19 Chipset', 'Vibrant Colors', 'Advanced Spatial Video']
  }
];

export const TRANSLATIONS: Record<string, Translation> = {
  en: {
    title: 'iGlobal Concierge',
    subtitle: 'Premium Personal Shopping for iPhone 17 Series',
    selectRegion: 'Region',
    selectLang: 'Language',
    buyNow: 'Pre-order Now',
    priceDetails: 'Price Breakdown',
    serviceFee: 'Service Fee (5%)',
    estTotal: 'Est. Total (CNY)',
    chatPlaceholder: 'Ask our AI about iPhone 17 features...',
    chatTitle: 'Shopping Assistant',
    shippingNote: '* Shipping and custom duties are calculated at checkout',
    australia: 'Australia',
    uk: 'United Kingdom',
    compareModels: 'Model Comparison',
    priceTrend: 'Weekly Price Estimate',
    trackTitle: 'Track Shipment',
    trackPlaceholder: 'Order Number (e.g. IG12345)',
    trackButton: 'Search',
    trackStatus: 'Current Status',
    orderPlaced: 'Order Placed',
    shipped: 'Shipped from Origin',
    inTransit: 'International Transit',
    customs: 'Clearing Customs',
    delivered: 'Out for Delivery',
    login: 'Login',
    register: 'Sign Up',
    orderFormTitle: 'Shipping Information',
    fullName: 'Full Name',
    phoneNumber: 'Phone Number',
    address: 'Shipping Address',
    confirmOrder: 'Confirm Order',
    orderSuccess: 'Order Placed Successfully!',
    orderSuccessDesc: 'Our concierge will contact you within 24 hours to confirm payment and shipping details.',
    close: 'Close'
  },
  zh: {
    title: 'iGlobal 全球代购',
    subtitle: 'iPhone 17 系列全球首发直采专家',
    selectRegion: '选择地区',
    selectLang: '语言',
    buyNow: '立即预订',
    priceDetails: '价格明细',
    serviceFee: '代购费 (5%)',
    estTotal: '预计总额 (人民币)',
    chatPlaceholder: '咨询 AI 助手关于 iPhone 17 的新功能...',
    chatTitle: '代购小助手',
    shippingNote: '* 运费与关税将在结账时根据实际地址计算',
    australia: '澳大利亚',
    uk: '英国',
    compareModels: '机型对比',
    priceTrend: '本周价格趋势',
    trackTitle: '物流查询',
    trackPlaceholder: '输入订单号 (例如: IG12345)',
    trackButton: '查询',
    trackStatus: '当前状态',
    orderPlaced: '已下单',
    shipped: '已从境外发货',
    inTransit: '国际运输中',
    customs: '清关中',
    delivered: '派送中',
    login: '登录',
    register: '注册',
    orderFormTitle: '收货信息填写',
    fullName: '收货人姓名',
    phoneNumber: '联系电话',
    address: '详细收货地址',
    confirmOrder: '确认提交订单',
    orderSuccess: '订单提交成功！',
    orderSuccessDesc: '我们的代购专员将在 24 小时内通过电话与您确认付款及物流详情。',
    close: '关闭'
  }
};

export const EXCHANGE_RATES = {
  AUD_CNY: 4.75,
  GBP_CNY: 9.25
};

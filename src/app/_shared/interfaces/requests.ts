
export interface Requests {
    id: Number;
    englishName: string;
    arabicName: string;
    price: Number;
    dateFrom: string | number | Date;
    dateTo: string | number | Date;
    discount1: Number;
    discount2: Number;
    discount3: Number;
    description: string;
    statusId: Number;
    autoReplay: Boolean;
    statusStr: string;
    isActive: Boolean;
    serviceDays: Array<string>;
    dayId: Number;
    categoryServices: Array<string>;
    categoryId: Number;
    serviceId: Number;
    categoryName: string;
    serviceName: string;
}



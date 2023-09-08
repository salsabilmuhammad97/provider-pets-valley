
export interface Package {
    id: Number;
    englishName: string;
    arabicName: string;
    price: Number;
    startDate: string | number | Date;
    expiryDate: string | number | Date;

    description: string;
    statusId: Number;
    autoReplay: Boolean;
    statusStr: string;
    isActive: Boolean;

 
    categoryServices: Array<string>;
    categoryId: Number;
    serviceId: Number;
    categoryName: string;
    serviceName: string;
}



export interface medicalServices {

    id?: number;
    englishName?: string
    arabicName?: string

    price?: number;
    dateFrom?: string;
    dateTo?: string;
    discount1?: number;
    discount2?: number;
    discount3?: number;
    description?: string;

    statusId?: number;
    autoReplay?: boolean
    statusStr?: string;

    isActive?: boolean;
    serviceDays?: [];
    categoryServices?: []
}
export type IPartner = {
    id: number;
    name: string;
    partnerId: number;
    document: string;
    contactNumber: string;
    authorized: boolean;
};

export type IPartnerForm = {
    name: string;
    partnerId: number;
    document: string;
    contactNumber: string;
};

import { baseAPI } from "apis/common";

export const getServices = async () => {
    return await baseAPI("GET", "/services/");
};

export const getAppointments = async () => {
    return await baseAPI("GET", "/appointments/");
}
import { NEW_TEMP_ID } from "@/lib/constants";

export const getTempNewId = () => `${NEW_TEMP_ID}-${crypto.randomUUID()}`;

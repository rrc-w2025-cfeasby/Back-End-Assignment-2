import { Ticket } from "./ticket";

export interface UrgencyResult extends Ticket {
    ageInDays: number;
    urgencyScore: number;
    urgencyLevel: string;
}

export type CaluclateUrgencyReturn = | { notFound: true } | UrgencyResult;
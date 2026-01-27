import { calculateTicketUrgency } from "../src/api/v1/services/ticketService";
import { tickets } from "../src/data/tickets";

describe("Ticket Urgency Calculation", () => {
    // Test LOW urgency is calculated correctly
    test("LOW urgency is calculated correctly", () => {
        const result = calculateTicketUrgency(1);

        if("notFound" in result) throw new Error("Ticket not found");

        expect(result.urgencyLevel).toBe("Low urgency. Address when capacity allows.");
    });

    // Test Moderate urgency is calculated correctly
    test("MODERATE urgency is calculated correctly", () => {
        const result = calculateTicketUrgency(3);

        if("notFound" in result) throw new Error("Ticket not found");

        expect(result.urgencyLevel).toBe("Moderate. Schedule for attention.");
    });

    // Test HIGH urgency is calculated correctly
    test("HIGH urgency is calculated correctly", () => {
        const result = calculateTicketUrgency(5);

        if("notFound" in result) throw new Error("Ticket not found");

        expect(result.urgencyLevel).toBe("High urgency. Prioritize resolution.");
    });

    // Test CRITICAL urgency is calculated correctly
    test("CRITICAL urgency is calculated correctly", () => {
        const result = calculateTicketUrgency(8);

        if("notFound" in result) throw new Error("Ticket not found");

        expect(result.urgencyLevel).toBe("Critical. Immediate attention required.");
    });
});
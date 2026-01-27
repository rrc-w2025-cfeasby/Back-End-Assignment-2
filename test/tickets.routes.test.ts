import request from "supertest";
import app from "../src/app";
import { tickets } from "../src/data/tickets";

describe("Ticket Routes", () => {
    // Test GET /tickets
    test("GET /tickets - should return all tickets", async () => {
        const response = await request(app).get("/api/v1/tickets");

        expect(response.status).toBe(200);
        expect(response.body.data.length).toBe(tickets.length);
    })
});
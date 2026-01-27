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

    // GET /tickets returns correct structure
    test("GET /tickets - should return correct strucuture", async () => {
        const response = await request(app).get("/api/v1/tickets");

        expect(response.body).toHaveProperty("message");
        expect(response.body).toHaveProperty("data");
    })

    // GET /tickets/:id
    test("GET /tickets/:id - should return a ticket by ID", async () => {
        const response = await request(app).get("/api/v1/tickets/1");

        expect(response.status).toBe(200);
        expect(response.body.data.id).toBe(1);
    });

    // GET /tickets/:id returns 404 for non-existing ID
    test("GET /tickets/:id - should return 404 for non-existing ID", async () => {
        const response = await request(app).get("/api/v1/tickets/999");

        expect(response.status).toBe(404);
        expect(response.body.message).toBe("Ticket not found");
    });
});
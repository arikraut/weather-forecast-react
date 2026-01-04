import { formatDate } from "../../utils/dateUtils";

test("formatDate returns correct date", () => {
    const date = new Date("2021-01-01T00:00:00.000Z");
    const formattedDate = formatDate(date);
    expect(formattedDate).toBe("2021-01-01T00:00:00Z");
});

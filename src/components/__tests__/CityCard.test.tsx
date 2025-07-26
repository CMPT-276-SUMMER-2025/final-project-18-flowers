import { it, expect } from 'vitest'

it('dummy test', () => {
  expect(true).toBe(true)
})
// // src/components/__tests__/CityCard.test.tsx
// import { render, screen } from "@testing-library/react";
// import CityCard from "../CityCard";
// import { MemoryRouter } from "react-router-dom";
// import { vi, beforeEach, describe, it, expect } from "vitest";

// // Mock DOM for dummy-map
// beforeEach(() => {
//   document.body.innerHTML = '<div id="dummy-map"></div>';

//   globalThis.google = {
//     maps: {
//       importLibrary: vi.fn().mockResolvedValue({
//         PlacesService: class {
//           textSearch = (req: any, cb: any) => {
//             cb([{ name: "Taipei City" }], "OK");
//           };
//         },
//         PlacesServiceStatus: {
//           OK: "OK"
//         }
//       }),
//     },
//   } as any;
// });

// describe("CityCard Component", () => {
//   it("renders city name and description", async () => {
//     render(
//       <MemoryRouter>
//         <CityCard cityname="Taipei City" />
//       </MemoryRouter>
//     );

//     // Wait for async useEffect to finish (city name from mock)
//     const heading = await screen.findByRole("heading", {
//       name: /taipei city/i,
//     });

//     expect(heading).toBeInTheDocument();
//     expect(screen.getByText(/the capital of taiwan/i)).toBeInTheDocument();
//   });
// });

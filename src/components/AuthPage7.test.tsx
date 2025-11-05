import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { AuthPage7 } from "./AuthPage7";

// Mock navigate so we can assert route changes without a real router history
const mockedNavigate = vi.fn();
vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual<typeof import("react-router-dom")>("react-router-dom");
  return {
    ...actual,
    useNavigate: () => mockedNavigate,
  };
});

describe("AuthPage7", () => {
  beforeEach(() => {
    mockedNavigate.mockReset();
  });

  it("renders heading and profile image", () => {
    render(
      <MemoryRouter>
        <AuthPage7 />
      </MemoryRouter>,
    );

    expect(screen.getByRole("heading", { name: /star luv/i })).toBeInTheDocument();
    expect(screen.getByAltText(/star luv profile/i)).toBeInTheDocument();
  });

  it("navigates to /starluv-2 when clicking EXCLUSIVE", () => {
    render(
      <MemoryRouter>
        <AuthPage7 />
      </MemoryRouter>,
    );

    fireEvent.click(screen.getByRole("button", { name: /exclusive/i }));
    expect(mockedNavigate).toHaveBeenCalledWith("/starluv-2");
  });

  it("opens Instagram in a new tab on click", () => {
    const openSpy = vi.spyOn(window, "open").mockImplementation(() => null);

    render(
      <MemoryRouter>
        <AuthPage7 />
      </MemoryRouter>,
    );

    fireEvent.click(screen.getByRole("button", { name: /instagram/i }));
    expect(openSpy).toHaveBeenCalledWith("https://www.instagram.com/xostarluv/", "_blank");
    openSpy.mockRestore();
  });
});

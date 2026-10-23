import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { DownloaderForm } from "../components/downloader/DownloaderForm";

describe("DownloaderForm Component", () => {
  it("renders input, paste button, rights confirmation, and submit action", () => {
    render(<DownloaderForm />);

    expect(
      screen.getByPlaceholderText(/https:\/\/www\.instagram\.com\/reel/i)
    ).toBeInTheDocument();

    expect(screen.getByRole("checkbox")).not.toBeChecked();
    expect(screen.getByText(/Check media/i)).toBeInTheDocument();
  });

  it("requires rights confirmation before allowing submission", () => {
    render(<DownloaderForm />);

    const input = screen.getByPlaceholderText(/https:\/\/www\.instagram\.com\/reel/i);
    fireEvent.change(input, {
      target: { value: "https://www.instagram.com/reel/C2g7XYZ1234/" },
    });

    const submitBtn = screen.getByText(/Check media/i);
    fireEvent.click(submitBtn);

    // Expect error explaining rights confirmation is required
    expect(
      screen.getByText(/You must confirm you own or have permission/i)
    ).toBeInTheDocument();
  });

  it("can switch to local device file tool seamlessly", () => {
    render(<DownloaderForm />);

    const localTab = screen.getByText(/Local Device Files/i);
    fireEvent.click(localTab);

    expect(
      screen.getByText(/Local Device File Inspector/i)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/Zero bytes are uploaded to our servers/i)
    ).toBeInTheDocument();
  });
});

import {
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react-native";
import { SignInContainer } from "../components/SignIn";

describe("SignIn", () => {
  describe("SignInContainer", () => {
    it("calls onSubmit with the form values when submitted", async () => {
      const onSubmit = jest.fn();

      await render(<SignInContainer onSubmit={onSubmit} />);

      await fireEvent.changeText(screen.getByTestId("username"), "kalle");
      await fireEvent.changeText(
        screen.getByTestId("password"),
        "password"
      );
      await fireEvent.press(screen.getByText("Submit"));

      await waitFor(() => {
        expect(onSubmit).toHaveBeenCalled();
      });

      expect(onSubmit.mock.calls[0][0]).toEqual({
        userName: "kalle",
        password: "password",
      });
    });
  });
});

# SignUp App

This project is a simple sign-up form built with React Native and Expo. It uses `react-hook-form` for form validation and management, `Zod` for schema validation, and includes a `KeyboardAvoidingView` for a smooth user experience when the keyboard is displayed. The app supports Redux for state management and `Toast` for user feedback.

## Features

- Sign-up form with input fields: First Name, Last Name, Email, Password, and Confirm Password.
- Real-time form validation with error handling using `Zod` and `react-hook-form`.
- Secure password input with a toggle to show/hide the password.
- Terms and Conditions checkbox that needs to be checked before form submission.
- User feedback using `react-native-toast-message` for displaying success and error messages.
- Keyboard avoiding behavior to ensure a smooth user experience while filling in form fields.

## Tech Stack

- **React Native**: Mobile application framework.
- **Expo**: For easier React Native development.
- **Redux**: For managing global state.
- **Zod**: Schema validation and error handling.
- **react-hook-form**: Form management and validation.
- **Toast**: For notifications and user feedback.
- **Custom Components**:
  - `FormInput`: A reusable input component for form fields.
  - `CustomCheckBox`: A reusable checkbox component.

## Installation

Follow these steps to run the project locally:

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/signup-app.git
   ```

2. Navigate to the project directory:

   ```bash
   cd signup-app
   ```

3. Install the required dependencies:

   ```bash
   npm install
   ```

4. Start the Expo development server:

   ```bash
   npm start
   ```

   This will start the Expo server and open the project in the Expo client. You can then open it on your iOS/Android device using the Expo Go app or in a simulator.

## Usage

1. Fill in the form with valid details.
2. Ensure the Terms and Conditions checkbox is checked.
3. Click the "Sign Up" button.
4. If the form is successfully submitted, a success message will be displayed, and you will be redirected to the login page.

## Folder Structure

```
├── components
│   ├── FormInput.tsx       # Custom input field component
│   ├── CustomCheckBox.tsx  # Custom checkbox component
├── store
│   └── authReducer.ts      # Redux reducer for authentication
├── screens
│   └── SignUp.tsx          # Sign-up screen
├── theme
│   └── index.ts            # Theme setup using Shopify Restyle
└── App.tsx                 # Entry point of the app
```

## Dependencies

- **React Native**: 0.72.x
- **Expo**: 49.x.x
- **Redux**: 8.x.x
- **react-hook-form**: 7.x.x
- **Zod**: 3.x.x
- **Toast**: 2.x.x
- **@shopify/restyle**: 2.x.x

## License

This project is licensed under the MIT License.

## Acknowledgments

Special thanks to the React Native and Expo communities for their fantastic tools and libraries.

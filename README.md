
# PokeMart

PokeMart is an e-commerce application where users can create an account, log in, and browse a list of Pokémon to add to their cart. The app uses Redux for state management and GraphQL to fetch Pokémon data.

## Features

- Sign-up form with input fields: First Name, Last Name, Email, Password, and Confirm Password.
- Real-time form validation with error handling using `Zod` and `react-hook-form`.
- Secure password input with a toggle to show/hide the password.
- Terms and Conditions checkbox that needs to be checked before form submission.
- User data stored in Redux store.
- Pokémon listing fetched via GraphQL.
- Add Pokémon to cart.
- Responsive UI design with error handling.

## Tech Stack

- **React Native**: Mobile application framework.
- **Expo**: For easier React Native development.
- **Redux**: For managing global state.
- **Zod**: Schema validation and error handling.
- **react-hook-form**: Form management and validation.
- **Toast**: For notifications and user feedback.
- **GraphQL**: For API calls

## Installation

Follow these steps to run the project locally:

1. Clone the repository:

   ```bash
   git clone https://github.com/AhmedHamza667/PokeMart
   ```

2. Navigate to the project directory:

   ```bash
   cd PokeMart
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

## Screenshots

![Test](assets/profileImg.png)

## License

This project is licensed under the MIT License.

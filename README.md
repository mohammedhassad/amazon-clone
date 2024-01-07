# Amazon Clone

Amazon Clone is a feature-rich e-commerce application that replicates the core functionalities of Amazon, including product listings, cart management, checkout with Stripe integration, and user authentication. Developed with Next.js for the frontend, Firebase for real-time database and authentication, Tailwind CSS for styling, Stripe for payment processing, and a variety of other technologies for a robust user experience.

## Features

- **User Authentication:**
  - Users can create accounts and log in using Google with Next-Auth.

- **Product Listings:**
  - Browse a variety of products with detailed descriptions, images, and pricing.

- **Shopping Cart:**
  - Users can add products to their shopping cart, view and edit the cart contents.

- **Checkout with Stripe:**
  - Secure and seamless checkout process with Stripe payment integration.

- **Order Management:**
  - View order history and details for past purchases.

- **Webhooks:**
  - Utilizes webhooks for handling asynchronous events and improving user experience.

## Getting Started

To run this project locally, follow these steps:

1. **Clone the repository:**

```bash
git clone https://github.com/mohammedhassad/amazon-clone.git
cd amazon-clone
```

2. **Install dependencies:**

```bash
npm install
```

3. **Initialize Firebase and Set Environment Variables:**

    - Create a Firebase project and set up authentication and real-time database. Update the Firebase configuration in the project accordingly.
    - Create a `.env.local` file in the root directory and set the required environment variables. You can use the provided `.env.example` as a template.

4. **Run the application:**

```bash
npm run dev
```
  The application will be accessible at http://localhost:3000.

## Tech Stack

- [Next.js](https://nextjs.org/) - A React framework for building web applications.
- [Tailwind CSS](https://tailwindcss.com/) - A utility-first CSS framework for styling.
- [Firebase](https://firebase.google.com/) - A platform for building web and mobile applications.
- [Redux](https://redux.js.org/) - A state management library for React.
- [NextAuth](https://next-auth.js.org/) - Authentication library for Next.js.
- [Stripe](https://tailwindcss.com/) - A technology company that builds economic infrastructure for the internet.
- [Axios](https://www.axios.com/) - A promise-based HTTP client for making requests.

## Contributing

Pull requests are welcome but please open an issue and discuss what you will do before 😊

## Known Bugs

Feel free to email me at [Email](mailto:mohammed.hassad98@gmail.com) or [Lnkedin](https://linkedin.com/me/mohemedhassad) if you run into any issues or have questions, ideas or concerns. Please enjoy and feel free to share your opinion, constructive criticism, or comments about my work. Thank you! 🙂

## License

This project is licensed under the [MIT License](/LICENSE). Feel free to use, modify, and distribute the code.

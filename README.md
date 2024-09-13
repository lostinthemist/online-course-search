This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

To set up and run the project locally:

1. Install Dependencies:
```bash
npm install
```

2. Run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

## Project Structure

The project follows a modular structure, with the main components being:

- Search Component: Allows users to search for courses by title.
- Filter Component: Enables filtering courses based on whether they are free or paid.
- CourseCard Component: Displays individual course details such as title, description, price, and logo.
- Pagination Component: Manages the pagination of course results.


### Features Implemented
- Search Functionality
The search functionality is handled within the Search component. Users can enter a search term, which is debounced and passed as a query parameter to filter the displayed courses.

- Filter Functionality
The Filter component allows users to filter courses by whether they are free or paid. The state of the filters is reflected in the URL using query parameters (is_free=true or is_free=false), ensuring the selected filters persist even after a page refresh.

- Course Card Display
Each course is displayed using the CourseCard component, which includes:
Title and Description: Displayed with ellipsis if they exceed a two lines.
Price Label: Shows "무료" for free courses and "유료" for paid ones.
IconText: Displays additional course details with icons.
Course Logo: Positioned on the right side on the same line as first IconText, maintaining aspect ratio within a 52x52px square.

- Pagination
The Pagination component manages the display and navigation of course results. It dynamically calculates and displays page numbers based on the total number of courses and the current page. The current page and total number of courses are updated as the user navigates through the pages.

- Middleware API
A custom API route (/api/courses) is implemented using Next.js API routes. This route fetches course data from an external API, applying the necessary filters (offset, count, and filter_conditions).
CORS Handling: CORS is handled using custom middleware to ensure the API can be safely accessed from different domains.

- Styling
The project uses SASS for styling, ensuring consistent and modular styles across components.
Specific styling considerations include:
FontAwesome icons are used for the search icon, IconText and arrows in pagination. 
Responsive Layout: The layout adapts to different screen sizes, with a fixed width of 1280px centered on larger screens and full width on smaller screens.
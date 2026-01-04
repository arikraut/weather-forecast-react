# Prosjekt 1 - Team 17 - Weather forecast

Our weather web application provides real-time weather and temperature information for various cities in Scandinavia. Users can effortlessly navigate through weather cards, each representing the current weather conditions in different cities. This intuitive interface allows users to customize their weather experience by favoritize specific cities and filtering results by country.

## Key Features

**City Weather Cards:** Easily browse through weather cards to access up-to-date weather and temperature details for numerous Scandinavian cities.

**Country Filtering:** Simplify your search by filtering results based on the country of your choice, enabling you to explore weather conditions across Scandinavia with ease. The user’s filter choice is stored in local storage to make it easier to return to the site with you preferred preference.

**Favorites:** Personalize your experience by marking your favorite weather cards. Our filtering method allows you to easy choose to only display your favorites. They are also stored in local storage ensuring quick access to your preferred cities whenever you return to the site.

**Display:** You can easily change the appearance of the page by toggling between list and carousel display. With the use of session storage, your view choice will be remembered while on the page.

**Plan ahead:** By clicking on a weather card you will be sent to a page showing you the weather for the next six hours.

**Responsive Design:** Our web application features a responsive design, ensuring seamless functionality and optimal user experience on all screen sizes, from desktop computers to mobile devices.

## Changes made since last deliverable

Since the last deliverable we have made a few changes:

-   Previously, you could only see the weather cards in a carousel, now you can also see them in a list view. This allows a user to see all cities at once without needing to scroll through other cities.
-   "All" filter that shows all cities for all countries registered.
-   Removed the favorites section at the top of the page and instead added favorites as a filter next to the country filters.
-   Fixed issue with responsive design concerning too small favorite buttons.
-   Implemented the use of react router dom to route a new page showing the weather for the next few hours. This can be seen by clicking on a weather card from the carousel or list.
-   Changed some of the component tests to match with the new functionality.
-   Added the use of session storage to remember a users choice of list or carousel view.
-   Updated this README to include more information about technology stack, troubleshooting, and project development.

## Getting started

To get started with our weather web application, follow these steps:

1. [Clone the repository](https://gitlab.stud.idi.ntnu.no/it2810-h23/Team-17/prosjekt-1.git) to your local machine.
2. Open a new terminal and move to the weather-app folder

```
cd weather-app/
```

3. [Install the required dependencies](./weather-app/package.json) by running

```
npm install
```

4. Launch the application with

```
npm run dev
```

5. A link to a local version of the website will be given in the terminal. Copy and paste this link in the browser of your choosing or open it in your default browser by following:

    Windows: Ctrl + click on link

    Mac: Command + click on link

You will also find an already running [instanse of the application here](http://it2810-17.idi.ntnu.no/project1/)

## Troubleshooting

### Correct Node Version?

This project is built to work with Node version 20.5.1. You might encounter issues when using a different version

### Connected to VPN?

In order to access our application, both from the [VM](http://it2810-17.idi.ntnu.no/project1/) and from your local host, you have to connect to NTNU’s Eduroam. This means that if you are not connected to Eduroam on one of NTNU’s buildings, you have to use [VPN](https://i.ntnu.no/wiki/-/wiki/Norsk/Installere+VPN).

### Technical error message in console

If none of the options above solves your issue, have a look in your browser’s console. More technical error messages are displayed in the console, not in the UI.

## Compatibility

The web application has been tested on, and is compatible with, Google Chrome, Safari and Microsoft Edge.

## API

The application uses data from the [Location Forcast API by Meterologisk Institutt](https://api.met.no/weatherapi/locationforecast/2.0/documentation). The project retrieves data from the API using Tanstack’s React query library. Errors from the API are handled by show the error message to the user instead of the weather display. While waiting for data, the site will show a loading screen.

The functions that implement the retrieval of data from the API are located in _src/api/http.ts_.

## Technology stack

The frontend of our application is implemented using TypeScript and React. We have used Vite as the build tool. TypeScript ensures strong typing and error checking, which leads to more robust code, while React allows us to create responsive and component-based UIs. Vite provides a fast and efficient development environment, improving the overall performance of your application. To manage navigation and routing in our application, we have integrated React Router DOM, which allows for smooth and organized navigation between different components and views. We also use Tanstack's React Query for handling data fetching and state management, which simplifies asynchronous operations and improves the efficiency of our application by efficiently caching data. Our project employs local storage to persistently store user favorites, ensuring that their selected items are retained across sessions. Additionally, we utilize session storage to remember the user's chosen view, providing a seamless and personalized experience during their current session.\
\
We chose these technologies because it was the requirement for the project.

## Code quality

We employ Prettier and ESLint to improve code quality by enhancing readability, consistency and identifying potential issues. Prettier focuses on code formatting and readability, while linting delves deeper into code quality by identifying potential issues and enforcing coding standards.

### Prettier

Prettier is a code formatting tool that ensures a uniform and visually pleasing style, making the code more readable and comprehensible. The project is formatted using Prettier as a VS code extension, and it is not configured for the project itself. The use of Prettier can be found by seeing that all files are formatted the same, readable way.

### Linting

We use ESLint as the project's linting tool which analyzes the code for potential issues, enforces coding standards, and promotes best practices, enhancing code maintainability and preventing bugs. Run linting by opening a new terminal and typing in the following command:

```
cd weather-app/
npm install
npm run lint
```

## Project architecture

Our web application implementation is located in the _src_ folder within the root folder _weather-app_.
All components are gathered in a _components_ folder as per React project architecture conventions. Every component is located in a dedicated folder containing the source code tsx file and the styling css file. Furthermore, the types we have created to use in this project is located in _src/types_.

Given the small scope of this project, we have utilized hard-coded coordinates for the cities we retrieve weather data for from the API. These coordinates can be found in _src/coordinates/Coordinates.ts_. We have also decided to separate the tests from the source code by putting tests, coverage, mocking and the setup file in a separate folder called _test_. More info on testing can be found below in this README file.

## Testing

The testing for this application is not complete. As of now, the testing environment is set up and tests are written for the most important functionality.

### Run tests

To run the tests for the project, open a new terminal and run the following commands:

```
cd weather-app/
npm install
npm run test
```

To receive a test coverage report, open a new terminal and run the following commands:

```
cd weather-app/
npm install
npm run coverage
```

### Technical testing

The tests written for this project are implemented using Vitest, a testing framework that is based on the Jest framework and React testing library. The project’s tests can be catagorized as UI tests, service tests, and unit tests.

#### Mocking

All tests that use API data utilizes mocking so that no unnecessary requests will be sent to the real server and to make it easier to know what responses to expect for the tests.

To mock API data the Mock Service Worker library is used. In _src/test/mocks_, the files created for implementing mocking can be found. _handlers.ts_ specifies what requests should be mocked, and the expected error and success responses. _server.ts_ configures a request mocking server with the request handlers from _handlers.ts_.

In addition, an example of a WeatherData object is created in _src/test/exampleData/exampleWeatherData.ts_. The object contains the same data one would expect to get if the mocked API data was mapped to a WeatherData object. This object is used to assert expected result in service tests, and as a base for testing weatherUtils functions.

#### UI tests

UI tests are written for the most used components in the application namely the arrow buttons, favorite buttons and the weather display. In addition, it is tested that while the app is waiting for data from the API, a loading screen will appear. The UI tests are implemented as render tests and one simple snapshot test, and can be found in the files _App.test.tsx_, _WeatherDisplay.test.tsx_, _ArrowButton.test.tsx_ and _FavoriteButton.test.tsx_.

#### Service tests

The Service tests, located in the _test_ folder under the name _service.test.jsx_, employ the mock API, as described above, for testing. The tests ensure that weather data is correctly retrieved and mapped from API responses. They also verifies the system’s ability to return an error message in case of API errors, validating that the code handles such scenarios.

#### Unit tests

Unit tests have been written to assess the functionality within the _utils_ folder. These tests validate the accuracy of functions within _dateUtils.ts_ and confirm the correct retrieval of favorite city data from _cityUtils.ts_ getters. You can locate these unit tests in the _test_ folder in files _dateUtils.test.tsx_ and _cityUtils.test.tsx_.

### Usability testing

We've conducted usability testing of the application with a group of 3 test subjects within the student demographic. The participants had a range of technical expertise, and their ages spanned from 21 to 26 years old. The participants tested the app on Google Chrome using PC, Microsoft Edge using PC, and Safari using an iPhone.

The test subjects tested the usability of the web application by:

-   Filtering cities by countries
-   Scrolling through the weather card carousel by clicking the arrow buttons on the sides
-   Favoritize cities and removing cities from favorites
-   Refreshing the web application

The app worked successfully on all the tested browser types and devices.

There were mainly two points of feedback from the testing:

-   The favorite button should give some visual feedback when hovering to make it more obvious that it is a button
-   The cards showing the favorites were not uniform as the length of the city name determined the placements of the temperature and weather icons

We will take this feedback into consideration when planning future features for the application.

## Development and project management

### Issues

To keep track of our development tasks, we use Gitlab’s issues. This allows us to structure and organize our tasks for each deliverable. To keep track of the progress on issues, we employ an issue board. The visual columns in the board makes it easy for all team members to keep track of what others are doing and see what tasks are left. When naming the issues we aim to use short, descriptive names with the imperative verb tense. Any additional information is located in the description of the issue. We also use tags to describe the scope and priority of the issue. Example of scopes are documentation, feature, and chore. Priorities range from critical to low. These labels help us get a quick overview of the issue.

### Branches

When completing an issue, we create a new branch for it. This helps us work on new features, address issues, or test new concepts in a controlled part of the project without affecting the main codebase. We name the branches using the following format [issueNum]-description-of-branch, i.e., 34-automated-end-to-end-testing. By adding the issue number to the start of the branch, we connect the issue with the branch in Gitlab which is helpful when creating merge requests.

### Commits

When coding in the branches we aim to create a commit each time we complete a part of the task. Commits help us track and manage changes, maintain a history of the project, and revert to previous states if needed. Our commits are defined as either feat (feature), fix (bug fix), chore (cleanup) or doc (documentation) We write the commit messages using the following format “#[issueNum] [commitType]: Description of what has happened”, i.e., “#34 doc: Update readme with info about Cypress”. The description in the commit message is written in the imperative verb tense because it lets a developer know what will happen if they revert to that commit.

### Merge requests

Before a branch is merged into main, a merge request is created. We require that at least one person has approved the merge, before it happens. This allows us to intercept overlooked bugs before they make it into main, and keeps us motivated to keep up with coding conventions as we know others will go through our code. In the merge request, we summerize the main changes as well as tagging the issue being completed.
We use the automatically generated name for the merge requests. For branches with one commit it is the commit message, and for multiple commits it is “Resolve” plus the name of the issue referenced in the branch name. In addition, to keep main’s commit log clean and organized, we choose to squash the commits with the merge. This results in main’s commit log containing only the name of the merge request, not the commit messages.

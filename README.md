### The Daily Blog Frontend Documentation

#### Overview
The Daily Blog is a React-based web application that allows users to create, read, update, and delete blog posts. The frontend is built using React and styled using Material-UI components and custom CSS. The application also includes features such as user authentication, theme toggling (light/dark mode), and responsive UI elements.

#### Tech Stack
- **React**: Core framework for building the user interface.
- **Material-UI**: For pre-built, customizable UI components.
- **CSS**: Custom styling for components and layout.
- **React Router**: For handling navigation and routing.
- **js-cookie**: For managing cookies, including storing and accessing JWT tokens.
- **react-loader-spinner**: For displaying loading indicators.
  
#### Key Features

1. **Authentication**
   - User login and registration pages.
   - Cookies are used to store JWT tokens for session management.
   - Authenticated users can create, edit, and delete posts.

2. **Theme Toggling**
   - Users can switch between light and dark themes.
   - Theme preference is stored in `localStorage` to persist across sessions.

3. **Material-UI Integration**
   - **Buttons**: Material-UI buttons are used for actions like signing in, signing out, and toggling the theme.
   - **Icons**: Material-UI icons (e.g., `Home`, `Person`, `LightMode`, `DarkMode`) enhance the visual appeal and make navigation intuitive.
   - **Menu**: The application uses Material-UI’s `Menu` and `MenuItem` components for dropdown menus (e.g., the "Menu" button in the header).

4. **Post Management**
   - Users can view a list of public posts.
   - Authenticated users can create new posts, edit existing ones, and delete their own posts.
   - Posts are displayed in a card layout using custom CSS, with truncated previews for readability.

5. **Responsive Design**
   - The application is fully responsive and adapts to different screen sizes.

#### Folder Structure
```
src/
│
├── components/
│   ├── Header/                 # Contains the Header component with Material-UI menu and theme toggling
│   ├── Footer/                 # Footer component
│   ├── PostList/               # Displays the list of public posts
│   ├── PostDetail/             # Displays the details of a single post
│   ├── PostForm/               # Form component for creating/editing posts
│   ├── Profile/                # User profile page displaying user-specific posts
│   └── Login/                  # Contains the Login and Register components
│
├── data/
│   └── apiPath.js              # API URL configurations
│
├── App.js                      # Main component handling routing and theme logic
├── index.css                   # Global styles
└── index.js                    # Entry point of the React application
```

#### How to Run the Application Locally

1. **Install Dependencies**:
   - Clone the repository.
   - Navigate to the project directory and run:
     ```bash
     npm install
     ```

2. **Start the Development Server**:
   - Run the development server using:
     ```bash
     npm start
     ```
   - The application will be available at `http://localhost:3000`.

3. **Environment Variables**:
   - Ensure that the API URL is correctly set in `data/apiPath.js` to point to the backend API.

4. **Build for Production**:
   - To create an optimized production build, run:
     ```bash
     npm run build
     ```
   - This will generate the build files in the `build/` directory.

#### Usage of Material-UI

- **Buttons**:
  Material-UI's `Button` component is used throughout the application for consistent and styled action buttons. For example, in the header:
  ```javascript
  <Button variant="contained" disableElevation style={{ backgroundColor: "#d23df8" }} onClick={logOutHandler}>
    Sign Out
  </Button>
  ```

- **Icons**:
  Icons from Material-UI are used to enhance the UI, such as the `HomeIcon`, `AddIcon`, `PersonIcon`, `LightModeIcon`, and `DarkModeIcon`.

- **Menu**:
  The dropdown menu in the header utilizes Material-UI's `Menu` and `MenuItem` components:
  ```javascript
  <Menu
    id="basic-menu"
    anchorEl={anchorEl}
    open={open}
    onClose={handleClose}
  >
    <MenuItem onClick={() => { handleClose(); navigate('/'); }}>Home</MenuItem>
    ...
  </Menu>
  ```

#### Theme Management
The theme (light/dark) is toggled using a button in the header. The user's preference is stored in `localStorage`, and the application checks this value on load to persist the chosen theme across sessions.

```javascript
const themeHandler = () => {
  localStorage.setItem("theme", !theme);
  setTheme(!theme);
};
```

#### Future Enhancements

- **Profile Customization**: Allow users to customize their profile with additional information.
- **Comment System**: Enable users to add comments to posts.
- **Search Functionality**: Add a search bar to filter posts by title or content.

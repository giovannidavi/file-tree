export default `# File Tree React Application

The File Tree React Application features an intuitive and interactive file tree that includes both folders and files. Users can easily navigate through the tree structure, with each folder being capable of containing additional folders or files. The application allows users to perform various actions such as renaming or removing files and folders with ease. Users can also add new files or folders within a folder, and access all available actions on a folder or file through the context menu when right-clicking on the element.

The application's drag and drop functionality enables users to move files and folders around the tree structure, providing an effortless way to organize files and folders to suit their needs. The file tree is displayed within a sidebar, with each folder capable of being collapsed or expanded by clicking on the icon located on the right. Additionally, the application includes two buttons on the very top of the file tree that allow users to expand or collapse all folders with a single click.

The application now includes a sync functionality to persist data across page refreshes. This is achieved by making a PUT request to the mock JSON server and saving the new data. The synced data is persisted for the entire server session.

## Features

- Interactive file tree with folders and files
- Rename, remove, and add new files and folders
- Context menu for accessing actions on a folder or file
- Drag and drop functionality for moving files and folders
- Collapsible and expandable folders with buttons to expand and collapse all folders
- Sync functionality to persist data across page refreshes

## Technologies Used

- React
- TypeScript
- Material UI
- React-Query
- React-Beautiful-DnD
- JSON-Server

## How to Use

1. Clone the repository.
2. Install the dependencies with \`yarn install\`.
3. Start the development server with \`yarn start\`.
4. Start the mocked server with \`yarn server\`.
5. Navigate to \`http://localhost:3000\` to see the application.

## Improvements

- ~~Investigate the flakiness of the drag and drop functionality.~~
- ~~Implement a sync functionality by adding a sync icon next to the \`expand all\` / \`collapse all\` buttons. This could trigger a mutation to the mock server.~~
`;

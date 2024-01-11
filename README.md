
# Edge-Americas test Project Documentation

## Introduction
edge-test is an admin dashboard developed using Next.js 13, TypeScript, Ant Design for the UI, Axios for handling HTTP requests, and react-csv for CSV handling. The project adheres to the SOLID principles and requires Node.js version 18.17.0 or later.

## Table of Contents
1. [Getting Started](#getting-started)
   - [Prerequisites](#prerequisites)
   - [Installation](#installation)
   - [Running the Application](#running-the-application)

2. [Project Structure](#project-structure)
   - [src/](#src)
   - [public/](#public)
   - [styles/](#styles)
   - [pages/](#pages)
   - [components/](#components)

3. [Technologies Used](#technologies-used)
   - [Next.js](#nextjs)
   - [TypeScript](#typescript)
   - [Ant Design](#ant-design)
   - [Axios](#axios)
   - [react-csv](#react-csv)

4. [Node.js Version](#nodejs-version)

## Getting Started

### Prerequisites
Ensure you have the following installed on your machine:
- [Node.js](https://nodejs.org/) version 18.17.0 or later
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

### Installation
Clone the repository and install the dependencies:
```
git clone https://github.com/{git_user}/edge-test.git
cd ./edge-test
npm install
```
## Running the Application
Start the development server:

```
npm run dev
```
Visit http://localhost:3000 in your browser.

## Project Structure

public/  
Static assets like images, fonts, and other public files.

src/  
The main source code directory containing the application logic.

pages/  
Individual pages of the application, following Next.js conventions.

components/  
Reusable React components.

## Technologies Used
[Next.js](https://nextjs.org/docs)  
A React framework for building server-rendered React applications.

[TypeScript](https://www.typescriptlang.org/docs/)  
A superset of JavaScript that adds static typing.

[Ant Design](https://ant.design/components/overview/)  
A design system for React UI components.

[Axios](https://axios-http.com/es/docs/intro) 
A promise-based HTTP client for the browser and Node.js.

[React CSV](https://www.npmjs.com/package/react-csv)  
A React component to parse JSON for CSV data and download it.
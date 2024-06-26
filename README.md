# Note-Taking Application

## Introduction

This is a Note-Taking application with multi-user support, categories, and search functionality. It allows users to create, edit, and delete notes. Notes can be public or private. Categories can be managed with CRUD operations.


## Features

- User Registration and Login
- Create, View, Edit, and Delete Notes
- Users are able to create Public and Private Notes
- CRUD Operations for Categories
- Search and Filter Notes
- Pagination for Notes and Categories
- Multi-user Support
- Error Handling

## Getting Started

### Prerequisites
- Node.js (>= 14.x)
- MongoDB (>= 4.x)
- npm (>= 6.x)

### Clone the Repository

`git clone https://github.com/emilkenguerli/note-taking-api.git`

## Available Scripts

In the project directory, you can run:

### `npm start dev`

Starts the development server in watch mode.

### `npm run migrate:up`

Run migration to create database and Users, Categories, and Notes collections, as well as seed them.

### `npm run migrate:down`

Drop the database.
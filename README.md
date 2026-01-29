# GitHub User Search 🔍

A simple web app that lets you search for GitHub users and display their public profile information using the **GitHub Users API**.

## 🚀 Features

- Search GitHub users by username
- Display user details like:
  - Avatar
  - Name & bio
  - Location
  - Public repositories
  - Followers & following
  - Profile link
- Handles invalid usernames gracefully

## 🛠️ Tech Stack

- JavaScript
- React
- GitHub REST API

## 📦 API Used

https://api.github.com/users/{username}

## 📌 What I Learned

- Fetching data from external APIs
- Handling async requests and loading states
- Extracting and rendering nested API response data
- Error handling for failed requests

## 👤 Example Data Extracted

The app extracts and displays key fields from the GitHub API response such as `login`, `avatar_url`, `bio`, `public_repos`, `followers`, and more.

## 📄 License

This project is for learning and practice purposes.

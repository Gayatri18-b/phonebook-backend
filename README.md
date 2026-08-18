# Phonebook Backend (Full Stack Open - Part 3)

A Node.js and Express REST API backend for the Phonebook application, built as part of the University of Helsinki's Full Stack Open course.

---

## Features

* **CRUD Endpoints**: Manage phonebook contacts (`GET`, `POST`, `DELETE`).
* **Info Endpoint**: View the total contact count and server timestamp at `/info`.
* **Logging**: Request logging configured using `morgan` middleware.
* **CORS Support**: Cross-Origin Resource Sharing enabled via `cors`.
* **Static Production Build**: Serves the compiled React frontend directly from the `dist` directory.

---

## API Endpoints

| Method | URL | Description |
| :--- | :--- | :--- |
| `GET` | `/api/persons` | Returns a list of all phonebook contacts |
| `GET` | `/api/persons/:id` | Returns details for a single contact by ID |
| `DELETE` | `/api/persons/:id` | Deletes a contact by ID |
| `POST` | `/api/persons` | Adds a new contact (requires unique name and valid number) |
| `GET` | `/info` | Displays total contacts count and current request timestamp |

---

## Getting Started

### Prerequisites
* Node.js (v18 or higher recommended)
* npm

### Installation
1. Clone the repository:
   ```bash
   git clone [https://github.com/Gayatri18-b/phonebook-backend.git](https://github.com/Gayatri18-b/phonebook-backend.git)
   cd phonebook-backend

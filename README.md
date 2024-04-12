
# Unicolors

## Instalation

- git clone project
``` bash
git clone https://github.com/Alek-wdgt/unicolors.git
```
- install composer
```bash
composer install
```
- Create your database schema that will be connected for Laravel.
- Update env.example with you username, password and database name and save it as .env and edit => username, password and database

## Laravel API
- Navigate to api folder
- In your terminal run inside api/:
```bash
php artisan migrate
php artisan serve
php artisan db:seed --class=ColorSeeder
```
### API should be visible on by default on: http://127.0.0.1:8000/api/colors

Once table colors is populated with values we can start using APi in our page

## React Color App
Steps to start the app, inside your terminal navigate to color-app and run(note: In case you dont have latest use nvm install v21.6.2):
```bash
npm install
npm start
```
### App should be visible on by default on: http://localhost:3000/

### Notes
If yopu need to change api location manually ->
color-app/src/Color.tsx

Api url can be altered if needed on const API_URL = 'http://localhost:8000/api/colors';
## Preview

![App Screenshot](https://snipboard.io/EOv47w.jpg)


## Features

- Sort by name, date and popularity
- Copy hex codes and like
- Create favorites color list
- Delete and add new colors


https://ucll-tour-app.vercel.app/
# Login

Email : r1234567@ucll.be
Password : r1234567

# UCLL Tour App

A mobile-friendly campus guide for students at UCLL (UC Leuven-Limburg). The
app introduces students to campus places through a simple virtual tour.

## Target audience

- Prospective students visiting UCLL for the first time
- New and current students who want to find useful places and feel at home on
  campus

## What the app will do

The app provides a welcoming introduction to UCLL, tour information about
campus locations such as the library.

## Roadmap

- [x] Create the welcome, campus tour, and guest profile screens
- [x] Add Supabase email/password sign-in
- [ ] Add and verify live campus location data
- [ ] Created a layout students can use to navigate the floors
- [ ] Expand the tour with more campus locations
- [ ] Polish and test the deployed app on phones

## Alternatives and competitors

- **Google Maps** — provides general maps and directions, but not a UCLL-focused
  introduction or student tips.
- **UCLL website** — provides official school information, but is not a guided,
  mobile campus tour.
- **Other campus guide and virtual tour apps** — may offer campus navigation,
  but this app is focused on UCLL students and campus-specific information.

## Run locally

Install dependencies and start Expo:

```sh
npm install
npm start
```

Press `i` to open the iOS Simulator or `a` to open an Android emulator. To run
the web version:

```sh
npm run web
```

To run the browser tests:

```sh
npx cypress run
```

## Web deployment

Build the static web app with:

```sh
npx expo export --platform web
```

Deploy the generated `dist/` folder to a host that provides HTTPS. The PWA
manifest and service worker support installation and offline access to the
app shell and previously visited screens.

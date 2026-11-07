#Project

In this project i will make a mobile app that students can use as a guide for the school UC Leuven-Limburg Campus Connect.

## Supabase login setup

1. In Supabase, open **Project Settings → API** and copy the Project URL and the
   publishable key (the public `anon` key also works with the Supabase client).
2. Copy `.env.example` to `.env` and set `EXPO_PUBLIC_SUPABASE_URL` and
   `EXPO_PUBLIC_SUPABASE_PUBLISHABLE_KEY` to those values.
3. In the Supabase dashboard, open **Authentication → Users** and create a
   test user with an email and password. Confirm the user's email if email
   confirmation is enabled for the project.
4. Restart Expo so it loads the new environment variables:

   ```sh
   npx expo start -c
   ```

The login screen uses Supabase Auth; do not create or store user passwords in a
database table. The app persists the Supabase session on the device. Values
prefixed with `EXPO_PUBLIC_` are included in the client app, so only use the
publishable/anon key here. Never put the Supabase service-role key in the app or
commit `.env`.

## Web app and PWA

Export the static web app with:

```sh
npx expo export --platform web
```

Deploy the contents of `dist/` to a host that serves the site over HTTPS. A
service worker is only available on HTTPS or `localhost`. The site links to
`public/manifest.json`, registers `public/sw.js`, and caches the app shell and
Expo bundles so the last visited pages can still load offline. To check it in
Chrome, open DevTools → **Application** → **Manifest** and **Service Workers**,
then load the app once online and switch DevTools → **Network** to **Offline**
before reloading.

        <View>
          <Text>Email : r1234567@ucll.be</Text>
          <Text>Password : r1234567</Text>
        </View>

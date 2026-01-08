# Anima Project

## Getting started

> **Prerequisites:**
> The following steps require [NodeJS](https://nodejs.org/en/) to be installed on your system, so please
> install it beforehand if you haven't already.

To get started with your project, you'll first need to install the dependencies with:

```
npm install
```

Then, you'll be able to run a development version of the project with:

```
npm run dev
```

After a few seconds, your project should be accessible at the address
[http://localhost:5173/](http://localhost:5173/)

## Environment variables

This project uses Vite environment variables (must be prefixed with `VITE_`).

- `VITE_API_URL`: Backend base URL
- `VITE_TAP_PUBLIC_KEY`: Tap Payments public key for Web Card SDK (format: `pk_test_...` or `pk_live_...`)
- `VITE_TAP_CREATE_CHARGE_PATH` (optional): Backend path to create a Tap charge (default: `/payments/tap/charge`)
- `VITE_TAP_CARD_SDK_SRC` (optional): Tap Web Card SDK script URL
	- Default: `https://tap-sdks.b-cdn.net/card/1.0.2-development/index.js`


If you are satisfied with the result, you can finally build the project for release with:

```
npm run build
```

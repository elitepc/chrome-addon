> Teamlyzer's Google Chrome extension that adds salary insights to job pages (LinkedIn, Itjobs and Landing.jobs).

## Features

 - View company rating in company pages
 - View company's average salary in job offers
 - View industry's average salary in job offers

#### Popup

![Popup](https://user-images.githubusercontent.com/10537219/95662989-219b5e00-0b33-11eb-9e65-5e32acb66d07.png)

#### Window

![Window](https://user-images.githubusercontent.com/10537219/95663027-80f96e00-0b33-11eb-9604-265304bfd343.png)

The context menu is created by [chrome/extension/background/contextMenus.js](chrome/extension/background/contextMenus.js).

#### Inject page

The inject script is being run by [chrome/extension/background/inject.js](chrome/extension/background/inject.js).

If you are receiving the error message `Failed to load resource: net::ERR_INSECURE_RESPONSE`, you need to allow invalid certificates for resources loaded from localhost. You can do this by visiting the following URL: `chrome://flags/#allow-insecure-localhost` and enabling **Allow invalid certificates for resources loaded from localhost**.

### LinkedIn

![LinkedIn Company Page](https://user-images.githubusercontent.com/10537219/95663028-85258b80-0b33-11eb-91bf-bebebdef7617.png)
![LinkedIn Job Offer Page](https://user-images.githubusercontent.com/10537219/95663175-d6824a80-0b34-11eb-8b21-7fd5134171f8.png)

### ITJobs

![ITJobs Company Page](https://user-images.githubusercontent.com/10537219/95663233-6aecad00-0b35-11eb-9df4-04314dab117e.png)
![ITJobs Job Offer Page](https://user-images.githubusercontent.com/10537219/95663244-750eab80-0b35-11eb-9180-b148251e2afc.png)

### Landing.Jobs

![Landing.Jobs Company Page](https://user-images.githubusercontent.com/10537219/95663266-b0a97580-0b35-11eb-80a8-17c056b7780a.png)
![Landing.Jobs Job Offer Page](https://user-images.githubusercontent.com/10537219/95663269-c028be80-0b35-11eb-950f-6297eb91f365.png)



## Installation

```bash
# clone it
$ git clone https://github.com/jhen0409/react-chrome-extension-boilerplate.git

# Install dependencies
$ yarn
# or
$ npm install
```

## Development

* Run script
```bash
# build files to './dev'
# start webpack development server
$ yarn dev
# or
$ npm run dev
```
* If you're developing the Inject page, please allow `https://localhost:3000` connections. (Because `injectpage` injects https pages, so webpack server procotol must be https.)
* [Load unpacked extensions](https://developer.chrome.com/extensions/getstarted#unpacked) with `./dev` folder.

#### React/Redux hot reload

This boilerplate uses `Webpack` and `react-transform`. You can hot reload by editing related files of Popup & Window & Inject page.

## Build

```bash
# build files to './build'
$ yarn build
# or
$ npm run build
```

## Compress

```bash
# compress build folder to {manifest.name}.zip and crx
$ yarn build
$ yarn compress -- [options]
# or
$ npm run build
$ npm run compress -- [options]
```

## LICENSE

[MIT](LICENSE)

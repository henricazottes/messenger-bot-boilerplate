<img src='https://raw.githubusercontent.com/henricazottes/messenger-bot-boilerplate/master/public/logo.png' height='100'>

# 🤖💬 messenger-bot-boilerplate
A simple messenger bot boilerplate.

## 📝 Prerequisites
You need a **messenger app** and a **page** linked to it in order to have your bot running. Go create one here: [https://developers.facebook.com/](https://developers.facebook.com/)

Then you'll need to generate an **PAGE_ACCESS_TOKEN** that you will use afterward.

## 📥 Install

For both methods:
- Fill the PAGE_ACCESS_TOKEN with the previously generated one
- Enter a custom VERIFY_TOKEN and use the same in your messenger app webhooks configuration

### Heroku

[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy?template=https://github.com/henricazottes/messenger-bot-boilerplate) 

Simple 👌.

### Clone repo

First clone the project:
```
git clone git@github.com:henricazottes/messenger-bot-boilerplate.git
```
Rename the ._env file:
```
cd messenger-bot-boilerplate
mv ._env .env
```
Install dependencies:
```
npm install
```
Start ang enjoy ! 😁
```
npm start
```
## Credits
I used template massages from this repo [https://github.com/shyjal/messenger-bot-boilerplate](https://github.com/shyjal/messenger-bot-boilerplate)





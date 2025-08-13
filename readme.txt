Task:  https://drive.google.com/file/d/15jVnBPXaZrjs99KOUxp4TGq6Inau6xq_/view?usp=share_link

How to Run the App

1. Clone the repository:
git clone https://github.com/pobolovInnowise/CalcJS

2. Install dependencies:
npm install

3. Run development server:
npm start

4. Build production files:
npm run build

5. After build, the dist/ folder will contain:
bundle.js (optimized JS)

6. Open index.html in your browser to use the calculator.


Testing
Run unit tests: npm test
All mathematical operations are covered by Jest tests.



Project structure
CaclJS
│
├─ client/
│   └─ client.js
│
├─ commands/
│   └─ commands.js
│
├─ dist/
│   └─ bundle.js
│
├─ fonts/
│   └─ 7segment.ttf
│
├─ invoker/
│   └─ invoker.js
│
├─ node_modules/       # downloaded library npm
│
├─ receiver/
│   └─ receiver.js
│
├─ .babelrc
├─ .gitignore
├─ calc.test.js
├─ eslint.config.mjs
├─ index.html
├─ index_bundle.html
├─ package.json
├─ package-lock.json
├─ readme.txt
├─ style.css
└─ webpack.config.js
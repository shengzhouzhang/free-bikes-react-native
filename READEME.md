# bikes-share-react-native-ios

This is a demo app for demonstrate my skills only. Everything mentions in the spec is done. The program is runnable and has been tested with Xcode iPhone 6 simulator.

# Technical Stacks

React Native, Redux, Mocha, Enzyme, Node JS, ES6, ES7, Gulp

# Environment

Node JS v4.3.2
Npm 2.14.12
Xcode 7.2.1
React Native Cli 0.1.10
React Native 0.21.0

Not supporting npm 3

# Installation & Building

Please navigate to the root folder of this program. And do

```
$ npm install --production
$ npm start
```

It will build the program with the production dependencies only.
Notes that it is very important to only use production dependencies to build the program.

# Testing

To run the tests, please do

```
$ npm test
```

This will automatically install development dependencies and run the tests.

# Running

It would be good to run this program in the same environment, please check the environment above.

To run the program with the ISO Simulator, please do

```
$ npm start
```

Please use `npm start` instead of `react-native start` or `react-native run-ios`.

There is a chance the simulator loads the program before server is ready. If this happened, please wait for the server to start and reload the simulator by pressing COMMAND + R or CONTROL + R.

# Troubleshooting

If you couldn't launch the application for some reasons. Please do

```
$ rm -rf node_modules/
$ npm install --production
$ npm start --reset-cache
```

It will fix most of issues.

# Code Organizing

`/test/specs` - unit tests
`/test/utils` - util/helper functions
`/src/components` - react components
`/src/repositories` - repository objects to query api endpoint
`/src/stores` - redux stores
`/src/domains` - domain objects
`/src/config` - config
`/src/style` - styles

# Comment

Overall, the development process was smooth, although I met a few conflicts between react native and other npm libraries. This is understandable, since react native is very young. Actually, I am very surprised I can still use Redux, Mocha, and Enzyme. It makes me feel I am developing web application as the usually way. I was trying to add an automated UI test, unfortunately, it is not been done, the framework I used to test web is quite different to test mobile.

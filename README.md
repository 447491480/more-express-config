## more friendly way to use config file when you have many env,let the env config to merge default config

```
npm i more-express-config --save
```

#### demo
#### config/app.json
```
{
  "hello":"app in default"
}
```
#### config/[env]/app.json
```
{
  "hello":"app in test"
}
```

#### app.js
```
var configure = require('more-express-config');

console.log(configure.get('app'));
```
#### NODE_ENV=test node app.js
#### output
```
{
  "hello":"app in test"
}
```

### support .js, .json, .node, .yaml, .yml






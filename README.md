![dumbjs/quick-hash](https://socialify.git.ci/dumbjs/quick-hash/image?description=1&name=1&owner=1&pattern=Solid&theme=Dark)

- [Why?](#why)
- [Usage](#usage)
  - [dbj2](#dbj2)
  - [sdbm](#sdbm)
    - [Original Version](#original-version)
    - [GAWK Version](#gawk-version)
  - [License](#license)

# Why?

Tired of copying them around

# Usage

The library exports a few quick string hashing functions that are widely used
for proper bit distribution and short hashes for longer strings, (with the
exception of the BigInt implementation of `sdbm`)

### djb2

[Details &rarr;](http://www.cse.yorku.ca/~oz/hash.html#djb2)

```js
import { djb2 as hash } from '@dumbjs/quick-hash'
// or
// import { djb2 as hash } from '@dumbjs/quick-hash/djb2'

hash('hello') //=>261238937
```

### sdbm

[Details &rarr;](http://www.cse.yorku.ca/~oz/hash.html#sdbm)

#### Original Version

```js
import { sdbm as hash } from '@dumbjs/quick-hash'
// or
// import { sdbm as hash } from '@dumbjs/quick-hash/sdbm'

hash('hello') //=>31334377934759990
```

#### GAWK Version

```js
import { sdbmGawk as hash } from '@dumbjs/quick-hash'
// or
// import { sdbmGawk as hash } from '@dumbjs/quick-hash/sdbm'

hash('hello') //=>1925877435333486942514
```

## License

[MIT](/LICENSE)

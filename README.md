# Flapper News MEAN

Simple Reddit clone build with the MEAN-stack followed by a tutorial of [Thinkster](https://thinkster.io/topics/mean) and a little bit of my own API knowledge.

# Installation

1. Install MongoDB.
2. Install NodeJS (atleast Node v5.0.0 or greater).
3. Clone the repository with: `git clone https://github.com/chrisalderson/flappernews-mean.git`.
4. Install `gulp` globaly with `[sudo] npm install -g gulp`.
5. Install dependencies of Flapper News MEAN with `cd flappernews-mean` and `npm install`.
6. Build the ES5 code with `gulp build`.
7. Start the application with `npm start`.

# Folder Structure

```
.
└── src                  # Holding the ES6 source code
    ├── config           # Configuration
    ├── controllers      # REST Controllers
    ├── models           # Models
    └── views            # Views
        ├── app          # AngularJS code
        └── libs         # Third party libraries
```

# License

MIT License

Copyright (c) 2016

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

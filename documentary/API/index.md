
## API

The package is available by importing its default function:

```js
import rexml from 'rexml'
```

```### rexml => {content, props}[]
[
  ["tag", "string"],
  ["string", "string"]
]
```

Extract tags from the XML string. The tags are returned as an array with objects containing `content` and `props` properties. The content is the inner content of the tag, and `props` is the attributes specified inside the tag.

%EXAMPLE: example/example.js, ../src => rexml, javascript%

%FORK-json example example/example.js%

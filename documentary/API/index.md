## API

The package is available by importing its default and named functions:

```js
import rexml, { extractProps, extractTagsSpec, extractPropSpec } from 'rexml'
```

%~ width="25"%

```### rexml => {content, props}[]
[
  ["tag", "string"],
  ["string", "string"]
]
```

Extract tags from the XML string. The tags are returned as an array with objects containing `content` and `props` properties. The content is the inner content of the tag, and `props` is the attributes specified inside the tag.

%EXAMPLE: example, ../src => rexml, javascript%
%FORK-json example%

%~ width="25"%
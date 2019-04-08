## API

The package is available by importing its default function:

```js
import rexml from 'rexml'
```

%~ width="15"%

```### rexml => {content, props}[]
[
  ["tag", "string"],
  ["string", "string"]
]
```

Extract tags from the XML string. The tags are returned as an array with objects containing `content` and `props` properties. The content is the inner content of the tag, and `props` is the attributes specified inside the tag.

%EXAMPLE: example, ../src => rexml, javascript%

%FORK-json example%

%~ width="15"%

```### extractProps => Object<string,(boolean|string|number)>
[
  ["string", "string"],
  ["parseValue?", "boolean"]
]
```

Extracts the properties from the attributes part of the tag and returns them as an object. It will parse values if not specified otherwise.

%EXAMPLE: example/extract-props, ../src => rexml, javascript%

%FORK-json example/extract-props%

%~%
## API

The package is available by importing its default and named functions:

```js
import rexml, { extractProps, extractTagsSpec, extractPropSpec } from 'rexml'
```

%~ width="25"%

<typedef level="3" noArgTypesInToc>types/api.xml</typedef>

The tags are returned as an array with objects containing `content` and `props` properties. The content is the inner content of the tag, and `props` is the attributes specified inside the tag.

<table>
<tr><th><a href="example/index.js">Source</a></th><th>Output</th></tr>
<!-- block-start -->
<tr><td>

%EXAMPLE: example, ../src => rexml%
</td>
<td>

%FORK-js example%
</td></tr>
</table>

<typedef>types/index.xml</typedef>

%~ width="15"%

#### Extracting Multiple Tags

It's possible to give an array of tags which should be extracted from the _XML_ string.

<table>
<tr><th><a href="example/array.js">Source</a></th><th>Output</th></tr>
<!-- block-start -->
<tr><td>

%EXAMPLE: example/array, ../src => rexml%
</td>
<td>

%FORK-js example/array%
</td></tr>
</table>


%~ width="25"%
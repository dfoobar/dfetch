# dfecth

Promise based HTTP client for Deno inspired by [axios](https://www.npmjs.com/package/axios).

## ✴️ Features

- Make http requests like axios
- Supports the Promise API
- Automatic transforms for JSON data
- Cancel requests

## ℹ️ Usage

```javascript
import DFetch from "https://deno.land/x/dfetch/mod.ts";

DFetch.get("https://google.es").then((response) => {
  // response
});
```

You can use type generics with dfetch

```typescript
import DFetch from "https://deno.land/x/dfetch/mod.ts";

const { data } = await DFetch<{ delay: string }>(
  "https://postman-echo.com/delay/2"
);

// data type would be
// {delay: string}
```

## 💻 Authors
- [avizuete](https://github.com/antoniovizuete)
- [Paul Javaloyes](https://github.com/PaulJDev)

# WE ARE WORKING ON DOCS... ⚠️
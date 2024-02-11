# 🌑 Lunaris
Lunaris is a package with simple functions that make it easier to create Discord components. Currently, it has functions that simplify the creation of buttons and action rows.

# 📦 Installation
Install this library using [npm](https://npmjs.com/) | [yarn](https://yarnpkg.com/)
```bash
npm install lunaris@latest
```
```bash
yarn install lunaris@latest
```

# 🎈 How to usage?
## Buttons
`createButton(parameters)`: A simple function that facilitates the creation of buttons.<br>

```js
// To create a button using discord.js
import { ButtonBuilder, ButtonStyle } from 'discord.js' // Module ESM
const { ButtonBuilder, ButtonStyle } = require('discord.js') // Module CommonJS

new ButtonBuilder({
    label: 'Lunaris', customId: 'Package',
    style: ButtonStyle.Primary
});

// To create a button using lunaris
import { createButton } from 'lunaris' // Module ESM
const { createButton } = require('lunaris') // Module CommonJS

createButton({
    label: 'Lunaris', buttonId: 'Package',
    style: 'Primary'
});
```
<details>
  <summary>Button parameters</summary>
  
  | Parameters | Types   | Required |
  | ---------- | ------- | -------- |
  | label      | string  | true     |
  | buttonId   | string  | true     |
  | style      | string  | true     |
  | emoji      | string  | false    |
  | disabled   | boolean | false    |
  
</details><br>


`createLinkButton(parameters)`: A simple function that facilitates the creation of link buttons.<br>
```js
// To create a link button using discord.js
import { ButtonBuilder, ButtonStyle } from 'discord.js' // Module ESM
const { ButtonBuilder, ButtonStyle } = require('discord.js') // Module CommonJS

new ButtonBuilder({
    label: 'Lunaris', url: 'https://npmjs.com/lunaris',
    style: ButtonStyle.Link
});

// To create a link button using lunaris
import { createLinkButton } from 'lunaris' // Module ESM
const { createLinkButton } = require('lunaris') // Module CommonJS

createLinkButton({ label: 'Lunaris', buttonUrl: 'https://npmjs.com/lunaris' })
```
<details>
  <summary>Link button parameters</summary>
  
  | Parameters | Types   | Required |
  | ---------- | ------- | -------- |
  | label      | string  | true     |
  | buttonUrl  | string  | true     |
  | emoji      | string  | false    |
  | disabled   | boolean | false    |
  
</details><br>


## Action row
`createRow(components)`: A simple function that facilitates the creation of action row.
```js
// To create a action row using discord.js
import { actionRowBuilder } from 'discord.js' // Module ESM
const { actionRowBuilder } = require('discord.js') // Module CommonJS

new ActionRowBuilder<AnyComponentBuilder>({
    components: [
        // components here
    ]
});

// To create a action row using lunaris
import { createRow } from 'lunaris' // Module ESM
const { createRow } = require('lunaris') // Module CommonJS

createRow(
    // components here
);
```

# 💖 Contribution
Your contributions are highly valued! Feel free to enhance this project by opening an [issue](https://github.com/neveesx/Lunaris/issues) to report any problems or submitting a [pull request](https://github.com/neveesx/Lunaris/pulls) with your proposed changes.

# 📗 License
This project is licensed under the [MIT License](LICENSE).
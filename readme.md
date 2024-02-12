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
Examples of how to create action rows and buttons.
```js
// How to create action rows and buttons with discord.js
import { ActionRowBuilder, ButtonBuilder, ButtonStyle } from 'discord.js'; // With ESM
const { ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js') // With CommonJS

new ActionRowBuilder<ButtonBuilder>({
    components: [
        new ButtonBuilder({
           label: 'Lunaris', style: ButtonStyle.Primary
           customId: 'Package'
        })
        new ButtonBuilder({
           label: 'foo', style: ButtonStyle.Secondary
           customId: 'bar'
        })
    ]
});

// How to create action rows and buttons with lunaris
import { createRow, createButton } from 'lunaris'; // With ESM
const { createRow, createButton } = require('lunaris') // With CommonJS

createRow(
    createButton({
        label: 'Lunaris', buttonId: 'Package',
        style: 'Primary'
    }),
    createButton({
        label: 'foo', buttonId: 'bar',
        style: 'Secondary'
    })
)
```
For more information about other functions, you can access the [documentation](https://seveenxp.gitbook.io/lunaris) of Lunaris.

# 💖 Contribution
Your contributions are highly valued! Feel free to enhance this project by opening an [issue](https://github.com/neveesx/Lunaris/issues) to report any problems or submitting a [pull request](https://github.com/neveesx/Lunaris/pulls) with your proposed changes.

# 📗 License
This project is licensed under the [MIT License](LICENSE).
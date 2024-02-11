import { ButtonBuilder, ButtonStyle } from "discord.js";
import Lunaris from "../../private/Lunaris";

type AnyButtonStyle = 'Primary' | 'Secondary' | 'Success' | 'Danger';

type Button = {
    label: string;
    buttonId: string;
    style: AnyButtonStyle;
    emoji?: string;
    disabled?: boolean;
}

const referenceButton: Button = {
    label: 'Lunaris',
    buttonId: 'Package',
    style: 'Primary',
    emoji: '🔮',
    disabled: false
};

export default function createButton(button: Button): ButtonBuilder {
    let { label, buttonId, style, disabled, emoji } = button;

    if (!label || !buttonId || !style) {
        const reqField = !label ? 'label' : !buttonId ? 'buttonId' : 'style';
        Lunaris.error(`The required field '${reqField}' is missing.`, { stack: true });
    };

    const possibleStyles = ['primary', 'secondary', 'success', 'danger'];

    if (!possibleStyles.includes(style.toLowerCase())) {
        Lunaris.error(`The provided style is not part of the available styles`, {
            stack: true,
            customParam: `Styles: [ \x1b[34m${possibleStyles.join('\x1b[0m | \x1b[34m')}\x1b[0m ]`
        });
    };

    for (const [key, value] of Object.entries(button)) {
        if (key === 'label' || key === 'buttonId' || key === 'emoji') {
            if (typeof value !== 'string') {
                Lunaris.error(`The field '${key}' expects a string`, {
                    stack: true,
                    expected: { object: button, referenceObject: referenceButton, fields: key }
                });
            }
        } else if (key === 'disabled') {
            if (typeof value !== 'boolean') {
                Lunaris.error("The field 'disabled' expects a boolean", {
                    stack: true,
                    expected: { object: button, referenceObject: referenceButton, fields: 'disabled' }
                });
            }
        }
    }

    let newStyle: ButtonStyle;
    switch (style) {
        case 'Primary': newStyle = ButtonStyle.Primary
        break;
        case 'Secondary': newStyle = ButtonStyle.Secondary
        break;
        case 'Danger': newStyle = ButtonStyle.Danger
        break;
        case 'Success': newStyle = ButtonStyle.Success
        break;
    }

    return new ButtonBuilder({ label, customId: buttonId, disabled: disabled || undefined, emoji: emoji || undefined, style: newStyle });
}
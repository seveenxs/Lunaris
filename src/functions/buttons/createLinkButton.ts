import { ButtonBuilder } from "discord.js";
import Lunaris from "../../private/Lunaris";

type LinkButton = {
    label: string;
    buttonUrl: string;
    emoji?: string;
    disabled?: boolean;
};

const referenceLinkButton: LinkButton = {
    label: 'string',
    buttonUrl: 'https://',
    emoji: '🎈',
    disabled: false
}

export default function createLinkButton(button: LinkButton): ButtonBuilder {
    const { label, buttonUrl, disabled, emoji } = button;

    if (!label || !buttonUrl) {
        const reqField = (!label) ? 'label' : 'buttonUrl';
        Lunaris.error(`The required field '${reqField}' is missing.`, { stack: true });
    };

    for (const [key, value] of Object.entries(button)) {
        if (key === 'label' || key === 'buttonUrl' || key === 'emoji') {
            if (typeof value !== 'string')
            Lunaris.error(`The field '${key}' expects a string`, {
                stack: true,
                expected: { object: button, referenceObject: referenceLinkButton, fields: key }
            });
        } else if (key === 'disabled') {
            if (typeof value !== 'boolean')
            Lunaris.error("The field 'disabled' expects a boolean", {
                stack: true,
                expected: { object: button, referenceObject: referenceLinkButton, fields: 'disabled' }
            });
        }
    }

    return new ButtonBuilder({ label, url: buttonUrl, disabled: disabled || undefined, emoji: emoji || undefined, style: 5 });
};
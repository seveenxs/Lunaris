import { ActionRowBuilder, ButtonBuilder, ChannelSelectMenuBuilder, RoleSelectMenuBuilder, StringSelectMenuBuilder, UserSelectMenuBuilder } from "discord.js";
import Lunaris from "../../private/Lunaris";
import createLinkButton from "../buttons/createLinkButton";

type AnyComponentBuilder = 
ButtonBuilder | StringSelectMenuBuilder | ChannelSelectMenuBuilder | RoleSelectMenuBuilder | UserSelectMenuBuilder;

type GetComponentBuilder<C extends AnyComponentBuilder> = C extends infer U ? U : C;

export default function createRow<C extends AnyComponentBuilder>(...components: C[]): ActionRowBuilder<GetComponentBuilder<C>> {
    const getComponent = components.flat() as GetComponentBuilder<C>[]

    const counterButtons = getComponent.filter(buttons => buttons instanceof ButtonBuilder);

    const counterSelectMenus = getComponent.filter(selectMenus =>
    [StringSelectMenuBuilder, ChannelSelectMenuBuilder, RoleSelectMenuBuilder, UserSelectMenuBuilder].some(instance => selectMenus instanceof instance));

    if (counterSelectMenus.length >= 1 && counterButtons.length >= 1)
    Lunaris.error("Buttons and select menus cannot coexist in the same action row.", {
        stack: true,
        checkLength: { received: getComponent }
    });

    if (counterSelectMenus.length > 1 || counterButtons.length > 5)
    Lunaris.error('The maximum limit for the action row has been exceeded.', {
        stack: true,
        checkLength: { minLength: 1, maxLength: counterSelectMenus.length > 1 ? 1 : 5, received: getComponent }
    });

    return new ActionRowBuilder<GetComponentBuilder<C>>().setComponents(...getComponent);
};
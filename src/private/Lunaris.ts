import { ButtonBuilder, ChannelSelectMenuBuilder, RoleSelectMenuBuilder, StringSelectMenuBuilder, UserSelectMenuBuilder } from "discord.js";

type GenericObject<T> = Record<string, T>;

type ErrorParams<T> =
| {
    stack?: boolean;
    customParam?: string;
    checkLength?: { minLength?: number, maxLength?: number, received: Array<Object> };
    expected?: never;
}
| {
    stack?: boolean;
    customParam?: string;
    expected?: { object: GenericObject<T>, referenceObject: GenericObject<T>, fields?: string[] | string };
    checkLength?: never;
}

export default class Lunaris {
    public static error<T>(message: string, options: ErrorParams<T>): void {
        const error = new Error();

        const { checkLength, expected, stack, customParam } = options;

        const startMessage = `\x1b[31m✖\x1b[0m ${(message.length === 0) ? 'undefined' : message} \n`;
        const endMessage = '│ › Made by \x1b[1;37m\x1b[41m Lunaris \x1b[0m';

        const stackMessage = stack ? this.stack(error.stack!) : '';
        const errorMessage = expected ? this.expected(expected.object, expected.referenceObject, expected.fields) : '';
        const lengthMessage = checkLength ? this.checkLength(checkLength.received, checkLength.minLength, checkLength.maxLength) : '';
        const customMessage = customParam ? this.customParam(customParam) : '';

        this.throw(`${startMessage}${stackMessage}${customMessage}${errorMessage}${lengthMessage}${endMessage}`);
    };

    private static stack(stack: string): string {
        const stackRegex = /\((.*?)\)/g;
        const stackLines = stack.split('\n').slice(2);
  
        const fileDirectory = stackLines[1].split(stackRegex);
        const cutFileDirectory = fileDirectory[1].split('\\').slice(-2);
        const concatFileDirectory = cutFileDirectory.join('\\');
  
        return `│ › \x1b[1;31mError\x1b[0m occured in (\x1b[1;36m${concatFileDirectory}\x1b[0m) \n│\n`;
    };

    private static throw(message: string): void {
        throw message;
    };

    private static expected<T>(object: GenericObject<T>, referenceObject: GenericObject<T>, fields?: string[] | string): string {
        const expected: Record<string, string> = {};
        const received: Record<string, string> = {};

        const fieldsToCheck = (fields) ? (Array.isArray(fields) ? fields : [fields]) : Object.keys(referenceObject);

        for (const field of fieldsToCheck) {
            const value = object[field];
            const reference = referenceObject[field];

        if (typeof value !== typeof reference) {
            expected[field] = `${typeof reference}`;
            received[field] = value === undefined ? 'undefined' : `${typeof value}`;
        }
    };

        const expectedMaped = Object.entries(expected).map(([key, value]) => `${key}: \x1b[32m${value}\x1b[0m`).join(', ');
        const receivedMaped = Object.entries(received).map(([key, value]) => `${key}: \x1b[90m${value}\x1b[0m`).join(', ');

        const expectedMsg = Object.values(received).length === 0 ? '' :
        `│ › Expected: { ${expectedMaped} } \n│ › Received: { ${receivedMaped} } \n│\n`

        return expectedMsg;
    };

    private static checkLength(received: Array<Object>, minLength?: number, maxLength?: number): string {
        const objectTypes: string[] = [];

        const typesMapping: Record<string, Function> = {
            Button: ButtonBuilder,
            StringSelectMenu: StringSelectMenuBuilder,
            ChannelSelectMenu: ChannelSelectMenuBuilder,
            RoleSelectMenu: RoleSelectMenuBuilder,
            UserSelectMenu: UserSelectMenuBuilder
        };

        for (const obj of Array.isArray(received) ? received : [received]) {
            const instancedOf = Object.keys(typesMapping).find(types => obj instanceof typesMapping[types]);

            (instancedOf) ? objectTypes.push(`\x1b[32m[${instancedOf}]\x1b[0m`): null;
        }

        const receivedString = `received: \x1b[33m${objectTypes.length}\x1b[0m`;
        const maxLengthString = (maxLength) ? `maxLength: \x1b[33m${maxLength}\x1b[0m, ` : '';
        const minLengthString = (minLength) ? `minLength: \x1b[33m${minLength}\x1b[0m, ` : '';

        return `│ › Components: [ ${objectTypes.join(', ')} ] \n│ › Length: [ ${minLengthString}${maxLengthString}${receivedString} ] \n│\n`
    }

    private static customParam(param: string) {
        return `│ › ${param} \n│\n`
    };
}